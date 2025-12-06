import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './MisReservas.css';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todas'); // todas, proximas, pasadas, canceladas
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    // En un caso real, obtendríamos de una base de datos
    // Por ahora es solo un placeholder
    setLoading(false);
  }, []);

  const filtrarReservas = () => {
    if (!searchEmail) return reservas;
    return reservas.filter(r => r.cliente_email.toLowerCase().includes(searchEmail.toLowerCase()));
  };

  const reservasFiltradas = filtrarReservas();

  return (
    <div className="mis-reservas-container">
      <div className="mis-reservas-header">
        <h2>Mis Reservas</h2>
        <p>Gestiona tus citas agendadas</p>
      </div>

      <div className="mis-reservas-filters">
        <input
          type="email"
          placeholder="Buscar por email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="filter-input"
        />
      </div>

      {loading && <div className="mis-reservas-loading">Cargando reservas...</div>}

      {error && <div className="mis-reservas-error">Error: {error}</div>}

      {!loading && reservasFiltradas.length === 0 && (
        <div className="mis-reservas-empty">
          <p>No hay reservas encontradas</p>
          <p className="empty-subtitle">Crea una nueva reserva para que aparezca aquí</p>
        </div>
      )}

      {!loading && reservasFiltradas.length > 0 && (
        <div className="mis-reservas-list">
          {reservasFiltradas.map((reserva) => (
            <div key={reserva.id} className={`reserva-card ${reserva.estado}`}>
              <div className="reserva-header">
                <div className="reserva-info">
                  <h3>{reserva.cliente_nombre}</h3>
                  <span className={`estado-badge ${reserva.estado}`}>{reserva.estado}</span>
                </div>
                <div className="reserva-datetime">
                  <p className="fecha">{reserva.fecha}</p>
                  <p className="hora">{reserva.hora}</p>
                </div>
              </div>

              <div className="reserva-details">
                <p><strong>Email:</strong> {reserva.cliente_email}</p>
                <p><strong>Teléfono:</strong> {reserva.cliente_telefono}</p>
                <p><strong>Barbero:</strong> {reserva.barbero_id}</p>
                <p><strong>Servicio(s):</strong> {typeof reserva.servicio_id === 'string' ? reserva.servicio_id : reserva.servicio_id?.join(', ')}</p>
                {reserva.notas && <p><strong>Notas:</strong> {reserva.notas}</p>}
              </div>

              <div className="reserva-actions">
                {reserva.estado !== 'cancelled' && (
                  <button className="btn-cancelar">Cancelar Reserva</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
