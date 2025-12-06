"""
Aplicación principal de FastAPI
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import FRONTEND_URL, DEBUG
from app.routes import reservations, availability, catalog

app = FastAPI(
    title="Sistema de Reservas API",
    description="API para gestión de reservas de barberías/salones",
    version="1.0.0",
    debug=DEBUG
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(reservations.router)
app.include_router(availability.router)
app.include_router(catalog.router)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "Sistema de Reservas API funcionando",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    """Verificar estado de la API"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=DEBUG
    )
