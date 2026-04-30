import React, { useState } from 'react';
import { globalStyles } from './styles/design-system';
import LandingPage from './pages/LandingPage';
import DomeExperience from './pages/DomeExperience';
import VRInterface from './pages/VRInterface';

// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — Application principale
// L'empreinte de nos silences
// ═══════════════════════════════════════════════════════════════════════════

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedDome, setSelectedDome] = useState(null);
  const [language, setLanguage] = useState('fr');

  // Navigation handler
  const handleNavigate = (destination) => {
    console.log('Navigate to:', destination);

    if (destination === 'safe-space') {
      // Redirection vers ressources d'aide
      window.location.href = '#safe-space';
      return;
    }

    if (destination === 'exit') {
      setCurrentPage('landing');
      return;
    }

    if (destination === 'hall') {
      setCurrentPage('landing');
      return;
    }

    if (destination?.startsWith('dome-')) {
      const domeId = parseInt(destination.split('-')[1]);
      setSelectedDome(domeId);
      setCurrentPage('dome');
      return;
    }

    if (destination === 'vr') {
      setCurrentPage('vr');
      return;
    }

    if (destination === 'resources') {
      // TODO: Page ressources
      return;
    }

    setCurrentPage(destination);
  };

  // Rendu de la page actuelle
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onNavigate={handleNavigate}
          />
        );

      case 'dome':
        return (
          <DomeExperience
            domeId={selectedDome || 1}
            onNavigate={handleNavigate}
            initialLanguage={language}
          />
        );

      case 'vr':
        return (
          <VRInterface
            onNavigate={handleNavigate}
            initialLanguage={language}
          />
        );

      default:
        return (
          <LandingPage
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <>
      {/* Styles globaux */}
      <style>{globalStyles}</style>

      {/* Contenu */}
      {renderPage()}

      {/* Bouton debug pour naviguer (à retirer en prod) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 100,
          display: 'flex',
          gap: '8px',
        }}>
          <button
            onClick={() => setCurrentPage('landing')}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentPage === 'landing' ? '#86BBB6' : '#333',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Landing
          </button>
          <button
            onClick={() => { setSelectedDome(1); setCurrentPage('dome'); }}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentPage === 'dome' ? '#86BBB6' : '#333',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Dome
          </button>
          <button
            onClick={() => setCurrentPage('vr')}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentPage === 'vr' ? '#86BBB6' : '#333',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            VR
          </button>
        </div>
      )}
    </>
  );
};

export default App;
