import { useState, useEffect } from "react";
import {
  getConversaciones,
  getConversacionesHistory,
} from "../api/service";

export function useConversations(usuario_id, mode = "recent") {
  const [conversaciones, setConversaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!usuario_id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data =
          mode === "history"
            ? await getConversacionesHistory(usuario_id)
            : await getConversaciones(usuario_id);

        setConversaciones(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usuario_id, mode]);

  return { conversaciones, loading };
}