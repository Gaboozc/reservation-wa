"""
Rutas para disponibilidad y horarios
"""
from fastapi import APIRouter, HTTPException
from app.services.availability_service import get_availability_service
from app.utils.google_sheets_client import get_sheets_client

router = APIRouter(prefix="/api/disponibilidad", tags=["disponibilidad"])
availability_service = get_availability_service()
sheets = get_sheets_client()

@router.get("/slots/{barbero_id}/{servicio_id}")
async def obtener_slots_disponibles(barbero_id: str, servicio_id: str, fecha_inicio: str, dias: int = 7):
    """Obtiene slots disponibles para un barbero y servicio"""
    slots = availability_service.get_available_slots(
        barbero_id=barbero_id,
        servicio_id=servicio_id,
        fecha_inicio=fecha_inicio,
        dias=dias
    )
    return {"slots": slots}

@router.get("/validar/{barbero_id}/{servicio_id}/{fecha}/{hora}")
async def validar_slot(barbero_id: str, servicio_id: str, fecha: str, hora: str):
    """Valida si un slot específico está disponible"""
    es_valido, mensaje = availability_service.validate_slot(
        barbero_id=barbero_id,
        servicio_id=servicio_id,
        fecha=fecha,
        hora=hora
    )
    return {
        "disponible": es_valido,
        "mensaje": mensaje
    }

@router.get("/horarios/{barbero_id}")
async def obtener_horarios_barbero(barbero_id: str):
    """Obtiene los horarios laborales de un barbero"""
    try:
        horarios = sheets.get_sheet_data("Horarios")
        horarios_barbero = [h for h in horarios if h.get('barbero_id') == barbero_id]
        return {"horarios": horarios_barbero}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
