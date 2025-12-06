# 🔄 Flujo del Sistema de Reservas

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USUARIO FINAL (Cliente)                          │
│                                                                          │
│  Accede a: http://localhost:5173 (o producción)                        │
└──────────────┬──────────────────────────────────────────────────────────┘
               │
               ▼
        ┌──────────────────────┐
        │   React Frontend     │
        │  (Vite, React 18)   │
        │                      │
        │ - ReservaForm       │
        │ - Catalogo          │
        │ - MisReservas       │
        └──────────┬───────────┘
                   │
                   │ API Calls (HTTP/JSON)
                   │
                   ▼
        ┌──────────────────────┐
        │  FastAPI Backend     │
        │  (Python 3.8+)       │
        │                      │
        │ - Validación        │
        │ - Lógica de negocio │
        │ - Integraciones     │
        └──────────┬───────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
    ┌────────┐ ┌──────────┐ ┌──────────┐
    │ Google │ │ Google   │ │ Twilio   │
    │ Sheets │ │ Calendar │ │ WhatsApp │
    └────────┘ └──────────┘ └──────────┘
```

---

## 🔀 Flujo de Creación de Reserva

```
1. CLIENTE INGRESA FORMULARIO
   │
   ├─ Nombre, Email, Teléfono
   ├─ Selecciona Barbero (desde Google Sheets)
   ├─ Selecciona Servicio (desde Google Sheets)
   └─ Selecciona Fecha y Hora
        │
        ▼
2. VALIDAR DISPONIBILIDAD
   │
   ├─ Backend obtiene horarios del barbero (Sheets)
   ├─ Backend consulta Google Calendar
   ├─ Verifica que no hay conflicto
   └─ Retorna slots disponibles al frontend
        │
        ▼
3. USUARIO SELECCIONA SLOT
   │
   ├─ Frontend muestra horarios disponibles
   └─ Cliente elige hora
        │
        ▼
4. CREAR RESERVA
   │
   ├─ Frontend envía POST /api/reservas/
   │
   ├─ Backend:
   │   ├─ Valida todos los datos
   │   ├─ Verifica disponibilidad final
   │   ├─ Crea evento en Google Calendar
   │   ├─ Escribe en Google Sheets ("Reservas")
   │   └─ Envía WhatsApp de confirmación
   │
   └─ Frontend muestra confirmación
        │
        ▼
5. CONFIRMACIÓN AUTOMÁTICA
   │
   ├─ Cliente recibe WhatsApp: "Tu reserva está confirmada"
   ├─ Evento aparece en Google Calendar
   └─ Registro guardado en Google Sheets
```

---

## 📱 Flujo de Búsqueda de Disponibilidad

```
USUARIO SELECCIONA:
Barbero: "Juan" (BAR_001)
Servicio: "Corte Clásico" (SER_001)
Fecha: 2024-12-15
  │
  ▼
BACKEND:
1. Obtiene duración del servicio de Sheets: 30 minutos
2. Obtiene horarios del barbero:
   - DÍA 0 (Lunes): 08:00-18:00
   - DÍA 1 (Martes): 08:00-18:00
   - etc...
3. Calcula qué día es 2024-12-15 (por ej: Martes = DÍA 1)
4. Obtiene horarios aplicables (08:00-18:00)
5. Genera slots cada 30 min:
   - 08:00, 08:30, 09:00, 09:30, ... 17:30
6. Para cada slot, consulta Google Calendar:
   - ¿Hay evento 08:00-08:30? NO
   - ¿Hay evento 08:30-09:00? NO
   - ¿Hay evento 09:00-09:30? SÍ (OVERBOOKING!)
   - etc...
7. Filtra solo slots disponibles
  │
  ▼
RESPUESTA AL FRONTEND:
[
  {fecha: "2024-12-15", hora: "08:00"},
  {fecha: "2024-12-15", hora: "08:30"},
  {fecha: "2024-12-15", hora: "10:00"},
  ...
]
```

---

## 🔄 Sincronización Google Services

### Google Sheets - Lectura

```
BARBEROS (Hoja)
├─ ID: BAR_001
├─ NOMBRE: Juan
├─ EMAIL: juan@barberia.com
└─ TELEFONO: +5491234567890

SERVICIOS (Hoja)
├─ ID: SER_001
├─ NOMBRE: Corte Clásico
├─ DESCRIPCION: Corte tradicional
├─ PRECIO: 500
└─ DURACION_MINUTOS: 30

