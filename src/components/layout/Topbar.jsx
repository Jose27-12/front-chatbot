import { colors } from "../../styles/tokens";
import Tag from "../ui/Tag";
import Button from "../ui/Button";

export default function Topbar({ title, subtitle, convStatus, onEndConversation, user, rightSlot }) {
  return (
    <header
      style={{
        padding: "13px 24px",
        borderBottom: `1px solid ${colors.border}`,
        background: colors.surface,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
        flexShrink: 0,
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, fontSize: "15px" }}>{title}</span>
          {convStatus && (
            <Tag color={convStatus === "cerrada" ? colors.muted : "#10b981"}>
              {convStatus === "cerrada" ? "⏹ Cerrada" : "🟢 Activa"}
            </Tag>
          )}
        </div>
        {subtitle && (
          <div style={{ fontSize: "11px", color: colors.muted, marginTop: "2px" }}>{subtitle}</div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {convStatus && convStatus !== "cerrada" && onEndConversation && (
          <Button variant="danger" size="sm" onClick={onEndConversation}>
            ⏹ Finalizar conversación
          </Button>
        )}
        {rightSlot}
        {user && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "9px",
            padding: "6px 12px",
            fontSize: "12px",
            color: colors.mutedLight,
          }}>
            <span>👤</span> {user.nombre}
          </div>
        )}
      </div>
    </header>
  );
}
