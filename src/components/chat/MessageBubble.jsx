import { colors } from "../../styles/tokens";
import NLPPanel from "./NLPPanel";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className="msg-enter"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        gap: "3px",
      }}
    >
      {/* Sender label */}
      <div style={{ fontSize: "10px", color: colors.muted }}>
        {isUser ? "Tú" : "🤖 Asistente TinyLlama"} · {message.time}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: "74%",
        padding: "12px 16px",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        fontSize: "14px",
        lineHeight: 1.65,
        fontWeight: 300,
        background: isUser
          ? "linear-gradient(135deg, #1e3a5f, #1a3d5c)"
          : colors.card,
        border: isUser
          ? "1px solid rgba(59,130,246,0.2)"
          : `1px solid ${colors.border}`,
        color: isUser ? "#c8d8f8" : colors.text,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {message.text}
        {!isUser && <NLPPanel text={message.text} />}
      </div>
    </div>
  );
}
