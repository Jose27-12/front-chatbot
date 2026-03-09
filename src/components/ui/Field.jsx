import { colors, radius } from "../../styles/tokens";

/**
 * @param {{ label?: string, error?: string, as?: 'input'|'select', style?: object } & React.InputHTMLAttributes<HTMLInputElement>} props
 */
export default function Field({
  label,
  error,
  as: As = "input",
  style = {},
  children,
  ...rest
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && (
        <label
          style={{
            fontSize: "11px",
            color: colors.mutedLight,
            fontWeight: 500,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
      )}
      <As
        style={{
          background: colors.card,
          border: `1px solid ${error ? colors.danger : colors.border}`,
          borderRadius: radius.sm,
          padding: "10px 13px",
          color: colors.text,
          fontSize: "13px",
          outline: "none",
          fontFamily: "'Outfit', sans-serif",
          transition: "border-color 0.2s",
          width: "100%",
          ...style,
        }}
        onFocus={e => { e.target.style.borderColor = error ? colors.danger : "rgba(59,130,246,0.5)"; }}
        onBlur={e =>  { e.target.style.borderColor = error ? colors.danger : colors.border; }}
        {...rest}
      >
        {children}
      </As>
      {error && (
        <span style={{ fontSize: "11px", color: colors.danger }}>⚠ {error}</span>
      )}
    </div>
  );
}
