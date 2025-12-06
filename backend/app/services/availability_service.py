"""
Servicio de validación de disponibilidad
"""
from datetime import datetime, timedelta
from app.utils.google_sheets_client import get_sheets_client
from app.utils.google_calendar_client import get_calendar_client
from typing import List, Dict

class AvailabilityService:
    def __init__(self):
        self.sheets = get_sheets_client()
        self.calendar = get_calendar_client()

    def get_available_slots(self, 
                            barbero_id: str, 
                            servicio_id: str, 
                            fecha_inicio: str,
                            dias: int = 7) -> List[Dict]:
        """
        Obtiene slots disponibles para un barbero en un rango de fechas
        
        Args:
            barbero_id: ID del barbero
            servicio_id: ID del servicio
            fecha_inicio: Fecha inicial (YYYY-MM-DD)
            dias: Cantidad de días a consultar
        
        Returns:
            Lista de slots disponibles
        """
        try:
            # Obtener duración del servicio
            servicios = self.sheets.get_sheet_data("Servicios")
            servicio = next((s for s in servicios if s.get('id') == servicio_id), None)
            if not servicio:
                print(f"Servicio {servicio_id} no encontrado")
                return []
            
            duracion = int(servicio.get('duracionMin', 30))
            
            # Obtener datos del barbero
            barberos = self.sheets.get_sheet_data("Barberos")
            barbero = next((b for b in barberos if b.get('id') == barbero_id), None)
            
            if not barbero:
                print(f"Barbero {barbero_id} no encontrado")
                return []
            
            hora_inicio = barbero.get('horarioInicio', '10:00')
            hora_fin = barbero.get('horarioFin', '21:00')
            dias_laborales_str = str(barbero.get('diasLaborales', '12345'))
            # Convertir "12345" a [0,1,2,3,4] (Python weekday: 0=Lunes)
            dias_laborales = [int(d) - 1 for d in dias_laborales_str]
            
            print(f"Barbero {barbero_id}: {hora_inicio}-{hora_fin}, días laborales: {dias_laborales}")
            
            # Obtener bloqueos de disponibilidad
            bloqueos = self.sheets.get_sheet_data("Disponibilidad")
            bloqueos_barbero = [
                b for b in bloqueos 
                if b.get('idBarbero') == barbero_id and b.get('disponible', 'TRUE').upper() == 'FALSE'
            ]
            
            # Obtener reservas existentes
            reservas = self.sheets.get_sheet_data("Reservas")
            reservas_barbero = [
                r for r in reservas 
                if r.get('barbero_id') == barbero_id and r.get('estado', 'confirmada') != 'cancelada'
            ]
            
            print(f"DEBUG: Buscando reservas para barbero_id={barbero_id}")
            print(f"DEBUG: Total reservas en sheet: {len(reservas)}")
            print(f"DEBUG: Reservas para este barbero: {len(reservas_barbero)}")
            if reservas_barbero:
                for r in reservas_barbero:
                    print(f"  - {r.get('barbero_id')} {r.get('fecha')} {r.get('hora')} (duracion: {r.get('duracion_total')})")
            
            # Generar slots
            slots = []
            dt_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
            
            for i in range(dias):
                fecha_actual = dt_inicio + timedelta(days=i)
                dia_semana = fecha_actual.weekday()  # 0=Lunes, 6=Domingo
                fecha_str = fecha_actual.strftime("%Y-%m-%d")
                
                # Verificar si el barbero trabaja este día (1=Lunes en Sheet, 0=Lunes en Python)
                if dia_semana not in dias_laborales:
                    print(f"  {fecha_str} (día {dia_semana}): no laboral")
                    continue
                
                # Generar slots cada 30 minutos
                slots_dia = self._generar_slots(fecha_str, hora_inicio, hora_fin, duracion)
                
                print(f"  {fecha_str} (día {dia_semana}): {len(slots_dia)} slots generados")
                
                # Filtrar slots disponibles
                for slot in slots_dia:
                    # Si es hoy, verificar que la hora no haya pasado
                    if fecha_str == datetime.now().strftime("%Y-%m-%d"):
                        slot_datetime = datetime.strptime(f"{fecha_str} {slot}", "%Y-%m-%d %H:%M")
                        if slot_datetime <= datetime.now():
                            continue
                    
                    # Verificar bloqueos en hoja Disponibilidad
                    bloqueado = any(
                        b.get('fecha') == fecha_str and b.get('hora') == slot
                        for b in bloqueos_barbero
                    )
                    if bloqueado:
                        print(f"    {slot}: bloqueado en Disponibilidad")
                        continue
                    
                    # Verificar reservas existentes
                    # Verificar solapamientos con reservas existentes usando la duración guardada
                    slot_inicio = datetime.strptime(f"{fecha_str} {slot}", "%Y-%m-%d %H:%M")
                    slot_fin = slot_inicio + timedelta(minutes=duracion)

                    reservado = any(
                        r.get('fecha') == fecha_str and
                        datetime.strptime(f"{r.get('fecha')} {r.get('hora')}", "%Y-%m-%d %H:%M") < slot_fin and
                        datetime.strptime(f"{r.get('fecha')} {r.get('hora')}", "%Y-%m-%d %H:%M") + timedelta(minutes=int(r.get('duracion_total', 30))) > slot_inicio
                        for r in reservas_barbero
                    )
                    if reservado:
                        print(f"    {slot}: ya reservado por duración")
                        continue
                    
                    # Slot disponible
                    slots.append({
                        'fecha': fecha_str,
                        'hora': slot,
                        'barbero_id': barbero_id,
                        'disponible': True
                    })
            
            print(f"Total slots disponibles: {len(slots)}")
            return slots
        except Exception as e:
            print(f"Error en get_available_slots: {e}")
            import traceback
            traceback.print_exc()
            return []

    def _generar_slots(self, fecha: str, hora_inicio: str, hora_fin: str, duracion: int) -> List[str]:
        """Genera slots de 30 minutos entre hora_inicio y hora_fin"""
        slots = []
        try:
            dt_inicio = datetime.strptime(f"{fecha} {hora_inicio}", "%Y-%m-%d %H:%M")
            dt_fin = datetime.strptime(f"{fecha} {hora_fin}", "%Y-%m-%d %H:%M")
            
            while dt_inicio + timedelta(minutes=duracion) <= dt_fin:
                slots.append(dt_inicio.strftime("%H:%M"))
                dt_inicio += timedelta(minutes=30)
        except Exception as e:
            print(f"Error en _generar_slots: {e}")
        
        return slots

    def validate_slot(self, barbero_id: str, servicio_id: str, fecha: str, hora: str) -> tuple[bool, str]:
        """
        Valida si un slot específico está disponible
        
        Returns:
            (disponible, mensaje)
        """
        try:
            # Validar formato de fecha
            try:
                datetime.strptime(fecha, "%Y-%m-%d")
            except:
                return False, "Formato de fecha inválido"
            
            # Validar que no sea fecha pasada (permitir hoy si la hora no ha pasado)
            fecha_reserva = datetime.strptime(fecha, "%Y-%m-%d").date()
            fecha_hoy = datetime.now().date()
            
            if fecha_reserva < fecha_hoy:
                return False, "No se pueden reservar fechas pasadas"
            
            # Si es hoy, verificar que la hora no haya pasado
            if fecha_reserva == fecha_hoy:
                hora_reserva = datetime.strptime(f"{fecha} {hora}", "%Y-%m-%d %H:%M")
                if hora_reserva <= datetime.now():
                    return False, "La hora seleccionada ya pasó"
            
            # Obtener duración del servicio
            servicios = self.sheets.get_sheet_data("Servicios")
            servicio = next((s for s in servicios if s.get('id') == servicio_id), None)
            if not servicio:
                return False, "Servicio no encontrado"
            
            duracion = int(servicio.get('duracionMin', 30))
            
            # Obtener datos del barbero
            barberos = self.sheets.get_sheet_data("Barberos")
            barbero = next((b for b in barberos if b.get('id') == barbero_id), None)
            
            if not barbero:
                return False, "Barbero no encontrado"
            
            # Verificar que está dentro del horario laboral del barbero
            hora_inicio = barbero.get('horarioInicio', '10:00')
            hora_fin = barbero.get('horarioFin', '21:00')
            dias_laborales_str = str(barbero.get('diasLaborales', '12345'))
            dias_laborales = [int(d) - 1 for d in dias_laborales_str]
            
            dt_solicitada = datetime.strptime(f"{fecha} {hora}", "%Y-%m-%d %H:%M")
            dia_semana = dt_solicitada.weekday()
            
            if dia_semana not in dias_laborales:
                return False, "Barbero no trabaja este día"
            
            if hora < hora_inicio or hora > hora_fin:
                return False, "La hora está fuera del horario laboral"
            
            # Verificar bloqueos en hoja Disponibilidad
            bloqueos = self.sheets.get_sheet_data("Disponibilidad")
            bloqueado = any(
                b.get('idBarbero') == barbero_id and 
                b.get('fecha') == fecha and 
                b.get('hora') == hora and
                b.get('disponible', 'TRUE').upper() == 'FALSE'
                for b in bloqueos
            )
            
            if bloqueado:
                return False, "Este horario está bloqueado"
            
            # Verificar que no haya una reserva en ese horario
            reservas = self.sheets.get_sheet_data("Reservas")
            hora_fin_reserva = datetime.strptime(f"{fecha} {hora}", "%Y-%m-%d %H:%M") + timedelta(minutes=duracion)
            
            reservado = any(
                r.get('barbero_id') == barbero_id and 
                r.get('fecha') == fecha and
                r.get('estado', 'confirmada') != 'cancelada' and
                datetime.strptime(f"{r.get('fecha')} {r.get('hora')}", "%Y-%m-%d %H:%M") < hora_fin_reserva and
                datetime.strptime(f"{r.get('fecha')} {r.get('hora')}", "%Y-%m-%d %H:%M") + timedelta(minutes=int(r.get('duracion_total', 30))) > datetime.strptime(f"{fecha} {hora}", "%Y-%m-%d %H:%M")
                for r in reservas
            )
            
            if reservado:
                return False, "Este horario ya está reservado"
            
            return True, "Slot disponible"
        except Exception as e:
            print(f"Error en validate_slot: {e}")
            return False, f"Error al validar: {str(e)}"

# Singleton
_availability_service = None

def get_availability_service():
    global _availability_service
    if _availability_service is None:
        _availability_service = AvailabilityService()
    return _availability_service
