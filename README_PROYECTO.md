# 💈 Sistema Web Completo de Reservas Automatizadas

Sistema profesional para barberías, salones, clínicas y negocios de servicios con reserva online, sincronización con Google Calendar, notificaciones WhatsApp y panel administrativo.

## ✨ Características Principales

✅ **Reserva Online Inteligente**
- Selección de barbero, servicio, fecha y hora
- Disponibilidad en tiempo real
- Validación automática de conflictos

✅ **Sincronización Google Services**
- Integración con Google Calendar
- Lectura/escritura en Google Sheets
- Catálogo editable desde hojas de cálculo

✅ **Notificaciones WhatsApp**
- Confirmación automática de reservas
- Recordatorios 24 horas antes
- Notificación de cancelaciones

✅ **Catálogo Dinámico**
- Servicios y precios desde Google Sheets
- Imágenes y descripciones
- Equipo de barberos visible

✅ **Administración Flexible**
- Todo manejable desde Google Sheets
- Sin base de datos compleja
- Fácil mantenimiento

## 🛠️ Stack Tecnológico

**Frontend:**
- React 18 + Vite
- React Router
- Fetch API
- CSS3 Responsive

**Backend:**
- FastAPI
- Python 3.8+
- Google APIs (Sheets, Calendar)
- Twilio WhatsApp

**Base de Datos:**
- Google Sheets (principal)
- Google Calendar (eventos)
- (Opcional) Supabase

## 📂 Estructura del Proyecto

```
sistema-reservas/
├── backend/                  # API FastAPI
│   ├── app/
│   │   ├── models/          # Esquemas Pydantic
│   │   ├── routes/          # Endpoints API
│   │   ├── services/        # Lógica de negocio
│   │   └── utils/           # Integraciones (Google, Twilio)
│   ├── config/
│   ├── main.py              # Aplicación principal
│   ├── requirements.txt
│   └── .env
│
├── src/                      # Frontend React
│   ├── components/          # Componentes reutilizables
│   ├── pages/               # Páginas
│   ├── hooks/               # Custom hooks
│   ├── services/            # Cliente API
│   └── routes.jsx           # Rutas
│
├── docs/
│   ├── README_SISTEMA_RESERVAS.md
│   ├── SETUP_SHEETS.md
│   ├── QUICK_START.md
│   └── DEPLOYMENT.md
│
└── README.md (este archivo)
```

## 🚀 Quick Start

### 1. Instalación Rápida

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Frontend
npm install
```

### 2. Configuración Google

1. Google Cloud Console → Crear proyecto
2. Habilitar APIs: Sheets, Calendar
3. Service Account → JSON credentials
4. Compartir Sheets y Calendar con Service Account

### 3. Variables de Entorno

**Backend** (`.env`):
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
GOOGLE_SPREADSHEET_ID=...
GOOGLE_CALENDAR_ID=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+...
DEBUG=True
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Ejecutar

```bash
# Terminal 1: Backend
cd backend
python main.py

# Terminal 2: Frontend
npm run dev
```

Acceder a: `http://localhost:5173`

## 📖 Documentación

- **[QUICK_START.md](./QUICK_START.md)** - Instalación rápida en 5 pasos
- **[README_SISTEMA_RESERVAS.md](./README_SISTEMA_RESERVAS.md)** - Documentación completa
- **[SETUP_SHEETS.md](./SETUP_SHEETS.md)** - Configuración de Google Sheets
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía de deployment a producción

## 📡 API Endpoints

### Reservas
```
POST   /api/reservas              Crear reserva
GET    /api/reservas/{id}         Obtener reserva
GET    /api/reservas/barbero/{id} Reservas por barbero
DELETE /api/reservas/{id}         Cancelar reserva
```

### Disponibilidad
```
GET    /api/disponibilidad/slots/{barbero_id}/{servicio_id}
GET    /api/disponibilidad/validar/{barbero_id}/{servicio_id}/{fecha}/{hora}
```

### Catálogo
```
GET    /api/barberos
GET    /api/servicios
GET    /api/catalogo
```

## 🎨 Componentes React

### ReservaForm
Formulario completo de reserva con:
- Validación de datos
- Carga de slots disponibles
- Selección de hora
- Confirmación automática

### Catalogo
Muestra:
- Todos los servicios con imágenes
- Equipo de barberos
- Precios dinámicos

### MisReservas
Visor de reservas del cliente:
- Búsqueda por email
- Estados de reserva
- Opción de cancelación

## 🔐 Seguridad

✅ Validación con Pydantic
✅ CORS configurado
✅ Variables de entorno para secretos
✅ Encriptación de credenciales Google
✅ Validación de teléfono y email

## 📊 Google Sheets Setup

Requerido crear 4 hojas:

1. **Barberos** - ID, nombre, email, teléfono
2. **Servicios** - ID, nombre, precio, duración
3. **Horarios** - ID, barbero, día, horario
4. **Reservas** - Se llena automáticamente

Ver [SETUP_SHEETS.md](./SETUP_SHEETS.md) para detalles completos.

## 🧪 Testing

```bash
cd backend
pip install requests
python test_system.py
```

## 🌐 Deployment

Recomendado:
- **Frontend:** Vercel
- **Backend:** Railway o Render
- **Credenciales:** GitHub Secrets

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

## 📱 Responsive Design

✅ Mobile-first approach
✅ Tablets (768px)
✅ Desktops (1024px+)
✅ Optimizado para dispositivos pequeños

## ♿ Accesibilidad

- Etiquetas HTML semánticas
- Labels vinculados a inputs
- Contraste de colores WCAG AA
- Navegación por teclado

## 🚀 Performance

- Lazy loading de imágenes
- Minimización automática (Vite)
- Code splitting
- Caché de respuestas API
- Optimización de bundle

## 🐛 Troubleshooting Común

**Error: "Credentials not found"**
→ Verificar path de `credentials.json`

**Error: CORS**
→ Actualizar `FRONTEND_URL` en `.env`

**Error: WhatsApp no envía**
→ Verificar Twilio credentials y formato de teléfono

**Error: Google Sheets vacío**
→ Compartir Sheet con Service Account

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - Ver archivo LICENSE

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias:
- Crear issue en GitHub
- Enviar email de soporte
- Revisar documentación en /docs

---

**⭐ Si este proyecto te fue útil, por favor da una estrella en GitHub**

**Desarrollado con ❤️ para simplificar la gestión de reservas**
