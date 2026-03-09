import { colors } from "../../styles/tokens";
import Button from "../ui/Button";
import { formatDate } from "../../utils/helpers";

export default function Sidebar({ 
  view, 
  setView, 
  convList = [],   // 👈 valor por defecto
  activeConvId, 
  onNewChat, 
  onSelectConv, 
  onLogout, 
  user 
}) {
  return (
    <aside
        className="sidebar"
        style={{
          width: "clamp(220px, 18vw, 272px)",
          maxWidth: "272px",
          minWidth: "220px",
          background: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "all 0.2s ease",
          height: "100vh",
        }}
      >
      {/* Logo */}
      <div style={{ padding: "20px 18px 14px", borderBottom: `1px solid ${colors.border}` }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "17px",
          fontWeight: 800,
          background: "linear-gradient(135deg, #e2e8f0, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.2,
        }}>
          PrácticasAI
        </div>
        <div style={{ fontSize: "10px", color: colors.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
          Gestión Académica · TinyLlama
        </div>
        <Button variant="accent" fullWidth style={{ marginTop: "14px", fontSize: "13px" }} onClick={onNewChat}>
          ✦ Nueva conversación
        </Button>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${colors.border}` }}>
        {[
          { id: "chat",    label: "💬  Chat Asistente" },
          { id: "history", label: "🗂  Historial" },
        ].map(item => (
          <NavBtn key={item.id} active={view === item.id} onClick={() => setView(item.id)}>
            {item.label}
          </NavBtn>
        ))}
      </nav>

      {/* Recent conversations */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
        <div style={{
          fontSize: "10px",
          color: colors.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "8px",
          paddingLeft: "4px",
        }}>
          Recientes
        </div>
        {convList.length === 0 ? (
          <p style={{ fontSize: "12px", color: colors.muted, padding: "6px 4px" }}>Sin conversaciones aún</p>
        ) : (
          convList.slice(0, 20).map((c, i) => (
            <ConvItem
              key={c.id || i}
              conv={c}
              active={activeConvId === c.id}
              onClick={() => onSelectConv(c.id)}
            />
          ))
        )}
      </div>

      {/* User + logout */}
      <div style={{ padding: "12px", borderTop: `1px solid ${colors.border}` }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 10px",
          background: colors.card,
          borderRadius: "9px",
          marginBottom: "8px",
          fontSize: "13px",
          color: colors.mutedLight,
        }}>
          <span>👤</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.nombre || "Usuario"}
          </span>
        </div>
        <NavBtn onClick={onLogout} style={{ color: colors.muted }}>
          ← Cerrar sesión
        </NavBtn>
      </div>
    </aside>
  );
}

function NavBtn({ children, active, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "13px",
        color: active ? "#93c5fd" : colors.mutedLight,
        background: active ? colors.accentGlow : "transparent",
        border: active ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
        transition: "all 0.15s",
        fontFamily: "'Outfit', sans-serif",
        marginBottom: "2px",
        width: "100%",
        textAlign: "left",
        ...style,
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      {children}
    </button>
  );
}

function ConvItem({ conv, active, onClick }) {
  return (
    <div
      onClick={conv.estado === "cerrada" ? undefined : onClick}
      style={{
        padding: "9px 11px",
        borderRadius: "8px",
        cursor: conv.estado === "cerrada" ? "not-allowed" : "pointer",
        background: active ? colors.accentGlow : "transparent",
        border: active ? "1px solid rgba(59,130,246,0.15)" : "1px solid transparent",
        transition: "all 0.15s",
        marginBottom: "2px",
        opacity: conv.estado === "cerrada" ? 0.5 : 1,
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? colors.accentGlow : "transparent"; }}
    >
      <div style={{
        fontSize: "12px",
        fontWeight: 500,
        color: colors.text,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {conv.titulo || `Conversación #${conv.id}`}
      </div>
      <div style={{ fontSize: "10px", color: colors.muted, marginTop: "2px" }}>
        {formatDate(conv.fecha_inicio)}
        {" · "}
        <span style={{ color: conv.estado === "cerrada" ? colors.muted : "#10b981" }}>
          {conv.estado === "cerrada" ? "Cerrada" : "Activa"}
        </span>
      </div>
    </div>
  );
}
