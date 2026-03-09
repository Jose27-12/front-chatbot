import { useState } from "react";
import { colors } from "../../styles/tokens";
import Button from "../ui/Button";
import Field from "../ui/Field";

export default function ReportModal({
  open,
  onClose,
  onConfirm,
  convTitle = "Conversación",
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    const value = email.trim();

    if (!value) {
      setError("Debes indicar un correo.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Correo no válido.");
      return;
    }

    setError("");
    onConfirm(value);
    setEmail("");
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        padding: "22px",
        boxShadow: "0 12px 50px rgba(0,0,0,0.35)",
      }}>
        <h3 style={{ marginBottom: "8px", fontSize: "18px" }}>
          Generar reporte PDF
        </h3>

        <p style={{ fontSize: "13px", color: colors.muted, marginBottom: "14px" }}>
          Se enviará el reporte de <strong>{convTitle}</strong> al correo indicado.
        </p>

        <Field
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
        />

        {error && (
          <div style={{
            marginTop: "8px",
            fontSize: "12px",
            color: colors.danger,
          }}>
            ⚠ {error}
          </div>
        )}

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "18px",
        }}>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            Cancelar
          </Button>

          <Button variant="accent" size="sm" onClick={handleSubmit}>
            Enviar reporte
          </Button>
        </div>
      </div>
    </div>
  );
}