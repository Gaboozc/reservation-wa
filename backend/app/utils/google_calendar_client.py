"""
Google Calendar client para crear y sincronizar eventos
"""
import json
import os
from google.oauth2.service_account import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from config.settings import GOOGLE_SERVICE_ACCOUNT_KEY_FILE, GOOGLE_CALENDAR_ID
from datetime import datetime, timedelta
from typing import Optional

SCOPES = ['https://www.googleapis.com/auth/calendar']

class GoogleCalendarClient:
    def __init__(self):
        try:
            self.credentials = self._build_credentials()
            self.service = build('calendar', 'v3', credentials=self.credentials)
            self.calendar_id = GOOGLE_CALENDAR_ID
        except Exception as e:
            print(f"Error al conectar con Google Calendar: {e}")
            raise

    def _build_credentials(self):
        """Construye credenciales desde JSON string o archivo"""
        try:
            # Si el contenido parece un JSON (comienza con { o [)
            if GOOGLE_SERVICE_ACCOUNT_KEY_FILE.strip().startswith('{'):
                print("📅 Leyendo credenciales desde variable de entorno (JSON)")
                creds_dict = json.loads(GOOGLE_SERVICE_ACCOUNT_KEY_FILE)
                return Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
            # Si es una ruta de archivo que existe
            elif os.path.isfile(GOOGLE_SERVICE_ACCOUNT_KEY_FILE):
                print(f"📅 Leyendo credenciales desde archivo: {GOOGLE_SERVICE_ACCOUNT_KEY_FILE}")
                return Credentials.from_service_account_file(GOOGLE_SERVICE_ACCOUNT_KEY_FILE, scopes=SCOPES)
            else:
                raise ValueError(f"Credenciales inválidas: no es JSON válido ni archivo existente")
        except json.JSONDecodeError as e:
            print(f"❌ Error al parsear JSON de credenciales: {e}")
            raise

    def create_event(self, 
                     barbero_nombre: str,
                     cliente_nombre: str,
                     servicio_nombre: str,
                     fecha: str,  # YYYY-MM-DD
                     hora: str,   # HH:MM
                     duracion_minutos: int,
                     email_cliente: Optional[str] = None) -> Optional[str]:
        """Crea un evento en Google Calendar"""
        try:
            # Construir datetime
            dt_start = datetime.fromisoformat(f"{fecha}T{hora}:00")
            dt_end = dt_start + timedelta(minutes=duracion_minutos)
            
            event = {
                'summary': f"[{barbero_nombre}] {servicio_nombre}",
                'description': f"Cliente: {cliente_nombre}\nServicio: {servicio_nombre}\nBarbero: {barbero_nombre}",
                'start': {
                    'dateTime': dt_start.isoformat(),
                    'timeZone': 'America/Mexico_City',
                },
                'end': {
                    'dateTime': dt_end.isoformat(),
                    'timeZone': 'America/Mexico_City',
                },
            }
            
            # No se envían notificaciones ni se agregan asistentes porque la service account no tiene delegación
            event_result = self.service.events().insert(
                calendarId=self.calendar_id,
                body=event,
                sendNotifications=False
            ).execute()
            
            return event_result.get('id')
        except Exception as e:
            print(f"Error al crear evento en Calendar: {e}")
            return None

    def update_event(self, event_id: str, **kwargs) -> bool:
        """Actualiza un evento existente"""
        try:
            event = self.service.events().get(
                calendarId=self.calendar_id,
                eventId=event_id
            ).execute()
            
            if 'summary' in kwargs:
                event['summary'] = kwargs['summary']
            if 'description' in kwargs:
                event['description'] = kwargs['description']
            
            self.service.events().update(
                calendarId=self.calendar_id,
                eventId=event_id,
                body=event
            ).execute()
            return True
        except Exception as e:
            print(f"Error al actualizar evento: {e}")
            return False

    def delete_event(self, event_id: str) -> bool:
        """Elimina un evento del calendario"""
        try:
            self.service.events().delete(
                calendarId=self.calendar_id,
                eventId=event_id
            ).execute()
            return True
        except Exception as e:
            print(f"Error al eliminar evento: {e}")
            return False

    def get_events(self, fecha_inicio: str, fecha_fin: str) -> list:
        """Obtiene eventos en un rango de fechas"""
        try:
            dt_start = datetime.fromisoformat(f"{fecha_inicio}T00:00:00")
            dt_end = datetime.fromisoformat(f"{fecha_fin}T23:59:59")
            
            events_result = self.service.events().list(
                calendarId=self.calendar_id,
                timeMin=dt_start.isoformat() + 'Z',
                timeMax=dt_end.isoformat() + 'Z',
                singleEvents=True,
                orderBy='startTime'
            ).execute()
            
            return events_result.get('items', [])
        except Exception as e:
            print(f"Error al obtener eventos: {e}")
            return []

    def is_slot_available(self, fecha: str, hora: str, duracion_minutos: int, barbero_id: str) -> bool:
        """Verifica si un slot está disponible (sin eventos)"""
        try:
            dt_start = datetime.fromisoformat(f"{fecha}T{hora}:00")
            dt_end = dt_start + timedelta(minutes=duracion_minutos)
            
            events = self.get_events(fecha, fecha)
            
            for event in events:
                event_start = datetime.fromisoformat(event['start']['dateTime'].replace('Z', '+00:00')).astimezone()
                event_end = datetime.fromisoformat(event['end']['dateTime'].replace('Z', '+00:00')).astimezone()
                
                # Verificar solapamiento
                if not (dt_end <= event_start or dt_start >= event_end):
                    return False
            
            return True
        except Exception as e:
            print(f"Error al verificar disponibilidad: {e}")
            return False

# Singleton instance
_calendar_client = None

def get_calendar_client():
    global _calendar_client
    if _calendar_client is None:
        _calendar_client = GoogleCalendarClient()
    return _calendar_client
