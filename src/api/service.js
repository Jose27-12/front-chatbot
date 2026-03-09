import { endpoints } from "./config";

// ─────────────────────────────────────────
// Helper interno para fetch seguro
// ─────────────────────────────────────────
async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}

// ─────────────────────────────────────────
// CHAT
// ─────────────────────────────────────────
export async function sendChatMessage({
  mensaje,
  usuario_id,
  conversacion_id,
}) {
  const res = await fetch(endpoints.chat, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation_id: conversacion_id,
      sender: "user",
      message: mensaje,
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getMensajes(conversation_id) {
  return safeFetch(
    `${endpoints.chat}?conversation_id=${conversation_id}`
  );
}

// ─────────────────────────────────────────
// CONVERSACIONES
// ─────────────────────────────────────────
export async function crearConversacion({ usuario_id }) {
  const res = await fetch(endpoints.conversaciones, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: usuario_id,
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getConversaciones(usuario_id) {
  const data = await safeFetch(
    endpoints.convPorUsuario(usuario_id)
  );

  return Array.isArray(data)
    ? data
    : data?.conversaciones || [];
}

export async function getConversacionesHistory(usuario_id) {
  const data = await safeFetch(
    endpoints.convHistorial(usuario_id)
  );

  return Array.isArray(data)
    ? data
    : data?.conversaciones || [];
}

// 👇 ESTA ES LA QUE NECESITABA TU HistoryView
export async function getConversacionDetail(id) {
  const data = await safeFetch(endpoints.conversacion(id));
  return data || null;
}

// Alias para compatibilidad
export const getConversacion = getConversacionDetail;

export async function cerrarConversacion(id) {
  return safeFetch(endpoints.cerrarConv(id), {
    method: "PUT",
  });
}

// ─────────────────────────────────────────
// REPORTE PDF
// ─────────────────────────────────────────
export async function enviarReporteConversacion({
  conversation_id,
  email,
  pdfBase64,
  resumen,
  keywords,
  sentiment,
}) {
  const res = await fetch(`${endpoints.conversaciones}/${conversation_id}/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      pdf_base64: pdfBase64,
      resumen,
      keywords,
      sentiment,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}