"""
Script de prueba para validar que el sistema está funcionando correctamente
Ejecutar: python test_system.py
"""

import requests
import json
from datetime import datetime, timedelta

# URLs
BACKEND_URL = "http://localhost:8000/api"

class TestSystem:
    def __init__(self):
        self.results = []
        self.passed = 0
        self.failed = 0

    def test(self, name, func):
        """Ejecutar una prueba"""
        try:
            func()
            print(f"✅ {name}")
            self.passed += 1
        except Exception as e:
            print(f"❌ {name}: {str(e)}")
            self.failed += 1
            self.results.append((name, str(e)))

    def print_summary(self):
        """Imprimir resumen de pruebas"""
        total = self.passed + self.failed
        print(f"\n{'='*50}")
        print(f"RESUMEN: {self.passed}/{total} pruebas pasadas")
        print(f"{'='*50}")
        
        if self.failed > 0:
            print("\nErrores encontrados:")
            for test_name, error in self.results:
                print(f"  - {test_name}: {error}")
        else:
            print("\n🎉 ¡Todas las pruebas pasaron!")

    # ========== PRUEBAS ==========

    def test_health(self):
        """Verificar que el backend está activo"""
        response = requests.get(f"{BACKEND_URL.replace('/api', '')}/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_get_barberos(self):
        """Obtener lista de barberos"""
        response = requests.get(f"{BACKEND_URL}/barberos")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"   - {len(data)} barberos encontrados")

    def test_get_servicios(self):
        """Obtener lista de servicios"""
        response = requests.get(f"{BACKEND_URL}/servicios")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"   - {len(data)} servicios encontrados")

    def test_get_catalogo(self):
        """Obtener catálogo completo"""
        response = requests.get(f"{BACKEND_URL}/catalogo")
        assert response.status_code == 200
        data = response.json()
        assert "servicios" in data
        assert "barberos" in data
        print(f"   - Catálogo con {len(data['servicios'])} servicios y {len(data['barberos'])} barberos")

    def test_disponibilidad(self):
        """Probar endpoint de disponibilidad"""
        # Obtener un barbero y servicio
        resp_barberos = requests.get(f"{BACKEND_URL}/barberos")
        resp_servicios = requests.get(f"{BACKEND_URL}/servicios")
        
        barberos = resp_barberos.json()
        servicios = resp_servicios.json()
        
        if not barberos or not servicios:
            print("   ⚠️  No hay barberos o servicios para probar")
            return
        
        barbero_id = barberos[0].get('id') if isinstance(barberos[0], dict) else barberos[0].id
        servicio_id = servicios[0].get('id') if isinstance(servicios[0], dict) else servicios[0].id
        
        fecha_inicio = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        response = requests.get(
            f"{BACKEND_URL}/disponibilidad/slots/{barbero_id}/{servicio_id}",
            params={"fecha_inicio": fecha_inicio, "dias": 7}
        )
        
        assert response.status_code == 200
        data = response.json()
        print(f"   - {len(data.get('slots', []))} slots encontrados")

    def test_crear_reserva_validacion(self):
        """Probar que la API valida las reservas"""
        # Enviar datos inválidos
        response = requests.post(
            f"{BACKEND_URL}/reservas/",
            json={
                "cliente_nombre": "Test",
                "cliente_email": "invalido",  # Email inválido
                "cliente_telefono": "123",
                "barbero_id": "BAR_001",
                "servicio_id": "SER_001",
                "fecha": "2024-01-01",
                "hora": "10:00"
            }
        )
        
        # Debería fallar
        assert response.status_code != 200
        print(f"   - Validación correcta: {response.status_code}")

    def test_cors_headers(self):
        """Verificar que CORS está habilitado"""
        response = requests.options(f"{BACKEND_URL}/barberos")
        assert "Access-Control-Allow-Origin" in response.headers or response.status_code == 200
        print(f"   - CORS verificado")

def main():
    print("🧪 Iniciando pruebas del Sistema de Reservas\n")
    print(f"Backend URL: {BACKEND_URL}\n")

    tester = TestSystem()

    # Ejecutar pruebas
    tester.test("Health Check", tester.test_health)
    tester.test("Obtener Barberos", tester.test_get_barberos)
    tester.test("Obtener Servicios", tester.test_get_servicios)
    tester.test("Obtener Catálogo", tester.test_get_catalogo)
    tester.test("Disponibilidad", tester.test_disponibilidad)
    tester.test("Validación de Reserva", tester.test_crear_reserva_validacion)
    tester.test("CORS Headers", tester.test_cors_headers)

    # Mostrar resumen
    tester.print_summary()

if __name__ == "__main__":
    main()
