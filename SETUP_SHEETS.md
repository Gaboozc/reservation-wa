# Guía para configurar Google Sheets

## 📋 Paso 1: Crear Google Sheet

1. Ir a [Google Sheets](https://docs.google.com/spreadsheets/)
2. Crear nuevo documento
3. Renombrarlo: "Sistema Reservas" (o como prefieras)
4. **Copiar el ID de la URL** y guardar en `.env` → `GOOGLE_SPREADSHEET_ID`

Ejemplo de URL:
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit
                                        ^^^^^^^^^^^
                                    COPIAR ESTO
```

## 📊 Paso 2: Crear las Hojas

Eliminar la hoja por defecto y crear estas 4 hojas:

### 1️⃣ Hoja: "Barberos"

Encabezados (Fila 1):
```
id | nombre | email | telefono | activo
```

Ejemplo de datos (Fila 2+):
```
BAR_001 | Juan Pérez | juan@barberia.com | +5491234567890 | Sí
BAR_002 | Carlos López | carlos@barberia.com | +5491987654321 | Sí
BAR_003 | Miguel García | miguel@barberia.com | +5491111111111 | Sí
```

### 2️⃣ Hoja: "Servicios"

Encabezados (Fila 1):
```
id | nombre | descripcion | precio | duracion_minutos | imagen_url | activo
```

Ejemplo de datos (Fila 2+):
```
SER_001 | Corte Clásico | Corte tradicional línea | 500 | 30 | https://... | Sí
SER_002 | Barba Completa | Afeitado y arreglo de barba | 300 | 20 | https://... | Sí
SER_003 | Corte + Barba | Combo corte y barba | 750 | 45 | https://... | Sí
SER_004 | Peinado Especial | Peinado con productos | 400 | 30 | https://... | Sí
```

### 3️⃣ Hoja: "Horarios"

Encabezados (Fila 1):
```
id | barbero_id | dia_semana | hora_inicio | hora_fin | activo
```

**Días semana:** 0=Lunes, 1=Martes, 2=Miércoles, 3=Jueves, 4=Viernes, 5=Sábado, 6=Domingo

Ejemplo de datos (Fila 2+):
```
HOR_001 | BAR_001 | 0 | 08:00 | 18:00 | Sí
HOR_002 | BAR_001 | 1 | 08:00 | 18:00 | Sí
HOR_003 | BAR_001 | 2 | 08:00 | 18:00 | Sí
HOR_004 | BAR_001 | 3 | 08:00 | 18:00 | Sí
HOR_005 | BAR_001 | 4 | 08:00 | 20:00 | Sí
HOR_006 | BAR_001 | 5 | 09:00 | 17:00 | Sí
HOR_007 | BAR_002 | 0 | 09:00 | 19:00 | Sí
HOR_008 | BAR_002 | 1 | 09:00 | 19:00 | Sí
HOR_009 | BAR_002 | 2 | 09:00 | 19:00 | Sí
HOR_010 | BAR_002 | 3 | 09:00 | 19:00 | Sí
HOR_011 | BAR_002 | 4 | 09:00 | 21:00 | Sí
HOR_012 | BAR_002 | 5 | 10:00 | 18:00 | Sí
```

### 4️⃣ Hoja: "Reservas"

Encabezados (Fila 1):
```
id | cliente_nombre | cliente_email | cliente_telefono | barbero_id | servicio_id | fecha | hora | notas | estado | fecha_creacion | google_calendar_event_id
```

**Esta hoja se llena automáticamente.** No agregar datos manualmente inicialmente.

Ejemplo de cómo se verá después de crear reservas:
```
RES_001 | Juan Cliente | juan.cliente@gmail.com | +5491234567890 | BAR_001 | SER_001 | 2024-12-15 | 09:00 | Sin notas | confirmed | 2024-12-01T10:30:00 | event123
RES_002 | María Pérez | maria@gmail.com | +5491987654321 | BAR_002 | SER_002 | 2024-12-15 | 10:00 | Afeitar barba larga | confirmed | 2024-12-01T10:35:00 | event124
```

---

## 🔑 Paso 3: Compartir con Service Account

1. Copiar el email del Service Account del archivo `credentials.json`:
   ```
   tu-nombre@tu-proyecto.iam.gserviceaccount.com
   ```

2. En Google Sheet, click en **Compartir** (esquina superior derecha)

3. Pegar el email y dar permisos de **Editor**

4. **No marcar "Notificar"**

---

## 📅 Paso 4: Configurar Google Calendar

1. Ir a [Google Calendar](https://calendar.google.com/)

2. Crear nuevo calendario:
   - Click en el "+" al lado de "Otros calendarios"
   - Nombre: "Reservas Barbería"
   - Descripción: "Calendario de reservas automático"

3. Copiar el **Calendar ID**:
   - Settings del calendario → Información general → ID del calendario
   - Formato: `tu-email@gmail.com` o algo como `c_abc123xyz@group.calendar.google.com`

4. Compartir con Service Account:
   - En Settings del calendario → Compartir con personas
   - Agregar email del Service Account con permisos de **Realizar cambios**

5. Guardar en `.env` → `GOOGLE_CALENDAR_ID`

---

## ⚙️ Paso 5: Actualizar .env

Archivo `/backend/.env`:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-email@tu-proyecto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
GOOGLE_SPREADSHEET_ID=1ABC123XYZ...
GOOGLE_CALENDAR_ID=tu-email@gmail.com

TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=authtoken
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DEBUG=True
```

---

## ✅ Validación

Para verificar que todo está bien:

1. El sistema puede **leer** datos de Sheets ✓
2. El sistema puede **escribir** en Reservas ✓
3. Los eventos aparecen en Google Calendar ✓
4. Los mensajes WhatsApp se envían ✓

Prueba creando una reserva desde el frontend.

---

## 💡 Tips Importantes

### Formato de Teléfono
- **Aceptado:** +5491234567890 (con código país)
- **Aceptado:** 91234567890 (sin +54)
- **No acepta:** 1234567890 (sin 9)

### Formato de Fechas
- Todas las fechas en: `YYYY-MM-DD`
- Todas las horas en: `HH:MM` (24h)

### Imagen URLs
- Usar URLs públicas (HTTPS)
- Ejemplo: https://images.unsplash.com/photo-...

### Estados de Reserva
- `pending` = Pendiente confirmación
- `confirmed` = Confirmada
- `completed` = Completada
- `cancelled` = Cancelada

---

## 🐛 Troubleshooting

**P: Las reservas no aparecen en Sheets**
R: Verificar que la hoja "Reservas" existe y tiene los headers correctos

**P: Google Calendar no se sincroniza**
R: Compartir el calendario con el email del Service Account

**P: Error de permisos al escribir**
R: El Service Account necesita permisos de "Editor" en el Sheet

**P: Las imágenes no cargan**
R: Asegurarse que son URLs públicas (HTTPS) y accesibles

---

## 📞 Soporte

Si tienes problemas, verifica:
1. Los IDs en `.env` son correctos
2. El Service Account está compartido
3. El Calendar está compartido
4. Los headers de las hojas son exactos
