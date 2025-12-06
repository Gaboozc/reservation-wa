import React, { useState } from 'react';
import { useCarrito } from '../hooks/useCarrito';
import './Carrito.css';

export default function Carrito({ onVolver }) {
  const { 
    carrito, 
    removerProducto, 
    actualizarCantidad, 
    obtenerTotal, 
    generarLinkWhatsApp,
    limpiarCarrito,
    cargado
  } = useCarrito();
  
  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    metodoPago: '',
    notas: '',
    aceptaTerminos: false,
  });
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');
  
  const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER || '+52563713563';

  if (!cargado) {
    return <div className="carrito-loading">Cargando carrito...</div>;
  }

  if (carrito.length === 0) {
    return (
      <div className="carrito-container">
        <div className="carrito-header">
          <button className="btn-volver" onClick={onVolver}>← Volver</button>
          <h2>Mi Carrito</h2>
        </div>
        <div className="carrito-vacio">
          <p>Tu carrito está vacío</p>
          <button className="btn-continuar" onClick={onVolver}>Continuar comprando</button>
        </div>
      </div>
    );
  }

  const total = obtenerTotal();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorValidacion('');
  };

  const validarFormulario = () => {
    if (!formulario.nombre.trim()) {
      setErrorValidacion('El nombre es requerido');
      return false;
    }
    if (!formulario.telefono.trim()) {
      setErrorValidacion('El teléfono es requerido');
      return false;
    }
    if (!formulario.correo.trim() || !formulario.correo.includes('@')) {
      setErrorValidacion('Correo válido requerido');
      return false;
    }
    if (!formulario.metodoPago) {
      setErrorValidacion('Selecciona un método de pago');
      return false;
    }
    if (!formulario.aceptaTerminos) {
      setErrorValidacion('Debes aceptar los términos y condiciones');
      return false;
    }
    return true;
  };

  const handleCheckout = () => {
    if (!validarFormulario()) {
      return;
    }

    // Generar mensaje con toda la información
    let mensaje = '¡Hola! Quiero hacer un pedido:\n\n';
    
    carrito.forEach(item => {
      const cantidad = parseInt(item.cantidad) || 1;
      const precio = parseFloat(item.precio) || 0;
      const subtotal = (precio * cantidad).toFixed(2);
      mensaje += `• ${item.nombre} x${cantidad} - $${subtotal}\n`;
    });

    mensaje += `\n*Total: $${total.toFixed(2)}*\n\n`;
    mensaje += `*Datos del cliente:*\n`;
    mensaje += `Nombre: ${formulario.nombre}\n`;
    mensaje += `Teléfono: ${formulario.telefono}\n`;
    mensaje += `Correo: ${formulario.correo}\n`;
    mensaje += `Método de pago: ${formulario.metodoPago}\n`;
    
    if (formulario.notas) {
      mensaje += `Notas: ${formulario.notas}\n`;
    }

    const mensajeEncodificado = encodeURIComponent(mensaje);
    window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensajeEncodificado}`;
    limpiarCarrito();
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <button className="btn-volver" onClick={onVolver}>← Volver</button>
        <h2>Mi Carrito</h2>
      </div>

      <div className="carrito-contenido">
        <div className="carrito-items">
          <h3>Productos</h3>
          {carrito.map(item => (
            <div key={item.id} className="carrito-item">
              <div className="item-info">
                <h4>{item.nombre}</h4>
                <p className="item-precio">${parseFloat(item.precio).toFixed(2)}</p>
              </div>
              
              <div className="item-cantidad">
                <button 
                  onClick={() => actualizarCantidad(item.id, (parseInt(item.cantidad) || 1) - 1)}
                  className="btn-cantidad"
                >
                  −
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={item.cantidad || 1}
                  onChange={(e) => actualizarCantidad(item.id, e.target.value)}
                  className="input-cantidad"
                />
                <button 
                  onClick={() => actualizarCantidad(item.id, (parseInt(item.cantidad) || 1) + 1)}
                  className="btn-cantidad"
                >
                  +
                </button>
              </div>

              <div className="item-subtotal">
                <p className="subtotal">${((parseFloat(item.precio) || 0) * (parseInt(item.cantidad) || 1)).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => removerProducto(item.id)}
                className="btn-eliminar"
                title="Eliminar del carrito"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="carrito-resumen">
          <div className="resumen-total">
            <h3>Total</h3>
            <p className="total-amount">${total.toFixed(2)}</p>
          </div>

          <button 
            className="btn-formulario"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? '← Ocultar Formulario' : 'Continuar → Checkout'}
          </button>

          {mostrarFormulario && (
            <div className="checkout-formulario">
              <h3>Información de Compra</h3>

              {errorValidacion && (
                <div className="error-message">
                  {errorValidacion}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="nombre">Nombre completo *</label>
                <input 
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono WhatsApp *</label>
                <input 
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: 3001234567"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="correo">Correo electrónico *</label>
                <input 
                  type="email"
                  id="correo"
                  name="correo"
                  value={formulario.correo}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="metodoPago">Método de pago *</label>
                <select 
                  id="metodoPago"
                  name="metodoPago"
                  value={formulario.metodoPago}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Selecciona un método</option>
                  <option value="efectivo">Efectivo (en tienda)</option>
                  <option value="tarjeta">Tarjeta (en tienda)</option>
                  <option value="transferencia">Transferencia bancaria</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notas">Notas adicionales</label>
                <textarea 
                  id="notas"
                  name="notas"
                  value={formulario.notas}
                  onChange={handleInputChange}
                  placeholder="Especificaciones o comentarios"
                  className="form-input"
                  rows="3"
                />
              </div>

              <div className="terminos-container">
                <div className="terminos-aviso">
                  <h4>⚠️ Términos y Condiciones</h4>
                  <ul>
                    <li>📅 <strong>Validez:</strong> Tu producto será mantenido por <strong>48 horas</strong> desde la confirmación del pedido.</li>
                    <li>❌ <strong>Expiración:</strong> Pasado este período, la reserva será <strong>cancelada automáticamente</strong> y el producto regresará al inventario.</li>
                    <li>💳 <strong>Reembolsos:</strong> Si pagaste por transferencia bancaria:
                      <ul>
                        <li>Si la reserva es cancelada antes de vencimiento: <strong>100% reembolso</strong></li>
                        <li>Si vence por inactividad: <strong>50% reembolso</strong></li>
                      </ul>
                    </li>
                    <li>💰 <strong>Otros métodos:</strong> Efectivo y tarjeta en tienda no generan reembolso (aplica política de tienda).</li>
                  </ul>
                </div>

                <div className="checkbox-container">
                  <input 
                    type="checkbox"
                    id="aceptaTerminos"
                    name="aceptaTerminos"
                    checked={formulario.aceptaTerminos}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label htmlFor="aceptaTerminos" className="checkbox-label">
                    Acepto los términos y condiciones de compra
                  </label>
                </div>
              </div>

              <button 
                className="btn-checkout"
                onClick={handleCheckout}
              >
                🛒 Enviar Pedido por WhatsApp
              </button>

              <button 
                className="btn-cancelar-formulario"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          )}

          <button 
            className="btn-continuar-compra"
            onClick={onVolver}
          >
            ← Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
