import { colors, radius } from "../../styles/tokens";

const variants = {
  primary: {
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    border: "none",
    color: "#fff",
  },
  ghost: {
    background: "transparent",
    border: `1px solid ${colors.border}`,
    color: colors.mutedLight,
  },
  danger: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#f87171",
  },
  accent: {
    background: colors.accentGlow,
    border: "1px solid rgba(59,130,246,0.3)",
    color: "#93c5fd",
  },
};

/**
 * @param {{ variant?: 'primary'|'ghost'|'danger'|'accent', size?: 'sm'|'md', fullWidth?: boolean, disabled?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  style = {},
  onClick,
  ...rest
}) {
  const v = variants[variant] || variants.primary;
  const padding = size === "sm" ? "6px 12px" : "10px 18px";
  const fontSize = size === "sm" ? "12px" : "14px";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        ...v,
        borderRadius: radius.sm,
        padding,
        fontSize,
        fontWeight: 500,
        fontFamily: "'Outfit', sans-serif",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "all 0.18s",
        width: fullWidth ? "100%" : undefined,
        letterSpacing: "0.01em",
        ...style,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = "brightness(1.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {children}
    </button>
  );
}
