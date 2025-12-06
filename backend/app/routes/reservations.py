"""
Rutas para gestión de reservas
"""
from fastapi import APIRouter, HTTPException
from app.models.models import ReservaCreate, Reserva
from app.services.reservation_service import get_reservation_service

router = APIRouter(prefix="/api/reservas", tags=["reservas"])
reservation_service = get_reservation_service()

@router.post("/")
async def crear_reserva(reserva_data: ReservaCreate):
    """Crea una nueva reserva"""
    success, reserva, mensaje = reservation_service.create_reservation(reserva_data)
    if not success:
        raise HTTPException(status_code=400, detail=mensaje)
    
    return {
        "success": True,
        "mensaje": mensaje,
        "reserva": reserva,
        "whatsapp_link": reserva.whatsapp_link if hasattr(reserva, 'whatsapp_link') else None
    }

@router.get("/{reserva_id}", response_model=Reserva)
async def obtener_reserva(reserva_id: str):
    """Obtiene una reserva por ID"""
    reserva = reservation_service.get_reservation(reserva_id)
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva

@router.get("/barbero/{barbero_id}")
async def obtener_reservas_barbero(barbero_id: str):
    """Obtiene todas las reservas de un barbero"""
    reservas = reservation_service.get_reservations_by_barbero(barbero_id)
    return {"total": len(reservas), "reservas": reservas}

@router.get("/fecha/{fecha}")
async def obtener_reservas_fecha(fecha: str):
    """Obtiene todas las reservas de una fecha"""
    reservas = reservation_service.get_reservations_by_date(fecha)
    return {"total": len(reservas), "reservas": reservas}

@router.delete("/{reserva_id}")
async def cancelar_reserva(reserva_id: str):
    """Cancela una reserva"""
    success, mensaje = reservation_service.cancel_reservation(reserva_id)
    if not success:
        raise HTTPException(status_code=400, detail=mensaje)

@router.get("/debug/reservas-sheet")
async def debug_reservas_sheet():
    """Debug: Muestra todas las reservas en la hoja"""
    from app.utils.google_sheets_client import get_sheets_client
    sheets = get_sheets_client()
    reservas = sheets.get_sheet_data("Reservas")
    return {"total": len(reservas), "reservas": reservas}
    return {"mensaje": mensaje}
