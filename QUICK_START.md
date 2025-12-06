# 🚀 Guía de Instalación Rápida - Sistema de Reservas

## 📦 Requisitos Previos

- Python 3.8+
- Node.js 14+
- npm o yarn
- Cuenta Google Cloud
- Cuenta Twilio

---

## ⚡ Instalación en 5 Pasos

### 1️⃣ Backend Setup (FastAPI)

```bash
# Ir a carpeta backend
cd backend

# Crear y activar virtual environment
python -m venv venv

# En Windows:
venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 2️⃣ Configurar Google Services

**A. Descargar credenciales Google:**

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear nuevo proyecto: "Sistema Reservas"
3. Habilitar APIs:
   - Google Sheets API
   - Google Calendar API
4. Crear Service Account:
   - IAM & Admin → Service Accounts
   - Crear nueva cuenta
   - Crear clave JSON
   - Guardar como `backend/credentials.json`

**B. Compartir Sheets y Calendar:**

1. Copiar email del Service Account del JSON
2. Crear Google Sheet con hojas: Barberos, Servicios, Horarios, Reservas
3. Compartir Sheet con Service Account (Editor)
4. Crear Google Calendar y compartir con Service Account

### 3️⃣ Configurar Variables de Entorno

**Backend** (`backend/.env`):

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-email@proyecto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
GOOGLE_SPREADSHEET_ID=aqui-va-id-del-sheet
GOOGLE_CALENDAR_ID=tu-email@gmail.com

TWILIO_ACCOUNT_SID=tu-sid
TWILIO_AUTH_TOKEN=tu-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DEBUG=True
```

**Frontend** (`.env`):

```env
VITE_API_URL=http://localhost:8000/api
```

### 4️⃣ Configurar Twilio

1. Ir a [Twilio](https://console.twilio.com)
2. Obtener Account SID y Auth Token
3. Habilitar WhatsApp API
4. Obtener número WhatsApp
5. Copiar en `.env`

### 5️⃣ Ejecutar Proyecto

**Terminal 1 - Backend:**

```bash
cd backend
# Asegurarse que venv está activado
python main.py
```

El backend estará en: `http://localhost:8000`

**Terminal 2 - Frontend:**

```bash
npm install  # Si no lo hiciste aún
npm run dev
```

El frontend estará en: `http://localhost:5173`

---

## ✅ Verificación

- [ ] Backend corriendo en puerto 8000
- [ ] Frontend corriendo en puerto 5173
- [ ] Google Sheets sincronizado
- [ ] Google Calendar sincronizado
- [ ] Twilio configurado

---

## 🎯 Próximos Pasos

1. Revisar `README_SISTEMA_RESERVAS.md` para documentación completa
2. Revisar `SETUP_SHEETS.md` para estructura de Google Sheets
3. Probar creando una reserva de prueba
4. Ajustar zona horaria si no es Argentina

---

## 🐛 Errores Comunes

**Error: "No module named google"**
```bash
pip install google-auth google-api-python-client
```

**Error: "credentials.json not found"**
- Verificar que el archivo está en `/backend`

**Error: CORS**
- Backend está escuchando en localhost
- Frontend está en localhost
- CORS está habilitado en `main.py`

**Error: WhatsApp no envía**
- Verificar Account SID y Token en Twilio
- Usar número con formato `whatsapp:+1234567890`

---

## 📞 Soporte

Consultar archivos:
- `README_SISTEMA_RESERVAS.md` - Documentación completa
- `SETUP_SHEETS.md` - Configuración Google Sheets
- Logs en terminal del backend
