# Sistema de Reservas - Documentación Completa

## 📋 Tabla de Contenidos
1. [Instalación y Setup](#instalación-y-setup)
2. [Configuración de Google Services](#configuración-de-google-services)
3. [Configuración de Twilio](#configuración-de-twilio)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [API Endpoints](#api-endpoints)
6. [Uso del Frontend](#uso-del-frontend)
7. [Google Sheets Setup](#google-sheets-setup)

---

## 🚀 Instalación y Setup

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

### Frontend (React + Vite)

```bash
npm install
```

---

## 🔑 Configuración de Google Services

### 1. Crear Google Cloud Project

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto: "Sistema de Reservas"
3. Habilitar APIs:
   - Google Sheets API
   - Google Calendar API

### 2. Crear Service Account

1. En GCP, ir a **IAM & Admin** → **Service Accounts**
2. Crear nueva cuenta de servicio: `reservas-system`
3. Dar permisos de "Editor" al proyecto
4. Crear clave JSON:
   - Click en la cuenta creada
   - **Keys** → **Add Key** → **Create new key**
   - Seleccionar JSON y descargar
5. Guardar archivo como `credentials.json` en `/backend`

### 3. Compartir Google Sheet y Calendar

**Importante:** Compartir con el email del Service Account (encontrado en el JSON)

```
tu-email@tu-project.iam.gserviceaccount.com
```

Permisos mínimos: **Editor**

---

## 📱 Configuración de Twilio

### 1. Crear Cuenta en Twilio

1. Ir a [Twilio Console](https://console.twilio.com)
2. Obtener:
   - **Account SID**
   - **Auth Token**
3. Obtener número WhatsApp Business o usar Sandbox

### 2. Activar WhatsApp API

En Twilio Console:
1. Messaging → WhatsApp
2. Configurar número de empresa o sandbox
3. Copiar el número en formato: `whatsapp:+1234567890`

---

## 🗂️ Estructura del Proyecto

```
sistema-reservas/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── models.py          # Esquemas Pydantic
│   │   ├── routes/
│   │   │   ├── reservations.py    # CRUD reservas
│   │   │   ├── availability.py    # Disponibilidad
│   │   │   └── catalog.py         # Catálogo
│   │   ├── services/
│   │   │   ├── availability_service.py
│   │   │   └── reservation_service.py
│   │   └── utils/
│   │       ├── google_sheets_client.py
│   │       ├── google_calendar_client.py
│   │       └── whatsapp_client.py
│   ├── config/
│   │   └── settings.py
│   ├── main.py                     # App principal
│   ├── requirements.txt
│   ├── .env                        # Variables de entorno
│   └── credentials.json            # Google Service Account
│
├── src/
│   ├── components/
│   │   ├── ReservaForm.jsx
│   │   ├── ReservaForm.css
│   │   ├── Catalogo.jsx
│   │   └── Catalogo.css
│   ├── services/
│   │   └── api.js                  # Cliente API
│   ├── hooks/
│   │   └── useReservation.jsx      # Custom hooks
│   └── ...
│
└── docs/
    └── SETUP_SHEETS.md             # Guía Google Sheets
```

---

## 📡 API Endpoints

### Reservas

```
POST   /api/reservas              # Crear reserva
GET    /api/reservas/{id}         # Obtener reserva
GET    /api/reservas/barbero/{id} # Reservas por barbero
GET    /api/reservas/fecha/{fecha}# Reservas por fecha
DELETE /api/reservas/{id}         # Cancelar reserva
```

### Disponibilidad

```
GET    /api/disponibilidad/slots/{barbero_id}/{servicio_id}
GET    /api/disponibilidad/validar/{barbero_id}/{servicio_id}/{fecha}/{hora}
GET    /api/disponibilidad/horarios/{barbero_id}
```

### Catálogo

```
GET    /api/barberos              # Todos los barberos
GET    /api/barberos/{id}         # Un barbero
GET    /api/servicios             # Todos los servicios
GET    /api/servicios/{id}        # Un servicio
GET    /api/catalogo              # Catálogo completo
```

---

## 🎨 Uso del Frontend

### Componente: ReservaForm

```jsx
import ReservaForm from './components/ReservaForm';

export default function App() {
  return <ReservaForm />;
}
```

**Features:**
- Selección de barbero, servicio, fecha
- Validación de disponibilidad en tiempo real
- Carga dinámica de horarios
- Confirmación por WhatsApp
- Validación de email y teléfono

### Componente: Catalogo

```jsx
import Catalogo from './components/Catalogo';

export default function App() {
  return <Catalogo />;
}
```

**Features:**
- Muestra servicios con imágenes y precios
- Muestra equipo de barberos
- Carga dinámica desde Google Sheets

### Variables de entorno (Frontend)

Crear `.env`:

```
VITE_API_URL=http://localhost:8000/api
```

---

## 📊 Google Sheets Setup

### Estructura requerida

Debes crear un Google Sheet con las siguientes hojas:

#### 1. **Barberos** (sheet name: "Barberos")

| id | nombre | email | telefono | activo |
|--|--|--|--|--|
| BAR_001 | Juan | juan@email.com | +549... | Sí |
| BAR_002 | Carlos | carlos@email.com | +549... | Sí |

#### 2. **Servicios** (sheet name: "Servicios")

| id | nombre | descripcion | precio | duracion_minutos | imagen_url | activo |
|--|--|--|--|--|--|--|
| SER_001 | Corte Clásico | Corte tradicional | 500 | 30 | url | Sí |
| SER_002 | Barba | Afeitado y arreglo | 300 | 20 | url | Sí |

#### 3. **Horarios** (sheet name: "Horarios")

| id | barbero_id | dia_semana | hora_inicio | hora_fin | activo |
|--|--|--|--|--|--|
| HOR_001 | BAR_001 | 0 | 08:00 | 18:00 | Sí |
| HOR_002 | BAR_001 | 1 | 08:00 | 18:00 | Sí |

**Días semana:** 0=Lunes, 1=Martes, ..., 6=Domingo

#### 4. **Reservas** (sheet name: "Reservas")

| id | cliente_nombre | cliente_email | cliente_telefono | barbero_id | servicio_id | fecha | hora | notas | estado | fecha_creacion | google_calendar_event_id |
|--|--|--|--|--|--|--|--|--|--|--|--|
| RES_001 | Pedro | pedro@mail.com | +549... | BAR_001 | SER_001 | 2024-12-15 | 09:00 | Sin notas | confirmed | 2024-01-01T10:00:00 | cal_id |

---

## ⚙️ Variables de Entorno

### Backend (.env)

```env
# Google
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-email@tu-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
GOOGLE_SPREADSHEET_ID=tu-id-aqui
GOOGLE_CALENDAR_ID=tu-email@gmail.com

# Twilio
TWILIO_ACCOUNT_SID=tu-sid
TWILIO_AUTH_TOKEN=tu-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

# Mode
DEBUG=True
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🚀 Ejecución

### Terminal 1: Backend

```bash
cd backend
python main.py
```

El servidor estará en `http://localhost:8000`

### Terminal 2: Frontend

```bash
npm run dev
```

El frontend estará en `http://localhost:5173`

---

## 🔒 Validaciones

El sistema incluye:

✅ Validación de emails
✅ Validación de teléfonos (formato +549XXXXXXXXX)
✅ Validación de fechas (no pasadas)
✅ Validación de disponibilidad en tiempo real
✅ Evitar reservas duplicadas
✅ Sincronización automática con Google Calendar
✅ Confirmación automática por WhatsApp

---

## 🐛 Troubleshooting

### Error: "Google Sheets API not enabled"
- Ir a GCP Console → APIs & Services → Enable Google Sheets API

### Error: "Credentials not found"
- Verificar que `credentials.json` está en la carpeta `/backend`
- Usar ruta absoluta en `.env` si es necesario

### Error: "Twilio authentication failed"
- Verificar Account SID y Auth Token en .env
- Asegurarse que el número WhatsApp está correctamente configurado

### Error: "Calendar events not syncing"
- Compartir Google Calendar con el email del Service Account
- Verificar permisos de escritura

---

## 📝 Notas Importantes

1. **Google Sheets IDs:** Encontrar en la URL: `https://docs.google.com/spreadsheets/d/AQUI_ESTA_EL_ID`

2. **Zona Horaria:** Cambiar en `google_calendar_client.py` si no es Argentina

3. **Validación de Teléfono:** Actualmente acepta formato argentino. Modificar regex en `ReservaForm.jsx` según necesidad

4. **WhatsApp Sandbox:** En desarrollo, se usa Twilio WhatsApp Sandbox. En producción, usar número verificado

5. **CORS:** El backend está configurado para aceptar requests del frontend en localhost

---

## 🎯 Próximas Features (Opcionales)

- Panel de administración para gestionar reservas
- Recordatorios automáticos 24 horas antes
- Integración con más plataformas de pago
- Sistema de calificaciones
- Backups automáticos en Google Drive
