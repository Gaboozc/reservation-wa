"""
WhatsApp redirect link - Sin API, solo redirige a WhatsApp Web
"""
from urllib.parse import quote

class WhatsAppClient:
    def __init__(self):
        """No necesita inicialización, solo genera links"""
        pass

    def generate_whatsapp_link(self,
                               phone_number: str,
                               cliente_nombre: str,
                               barbero_nombre: str,
                               servicio_nombre: str,
                               fecha: str,
                               hora: str) -> str:
        """Genera link de WhatsApp con mensaje pre-llenado"""
        
        message = f"""¡Hola! 👋

Mi reserva ha sido confirmada ✅

📋 Detalles:
- Nombre: {cliente_nombre}
- Barbero: {barbero_nombre}
- Servicio: {servicio_nombre}
- Fecha: {fecha}
- Hora: {hora}

¡Gracias!"""
        
        # Codifica el mensaje para URL
        encoded_message = quote(message)
        
        # Limpia el número (quita caracteres especiales)
        clean_number = phone_number.replace("whatsapp:", "").replace("+", "").replace(" ", "")
        
        # Genera el link de WhatsApp
        whatsapp_link = f"https://wa.me/{clean_number}?text={encoded_message}"
        
        return whatsapp_link

    def send_confirmation(self, 
                          phone_number: str,
                          cliente_nombre: str,
                          barbero_nombre: str,
                          servicio_nombre: str,
                          fecha: str,
                          hora: str) -> bool:
        """Retorna True (no envía, solo genera link)"""
        try:
            link = self.generate_whatsapp_link(
                phone_number, cliente_nombre, barbero_nombre, 
                servicio_nombre, fecha, hora
            )
            print(f"Link WhatsApp generado: {link}")
            return True
        except Exception as e:
            print(f"Error al generar link: {e}")
            return False

    def send_reminder(self, 
                      phone_number: str,
                      cliente_nombre: str,
                      barbero_nombre: str,
                      fecha: str,
                      hora: str) -> bool:
        """Genera link de recordatorio"""
        try:
            message = f"""⏰ Recordatorio

Hola {cliente_nombre},

Te recordamos que tienes una cita:

📍 Barbero: {barbero_nombre}
🕐 Hora: {hora}
📅 Fecha: {fecha}

¡No olvides llegar con anticipación! 💈"""
            
            encoded_message = quote(message)
            clean_number = phone_number.replace("whatsapp:", "").replace("+", "").replace(" ", "")
            whatsapp_link = f"https://wa.me/{clean_number}?text={encoded_message}"
            
            print(f"Link recordatorio: {whatsapp_link}")
            return True
        except Exception as e:
            print(f"Error al generar recordatorio: {e}")
            return False

    def send_cancellation(self,
                          phone_number: str,
                          cliente_nombre: str) -> bool:
        """Genera link de cancelación"""
        try:
            message = f"""Tu reserva ha sido cancelada ❌

Hola {cliente_nombre},

Lamentamos comunicarte que tu reserva ha sido cancelada.

Si deseas agendar una nueva cita, no dudes en contactarnos. 💈"""
            
            encoded_message = quote(message)
            clean_number = phone_number.replace("whatsapp:", "").replace("+", "").replace(" ", "")
            whatsapp_link = f"https://wa.me/{clean_number}?text={encoded_message}"
            
            print(f"Link cancelación: {whatsapp_link}")
            return True
        except Exception as e:
            print(f"Error al generar cancelación: {e}")
            return False

# Singleton instance
_whatsapp_client = None

def get_whatsapp_client():
    global _whatsapp_client
    if _whatsapp_client is None:
        _whatsapp_client = WhatsAppClient()
    return _whatsapp_client
