import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useCarrito } from '../hooks/useCarrito';
import Carrito from './Carrito';
import './Catalogo.css';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { carrito, agregarProducto } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await api.getCatalogoProductos();
        setProductos(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <div className="catalogo-loading">Cargando catálogo...</div>;
  }

  if (error) {
    return <div className="catalogo-error">Error: {error}</div>;
  }

  if (mostrarCarrito) {
    return <Carrito onVolver={() => setMostrarCarrito(false)} />;
  }

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <h2>Catálogo de Productos</h2>
        <p>Artículos disponibles en tienda</p>
        {carrito.length > 0 && (
          <button 
            className="btn-carrito-badge"
            onClick={() => setMostrarCarrito(true)}
          >
            🛒 Carrito ({carrito.length})
          </button>
        )}
      </div>

      <section className="catalogo-section">
        <h3>Productos</h3>
        <div className="servicios-grid">
          {productos.map(producto => (
            <div key={producto.id} className="servicio-card">
              {producto.imagen_url && (
                <img src={producto.imagen_url} alt={producto.nombre} />
              )}
              <div className="servicio-content">
                <h4>{producto.nombre}</h4>
                {producto.descripcion && (
                  <p className="descripcion">{producto.descripcion}</p>
                )}
                <div className="servicio-footer">
                  <span className="precio">${producto.precio}</span>
                  <button
                    className="btn-agregar-carrito"
                    onClick={() => agregarProducto(producto)}
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
