import { useRef } from "react";
import { colors } from "../../styles/tokens";

export default function ChatInput({ value, onChange, onSend, disabled, error, onClearError }) {
  const taRef = useRef(null);

  const autoResize = (el) => {
    el.style.height = "44px";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div style={{
      padding: "14px 24px",
      borderTop: `1px solid ${colors.border}`,
      background: colors.surface,
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      flexShrink: 0,
    }}>
      {/* Error */}
      {error && (
        <div style={{ fontSize: "11px", color: colors.danger, paddingLeft: "2px" }}>
          ⚠ {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
        <textarea
          ref={taRef}
          value={value}
          disabled={disabled}
          rows={1}
          placeholder={
            disabled
              ? "Conversación cerrada. Inicia una nueva →"
              : "Escribe tu pregunta sobre prácticas académicas... (Enter para enviar)"
          }
          onChange={e => {
            onChange(e.target.value);
            autoResize(e.target);
            if (error) onClearError();
          }}
          onKeyDown={handleKey}
          style={{
            flex: 1,
            background: colors.card,
            border: `1px solid ${error ? colors.danger : colors.border}`,
            borderRadius: "11px",
            color: colors.text,
            fontSize: "14px",
            padding: "11px 14px",
            resize: "none",
            outline: "none",
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.5,
            maxHeight: "120px",
            minHeight: "44px",
            transition: "border-color 0.2s",
            opacity: disabled ? 0.5 : 1,
          }}
          onFocus={e => { e.target.style.borderColor = error ? colors.danger : "rgba(59,130,246,0.5)"; }}
          onBlur={e  => { e.target.style.borderColor = error ? colors.danger : colors.border; }}
        />

        {/* Send */}
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          style={{
            background: disabled || !value.trim()
              ? colors.border
              : "linear-gradient(135deg, #3b82f6, #06b6d4)",
            border: "none",
            borderRadius: "11px",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: disabled || !value.trim() ? "not-allowed" : "pointer",
            flexShrink: 0,
            transition: "all 0.18s",
          }}
          onMouseEnter={e => { if (!disabled && value.trim()) e.currentTarget.style.filter = "brightness(1.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      <div style={{ fontSize: "10px", color: colors.muted, paddingLeft: "2px" }}>
        Enter para enviar · Shift+Enter para nueva línea
      </div>
    </div>
  );
}
