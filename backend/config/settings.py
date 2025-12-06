import os
from dotenv import load_dotenv

load_dotenv()

# Google
GOOGLE_SERVICE_ACCOUNT_EMAIL = os.getenv("GOOGLE_SERVICE_ACCOUNT_EMAIL")
GOOGLE_SERVICE_ACCOUNT_KEY_FILE = os.getenv("GOOGLE_SHEETS_CREDENTIALS", "credentials.json")
GOOGLE_SPREADSHEET_ID = os.getenv("GOOGLE_SHEET_ID")
GOOGLE_CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID")

# WhatsApp (sin API, solo links)

# URLs
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Mode
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Reservations
RESERVATIONS_SHEET_NAME = "Reservas"
BARBERS_SHEET_NAME = "Barberos"
SERVICES_SHEET_NAME = "Servicios"
SCHEDULES_SHEET_NAME = "Horarios"
CATALOG_SHEET_NAME = "Catálogo"
