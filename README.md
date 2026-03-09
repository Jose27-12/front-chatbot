# 🎓 Prácticas Académicas — Frontend React

Interfaz web para el asistente virtual de gestión de prácticas académicas conectado a TinyLlama.

---

## 📁 Estructura del proyecto

```
practicas-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← Punto de entrada
    ├── App.jsx               ← Layout principal + rutas
    │
    ├── api/
    │   ├── config.js         ← URL base y endpoints
    │   └── service.js        ← Todas las llamadas fetch
    │
    ├── hooks/
    │   ├── useChat.js        ← Lógica completa del chat
    │   └── useConversations.js ← Carga del historial
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx   ← Barra lateral + navegación
    │   │   └── Topbar.jsx    ← Barra superior de cada vista
    │   ├── chat/
    │   │   ├── ChatView.jsx  ← Vista completa del chat
    │   │   ├── ChatInput.jsx ← Textarea + botón enviar
    │   │   ├── MessageBubble.jsx ← Burbuja de mensaje
    │   │   ├── TypingIndicator.jsx ← Animación "escribiendo"
    │   │   └── NLPPanel.jsx  ← Análisis NLP bajo cada respuesta
    │   ├── history/
    │   │   └── HistoryView.jsx ← Vista historial + 3 filtros
    │   └── ui/
    │       ├── Button.jsx    ← Botón reutilizable
    │       ├── Field.jsx     ← Input/Select con validación
    │       └── Tag.jsx       ← Badge de estado
    │
    ├── styles/
    │   ├── tokens.js         ← Colores, fuentes, radios
    │   └── global.js         ← CSS global + keyframes
    │
    └── utils/
        ├── nlp.js            ← Sentimiento, keywords, resumen
        └── helpers.js        ← Fechas, validaciones
```

---

## 🚀 Cómo correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Asegurarse de que el backend esté activo en http://127.0.0.1:8000

# 3. Correr en desarrollo
npm run dev
# → Abre http://localhost:3000

# 4. Build para producción
npm run build
```

---

## 🔌 Endpoints esperados de tu API

| Método  | URL                                    | Propósito                  |
|---------|----------------------------------------|----------------------------|
| `POST`  | `/chat`                                | Enviar mensaje a TinyLlama |
| `POST`  | `/conversaciones`                      | Crear conversación          |
| `GET`   | `/conversaciones?usuario_id=X`         | Listar historial            |
| `GET`   | `/conversaciones/{id}`                 | Detalle con mensajes        |
| `PATCH` | `/conversaciones/{id}/cerrar`          | Finalizar conversación      |

---

## 🧠 NLP incluido (sin librerías externas)

Cada respuesta del asistente muestra automáticamente:
- **Análisis de sentimiento** — Positivo / Neutral / Negativo
- **Palabras clave** — Top 6 términos relevantes
- **Resumen automático** — Primeras 2 oraciones

---

## 🎨 Stack

- React 18 + Vite
- Zero CSS frameworks (estilos inline con design tokens)
- Fuentes: Syne (display) + Outfit (body) via Google Fonts
