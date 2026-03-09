import { useEffect, useRef, useState } from "react";
import { colors } from "../../styles/tokens";
import { useChat } from "../../hooks/useChat";
import { getConversacion } from "../../api/service"; 
import { getToday } from "../../utils/helpers";
import Topbar from "../layout/Topbar";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

export default function ChatView({ user, convId, setConvId, onConvUpdate }) {
  const chat = useChat(user);
  const bottomRef = useRef(null);
  const [inputVal, setInputVal] = useState("");

  // Init / reload when convId changes
  useEffect(() => {
    const load = async () => {
      if (!convId) {
        chat.initChat(null, []);
        return;
      }
      const data = await getConversacion(convId).catch(() => null);
      const msgs = (data?.mensajes || []).map(m => ({
        role: m.rol,
        text: m.contenido,
        time: m.hora || "",
      }));
      chat.initChat(convId, msgs);
      if (data?.estado) { /* status synced inside hook */ }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.loading]);

  const handleSend = async () => {
    await chat.sendMessage(inputVal);
    setInputVal("");
    onConvUpdate?.();
    if (chat.convId && chat.convId !== convId) setConvId(chat.convId);
  };

  return (
    <>
      <Topbar
        title={convId ? `Conversación #${convId}` : "Nueva conversación"}
        subtitle={getToday()}
        convStatus={chat.convStatus}
        onEndConversation={chat.endConversation}
        user={user}
      />

      {/* Messages area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}>
        {chat.messages.length === 0 && (
          <EmptyState />
        )}

        {chat.messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {chat.loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={inputVal}
        onChange={setInputVal}
        onSend={handleSend}
        disabled={chat.loading || chat.convStatus === "cerrada"}
        error={chat.inputError}
        onClearError={chat.clearError}
      />
    </>
  );
}

function EmptyState() {
  const suggestions = [
    "¿Cómo registro una empresa para prácticas?",
    "¿Qué documentos necesito para las prácticas?",
    "¿Cómo se evalúa al estudiante en prácticas?",
    "¿Cuál es el proceso de seguimiento?",
  ];
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      padding: "40px 20px",
      animation: "fadeIn 0.4s ease",
    }}>
      <div style={{ fontSize: "48px", opacity: 0.5 }}>🎓</div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>Asistente de Prácticas Académicas</p>
        <p style={{ fontSize: "13px", color: colors.muted, maxWidth: "320px", lineHeight: 1.6 }}>
          Hazme una pregunta sobre el proceso de prácticas. Tengo información detallada sobre empresas, seguimiento y evaluaciones.
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "480px" }}>
        {suggestions.map(s => (
          <div key={s} style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "20px",
            padding: "7px 14px",
            fontSize: "12px",
            color: colors.mutedLight,
            cursor: "default",
          }}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
