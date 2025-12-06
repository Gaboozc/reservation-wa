# 📑 Índice Completo - Sistema de Reservas

## 📚 DOCUMENTACIÓN

### 🚀 Para Comenzar
1. **[QUICK_START.md](./QUICK_START.md)** ⭐ LEER PRIMERO
   - Instalación en 5 pasos
   - Setup de Google Services
   - Variables de entorno

### 📖 Documentación Técnica
2. **[README_PROYECTO.md](./README_PROYECTO.md)**
   - Visión general del proyecto
   - Stack tecnológico
   - Features principales

3. **[README_SISTEMA_RESERVAS.md](./README_SISTEMA_RESERVAS.md)**
   - Documentación completa
   - API endpoints detallados
   - Todos los modelos
   - Troubleshooting

### 🔧 Configuración
4. **[SETUP_SHEETS.md](./SETUP_SHEETS.md)**
   - Crear Google Sheet paso a paso
   - Estructura de hojas requeridas
   - Ejemplos de datos
   - Cómo compartir

5. **[CONFIG_HELP.md](./CONFIG_HELP.md)**
   - Cómo obtener cada credencial
   - Google Cloud setup
   - Twilio configuration
   - Checklist de configuración

### 🌐 Deployment
6. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Opciones de deployment
   - Vercel + Railway
   - Docker + VPS
   - Monitoreo en producción

### 🔄 Arquitectura
7. **[FLUJO_SISTEMA.md](./FLUJO_SISTEMA.md)**
   - Diagrama de arquitectura
   - Flujo de creación de reserva
   - Sincronización Google Services
   - Flujo de datos completo

### ✅ Implementación
8. **[IMPLEMENTACION_COMPLETADA.md](./IMPLEMENTACION_COMPLETADA.md)**
   - Lista de todo lo implementado
   - Estadísticas del proyecto
   - Próximos pasos recomendados

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
sistema-reservas/
│
├── backend/                    # API FastAPI
│   ├── app/
│   │   ├── models/
│   │   │   └── models.py       # Esquemas Pydantic
│   │   ├── routes/
│   │   │   ├── reservations.py # CRUD reservas
│   │   │   ├── availability.py # Validación
│   │   │   └── catalog.py      # Catálogo
│   │   ├── services/
│   │   │   ├── availability_service.py
│   │   │   └── reservation_service.py
│   │   └── utils/
│   │       ├── google_sheets_client.py
│   │       ├── google_calendar_client.py
│   │       └── whatsapp_client.py
│   ├── config/
│   │   └── settings.py         # Configuración
│   ├── main.py                 # App principal
│   ├── requirements.txt        # Dependencias
│   ├── .env.example            # Template
│   ├── credentials.json        # Google (no subir)
│   └── test_system.py          # Tests
│
├── src/                        # Frontend React
│   ├── components/
│   │   ├── ReservaForm.jsx     # Formulario
│   │   ├── ReservaForm.css
│   │   ├── Catalogo.jsx        # Catálogo
│   │   ├── Catalogo.css
│   │   ├── MisReservas.jsx     # Mis reservas
│   │   ├── MisReservas.css
│   │   ├── Navbar.jsx          # Navegación
│   │   └── Navbar.css
│   ├── services/
│   │   └── api.js              # Cliente API
│   ├── hooks/
│   │   └── useReservation.jsx  # Custom hooks
│   ├── routes.jsx              # Rutas
│   └── ...
│
├── docs/                       # Documentación (este índice)
│   ├── README_PROYECTO.md
│   ├── QUICK_START.md
│   ├── SETUP_SHEETS.md
│   ├── CONFIG_HELP.md
│   ├── DEPLOYMENT.md
│   ├── FLUJO_SISTEMA.md
│   ├── IMPLEMENTACION_COMPLETADA.md
│   └── README.md (este archivo)
│
├── .env                        # Variables (frontend)
├── .gitignore                  # Git exclusions
├── package.json                # Dependencias React
├── vite.config.js              # Config Vite
│
└── README_SISTEMA_RESERVAS.md # Documentación principal
```

---

## 🎯 GUÍAS RÁPIDAS

### ❓ "¿Por dónde empiezo?"
→ Lee [QUICK_START.md](./QUICK_START.md)

### ❓ "¿Cómo configuro Google Sheets?"
→ Ve a [SETUP_SHEETS.md](./SETUP_SHEETS.md)

### ❓ "¿Cómo obtengo credenciales?"
→ Consulta [CONFIG_HELP.md](./CONFIG_HELP.md)

### ❓ "¿Cómo despliego a producción?"
→ Mira [DEPLOYMENT.md](./DEPLOYMENT.md)

### ❓ "¿Cómo funciona el sistema?"
→ Revisa [FLUJO_SISTEMA.md](./FLUJO_SISTEMA.md)

### ❓ "¿Qué se implementó?"
→ Lee [IMPLEMENTACION_COMPLETADA.md](./IMPLEMENTACION_COMPLETADA.md)

### ❓ "¿Cuáles son todos los endpoints?"
→ Consulta [README_SISTEMA_RESERVAS.md](./README_SISTEMA_RESERVAS.md)

---

## ✅ CHECKLIST DE SETUP

### Antes de Empezar (Requisitos)
- [ ] Python 3.8+ instalado
- [ ] Node.js 14+ instalado
- [ ] npm instalado
- [ ] Cuenta Google Cloud
- [ ] Cuenta Twilio

### Instalación
- [ ] Clonar/descargar proyecto
- [ ] Backend: `pip install -r requirements.txt`
- [ ] Frontend: `npm install`
- [ ] Crear venv (opcional pero recomendado)

### Google Cloud Setup
- [ ] Crear Google Cloud Project
- [ ] Habilitar Sheets API
- [ ] Habilitar Calendar API
- [ ] Crear Service Account
- [ ] Descargar credentials.json
- [ ] Copiar a `/backend/credentials.json`

### Google Sheets/Calendar
- [ ] Crear Google Sheet
- [ ] Crear 4 hojas (Barberos, Servicios, Horarios, Reservas)
- [ ] Copiar Sheet ID a `.env`
- [ ] Crear Google Calendar
- [ ] Copiar Calendar ID a `.env`
- [ ] Compartir Sheet con Service Account (Editor)
- [ ] Compartir Calendar con Service Account (Editor)

### Twilio Setup
- [ ] Crear cuenta Twilio
- [ ] Obtener Account SID
- [ ] Obtener Auth Token
- [ ] Habilitar WhatsApp API
- [ ] Obtener número WhatsApp
- [ ] Copiar a `.env`

### Variables de Entorno
- [ ] Llenar `/backend/.env` con todas las credenciales
- [ ] Llenar `/.env` con VITE_API_URL
- [ ] Verificar que no hay errores de syntax

### Pruebas
- [ ] Ejecutar backend: `python main.py`
- [ ] Ejecutar frontend: `npm run dev`
- [ ] Acceder a `http://localhost:5173`
- [ ] Probar formulario de reserva
- [ ] Ejecutar `python test_system.py`