HORARIOS (Hoja)
├─ ID: HOR_001
├─ BARBERO_ID: BAR_001
├─ DIA_SEMANA: 0 (Lunes)
├─ HORA_INICIO: 08:00
└─ HORA_FIN: 18:00

┌─ Backend lee con gspread library
└─ Convierte a Pydantic models
   └─ Retorna como JSON a frontend
```

### Google Calendar - Escritura

```
1. Cliente crea reserva
   │
   └─ Backend crea evento:
      {
        "summary": "[Juan] Corte Clásico",
        "description": "Cliente: Pedro",
        "start": {"dateTime": "2024-12-15T09:00:00"},
        "end": {"dateTime": "2024-12-15T09:30:00"},
        "attendees": [{"email": "pedro@gmail.com"}]
      }
   │
   ▼
2. Google Calendar genera:
   - Event ID: "abc123xyz"
   - Sincronización en Google Calendar visible
   - Confirmación de asistencia enviada al cliente
   │
   ▼
3. Backend guarda Event ID en Google Sheets (Reservas)
   - google_calendar_event_id: "abc123xyz"
```

### Google Calendar - Lectura

```
Cuando validamos disponibilidad:

1. Backend consulta eventos en rango:
   - Fecha: 2024-12-15
   - Hora: 08:00 a 18:00
   │
   ▼
2. Google Calendar devuelve eventos:
   [
     {start: "09:00", end: "09:30", summary: "[Juan] Corte"},
     {start: "10:00", end: "10:20", summary: "[Juan] Barba"}
   ]
   │
   ▼
3. Backend filtra slots disponibles:
   - 08:00: ✓ Disponible
   - 08:30: ✓ Disponible
   - 09:00: ✗ Ocupado (evento Corte)
   - 09:30: ✓ Disponible (termina el evento anterior)
   - 10:00: ✗ Ocupado (evento Barba)
   ...
```

---

## 💬 Flujo de Notificaciones WhatsApp

```
1. RESERVA CREADA
   │
   └─ Backend obtiene:
      - cliente_nombre: "Pedro"
      - cliente_telefono: "+5491234567890"
      - barbero_nombre: "Juan"
      - servicio_nombre: "Corte Clásico"
      - fecha: "2024-12-15"
      - hora: "09:00"
   │
   ▼
2. TWILIO CLIENT ENVIA MENSAJE
   │
   ├─ from: "whatsapp:+1234567890" (tu número Twilio)
   ├─ to: "whatsapp:+5491234567890" (cliente)
   └─ body: "¡Hola Pedro! Tu reserva ha sido confirmada... [detalles]"
   │
   ▼
3. CLIENTE RECIBE
   │
   └─ WhatsApp Notification (push)
      "¡Hola Pedro! Tu reserva ha sido confirmada..."

