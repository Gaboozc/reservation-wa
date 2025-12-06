/**
 * Hook personalizado para manejar datos de catálogo
 */
import { useState, useEffect } from 'react';
import api from '../services/api';

export function useCatalogo() {
  const [catalogo, setCatalogo] = useState({
    servicios: [],
    barberos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        setLoading(true);
        const data = await api.getCatalogo();
        setCatalogo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogo();
  }, []);

  return { catalogo, loading, error };
}

/**
 * Hook para obtener disponibilidad
 */
export function useDisponibilidad(barberoId, servicioId, fechaInicio, dias = 7) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!barberoId || !servicioId || !fechaInicio) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);
        const data = await api.getSlotsDiponibles(
          barberoId,
          servicioId,
          fechaInicio,
          dias
        );
        setSlots(data.slots || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [barberoId, servicioId, fechaInicio, dias]);

  return { slots, loading, error };
}

/**
 * Hook para crear reserva
 */
export function useCrearReserva() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [reserva, setReserva] = useState(null);

  const crearReserva = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const resultado = await api.crearReserva(data);
      setReserva(resultado);
      setSuccess(true);
      return resultado;
    } catch (err) {
      setError(err.message);
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { crearReserva, loading, error, success, reserva };
}
