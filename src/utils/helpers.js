/**
 * Returns current time as HH:MM string in Colombian locale.
 */
export const getTime = () =>
  new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

/**
 * Returns today's full date string in Colombian locale.
 */
export const getToday = () =>
  new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Formats an ISO date string for display.
 * @param {string} iso
 * @returns {string}
 */
export const formatDate = (iso) => {
  if (!iso) return "—";

  return new Date(iso).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

/**
 * Validates a non-empty string with optional minimum length.
 * @param {string} value
 * @param {number} min
 * @returns {string} error message or empty string
 */
export const validateText = (value, min = 1) => {
  if (!value || !value.trim()) return "Este campo es requerido.";
  if (value.trim().length < min) return `Mínimo ${min} caracteres.`;
  return "";
};

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {string}
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) return "El correo es requerido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Correo no válido.";
  return "";
};
