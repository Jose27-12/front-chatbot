const BASE_URL = "https://api-practicas.onrender.com";

export const endpoints = {
  chat: `${BASE_URL}/chatbot`,
  conversaciones: `${BASE_URL}/conversations`,
  conversacion: (id) => `${BASE_URL}/conversations/${id}`,
  cerrarConv: (id) => `${BASE_URL}/conversations/${id}/close`,

  // 🟢 Activas
  convPorUsuario: (usuario_id) =>
    `${BASE_URL}/conversations?user_id=${usuario_id}`,

  // 🔒 Cerradas (NUEVO)
  convHistorial: (usuario_id) =>
    `${BASE_URL}/conversations/history?user_id=${usuario_id}`,
};