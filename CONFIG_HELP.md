# Archivos de configuración de ejemplo

Este directorio contiene plantillas de configuración que deben ser llenadas con tus valores reales.

## ⚠️ IMPORTANTE

**NUNCA** subir archivos `.env` o `credentials.json` a Git.

Estos archivos contienen información sensible:
- Credenciales de Google
- API Keys de Twilio
- Tokens de autenticación

## 📝 Archivos de Ejemplo

### 1. Backend - `.env.example`

Copiar y renombrar a `.env`:

```bash
cp .env.example .env
```

Luego completar con tus valores:

```env
# Google Cloud
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-email@tu-proyecto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
GOOGLE_SPREADSHEET_ID=1ABC123XYZ...
GOOGLE_CALENDAR_ID=tu-email@gmail.com

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=tu-token-aqui
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

# Modo
DEBUG=True
```

### 2. Frontend - `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Google Credentials

Descargar desde Google Cloud Console:
1. IAM & Admin → Service Accounts
2. Seleccionar service account
3. Keys → Add Key → Create new key
4. Guardar como `credentials.json` en `/backend`

## 🔑 Cómo Obtener Cada Credencial

### Google Service Account

1. [Google Cloud Console](https://console.cloud.google.com)
2. Crear nuevo proyecto
3. Service Accounts → Create Service Account
4. Grant roles: Editor
5. Create Key → JSON
6. Descargar y guardar

```json
{
  "type": "service_account",
  "project_id": "tu-proyecto",
  "private_key_id": "clave",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "reservas@tu-proyecto.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

### Google Spreadsheet ID

En Google Sheets, copiar de la URL:
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit
                                        ^^^^^^^^^^^
                                    ESTO ES EL ID
```

### Google Calendar ID

En Google Calendar:
1. Settings → Calendar Settings
2. Información general → Calendar ID
3. Formato típico: `usuario@gmail.com` o `c_abc123@group.calendar.google.com`

### Twilio Credentials

1. [Twilio Console](https://console.twilio.com)
2. Account Info → SID y Auth Token
3. WhatsApp → Obtener número

```
ACCOUNT_SID: ACxxxxxxxxxxxxx
AUTH_TOKEN: xxxxxxxxxxxxxxxx
WHATSAPP_NUMBER: whatsapp:+1234567890
```

## ✅ Checklist de Configuración

- [ ] Crear Google Cloud Project
- [ ] Habilitar Sheets API
- [ ] Habilitar Calendar API
- [ ] Crear Service Account
- [ ] Descargar credentials.json
- [ ] Crear Google Sheet con hojas requeridas
- [ ] Compartir Sheet con Service Account
- [ ] Crear Google Calendar
- [ ] Compartir Calendar con Service Account
- [ ] Crear cuenta Twilio
- [ ] Activar WhatsApp API en Twilio
- [ ] Llenar archivo .env con credenciales
- [ ] Llenar vite .env con API URL

## 🚀 Test de Configuración

```bash
cd backend
python -c "from config.settings import *; print('✓ Configuración cargada')"
```

## 🔒 Seguridad

**En `.gitignore` debe estar:**
```
.env
credentials.json
*.key
*.pem
```

**Nunca:**
- ❌ Subir .env a Git
- ❌ Compartir credentials.json
- ❌ Exposer API keys en código
- ❌ Usar mismos tokens en dev y prod

**Siempre:**
- ✅ Usar variables de entorno
- ✅ Rotar credenciales regularmente
- ✅ Usar secretos en deployment
- ✅ Auditar permisos de Google Cloud

## 📞 Ayuda

Si tienes problemas:
1. Verificar que credentials.json existe
2. Verificar que archivo .env está en la carpeta correcta
3. Verificar que el Service Account está compartido
4. Ejecutar `python test_system.py`
