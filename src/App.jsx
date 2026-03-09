import { useState, useEffect } from "react";
import globalStyles from "./styles/global";
import { colors } from "./styles/tokens";
import { useConversations } from "./hooks/useConversations";
import Sidebar from "./components/layout/Sidebar";
import ChatView from "./components/chat/ChatView";
import HistoryView from "./components/history/HistoryView";

// Inject global styles once
const styleTag = document.createElement("style");
styleTag.textContent = globalStyles;
document.head.appendChild(styleTag);

// Demo user — replace with your auth context or prop if needed
const DEMO_USER = { id: 1, nombre: "Estudiante Demo" };

export default function App() {
  const [user]    = useState(DEMO_USER);
  const [view,     setView]    = useState("chat");   // "chat" | "history"
  const [convId,   setConvId]  = useState(null);

 const { conversaciones: convList, loading } = useConversations(user.id);
  // Load conversation list on mount

  const handleNewChat = () => {
    setConvId(null);
    setView("chat");
  };

  const handleSelectConv = (id) => {
    setConvId(id);
    setView("chat");
  };

  const handleViewHistory = () => {
    setView("history");
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: colors.bg,
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* ── SIDEBAR ── */}
      <Sidebar
        view={view}
        setView={(v) => v === "history" ? handleViewHistory() : setView(v)}
        convList={convList}
        activeConvId={convId}
        onNewChat={handleNewChat}
        onSelectConv={handleSelectConv}
        onLogout={() => {
          // Replace with real logout logic if you add auth later
          window.location.reload();
        }}
        user={user}
      />

      {/* ── MAIN AREA ── */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: colors.bg,
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 70% 5%, rgba(59,130,246,0.06) 0%, transparent 55%)",
      }}>
        {view === "chat" ? (
          <ChatView
            user={user}
            convId={convId}
            setConvId={setConvId}
          />
        ) : (
          <HistoryView user={user} />
        )}
      </main>
    </div>
  );
}
