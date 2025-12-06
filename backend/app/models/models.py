from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# ============ Barbero Model ============
class Barbero(BaseModel):
    id: str
    nombre: str
    fotoURL: Optional[str] = None
    serviciosPermitidos: Optional[str] = None
    horarioInicio: Optional[str] = None
    horarioFin: Optional[str] = None
    diasLaborales: Optional[int | str] = None
    diasDescansoFijos: Optional[int | str] = None
    activo: Optional[str] = "TRUE"
    emailCalendar: Optional[str] = None
    colorCalendar: Optional[str] = None
    localID: Optional[str] = None
    
    class Config:
        from_attributes = True

# ============ Servicio Model ============
class Servicio(BaseModel):
    id: str
    nombre: str
    descripcion: Optional[str] = None
    precio: float
    duracionMin: Optional[int] = None
    categoria: Optional[str] = None
    activo: Optional[str] = "TRUE"
    imagenURL: Optional[str] = None
    
    class Config:
        from_attributes = True

# ============ Horario Model ============
class Horario(BaseModel):
    id: str
    barbero_id: str
    dia_semana: int  # 0=Lunes, 6=Domingo
    hora_inicio: str  # HH:MM
    hora_fin: str     # HH:MM
    activo: bool = True
    
    class Config:
        from_attributes = True

# ============ Reserva Model ============
class ReservaCreate(BaseModel):
    cliente_nombre: str
    cliente_email: str
    cliente_telefono: str
    barbero_id: str
    servicio_id: str | List[str]  # Puede ser un string o lista de strings
    fecha: str  # YYYY-MM-DD
    hora: str   # HH:MM
    metodo_pago: Optional[str] = None
    notas: Optional[str] = None
    
    class Config:
        from_attributes = True

class Reserva(BaseModel):
    id: str
    barbero_id: Optional[str] = None
    idServicio: Optional[str] = None
    fecha: Optional[str] = None
    hora: Optional[str] = None
    clienteNombre: Optional[str] = None
    clienteTelefono: Optional[str] = None
    clienteEmail: Optional[str] = None
    estado: Optional[str] = None
    timestamp: Optional[str] = None
    eventoCalendarID: Optional[str] = None
    notas: Optional[str] = None
    duracion_total: Optional[int] = None
    metodo_pago: Optional[str] = None
    # Alias para compatibilidad
    cliente_nombre: Optional[str] = None
    cliente_email: Optional[str] = None
    cliente_telefono: Optional[str] = None
    servicio_id: Optional[str] = None
    fecha_creacion: Optional[str] = None
    google_calendar_event_id: Optional[str] = None
    whatsapp_link: Optional[str] = None
    
    class Config:
        from_attributes = True
        populate_by_name = True

# ============ Disponibilidad Response ============
class SlotDisponible(BaseModel):
    fecha: str
    hora: str
    barbero_id: str
    
class DisponibilidadResponse(BaseModel):
    barbero_id: str
    servicio_id: str
    slots: List[SlotDisponible]

# ============ Catálogo Response ============
class CatalogoItem(BaseModel):
    id: str
    nombre: str
    descripcion: Optional[str]
    precio: float
    imagen_url: Optional[str]

class Catalogo(BaseModel):
    servicios: List[CatalogoItem]
    barberos: List[Barbero]
