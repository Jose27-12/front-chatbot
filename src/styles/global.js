const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; }

  body, #root {
    min-height: 100vh;
    background: #080c14;
    color: #e2e8f0;
    font-family: 'Outfit', sans-serif;
    line-height: 1.5;
  }

  ::-webkit-scrollbar        { width: 4px; }
  ::-webkit-scrollbar-track  { background: transparent; }
  ::-webkit-scrollbar-thumb  { background: #1e2d47; border-radius: 4px; }

  input, select, textarea { color-scheme: dark; font-family: inherit; }

  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30%           { transform: translateY(-6px); opacity: 1; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .msg-enter { animation: fadeUp 0.25s ease forwards; }

  /* ── Hamburger (oculto en desktop) ── */
  .hamburger-btn {
    display: none;
    position: fixed;
    top: 13px; left: 13px;
    z-index: 300;
  }

  /* ── Botón X dentro del sidebar (oculto en desktop) ── */
  .sidebar-close-btn { display: none; }

  /* ── Sidebar base desktop ── */
  .sidebar {
    flex-shrink: 0;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ── Mobile ≤768px ── */
  @media (max-width: 768px) {
    html { font-size: 14px; }

    /* Mostrar hamburger */
    .hamburger-btn {
      display: flex !important;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Mostrar botón cerrar dentro del sidebar */
    .sidebar-close-btn { display: flex !important; }

    /* Sidebar se convierte en drawer */
    .sidebar {
      position: fixed !important;
      top: 0; left: 0;
      height: 100vh !important;
      width: 82vw !important;
      min-width: 0 !important;
      max-width: 300px !important;
      z-index: 150;
      transform: translateX(-110%);
    }

    /* Drawer abierto */
    .sidebar.open {
      transform: translateX(0);
      box-shadow: 8px 0 48px rgba(0, 0, 0, 0.8);
    }

    /* Padding top en el contenido para no quedar bajo el hamburger */
    .main-content { padding-top: 58px; }
  }

  @media (max-width: 480px) {
    html { font-size: 13px; }
    .sidebar { width: 88vw !important; max-width: 320px !important; }
  }
  .sidebar.open .sidebar-logo {
    padding-left: 52px;
}
`;

export default globalStyles;