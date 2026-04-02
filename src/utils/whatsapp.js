const WHATSAPP_PHONE = "523531027315";

export function getWhatsAppLink(asunto) {
  const mensaje = encodeURIComponent(`Hola ProfeGüero, me interesa: ${asunto}`);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${mensaje}`;
}
