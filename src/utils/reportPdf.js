import { jsPDF } from "jspdf";
import { analyzeSentiment, extractKeywords, summarize } from "./nlp";

export function buildConversationPdf(detail, conv) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  let y = 20;

  const title = "Reporte de Conversación";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, pageWidth / 2, y, { align: "center" });

  y += 12;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Conversación ID: ${conv.id}`, 14, y);
  y += 7;
  doc.text(`Estado: ${conv.estado || "cerrada"}`, 14, y);
  y += 7;
  doc.text(`Fecha inicio: ${conv.fecha_inicio || "N/A"}`, 14, y);
  y += 7;

  const mensajes = detail?.mensajes || [];

  const textoCompleto = mensajes
    .map((m) => `${m.rol === "user" ? "Usuario" : "Asistente"}: ${m.contenido}`)
    .join(" ");

  const resumen = summarize(textoCompleto || "");
  const keywords = extractKeywords(textoCompleto || "", 8);
  const sentiment = analyzeSentiment(textoCompleto || "");

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Resumen NLP", 14, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text(`Sentimiento: ${sentiment.icon} ${sentiment.label}`, 14, y);
  y += 7;

  const keywordsText = keywords.length ? keywords.join(", ") : "Sin palabras clave";
  const resumenLines = doc.splitTextToSize(`Resumen: ${resumen || "Sin resumen"}`, 180);
  const keywordLines = doc.splitTextToSize(`Palabras clave: ${keywordsText}`, 180);

  doc.text(keywordLines, 14, y);
  y += keywordLines.length * 6 + 4;

  doc.text(resumenLines, 14, y);
  y += resumenLines.length * 6 + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Conversación completa", 14, y);
  y += 8;

  doc.setFont("helvetica", "normal");

  mensajes.forEach((m, index) => {
    const prefijo = m.rol === "user" ? "Usuario" : "Asistente";
    const bloque = `${index + 1}. ${prefijo}: ${m.contenido}`;
    const lines = doc.splitTextToSize(bloque, 180);

    if (y + lines.length * 6 > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(lines, 14, y);
    y += lines.length * 6 + 4;
  });

  return doc;
}