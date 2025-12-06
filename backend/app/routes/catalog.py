"""
Rutas para catálogo, barberos y servicios
"""
from fastapi import APIRouter, HTTPException
from app.models.models import Barbero, Servicio, Catalogo, CatalogoItem
from app.utils.google_sheets_client import get_sheets_client

router = APIRouter(prefix="/api", tags=["datos"])
sheets = get_sheets_client()

@router.get("/barberos", response_model=list[Barbero])
async def obtener_barberos():
    """Obtiene todos los barberos activos"""
    try:
        barberos_data = sheets.get_sheet_data("Barberos")
        return [Barbero(**b) for b in barberos_data if b.get('activo', 'TRUE').upper() == 'TRUE']
    except Exception as e:
        print(f"Error en /barberos: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/barberos/{barbero_id}", response_model=Barbero)
async def obtener_barbero(barbero_id: str):
    """Obtiene un barbero por ID"""
    try:
        barbero = sheets.search_record("Barberos", "id", barbero_id)
        if not barbero:
            raise HTTPException(status_code=404, detail="Barbero no encontrado")
        return Barbero(**barbero)
    except Exception as e:
        print(f"Error en /barberos/{barbero_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/servicios", response_model=list[Servicio])
async def obtener_servicios():
    """Obtiene todos los servicios activos"""
    try:
        servicios_data = sheets.get_sheet_data("Servicios")
        return [Servicio(**s) for s in servicios_data if s.get('activo', 'TRUE').upper() == 'TRUE']
    except Exception as e:
        print(f"Error en /servicios: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/servicios/{servicio_id}", response_model=Servicio)
async def obtener_servicio(servicio_id: str):
    """Obtiene un servicio por ID"""
    try:
        servicio = sheets.search_record("Servicios", "id", servicio_id)
        if not servicio:
            raise HTTPException(status_code=404, detail="Servicio no encontrado")
        return Servicio(**servicio)
    except Exception as e:
        print(f"Error en /servicios/{servicio_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/debug/hojas")
async def debug_hojas():
    """Debug: obtiene lista de todas las hojas disponibles"""
    try:
        hojas = [ws.title for ws in sheets.spreadsheet.worksheets()]
        return {"hojas_disponibles": hojas}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/debug/contenido/{hoja_name}")
async def debug_contenido(hoja_name: str):
    """Debug: obtiene el contenido completo de una hoja"""
    try:
        datos = sheets.get_sheet_data(hoja_name)
        return {"hoja": hoja_name, "datos": datos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/catalogo")
async def obtener_catalogo():
    """Obtiene el catálogo completo (servicios + barberos)"""
    try:
        servicios_data = sheets.get_sheet_data("Servicios")
        barberos_data = sheets.get_sheet_data("Barberos")
        
        print(f"Servicios crudos: {servicios_data}")
        print(f"Barberos crudos: {barberos_data}")
        
        servicios = []
        for s in servicios_data:
            try:
                if s.get('activo', 'TRUE').upper() == 'TRUE':
                    item = CatalogoItem(
                        id=s.get('id'),
                        nombre=s.get('nombre'),
                        descripcion=s.get('descripcion', ''),
                        precio=float(s.get('precio', 0)),
                        imagen_url=s.get('imagenURL', '')
                    )
                    servicios.append(item)
            except Exception as e:
                print(f"Error procesando servicio {s}: {e}")
        
        barberos = []
        for b in barberos_data:
            try:
                if b.get('activo', 'TRUE').upper() == 'TRUE':
                    barbero = Barbero(**b)
                    barberos.append(barbero)
            except Exception as e:
                print(f"Error procesando barbero {b}: {e}")
        
        return {"servicios": servicios, "barberos": barberos}
    except Exception as e:
        print(f"Error en /catalogo: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/catalogo/productos", response_model=list[CatalogoItem])
async def obtener_catalogo_productos():
    """Obtiene productos del catálogo (hoja Catalogo) independientes de reservas"""
    try:
        productos_data = sheets.get_sheet_data("Catalogo")
        productos: list[CatalogoItem] = []

        for p in productos_data:
            try:
                if p.get('activo', 'TRUE').upper() == 'TRUE':
                    producto = CatalogoItem(
                        id=p.get('id'),
                        nombre=p.get('nombre'),
                        descripcion=p.get('descripcion', ''),
                        precio=float(p.get('precio', 0) or 0),
                        imagen_url=p.get('imagenURL', '')
                    )
                    productos.append(producto)
            except Exception as e:
                print(f"Error procesando producto {p}: {e}")
        return productos
    except Exception as e:
        print(f"Error en /catalogo/productos: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
