/**
 * Cliente API para consumir el backend FastAPI
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Debug logs
console.log('🔗 API_BASE_URL configurado:', API_BASE_URL);
console.log('🔗 VITE_API_URL env var:', import.meta.env.VITE_API_URL);

// Configurar headers por defecto
const defaultHeaders = {
  'Content-Type': 'application/json',
};

class APIClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('🌐 Haciendo request a:', url);
    
    const config = {
      headers: defaultHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Response error:', error);
        throw new Error(error.detail || `Error ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Response data:', data);
      return data;
    } catch (error) {
      console.error(`❌ API Error completo:`, error);
      throw error;
    }
  }

  // ========== BARBEROS ==========
  async getBarberos() {
    return this.request('/barberos');
  }

  async getBarbero(id) {
    return this.request(`/barberos/${id}`);
  }

  // ========== SERVICIOS ==========
  async getServicios() {
    return this.request('/servicios');
  }

  async getServicio(id) {
    return this.request(`/servicios/${id}`);
  }

  // ========== CATÁLOGO ==========
  async getCatalogo() {
    return this.request('/catalogo');
  }

  async getCatalogoProductos() {
    return this.request('/catalogo/productos');
  }

  // ========== DISPONIBILIDAD ==========
  async getSlotsDiponibles(barberoId, servicioId, fechaInicio, dias = 7) {
    return this.request(
      `/disponibilidad/slots/${barberoId}/${servicioId}?fecha_inicio=${fechaInicio}&dias=${dias}`
    );
  }

  async validarSlot(barberoId, servicioId, fecha, hora) {
    return this.request(
      `/disponibilidad/validar/${barberoId}/${servicioId}/${fecha}/${hora}`
    );
  }

  async getHorariosBarbero(barberoId) {
    return this.request(`/disponibilidad/horarios/${barberoId}`);
  }

  // ========== RESERVAS ==========
  async crearReserva(reservaData) {
    return this.request('/reservas/', {
      method: 'POST',
      body: JSON.stringify(reservaData),
    });
  }

  async obtenerReserva(reservaId) {
    return this.request(`/reservas/${reservaId}`);
  }

  async getReservasPorBarbero(barberoId) {
    return this.request(`/reservas/barbero/${barberoId}`);
  }

  async getReservasPorFecha(fecha) {
    return this.request(`/reservas/fecha/${fecha}`);
  }

  async cancelarReserva(reservaId) {
    return this.request(`/reservas/${reservaId}`, {
      method: 'DELETE',
    });
  }
}

export default new APIClient();