### Ready para Producción
- [ ] Cambiar DEBUG=False
- [ ] Verificar credenciales
- [ ] Hacer backup de Google Sheets
- [ ] Revisar DEPLOYMENT.md
- [ ] Deploy a servidor elegido

---

## 🔑 CREDENCIALES NECESARIAS

### Google Cloud
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
GOOGLE_SPREADSHEET_ID=1ABC123XYZ...
GOOGLE_CALENDAR_ID=tu-email@gmail.com
```

### Twilio
```
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
```

### URLs
```
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 COMANDOS ÚTILES

### Backend

```bash
# Instalar dependencias
cd backend
pip install -r requirements.txt

# Ejecutar servidor
python main.py

# Ejecutar tests
python test_system.py

# Revisar imports
pip freeze
```

### Frontend

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Git

```bash
# Ver cambios
git status

# Commitear
git add .
git commit -m "mensaje"

# Push a GitHub
git push origin main
```

---

## 📊 ENDPOINTS RÁPIDO

### Base URL: `http://localhost:8000/api`

**Reservas:**
- `POST /reservas/` - Crear
- `GET /reservas/{id}` - Obtener
- `GET /reservas/barbero/{id}` - Por barbero
- `DELETE /reservas/{id}` - Cancelar

**Disponibilidad:**
- `GET /disponibilidad/slots/{barbero}/{servicio}`
- `GET /disponibilidad/validar/{barbero}/{servicio}/{fecha}/{hora}`
- `GET /disponibilidad/horarios/{barbero}`

**Catálogo:**
- `GET /barberos` - Todos
- `GET /servicios` - Todos
- `GET /catalogo` - Completo

---

## 🎨 COMPONENTES FRONTEND

### ReservaForm
- Formulario completo con validación
- Carga de slots disponibles
- Confirmación automática
- Path: `/reservar`

### Catalogo
- Muestra servicios e imágenes
- Equipo de barberos
- Precios dinámicos
- Path: `/catalogo`

### MisReservas
- Visor de reservas
- Búsqueda por email
- Estados visuales
- Path: `/mis-reservas`

---

## 🔍 TROUBLESHOOTING COMÚN

| Problema | Solución |
|----------|----------|
| "Module not found" | `pip install -r requirements.txt` |
| CORS error | Verificar FRONTEND_URL en .env |
| Google Sheets vacío | Compartir con Service Account |
| WhatsApp no envía | Verificar credentials Twilio |
| Port already in use | Cambiar puerto en main.py |
| Node modules bloated | `rm -rf node_modules && npm install` |

Ver [README_SISTEMA_RESERVAS.md](./README_SISTEMA_RESERVAS.md) para más soluciones.

---

## 📞 CONTACTO RÁPIDO

- **Google Cloud Help:** `CONFIG_HELP.md`
- **API Documentation:** `README_SISTEMA_RESERVAS.md`
- **Setup Guide:** `QUICK_START.md`
- **Architecture:** `FLUJO_SISTEMA.md`
- **Deployment:** `DEPLOYMENT.md`

---

## ✨ SIGUIENTE PASO

1. **Ahora:** Lee [QUICK_START.md](./QUICK_START.md)
2. **Luego:** Configura credenciales según [CONFIG_HELP.md](./CONFIG_HELP.md)
3. **Después:** Sigue [SETUP_SHEETS.md](./SETUP_SHEETS.md)
4. **Finalmente:** Ejecuta los comandos en [QUICK_START.md](./QUICK_START.md)

---

**Sistema Listo para Usar ✅**
*Desarrollado con ❤️ para simplificar reservas*
