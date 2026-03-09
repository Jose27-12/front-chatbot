import { colors } from "../../styles/tokens";

/**
 * Small colored tag/badge.
 * @param {{ color?: string, children: React.ReactNode }} props
 */
export default function Tag({ children, color = colors.accent, style = {} }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        background: `${color}20`,
        border: `1px solid ${color}40`,
        borderRadius: "6px",
        padding: "2px 8px",
        fontSize: "11px",
        color,
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
