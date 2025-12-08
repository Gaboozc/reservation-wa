"""
Google Sheets client para leer y escribir datos
"""
import gspread
import json
import os
from google.oauth2.service_account import Credentials
from config.settings import GOOGLE_SERVICE_ACCOUNT_KEY_FILE, GOOGLE_SPREADSHEET_ID
from typing import List, Dict, Any

SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

class GoogleSheetsClient:
    def __init__(self):
        try:
            self.credentials = self._build_credentials()
            self.client = gspread.authorize(self.credentials)
            self.spreadsheet = self.client.open_by_key(GOOGLE_SPREADSHEET_ID)
        except Exception as e:
            print(f"Error al conectar con Google Sheets: {e}")
            raise

    def _build_credentials(self):
        """Construye credenciales desde JSON string o archivo"""
        try:
            creds_content = GOOGLE_SERVICE_ACCOUNT_KEY_FILE.strip()
            
            # Debug: mostrar tipo y longitud
            print(f"📄 Tipo de credenciales: {type(creds_content)}")
            print(f"📄 Longitud: {len(creds_content)} caracteres")
            print(f"📄 Primeros 100 chars: {creds_content[:100]}")
            
            # Si el contenido parece un JSON (comienza con { o [)
            if creds_content.startswith('{'):
                print("📄 Detectado: JSON string desde variable de entorno")
                creds_dict = json.loads(creds_content)
                print(f"✅ JSON parseado exitosamente. Claves: {list(creds_dict.keys())}")
                return Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
            # Si es una ruta de archivo que existe
            elif os.path.isfile(creds_content):
                print(f"📄 Detectado: Archivo en {creds_content}")
                return Credentials.from_service_account_file(creds_content, scopes=SCOPES)
            else:
                raise ValueError(f"❌ Credenciales inválidas:\n- No comienza con {{\n- No es un archivo válido\n- Contenido: {creds_content[:200]}")
        except json.JSONDecodeError as e:
            print(f"❌ Error al parsear JSON: {e}")
            print(f"❌ Contenido que falló: {creds_content[:300]}")
            raise

    def get_sheet_data(self, sheet_name: str) -> List[Dict[str, Any]]:
        """Obtiene todos los datos de una hoja como lista de diccionarios"""
        try:
            worksheet = self.spreadsheet.worksheet(sheet_name)
            records = worksheet.get_all_records()
            return records
        except Exception as e:
            print(f"Error al leer {sheet_name}: {e}")
            return []

    def append_row(self, sheet_name: str, row_data: Dict[str, Any]) -> bool:
        """Añade una fila a una hoja (por Google Sheets API)"""
        try:
            worksheet = self.spreadsheet.worksheet(sheet_name)
            # Obtener headers
            headers = worksheet.row_values(1)
            # Construir fila según orden de headers
            values = [row_data.get(h, "") for h in headers]
            worksheet.append_row(values)
            return True
        except Exception as e:
            print(f"Error al escribir en {sheet_name}: {e}")
            return False

    def update_row(self, sheet_name: str, row_index: int, row_data: Dict[str, Any]) -> bool:
        """Actualiza una fila específica"""
        try:
            worksheet = self.spreadsheet.worksheet(sheet_name)
            headers = worksheet.row_values(1)
            values = [row_data.get(h, "") for h in headers]
            worksheet.update([values], f"A{row_index}:Z{row_index}")
            return True
        except Exception as e:
            print(f"Error al actualizar {sheet_name}: {e}")
            return False

    def delete_row(self, sheet_name: str, row_index: int) -> bool:
        """Elimina una fila"""
        try:
            worksheet = self.spreadsheet.worksheet(sheet_name)
            worksheet.delete_rows(row_index)
            return True
        except Exception as e:
            print(f"Error al eliminar en {sheet_name}: {e}")
            return False

    def search_record(self, sheet_name: str, key: str, value: str) -> Dict[str, Any]:
        """Busca un registro por clave-valor"""
        records = self.get_sheet_data(sheet_name)
        for record in records:
            if record.get(key) == value:
                return record
        return {}

    def get_next_id(self, sheet_name: str, id_prefix: str) -> str:
        """Genera siguiente ID único"""
        records = self.get_sheet_data(sheet_name)
        if not records:
            return f"{id_prefix}_001"
        # Buscar máximo número
        max_num = 0
        for record in records:
            if 'id' in record:
                try:
                    num = int(record['id'].replace(id_prefix + "_", ""))
                    max_num = max(max_num, num)
                except:
                    pass
        return f"{id_prefix}_{str(max_num + 1).zfill(3)}"

# Singleton instance
_sheets_client = None

def get_sheets_client():
    global _sheets_client
    if _sheets_client is None:
        _sheets_client = GoogleSheetsClient()
    return _sheets_client