MENSAJES AUTOMÁTICOS:
- Confirmación: Inmediato
- Recordatorio: 24 horas antes (opcional)
- Cancelación: Inmediato si cancela
```

---

## 🗂️ Flujo de Datos (Ejemplo Completo)

```
┌─────────────────────────────────────────────────────────────┐
│ USUARIO VISITA http://localhost:5173/reservar              │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: ReservaForm                                       │
│ - useEffect → cargar catálogo                              │
│   GET /api/catalogo                                        │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ BACKEND: /api/catalogo                                     │
│ 1. Leer Google Sheets "Barberos"                          │
│ 2. Leer Google Sheets "Servicios"                         │
│ 3. Convertir a JSON                                        │
│ 4. Retornar al frontend                                    │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: Mostrar selectores                                │
│ - Dropdown de barberos (del catálogo)                      │
│ - Dropdown de servicios (del catálogo)                     │
│ - Input de fecha (date picker)                             │
└─────────────────────────────────────────────────────────────┘
             │
   USUARIO SELECCIONA:
   - Barbero: "Juan" (BAR_001)
   - Servicio: "Corte" (SER_001)
   - Fecha: 2024-12-15
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: Click "Ver Horarios Disponibles"                │
│ GET /api/disponibilidad/slots/BAR_001/SER_001             │
│     ?fecha_inicio=2024-12-15&dias=1                        │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ BACKEND: /api/disponibilidad/slots/...                     │
│ 1. Leer Google Sheets "Servicios" → duracion = 30 min      │
│ 2. Leer Google Sheets "Horarios"                           │
│    → Barbero BAR_001, Día Martes: 08:00-18:00             │
│ 3. Generar slots: 08:00, 08:30, 09:00, ...                │
│ 4. Para cada slot:                                         │
│    - Consultar Google Calendar                            │
│    - ¿Hay evento ese horario?                             │
│ 5. Retornar solo slots disponibles                        │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: Mostrar horarios                                  │
│ Buttons: [08:00] [08:30] [09:00] [09:30] ...              │
└─────────────────────────────────────────────────────────────┘
             │
   USUARIO SELECCIONA: 09:00
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: Completar formulario                              │
│ - Nombre: "Pedro"                                          │
│ - Email: "pedro@gmail.com"                                │
│ - Teléfono: "+5491234567890"                              │
│ - Barbero: "Juan" (BAR_001)                               │
│ - Servicio: "Corte" (SER_001)                             │
│ - Fecha: "2024-12-15"                                     │
│ - Hora: "09:00"                                           │
│ - Notas: (opcional)                                       │
└─────────────────────────────────────────────────────────────┘
             │
   USUARIO HACE CLICK: "Confirmar Reserva"
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: POST /api/reservas/                              │
│ {                                                           │
│   "cliente_nombre": "Pedro",                              │
│   "cliente_email": "pedro@gmail.com",                     │
│   "cliente_telefono": "+5491234567890",                   │
│   "barbero_id": "BAR_001",                                │
│   "servicio_id": "SER_001",                               │
│   "fecha": "2024-12-15",                                  │
│   "hora": "09:00",                                        │
│   "notas": ""                                             │
│ }                                                          │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ BACKEND: create_reservation service                         │
│                                                             │
│ 1. VALIDAR DISPONIBILIDAD                                 │
│    - Verificar que 2024-12-15 09:00-09:30 está libre      │
│    - Verificar horario del barbero                        │
│                                                             │
│ 2. CREAR EVENTO EN GOOGLE CALENDAR                         │
│    - summary: "[Juan] Corte Clásico"                      │
│    - start: 2024-12-15T09:00:00                           │
│    - end: 2024-12-15T09:30:00                             │
│    - attendees: [pedro@gmail.com]                         │
│    - event_id = "abc123xyz"                               │
│                                                             │
│ 3. GENERAR ID ÚNICO                                        │
│    - reserva_id = "RES_001"                               │
│                                                             │
│ 4. GUARDAR EN GOOGLE SHEETS "Reservas"                    │
│    - Agregar fila con todos los datos                     │
│    - Incluir google_calendar_event_id                     │
│                                                             │
│ 5. ENVIAR WHATSAPP                                         │
│    - Twilio.send_message()                                │
│    - "¡Hola Pedro! Tu reserva confirmada..."              │
│                                                             │
│ 6. RETORNAR AL FRONTEND                                    │
│    - Objeto Reserva completo                              │
│    - status: 200 OK                                       │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND: Mostrar confirmación                              │
│ "✓ ¡Reserva creada exitosamente!"                         │
│ "Te enviaremos un WhatsApp de confirmación"               │
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ CLIENTE RECIBE WHATSAPP                                     │
│ "¡Hola Pedro! Tu reserva ha sido confirmada ✅             │
│  📋 Detalles:                                              │
│  - Barbero: Juan                                          │
│  - Servicio: Corte Clásico                                │
│  - Fecha: 2024-12-15                                      │
│  - Hora: 09:00                                            │
│  ¡Te esperamos! 💈"                                        │
└─────────────────────────────────────────────────────────────┘

Y ADICIONALMENTE:

┌─────────────────────────────────────────────────────────────┐
│ GOOGLE CALENDAR                                             │
│ Evento creado: "[Juan] Corte Clásico"                      │
│ - Fecha: 2024-12-15                                        │
│ - Hora: 09:00 - 09:30                                      │
│ - Asistente: pedro@gmail.com (confirmado)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ GOOGLE SHEETS "Reservas"                                   │
│ Nueva fila agregada:                                        │
│ RES_001 │ Pedro │ pedro@gmail.com │ +5491234567890 │ ...   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida de una Reserva

```
PENDIENTE (pending)
    ↓
    └─→ Cliente confirma → CONFIRMADA (confirmed)
                              ↓
                    ┌─────────┴──────────┐
                    │                    │
              Se completa            Cliente cancela
                    │                    │
                    ↓                    ↓
              COMPLETADA            CANCELADA
             (completed)            (cancelled)
                                        │
                                        └─→ Evento eliminado
                                            de Google Calendar
                                            WhatsApp enviado
```

---

Este flujo asegura que:
✅ No hay duplicados
✅ No hay overbooking
✅ Todo está sincronizado
✅ Cliente está siempre notificado
✅ Datos en tiempo real
