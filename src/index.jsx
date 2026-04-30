import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — Point d'entrée
// ═══════════════════════════════════════════════════════════════════════════

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
