# 🚀 Guía de Deployment - Sistema de Reservas

## Opciones de Deployment

### Opción 1: Vercel (Frontend) + Railway/Render (Backend) ⭐ RECOMENDADO

#### Frontend en Vercel

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Configurar variables de entorno:**
```bash
vercel env add VITE_API_URL
# Ingresar: https://tu-backend.example.com/api
```

3. **Deploy:**
```bash
vercel --prod
```

#### Backend en Railway

1. Ir a [railway.app](https://railway.app)
2. Conectar repositorio GitHub
3. Seleccionar rama a deploying
4. Railway detectará Python automáticamente
5. Agregar variables de entorno:
   - Copiar del `.env` local
   - Incluir credenciales de Google y Twilio

**Archivos necesarios:**
- `Procfile`:
```
web: gunicorn -w 4 -b 0.0.0.0:$PORT main:app
```

- `requirements.txt` (ya existe)

**Comando de start:**
```
python main.py
```

6. Deploy automático desde Git

---

### Opción 2: Render (Frontend + Backend)

#### Crear aplicación Backend

1. Ir a [render.com](https://render.com)
2. Nuevo "Web Service"
3. Conectar repositorio GitHub
4. Configurar:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python main.py`
   - **Environment:** Python 3.9+

5. Agregar variables de entorno
6. Deploy

#### Crear aplicación Frontend

1. Nuevo "Static Site"
2. Conectar repositorio
3. Configurar:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. Configurar variable:
   - `VITE_API_URL=https://tu-backend-render.onrender.com/api`

---

### Opción 3: Heroku (Deprecated pero aún funciona)

#### Backend

1. Crear cuenta en [heroku.com](https://heroku.com)
2. Instalar Heroku CLI
3. En carpeta backend:

```bash
heroku login
heroku create nombre-app-backend
git push heroku main
heroku config:set GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
```

4. Cargar credenciales:
```bash
heroku config:set GOOGLE_SERVICE_ACCOUNT_EMAIL="..."
# ... resto de variables
```

#### Frontend

```bash
npm run build
# Deploy a tu servicio de hosting (Netlify, Vercel, etc)
```

---

### Opción 4: Docker + Servidor VPS (AWS, DigitalOcean, etc)

#### Dockerfile (Backend)

```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]
```

#### Docker Compose

```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GOOGLE_SERVICE_ACCOUNT_EMAIL=${GOOGLE_SERVICE_ACCOUNT_EMAIL}
      - GOOGLE_SERVICE_ACCOUNT_KEY_FILE=credentials.json
      - GOOGLE_SPREADSHEET_ID=${GOOGLE_SPREADSHEET_ID}
      - GOOGLE_CALENDAR_ID=${GOOGLE_CALENDAR_ID}
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
      - TWILIO_WHATSAPP_NUMBER=${TWILIO_WHATSAPP_NUMBER}
      - DEBUG=False
    volumes:
      - ./backend/credentials.json:/app/credentials.json
```

Ejecutar:
```bash
docker-compose up -d
```

---

## ✅ Checklist Pre-Deployment

### Backend
- [ ] Cambiar `DEBUG=False` en `.env`
- [ ] Validar todas las credenciales Google
- [ ] Validar credenciales Twilio
- [ ] Probar con `test_system.py`
- [ ] Verificar zona horaria
- [ ] Usar base de datos persistente (si aplica)

### Frontend
- [ ] Actualizar `VITE_API_URL` a URL de producción
- [ ] Verificar que no hay console.log() innecesarios
- [ ] Probar en navegadores diferentes
- [ ] Optimizar imágenes
- [ ] Minificar código (Vite lo hace automáticamente)

### Google Services
- [ ] Service Account tiene permisos correctos
- [ ] Google Sheet compartido con Service Account
- [ ] Google Calendar compartido con Service Account
- [ ] Credenciales JSON seguras (no commitear)

### Twilio
- [ ] Número WhatsApp verificado
- [ ] Account SID y Token correctos
- [ ] Prueba de envío exitosa

---

## 🔒 Seguridad en Producción

1. **Variables de Entorno:**
   - Nunca commitear `.env` o `credentials.json`
   - Usar archivos `.env.example`
   - Usar secrets manager (Heroku, Railway, etc)

2. **CORS:**
   ```python
   allow_origins=["https://tu-dominio.com"]  # Especificar dominio
   ```

3. **HTTPS:**
   - Todos los servicios deben usar HTTPS
   - Certificados SSL gratuitos con Let's Encrypt

4. **Rate Limiting:**
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   ```

5. **Validación de Input:**
   - Ya implementada con Pydantic
   - Continuar validando en frontend

6. **Logs y Monitoring:**
   - Configurar logging en producción
   - Usar Sentry para error tracking

---

## 📊 Monitoreo en Producción

### Herramientas Recomendadas

1. **Error Tracking:** Sentry
2. **Uptime Monitoring:** UptimeRobot
3. **Analytics:** Google Analytics
4. **Performance:** New Relic
5. **Logs:** LogRocket

---

## 📝 Variables de Entorno Finales

### Backend Producción

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=prod-email@proyecto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=/run/secrets/credentials.json
GOOGLE_SPREADSHEET_ID=prod-id-aqui
GOOGLE_CALENDAR_ID=prod-email@gmail.com

TWILIO_ACCOUNT_SID=prod-sid
TWILIO_AUTH_TOKEN=prod-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+prodnum

BACKEND_URL=https://tu-backend.example.com
FRONTEND_URL=https://tu-frontend.example.com

DEBUG=False
```

### Frontend Producción

```env
VITE_API_URL=https://tu-backend.example.com/api
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Tests
        run: |
          cd backend
          pip install -r requirements.txt
          python test_system.py

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g railway
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 🆘 Troubleshooting en Producción

**Error: "Google Sheets API not found"**
- Verificar que Google APIs están habilitadas en proyecto

**Error: "CORS error"**
- Actualizar `allow_origins` en `main.py`
- Verificar que URL del frontend es correcta

**Error: "Twilio authentication failed"**
- Verificar variables de entorno
- Asegurarse que credenciales no tienen espacios

**Error: "Database connection error"**
- Verificar credenciales de BD
- Verificar que BD es accesible desde el servidor

---

## 📞 Soporte Post-Deployment

Mantener contacto para:
- Actualizaciones de dependencias
- Parches de seguridad
- Monitoreo de performance
- Backup de datos (Google Sheets)
