"""
Servicio de gestión de reservas
"""
from datetime import datetime
from app.utils.google_sheets_client import get_sheets_client
from app.utils.google_calendar_client import get_calendar_client
from app.utils.whatsapp_client import get_whatsapp_client
from app.services.availability_service import get_availability_service
from app.models.models import ReservaCreate, Reserva
from typing import Optional, List

class ReservationService:
    def __init__(self):
        self.sheets = get_sheets_client()
        self.calendar = get_calendar_client()
        self.whatsapp = get_whatsapp_client()
        self.availability = get_availability_service()

    def create_reservation(self, reserva_data: ReservaCreate) -> tuple[bool, Optional[Reserva], str]:
        """
        Crea una nueva reserva con validaciones
        
        Returns:
            (éxito, reserva_objeto, mensaje)
        """
        try:
            # 1. Validar disponibilidad
            # Normalizar servicio_id a lista y tomar el primero para validar el slot
            servicio_ids = (
                reserva_data.servicio_id
                if isinstance(reserva_data.servicio_id, list)
                else [reserva_data.servicio_id]
            )

            es_valido, mensaje = self.availability.validate_slot(
                reserva_data.barbero_id,
                servicio_ids[0],
                reserva_data.fecha,
                reserva_data.hora
            )
            if not es_valido:
                return False, None, mensaje
            
            # 2. Obtener información adicional
            servicios_data = self.sheets.get_sheet_data("Servicios")
            barberos = self.sheets.get_sheet_data("Barberos")
            barbero = next((b for b in barberos if b.get('id') == reserva_data.barbero_id), None)
            if not barbero:
                return False, None, "Barbero no encontrado"
            
            # Manejar múltiples servicios (servicio_ids ya normalizado arriba)
            servicios_reserva = []
            duracion_total = 0
            
            for sid in servicio_ids:
                servicio = next((s for s in servicios_data if s.get('id') == sid), None)
                if not servicio:
                    return False, None, f"Servicio {sid} no encontrado"
                servicios_reserva.append(servicio)
                duracion_total += int(servicio.get('duracionMin', 30))
            
            servicios_nombres = ", ".join([s.get('nombre', '') for s in servicios_reserva])
            
            # 3. Crear evento en Google Calendar
            event_id = self.calendar.create_event(
                barbero_nombre=barbero.get('nombre', ''),
                cliente_nombre=reserva_data.cliente_nombre,
                servicio_nombre=servicios_nombres,
                fecha=reserva_data.fecha,
                hora=reserva_data.hora,
                duracion_minutos=duracion_total,
                email_cliente=reserva_data.cliente_email
            )
            
            if not event_id:
                return False, None, "Error al crear evento en calendario"
            
            # 4. Generar ID único
            reserva_id = self.sheets.get_next_id("Reservas", "RES")
            
            # 5. Guardar en Google Sheets
            servicio_id_str = ",".join(servicio_ids) if len(servicio_ids) > 1 else servicio_ids[0]
            
            reserva_dict = {
                'id': reserva_id,
                'barbero_id': reserva_data.barbero_id,
                'idServicio': servicio_id_str,
                'fecha': reserva_data.fecha,
                'hora': reserva_data.hora,
                'clienteNombre': reserva_data.cliente_nombre,
                'clienteTelefono': reserva_data.cliente_telefono,
                'clienteEmail': reserva_data.cliente_email,
                'estado': 'confirmada',
                'timestamp': datetime.now().isoformat(),
                'eventoCalendarID': event_id,
                'notas': reserva_data.notas or '',
                'duracion_total': duracion_total
            }
            
            success = self.sheets.append_row("Reservas", reserva_dict)
            if not success:
                # Revertir: eliminar evento del calendario
                self.calendar.delete_event(event_id)
                return False, None, "Error al guardar reserva"
            
            # 6. Generar link de WhatsApp
            whatsapp_link = self.whatsapp.generate_whatsapp_link(
                phone_number=reserva_data.cliente_telefono,
                cliente_nombre=reserva_data.cliente_nombre,
                barbero_nombre=barbero.get('nombre', ''),
                servicio_nombre=servicios_nombres,
                fecha=reserva_data.fecha,
                hora=reserva_data.hora
            )
            
            # Crear instancia de Reserva con los datos guardados
            reserva = Reserva(
                id=reserva_id,
                barbero_id=reserva_data.barbero_id,
                idServicio=servicio_id_str,
                fecha=reserva_data.fecha,
                hora=reserva_data.hora,
                clienteNombre=reserva_data.cliente_nombre,
                clienteTelefono=reserva_data.cliente_telefono,
                clienteEmail=reserva_data.cliente_email,
                estado='confirmada',
                timestamp=datetime.now().isoformat(),
                eventoCalendarID=event_id,
                notas=reserva_data.notas or '',
                duracion_total=duracion_total
            )
            reserva.whatsapp_link = whatsapp_link
            return True, reserva, "Reserva creada exitosamente"
        
        except Exception as e:
            print(f"Error en create_reservation: {e}")
            return False, None, f"Error: {str(e)}"

    def get_reservation(self, reserva_id: str) -> Optional[Reserva]:
        """Obtiene una reserva por ID"""
        try:
            reservas = self.sheets.get_sheet_data("Reservas")
            reserva_dict = next((r for r in reservas if r.get('id') == reserva_id), None)
            if reserva_dict:
                return Reserva(**reserva_dict)
            return None
        except Exception as e:
            print(f"Error en get_reservation: {e}")
            return None

    def get_reservations_by_barbero(self, barbero_id: str) -> List[Reserva]:
        """Obtiene todas las reservas de un barbero"""
        try:
            reservas = self.sheets.get_sheet_data("Reservas")
            return [
                Reserva(**r) for r in reservas 
                if r.get('barbero_id') == barbero_id
            ]
        except Exception as e:
            print(f"Error en get_reservations_by_barbero: {e}")
            return []

    def get_reservations_by_date(self, fecha: str) -> List[Reserva]:
        """Obtiene todas las reservas de una fecha"""
        try:
            reservas = self.sheets.get_sheet_data("Reservas")
            return [
                Reserva(**r) for r in reservas 
                if r.get('fecha') == fecha
            ]
        except Exception as e:
            print(f"Error en get_reservations_by_date: {e}")
            return []

    def cancel_reservation(self, reserva_id: str) -> tuple[bool, str]:
        """Cancela una reserva"""
        try:
            reserva = self.get_reservation(reserva_id)
            if not reserva:
                return False, "Reserva no encontrada"
            
            # Eliminar evento del calendario
            if reserva.google_calendar_event_id:
                self.calendar.delete_event(reserva.google_calendar_event_id)
            
            # Actualizar estado en Sheets
            reservas = self.sheets.get_sheet_data("Reservas")
            row_index = next(
                (i + 2 for i, r in enumerate(reservas) if r.get('id') == reserva_id),
                None
            )
            
            if row_index:
                reservas[row_index - 2]['estado'] = 'cancelled'
                self.sheets.update_row("Reservas", row_index, reservas[row_index - 2])
            
            # Notificar por WhatsApp
            self.whatsapp.send_cancellation(
                phone_number=reserva.cliente_telefono,
                cliente_nombre=reserva.cliente_nombre
            )
            
            return True, "Reserva cancelada exitosamente"
        except Exception as e:
            print(f"Error en cancel_reservation: {e}")
            return False, f"Error: {str(e)}"

# Singleton
_reservation_service = None

def get_reservation_service():
    global _reservation_service
    if _reservation_service is None:
        _reservation_service = ReservationService()
    return _reservation_service
