import { useState, useEffect } from "react";
import { colors } from "../../styles/tokens";
import Button from "../ui/Button";
import { formatDate } from "../../utils/helpers";

export default function Sidebar({
  view,
  setView,
  convList = [],
  activeConvId,
  onNewChat,
  onSelectConv,
  onLogout,
  user,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const handleNav    = (v)  => { setView(v);        close(); };
  const handleNew    = ()   => { onNewChat();        close(); };
  const handleSelect = (id) => { onSelectConv(id);  close(); };

  return (
    <>
      {/* ── BOTÓN HAMBURGUESA ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
        style={{
          display: "none",
          position: "fixed",
          top: "13px",
          left: "13px",
          zIndex: 300,
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "10px",
          width: "42px",
          height: "42px",
          cursor: "pointer",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          padding: 0,
        }}
        className="hamburger-btn"
      >
        <span style={{ width: "18px", height: "2px", background: colors.text, borderRadius: "2px", display: "block" }} />
        <span style={{ width: "13px", height: "2px", background: colors.text, borderRadius: "2px", display: "block" }} />
        <span style={{ width: "18px", height: "2px", background: colors.text, borderRadius: "2px", display: "block" }} />
      </button>

      {/* ── OVERLAY ── */}
      {isOpen && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 149,
            backdropFilter: "blur(3px)",
            animation: "fadeIn 0.2s ease",
          }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`sidebar${isOpen ? " open" : ""}`}
        style={{
          width: "272px",
          minWidth: "272px",
          background: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "100vh",
          flexShrink: 0,
        }}
      >
        {/* Logo + botón cerrar */}
        <div style={{
          padding: "18px 16px 14px",
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}>
          <div className="sidebar-logo">
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
            <div style={{ fontSize: "10px", 
             
              color: colors.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
              Gestión Académica · TinyLlama
            </div>
          </div>

          {/* X solo en mobile */}
          <button
            onClick={close}
            className="sidebar-close-btn"
            aria-label="Cerrar"
            style={{
              display: "none",
              background: "transparent",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              color: colors.muted,
              cursor: "pointer",
              width: "30px",
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Nueva conversación */}
        <div style={{ padding: "12px 14px 0" }}>
          <Button variant="accent" fullWidth style={{ fontSize: "13px" }} onClick={handleNew}>
            ✦ Nueva conversación
          </Button>
        </div>

        {/* Nav */}
        <nav style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${colors.border}` }}>
          {[
            { id: "chat",    label: "💬  Chat Asistente" },
            { id: "history", label: "🗂  Historial" },
          ].map(item => (
            <NavBtn key={item.id} active={view === item.id} onClick={() => handleNav(item.id)}>
              {item.label}
            </NavBtn>
          ))}
        </nav>

        {/* Recientes */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
          <div style={{ fontSize: "10px", color: colors.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px", paddingLeft: "4px" }}>
            Recientes
          </div>
          {convList.length === 0 ? (
            <p style={{ fontSize: "12px", color: colors.muted, padding: "6px 4px" }}>Sin conversaciones aún</p>
          ) : convList.slice(0, 20).map((c, i) => (
            <ConvItem
              key={c.id || i}
              conv={c}
              active={activeConvId === c.id}
              onClick={() => handleSelect(c.id)}
            />
          ))}
        </div>

        {/* Usuario + logout */}
        <div style={{ padding: "12px", borderTop: `1px solid ${colors.border}` }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 10px", background: colors.card, borderRadius: "9px",
            marginBottom: "8px", fontSize: "13px", color: colors.mutedLight,
          }}>
            <span>👤</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.nombre || "Usuario"}
            </span>
          </div>
          <NavBtn onClick={onLogout} style={{ color: colors.muted }}>← Cerrar sesión</NavBtn>
        </div>
      </aside>
    </>
  );
}

function NavBtn({ children, active, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "9px 12px", borderRadius: "8px", cursor: "pointer",
        fontSize: "13px",
        color: active ? "#93c5fd" : colors.mutedLight,
        background: active ? colors.accentGlow : "transparent",
        border: active ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
        transition: "all 0.15s", fontFamily: "'Outfit', sans-serif",
        marginBottom: "2px", width: "100%", textAlign: "left", ...style,
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = active ? colors.accentGlow : "transparent"; }}
    >
      {children}
    </button>
  );
}

function ConvItem({ conv, active, onClick }) {
  const closed = conv.estado === "cerrada";
  return (
    <div
      onClick={closed ? undefined : onClick}
      style={{
        padding: "9px 11px", borderRadius: "8px",
        cursor: closed ? "default" : "pointer",
        background: active ? colors.accentGlow : "transparent",
        border: active ? "1px solid rgba(59,130,246,0.15)" : "1px solid transparent",
        transition: "all 0.15s", marginBottom: "2px",
        opacity: closed ? 0.5 : 1,
      }}
      onMouseEnter={e => { if (!active && !closed) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = active ? colors.accentGlow : "transparent"; }}
    >
      <div style={{ fontSize: "12px", fontWeight: 500, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {conv.titulo || `Conversación #${conv.id}`}
      </div>
      <div style={{ fontSize: "10px", color: colors.muted, marginTop: "2px" }}>
        {formatDate(conv.fecha_inicio)}{" · "}
        <span style={{ color: closed ? colors.muted : "#10b981" }}>{closed ? "Cerrada" : "Activa"}</span>
      </div>
    </div>
  );
}