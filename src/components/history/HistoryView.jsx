import { useState, useEffect } from "react";
import { colors } from "../../styles/tokens";
import { analyzeSentiment, extractKeywords, summarize } from "../../utils/nlp";
import { buildConversationPdf } from "../../utils/reportPdf";
import ReportModal from "./ReportModal";
import { enviarReporteConversacion, getConversacionDetail } from "../../api/service";
import { useConversations } from "../../hooks/useConversations";
import { formatDate } from "../../utils/helpers";
import Topbar from "../layout/Topbar";
import Tag from "../ui/Tag";
import Field from "../ui/Field";
import Button from "../ui/Button";

export default function HistoryView({ user }) {
  const { conversaciones: list = [], loading } =
    useConversations(user?.id, "history");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: "",
  });

  const [expanded, setExpanded] = useState(null);
  const [detailCache, setDetailCache] = useState({});
  const [reportConv, setReportConv] = useState(null);
  const [sendingReport, setSendingReport] = useState(false);

  const setFilter = (key, val) =>
    setFilters((prev) => ({ ...prev, [key]: val }));

  const clearFilters = () =>
    setFilters({ search: "", status: "", date: "" });

  const filtered = list
    .filter((c) => c.estado === "cerrada")
    .filter((c) => {
      if (c.total_mensajes != null) {
        return Number(c.total_mensajes) > 0;
      }
      return true;
    })
    .filter((c) => {
      const s = filters.search.toLowerCase();

      const matchSearch =
        !s ||
        (c.titulo || "").toLowerCase().includes(s) ||
        (c.resumen || "").toLowerCase().includes(s);

      const matchStatus =
        !filters.status || c.estado === filters.status;

      const matchDate =
        !filters.date ||
        (c.fecha_inicio || "").startsWith(filters.date);

      return matchSearch && matchStatus && matchDate;
    });

  const toggleExpand = async (conv) => {
    const id = conv.id;

    if (expanded === id) {
      setExpanded(null);
      return;
    }

    setExpanded(id);

    if (!detailCache[id]) {
      try {
        const detail = await getConversacionDetail(id);
        if (detail) {
          setDetailCache((prev) => ({ ...prev, [id]: detail }));
        }
      } catch (err) {
        console.error("Error cargando detalle:", err);
      }
    }
  };

  const handleSendReport = async (email) => {
    if (!reportConv) return;

    try {
      setSendingReport(true);

      let detail = detailCache[reportConv.id];

      if (!detail) {
        detail = await getConversacionDetail(reportConv.id);
        if (detail) {
          setDetailCache((prev) => ({ ...prev, [reportConv.id]: detail }));
        }
      }

      const mensajes = detail?.mensajes || [];
      const textoCompleto = mensajes.map((m) => m.contenido).join(" ");

      const resumen = summarize(textoCompleto);
      const keywords = extractKeywords(textoCompleto, 8);
      const sentiment = analyzeSentiment(textoCompleto);

      const doc = buildConversationPdf(detail, reportConv);
      const pdfBlob = doc.output("blob");

      const pdfBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = () => {
          const result = reader.result || "";
          const base64 = String(result).split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });

      await enviarReporteConversacion({
        conversation_id: reportConv.id,
        email,
        pdfBase64,
        resumen,
        keywords,
        sentiment,
      });

      alert("Reporte enviado correctamente.");
      setReportConv(null);
    } catch (err) {
      console.error(err);
      alert("No se pudo enviar el reporte.");
    } finally {
      setSendingReport(false);
    }
  };

  return (
    <>
      <Topbar title="🗂 Historial de Conversaciones" user={user} />

      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          >
            Todas las sesiones
          </h2>

          <p style={{ color: colors.muted, fontSize: "13px" }}>
            {list.length} conversación{list.length !== 1 ? "es" : ""} registrada
            {list.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "20px",
            }}
        >
          <Field
            placeholder="🔍 Buscar por título o resumen..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
          />

          <Field
            as="select"
            value={filters.status}
            onChange={(e) => setFilter("status", e.target.value)}
            style={{ minWidth: "160px" }}
          >
            <option value="">Todos</option>
            <option value="cerrada">Cerrada</option>
          </Field>

          <Field
            type="date"
            value={filters.date}
            onChange={(e) => setFilter("date", e.target.value)}
            style={{ minWidth: "150px" }}
          />

          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpiar
          </Button>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              color: colors.muted,
              padding: "48px",
            }}
          >
            Cargando historial...
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: colors.muted,
              padding: "60px 20px",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "12px",
                opacity: 0.35,
              }}
            >
              💬
            </div>
            <p>No se encontraron conversaciones.</p>
          </div>
        )}

        {filtered.map((conv) => (
          <ConvCard
            key={conv.id}
            conv={conv}
            isExpanded={expanded === conv.id}
            detail={detailCache[conv.id]}
            onToggle={() => toggleExpand(conv)}
            onReport={() => setReportConv(conv)}
          />
        ))}

        <ReportModal
          open={!!reportConv}
          convTitle={reportConv?.titulo || `Conversación #${reportConv?.id || ""}`}
          onClose={() => !sendingReport && setReportConv(null)}
          onConfirm={handleSendReport}
        />
      </div>
    </>
  );
}

function ConvCard({ conv, isExpanded, detail, onToggle, onReport }) {
  const statusColor =
    conv.estado === "cerrada"
      ? colors.muted
      : "#10b981";

  return (
    <div
      style={{
        background: "rgba(120,120,120,0.08)",
        border: `1px solid ${isExpanded ? colors.borderLight : colors.border}`,
        borderRadius: "14px",
        padding: "18px 20px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            {conv.titulo || `Conversación #${conv.id}`}
          </div>

          <div
            style={{
              fontSize: "11px",
              color: colors.muted,
            }}
          >
            🗓 {formatDate(conv.fecha_inicio)}
          </div>
        </div>

        <Tag color={statusColor}>
          🔒 Cerrada
        </Tag>
      </div>

      {conv.resumen && (
        <p
          style={{
            fontSize: "13px",
            color: colors.mutedLight,
            marginTop: "10px",
          }}
        >
          {conv.resumen}
        </p>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
        <Button
          variant="accent"
          size="sm"
          onClick={onToggle}
        >
          {isExpanded ? "▲ Ocultar mensajes" : "▼ Ver mensajes"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReport}
        >
          📄 Generar reporte
        </Button>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: "14px",
            padding: "14px",
            background: colors.surface,
            borderRadius: "10px",
          }}
        >
          {!detail ? (
            <p style={{ fontSize: "12px", color: colors.muted }}>
              Cargando mensajes...
            </p>
          ) : !detail.mensajes?.length ? (
            <p style={{ fontSize: "12px", color: colors.muted }}>
              Sin mensajes registrados.
            </p>
          ) : (
            detail.mensajes.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  fontSize: "13px",
                }}
              >
                <strong>{m.rol === "user" ? "👤 Tú" : "🤖 Asistente"}:</strong>
                <div>{m.contenido}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}