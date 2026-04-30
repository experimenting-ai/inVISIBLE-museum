import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, transitions } from '../styles/design-system';
import { Bars, Logo } from '../components/shared';
import { useTranslation } from '../i18n/content';

// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — VR Interface (WebXR)
// Interface utilisateur pour l'expérience immersive en réalité virtuelle
// ═══════════════════════════════════════════════════════════════════════════

const VRInterface = ({
  onNavigate,
  initialLanguage = 'fr',
}) => {
  const [currentView, setCurrentView] = useState('hall'); // hall, dome, act
  const [selectedDome, setSelectedDome] = useState(null);
  const [currentAct, setCurrentAct] = useState(null);
  const [language, setLanguage] = useState(initialLanguage);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [comfortMode, setComfortMode] = useState(false);
  const [presenceCount, setPresenceCount] = useState(7);

  const t = useTranslation(language);

  // Simuler présences
  useEffect(() => {
    const interval = setInterval(() => {
      setPresenceCount(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════
  // HUD SUPÉRIEUR — Breadcrumb + Présences
  // ═══════════════════════════════════════════════════════════════════════
  const TopHUD = () => (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: spacing[4],
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      zIndex: 30,
    }}>
      {/* Breadcrumb */}
      <div style={{
        padding: `${spacing[2]} ${spacing[4]}`,
        borderRadius: '9999px',
        backgroundColor: `${colors.fond}80`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${colors.blanc}15`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], fontSize: typography.sizes.sm }}>
          <span style={{ color: colors.sarcelle }}>/in</span>
          <span style={{ color: colors.blanc }}>VISIBLE</span>
          <span style={{ color: `${colors.blanc}40` }}>/</span>
          <span style={{ color: colors.lavande }}>
            {currentView === 'hall' && t.hall.subtitle}
            {currentView === 'dome' && selectedDome && t.domes[selectedDome]?.name}
            {currentView === 'act' && currentAct && t.acts[currentAct]?.title}
          </span>
        </div>
      </div>

      {/* Présences (synapses lumineuses) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
      }}>
        <div style={{
          padding: `${spacing[2]} ${spacing[3]}`,
          borderRadius: '9999px',
          backgroundColor: `${colors.fond}80`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.blanc}15`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
        }}>
          <div style={{ display: 'flex', marginLeft: '-4px' }}>
            {[...Array(Math.min(presenceCount, 5))].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: colors.sarcelle,
                  opacity: 0.5 + (i * 0.1),
                  marginLeft: i > 0 ? '-4px' : 0,
                  animation: 'pulse 2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: typography.sizes.xs, color: colors.lavande }}>
            {presenceCount} {t.vr.presence}
          </span>
        </div>

        {/* Langue */}
        <button
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
          style={{
            padding: `${spacing[2]} ${spacing[3]}`,
            borderRadius: '9999px',
            backgroundColor: `${colors.fond}80`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${colors.blanc}15`,
            color: colors.blanc,
            fontSize: typography.sizes.xs,
            cursor: 'pointer',
          }}
        >
          {language === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // HUD INFÉRIEUR — Contrôles principaux
  // ═══════════════════════════════════════════════════════════════════════
  const BottomHUD = () => {
    const controls = [
      { id: 'menu', icon: showMenu ? 'close' : 'menu', label: t.vr.menu, active: showMenu, onClick: () => setShowMenu(!showMenu) },
      { id: 'sound', icon: soundEnabled ? 'sound-on' : 'sound-off', label: t.controls.sound, active: soundEnabled, onClick: () => setSoundEnabled(!soundEnabled) },
      { id: 'recenter', icon: 'recenter', label: t.vr.recenter, onClick: () => console.log('Recenter') },
      { id: 'comfort', icon: 'comfort', label: t.vr.comfort, active: comfortMode, onClick: () => setComfortMode(!comfortMode) },
    ];

    const icons = {
      menu: <path d="M3 12h18M3 6h18M3 18h18" />,
      close: <path d="M6 6l12 12M6 18L18 6" />,
      'sound-on': <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></>,
      'sound-off': <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>,
      recenter: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M1 12h2M21 12h2" /></>,
      comfort: <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>,
    };

    return (
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing[4],
        display: 'flex',
        justifyContent: 'center',
        zIndex: 30,
      }}>
        <div style={{
          padding: `${spacing[3]} ${spacing[6]}`,
          borderRadius: '9999px',
          backgroundColor: `${colors.fond}90`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.blanc}15`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[6],
        }}>
          {controls.map((ctrl) => (
            <button
              key={ctrl.id}
              onClick={ctrl.onClick}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: spacing[1],
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: ctrl.active ? `${colors.sarcelle}30` : `${colors.blanc}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ctrl.active ? colors.sarcelle : colors.blanc} strokeWidth="2">
                  {icons[ctrl.icon]}
                </svg>
              </div>
              <span style={{ fontSize: typography.sizes.xs, color: colors.lavande }}>{ctrl.label}</span>
            </button>
          ))}

          {/* Séparateur */}
          <div style={{ width: '1px', height: '32px', backgroundColor: `${colors.blanc}20` }} />

          {/* Espace Protégé */}
          <button
            onClick={() => onNavigate?.('safe-space')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing[1],
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: `${colors.prune}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.blanc} strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span style={{ fontSize: typography.sizes.xs, color: colors.lavande }}>{t.global.safeSpace}</span>
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════
  // MENU FLOTTANT
  // ═══════════════════════════════════════════════════════════════════════
  const FloatingMenu = () => (
    <div style={{
      position: 'absolute',
      left: '50%',
      bottom: '120px',
      transform: 'translateX(-50%)',
      zIndex: 40,
      opacity: showMenu ? 1 : 0,
      pointerEvents: showMenu ? 'auto' : 'none',
      transition: transitions.normal,
    }}>
      <div style={{
        padding: spacing[6],
        borderRadius: '24px',
        backgroundColor: `${colors.fond}95`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${colors.blanc}20`,
        minWidth: '300px',
      }}>
        <h3 style={{
          fontSize: typography.sizes.lg,
          fontWeight: typography.weights.semibold,
          marginBottom: spacing[4],
          color: colors.blanc,
          textAlign: 'center',
        }}>
          {t.vr.menu}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {/* Hall */}
          <button
            onClick={() => { setCurrentView('hall'); setShowMenu(false); }}
            style={{
              padding: spacing[3],
              borderRadius: '12px',
              border: 'none',
              backgroundColor: currentView === 'hall' ? `${colors.sarcelle}30` : `${colors.blanc}10`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[3],
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sarcelle} strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span style={{ color: colors.blanc }}>{t.hall.title}</span>
          </button>

          {/* Dômes */}
          {['dome1', 'dome2', 'dome3'].map((dome) => (
            <button
              key={dome}
              onClick={() => { setSelectedDome(dome); setCurrentView('dome'); setShowMenu(false); }}
              style={{
                padding: spacing[3],
                borderRadius: '12px',
                border: 'none',
                backgroundColor: selectedDome === dome ? `${colors.prune}30` : `${colors.blanc}10`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `2px solid ${colors.prune}`,
              }} />
              <span style={{ color: colors.blanc }}>{t.domes[dome]?.name}</span>
            </button>
          ))}

          {/* Quitter */}
          <button
            onClick={() => onNavigate?.('exit')}
            style={{
              marginTop: spacing[4],
              padding: spacing[3],
              borderRadius: '12px',
              border: `1px solid ${colors.prune}40`,
              backgroundColor: `${colors.prune}20`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[3],
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.prune} strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span style={{ color: colors.prune }}>{t.vr.exit}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // RÉTICULE DE REGARD (GAZE)
  // ═══════════════════════════════════════════════════════════════════════
  const GazeReticle = () => (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: `2px solid ${colors.sarcelle}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: colors.sarcelle,
        }} />
      </div>
      <p style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: spacing[4],
        whiteSpace: 'nowrap',
        fontSize: typography.sizes.xs,
        padding: `${spacing[1]} ${spacing[3]}`,
        borderRadius: '9999px',
        backgroundColor: `${colors.fond}80`,
        color: colors.lavande,
      }}>
        {t.vr.pressToActivate}
      </p>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // VIGNETTE MODE CONFORT
  // ═══════════════════════════════════════════════════════════════════════
  const ComfortVignette = () => (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 50,
      background: `radial-gradient(circle at center, transparent 50%, ${colors.fond} 100%)`,
      opacity: comfortMode ? 1 : 0,
      transition: transitions.slow,
    }} />
  );

  // ═══════════════════════════════════════════════════════════════════════
  // VUE HALL CENTRAL
  // ═══════════════════════════════════════════════════════════════════════
  const HallView = () => (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        aspectRatio: '16/9',
      }}>
        {/* Fond */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          background: `radial-gradient(ellipse at center bottom, ${colors.prune}30 0%, ${colors.fond} 80%)`,
        }} />

        {/* Lignes synaptiques */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
          <defs>
            <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.sarcelle} />
              <stop offset="100%" stopColor={colors.prune} />
            </linearGradient>
          </defs>
          <line x1="50%" y1="80%" x2="20%" y2="40%" stroke="url(#synapseGrad)" strokeWidth="1" />
          <line x1="50%" y1="80%" x2="50%" y2="40%" stroke="url(#synapseGrad)" strokeWidth="1" />
          <line x1="50%" y1="80%" x2="80%" y2="40%" stroke="url(#synapseGrad)" strokeWidth="1" />
        </svg>

        {/* Titre */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: typography.sizes.sm, letterSpacing: typography.letterSpacing.widest, textTransform: 'uppercase', marginBottom: spacing[2], color: colors.sarcelle }}>
            {t.hall.subtitle}
          </p>
          <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.medium, color: colors.blanc }}>
            {t.hall.title}
          </h1>
        </div>

        {/* Portails des dômes */}
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: spacing[12],
        }}>
          {[1, 2, 3].map((dome) => (
            <button
              key={dome}
              onClick={() => { setSelectedDome(`dome${dome}`); setCurrentView('dome'); }}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                border: `2px solid ${colors.sarcelle}50`,
                backgroundColor: `${colors.sarcelle}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: transitions.slow,
              }}>
                <span style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.light, color: colors.blanc }}>
                  {dome}
                </span>
              </div>
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: spacing[4],
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}>
                <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.blanc }}>
                  {t.domes[`dome${dome}`]?.name}
                </p>
                <p style={{ fontSize: typography.sizes.xs, color: colors.lavande }}>
                  {t.domes[`dome${dome}`]?.story}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Indicateur présence utilisateur */}
        <div style={{
          position: 'absolute',
          bottom: spacing[4],
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: colors.sarcelle,
            boxShadow: `0 0 20px ${colors.sarcelle}60`,
          }} />
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: typography.fontFamily,
      backgroundColor: colors.fond,
    }}>
      {/* Indicateur WebXR */}
      <div style={{
        position: 'absolute',
        top: spacing[4],
        right: spacing[4],
        zIndex: 30,
      }}>
        <span style={{
          padding: `${spacing[1]} ${spacing[3]}`,
          borderRadius: '9999px',
          fontSize: typography.sizes.xs,
          backgroundColor: `${colors.sarcelle}30`,
          color: colors.sarcelle,
        }}>
          WebXR
        </span>
      </div>

      <ComfortVignette />
      <TopHUD />
      <BottomHUD />
      <FloatingMenu />
      <GazeReticle />

      {/* Vue principale */}
      {currentView === 'hall' && <HallView />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default VRInterface;
