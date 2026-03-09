const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body, #root {
    min-height: 100vh;
    background: #080c14;
    color: #e2e8f0;
    font-family: 'Outfit', sans-serif;
    line-height: 1.5;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #1e2d47;
    border-radius: 4px;
  }

  input, select, textarea {
    color-scheme: dark;
    font-family: inherit;
  }

  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Animations */
  @keyframes bounce {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-6px);
      opacity: 1;
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-16px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .msg-enter {
    animation: fadeUp 0.25s ease forwards;
  }

  /* Layout responsive */
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Sidebar responsive */
  @media (max-width: 1024px) {
    html {
      font-size: 15px;
    }
  }

  
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }

    .sidebar {
      display: none !important;
    }

    .sidebar.open {
      display: flex !important;
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      height: 100vh;
      width: 80vw !important;
      min-width: 0 !important;
      box-shadow: 4px 0 40px rgba(0,0,0,0.7);
    }
  }
    

  @media (max-width: 480px) {
    html {
      font-size: 13px;
    }

    .container {
      padding: 0 0.75rem;
    }
  }
`;

export default globalStyles;