import { useState, useEffect, useCallback } from 'react';

const CARRITO_KEY = 'carrito_tienda';

/**
 * Hook para gestionar el carrito de compras
 */
export function useCarrito() {
  const [carrito, setCarrito] = useState([]);
  const [cargado, setCargado] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem(CARRITO_KEY);
    if (carritoGuardado) {
      try {
        const parsed = JSON.parse(carritoGuardado);
        setCarrito(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Error cargando carrito:', e);
        setCarrito([]);
      }
    }
    setCargado(true);
  }, []);

  // Guardar carrito en localStorage cuando cambia (solo si está cargado)
  useEffect(() => {
    if (cargado) {
      localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    }
  }, [carrito, cargado]);

  const agregarProducto = useCallback((producto) => {
    if (!producto || !producto.id) {
      console.error('Producto inválido:', producto);
      return;
    }

    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (productoExistente) {
        // Si ya existe, aumentar cantidad
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        // Agregar nuevo producto con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  }, []);

  const removerProducto = useCallback((productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter(item => item.id !== productoId)
    );
  }, []);

  const actualizarCantidad = useCallback((productoId, cantidad) => {
    const num = parseInt(cantidad) || 0;
    if (num <= 0) {
      removerProducto(productoId);
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.map(item =>
          item.id === productoId
            ? { ...item, cantidad: num }
            : item
        )
      );
    }
  }, [removerProducto]);

  const obtenerTotal = useCallback(() => {
    return carrito.reduce((total, item) => {
      const precio = parseFloat(item.precio) || 0;
      const cantidad = parseInt(item.cantidad) || 1;
      return total + (precio * cantidad);
    }, 0);
  }, [carrito]);

  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  const generarMensajeWhatsApp = useCallback((nombreCliente = '') => {
    if (!carrito || carrito.length === 0) return '';

    let mensaje = '¡Hola! Me gustaría hacer un pedido:\n\n';
    
    carrito.forEach(item => {
      const cantidad = parseInt(item.cantidad) || 1;
      const precio = parseFloat(item.precio) || 0;
      const subtotal = (precio * cantidad).toFixed(2);
      mensaje += `• ${item.nombre} x${cantidad} - $${subtotal}\n`;
    });

    const total = obtenerTotal();
    mensaje += `\n*Total: $${total.toFixed(2)}*`;
    
    if (nombreCliente) {
      mensaje += `\n\nNombre: ${nombreCliente}`;
    }

    return mensaje;
  }, [carrito, obtenerTotal]);

  const generarLinkWhatsApp = useCallback((numeroWhatsApp, nombreCliente = '') => {
    const mensaje = generarMensajeWhatsApp(nombreCliente);
    const mensajeEncodificado = encodeURIComponent(mensaje);
    return `https://wa.me/${numeroWhatsApp}?text=${mensajeEncodificado}`;
  }, [generarMensajeWhatsApp]);

  return {
    carrito,
    agregarProducto,
    removerProducto,
    actualizarCantidad,
    limpiarCarrito,
    obtenerTotal,
    generarMensajeWhatsApp,
    generarLinkWhatsApp,
    cargado,
  };
}
