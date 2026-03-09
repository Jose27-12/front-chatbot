import { colors } from "../../styles/tokens";
import { analyzeSentiment, extractKeywords, summarize } from "../../utils/nlp";

export default function NLPPanel({ text }) {
  if (!text || text.length < 20) return null;

  const sentiment = analyzeSentiment(text);
  const keywords  = extractKeywords(text);
  const summary   = summarize(text);
  const isTruncated = summary.length < text.length - 20;

  return (
    <div style={{
      marginTop: "10px",
      paddingTop: "10px",
      borderTop: `1px solid ${colors.border}`,
    }}>
      {/* Label */}
      <div style={{
        fontSize: "9px",
        color: colors.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "6px",
      }}>
        Análisis NLP
      </div>

      {/* Sentiment */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "6px" }}>
        <Chip color={sentiment.color}>
          {sentiment.icon} {sentiment.label}
        </Chip>
        {keywords.map(kw => (
          <Chip key={kw} color="#06b6d4">{kw}</Chip>
        ))}
      </div>

      {/* Summary */}
      {isTruncated && (
        <p style={{
          fontSize: "11px",
          color: colors.muted,
          lineHeight: 1.55,
          fontStyle: "italic",
        }}>
          📝 {summary}
        </p>
      )}
    </div>
  );
}

function Chip({ children, color }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "3px",
      background: `${color}18`,
      border: `1px solid ${color}35`,
      borderRadius: "20px",
      padding: "2px 8px",
      fontSize: "10px",
      color,
      fontWeight: 500,
    }}>
      {children}
    </span>
  );
}
