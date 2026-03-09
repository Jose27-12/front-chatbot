import { colors } from "../../styles/tokens";

export default function TypingIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px" }}>
      <div style={{ fontSize: "10px", color: colors.muted }}>🤖 Asistente TinyLlama</div>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px 16px 16px 4px",
        padding: "13px 16px",
      }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: colors.accent,
              display: "block",
              animation: `bounce 1.2s ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
