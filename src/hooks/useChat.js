import { useState, useCallback } from "react";
import { sendChatMessage, crearConversacion, cerrarConversacion } from "../api/service";
import { getTime } from "../utils/helpers";

const WELCOME_MSG = (nombre) => ({
  role: "bot",
  text: `¡Hola, ${nombre}! 👋 Soy tu asistente de Prácticas Académicas.\nPuedo ayudarte con registro de empresas, seguimiento de prácticas y evaluaciones finales. ¿En qué te puedo apoyar hoy?`,
  time: getTime(),
});

export function useChat(user) {
  const [messages,   setMessages]   = useState([]);
  const [convId,     setConvId]     = useState(null);
  const [convStatus, setConvStatus] = useState("activa");
  const [loading,    setLoading]    = useState(false);
  const [inputError, setInputError] = useState("");

  /** Initialize a fresh chat session */
  const initChat = useCallback((existingConvId = null, existingMessages = []) => {
    setConvId(existingConvId);
    setConvStatus("activa");
    setInputError("");
    setMessages(
      existingMessages.length > 0
        ? existingMessages
        : [WELCOME_MSG(user?.nombre || "estudiante")]
    );
  }, [user]);

  /** Send a message to TinyLlama */
  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim()) {
      setInputError("Por favor escribe un mensaje antes de enviar.");
      return;
    }
    if (text.trim().length < 3) {
      setInputError("El mensaje es demasiado corto (mínimo 3 caracteres).");
      return;
    }
    if (convStatus === "cerrada") {
      setInputError("Esta conversación está cerrada. Inicia una nueva sesión.");
      return;
    }
    setInputError("");

    // Create conversation on first message
    let activeId = convId;
    if (!activeId) {
      try {
        const data = await crearConversacion({ usuario_id: user.id });
        activeId = data.id || data.conversacion_id;
        setConvId(activeId);
      } catch {
        // continue without convId — API might not require it
      }
    }

    const userMsg = { role: "user", text: text.trim(), time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await sendChatMessage({
        mensaje: text.trim(),
        usuario_id: user?.id,
        conversacion_id: activeId,
      });
      const reply =
        data.respuesta || data.response || data.message ||
        "No se pudo obtener respuesta.";
      setMessages(prev => [...prev, { role: "bot", text: reply, time: getTime() }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Sin conexión con el asistente. Verifica que el servidor esté activo en http://127.0.0.1:8000.",
          time: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [convId, convStatus, user]);

  /** Close/end the current conversation */
  const endConversation = useCallback(async () => {
    if (convId) {
      try { await cerrarConversacion(convId); } catch { /* ignore */ }
    }
    setConvStatus("cerrada");
    setMessages(prev => [
      ...prev,
      {
        role: "bot",
        text: "✅ Conversación finalizada. Tu historial ha sido guardado correctamente. Puedes iniciar una nueva sesión cuando quieras.",
        time: getTime(),
      },
    ]);
  }, [convId]);

  const clearError = () => setInputError("");

  return {
    messages,
    convId,
    convStatus,
    loading,
    inputError,
    initChat,
    sendMessage,
    endConversation,
    clearError,
  };
}
