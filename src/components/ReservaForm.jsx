import React, { useState } from 'react';
import { useCatalogo, useDisponibilidad, useCrearReserva } from '../hooks/useReservation';
import api from '../services/api';
import './ReservaForm.css';

export default function ReservaForm() {
  const { catalogo, loading: catalogoLoading } = useCatalogo();
  const { crearReserva, loading: creandoReserva, error: errorCreacion, success } = useCrearReserva();
  
  // Form state
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    cliente_email: '',
    cliente_telefono: '',
    barbero_id: '',
    servicios: [{ id: '' }],  // Array de servicios, mínimo 1
    fecha: '',
    hora: '',
    metodo_pago: '',
    notas: '',
  });

  const [validacionError, setValidacionError] = useState('');
  const [slotsDisponibles, setSlotsDisponibles] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotSeleccionado, setSlotSeleccionado] = useState(false);
  const [slotsConsultados, setSlotsConsultados] = useState(false);

  // Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setValidacionError('');
    if (name === 'fecha' || name === 'barbero_id') {
      setSlotsDisponibles([]);
      setSlotsConsultados(false);
      setSlotSeleccionado(false);
    }
  };

  // Agregar nuevo input de servicio
  const agregarServicio = () => {
    if (formData.servicios.length < 3) {
      setFormData(prev => ({
        ...prev,
        servicios: [...prev.servicios, { id: '' }],
      }));
    }
  };

  // Eliminar input de servicio
  const eliminarServicio = (index) => {
    if (formData.servicios.length > 1) {
      setFormData(prev => ({
        ...prev,
        servicios: prev.servicios.filter((_, i) => i !== index),
      }));
    }
  };

  // Cambiar servicio en un input específico
  const handleServicioChange = (index, servicioId) => {
    const nuevoServicios = [...formData.servicios];
    nuevoServicios[index] = { id: servicioId };
    setFormData(prev => ({
      ...prev,
      servicios: nuevoServicios,
    }));
    setValidacionError('');
    setSlotsDisponibles([]);
    setSlotsConsultados(false);
    setSlotSeleccionado(false);
  };

  // Cargar slots disponibles cuando se selecciona barbero, servicio y fecha
  const cargarSlots = async () => {
    const serviciosSeleccionados = formData.servicios.filter(s => s.id).map(s => s.id);
    
    if (!formData.barbero_id || serviciosSeleccionados.length === 0 || !formData.fecha) {
      setValidacionError('Selecciona barbero, servicio(s) y fecha primero');
      return;
    }

    try {
      setLoadingSlots(true);
      setSlotsConsultados(true);
      // Usar el primer servicio para buscar slots (la duración total se manejará en el backend)
      const data = await api.getSlotsDiponibles(
        formData.barbero_id,
        serviciosSeleccionados[0],
        formData.fecha,
        1
      );
      setSlotsDisponibles(data.slots || []);
      setSlotSeleccionado(false);
    } catch (err) {
      setValidacionError(`Error cargando slots: ${err.message}`);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Seleccionar hora
  const seleccionarHora = (hora) => {
    setFormData(prev => ({
      ...prev,
      hora,
    }));
    setSlotSeleccionado(true);
  };



  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.cliente_nombre.trim()) {
      setValidacionError('El nombre es requerido');
      return;
    }
    if (!formData.cliente_email.trim() || !formData.cliente_email.includes('@')) {
      setValidacionError('Email válido requerido');
      return;
    }
    if (!formData.cliente_telefono.trim()) {
      setValidacionError('El teléfono es requerido');
      return;
    }
    if (!formData.metodo_pago) {
      setValidacionError('Selecciona un método de pago');
      return;
    }
    
    const serviciosSeleccionados = formData.servicios.filter(s => s.id).map(s => s.id);
    if (!formData.barbero_id || serviciosSeleccionados.length === 0 || !formData.fecha || !formData.hora) {
      setValidacionError('Completa todos los campos de cita');
      return;
    }

    try {
      setValidacionError('');
      const serviciosSeleccionados = formData.servicios.filter(s => s.id).map(s => s.id);
      
      // Validar slot antes de crear
      const validacion = await api.validarSlot(
        formData.barbero_id,
        serviciosSeleccionados[0],
        formData.fecha,
        formData.hora
      );

      if (!validacion.disponible) {
        setValidacionError(validacion.mensaje);
        return;
      }

      // Crear reserva
      const resultado = await crearReserva({
        cliente_nombre: formData.cliente_nombre,
        cliente_email: formData.cliente_email,
        cliente_telefono: formData.cliente_telefono,
        barbero_id: formData.barbero_id,
        servicio_id: serviciosSeleccionados.length === 1 ? serviciosSeleccionados[0] : serviciosSeleccionados,
        fecha: formData.fecha,
        hora: formData.hora,
        metodo_pago: formData.metodo_pago,
        notas: formData.notas,
      });

      // Redirigir a WhatsApp si hay link
      if (resultado && resultado.whatsapp_link) {
        window.location.href = resultado.whatsapp_link;
      }

      // Limpiar formulario si es exitoso
      if (success) {
        setFormData({
          cliente_nombre: '',
          cliente_email: '',
          cliente_telefono: '',
          barbero_id: '',
          servicio_id: '',
          fecha: '',
          hora: '',
          notas: '',
        });
        setSlotsDisponibles([]);
      }
    } catch (err) {
      setValidacionError(err.message);
    }
  };

  if (catalogoLoading) {
    return <div className="reserva-form-loading">Cargando catálogo...</div>;
  }

  const barberoSeleccionado = catalogo.barberos?.find(
    b => b.id === formData.barbero_id
  );

  return (
    <div className="reserva-form-container">
      <div className="reserva-form-header">
        <h2>Agendar Cita</h2>
        <p>Reserva tu cita de forma rápida y segura</p>
      </div>

      <form onSubmit={handleSubmit} className="reserva-form">
        {/* Sección: Datos Personales */}
        <fieldset className="form-section">
          <legend>Datos Personales</legend>
          
          <div className="form-group">
            <label htmlFor="cliente_nombre">Nombre *</label>
            <input
              type="text"
              id="cliente_nombre"
              name="cliente_nombre"
              value={formData.cliente_nombre}
              onChange={handleInputChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cliente_email">Email *</label>
            <input
              type="email"
              id="cliente_email"
              name="cliente_email"
              value={formData.cliente_email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cliente_telefono">Teléfono WhatsApp *</label>
            <input
              type="tel"
              id="cliente_telefono"
              name="cliente_telefono"
              value={formData.cliente_telefono}
              onChange={handleInputChange}
              placeholder="Ingresa tu número"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="metodo_pago">Método de Pago *</label>
            <select
              id="metodo_pago"
              name="metodo_pago"
              value={formData.metodo_pago}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona método de pago</option>
              <option value="efectivo">Efectivo (en tienda)</option>
              <option value="tarjeta">Tarjeta (en tienda)</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
        </fieldset>

        {/* Sección: Servicio */}
        <fieldset className="form-section">
          <legend>Servicio</legend>
          
          {formData.servicios.map((servicio, index) => {
            if (index > 0) return null; // Solo mostrar el primer servicio
            
            const servicioSeleccionado = catalogo.servicios?.find(s => s.id === servicio.id);
            const uniqueKey = `servicio-${index}-${servicio.id || 'empty'}`;
            
            return (
              <div key={uniqueKey} className="form-group">
                <div className="servicio-input-group">
                  <div className="servicio-select-wrapper">
                    <label htmlFor={`servicio_${index}`}>
                      Servicio *
                    </label>
                    <select
                      id={`servicio_${index}`}
                      value={servicio.id}
                      onChange={(e) => handleServicioChange(index, e.target.value)}
                      required={index === 0}
                    >
                      <option value="">Selecciona un servicio</option>
                      {catalogo.servicios && catalogo.servicios.length > 0 ? (
                        catalogo.servicios.map(srv => (
                          <option key={srv.id} value={srv.id}>
                            {srv.nombre} - ${srv.precio}
                          </option>
                        ))
                      ) : (
                        <option disabled>Cargando servicios...</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </fieldset>

        {/* Sección: Barbero */}
        <fieldset className="form-section">
          <legend>Barbero</legend>
          
          <div className="form-group">
            <label htmlFor="barbero_id">Barbero *</label>
            <select
              id="barbero_id"
              name="barbero_id"
              value={formData.barbero_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un barbero</option>
              {catalogo.barberos && catalogo.barberos.length > 0 ? (
                catalogo.barberos.map(barbero => (
                  <option key={barbero.id} value={barbero.id}>
                    {barbero.nombre}
                  </option>
                ))
              ) : (
                <option disabled>Cargando barberos...</option>
              )}
            </select>
          </div>

          {barberoSeleccionado && (
            <div className="barbero-info">
              <p><strong>Barbero:</strong> {barberoSeleccionado.nombre}</p>
            </div>
          )}
        </fieldset>

        {/* Sección: Fecha y Hora */}
        <fieldset className="form-section">
          <legend>Fecha y Hora</legend>
          
          <div className="form-group">
            <label htmlFor="fecha">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <button
            type="button"
            onClick={cargarSlots}
            disabled={loadingSlots || !formData.barbero_id || formData.servicios.filter(s => s.id).length === 0 || !formData.fecha}
            className="btn-cargar-slots"
          >
            {loadingSlots ? 'Cargando horarios...' : 'Ver Horarios Disponibles'}
          </button>

          {slotsDisponibles.length > 0 && (
            <div className="slots-container">
              <p className="slots-title">Horarios disponibles:</p>
              <div className="slots-grid">
                {slotsDisponibles.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => seleccionarHora(slot.hora)}
                    className={`slot-button ${formData.hora === slot.hora ? 'selected' : ''}`}
                  >
                    {slot.hora}
                  </button>
                ))}
              </div>
            </div>
          )}

          {slotsConsultados && slotsDisponibles.length === 0 && formData.fecha && !loadingSlots && (
            <p className="error-text">No hay horarios disponibles para esta fecha</p>
          )}

          {slotSeleccionado && (
            <div className="slot-seleccionado">
              <p>✓ Hora seleccionada: <strong>{formData.hora}</strong></p>
            </div>
          )}
        </fieldset>

        {/* Sección: Notas */}
        <fieldset className="form-section">
          <legend>Notas (Opcional)</legend>
          
          <div className="form-group">
            <label htmlFor="notas">Notas adicionales</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleInputChange}
              placeholder="Cuéntanos algo especial sobre tu corte..."
              rows="4"
            />
          </div>
        </fieldset>

        {/* Errores */}
        {(validacionError || errorCreacion) && (
          <div className="error-message">
            {validacionError || errorCreacion}
          </div>
        )}

        {/* Éxito */}
        {success && (
          <div className="success-message">
            ✓ ¡Reserva creada exitosamente! Te enviaremos un WhatsApp de confirmación
          </div>
        )}

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={creandoReserva}
          className="btn-submit"
        >
          {creandoReserva ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
      </form>
    </div>
  );
}
