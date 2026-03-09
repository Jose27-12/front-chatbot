const STOPWORDS = new Set([
  "de","la","el","en","y","a","que","los","las","es","un","una","se",
  "por","con","del","al","para","su","lo","más","pero","o","si","no",
  "le","como","este","también","fue","ser","tiene","hay","cuando",
  "puede","sobre","su","sus","me","te","nos","les","era","son",
]);

const POS_WORDS = [
  "excelente","bien","perfecto","correcto","útil","claro","gracias",
  "bueno","genial","ayuda","comprendo","entendido","efectivo","claro",
];

const NEG_WORDS = [
  "mal","error","problema","difícil","confuso","no entiendo","incorrecto",
  "falla","complicado","imposible","frustrante","no funciona",
];

/**
 * Returns sentiment label, color, and icon for a given text.
 * @param {string} text
 * @returns {{ label: string, color: string, icon: string }}
 */
export function analyzeSentiment(text) {
  const t = text.toLowerCase();
  const pos = POS_WORDS.filter(w => t.includes(w)).length;
  const neg = NEG_WORDS.filter(w => t.includes(w)).length;

  if (pos > neg) return { label: "Positivo", color: "#4ade80", icon: "😊" };
  if (neg > pos) return { label: "Negativo", color: "#f87171", icon: "😕" };
  return { label: "Neutral", color: "#94a3b8", icon: "😐" };
}

/**
 * Extracts the top N keywords from a text, excluding stopwords.
 * @param {string} text
 * @param {number} max
 * @returns {string[]}
 */
export function extractKeywords(text, max = 6) {
  return [
    ...new Set(
      text
        .toLowerCase()
        .replace(/[^\w\sáéíóúñ]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 4 && !STOPWORDS.has(w))
    ),
  ].slice(0, max);
}

/**
 * Returns a short summary (first 2 sentences) of a text.
 * @param {string} text
 * @returns {string}
 */
export function summarize(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.slice(0, 2).join(" ").trim();
}
