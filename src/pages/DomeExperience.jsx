import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, transitions, shadows } from '../styles/design-system';
import { Bars, Logo, SafeSpaceButton, Button, ProgressIndicator } from '../components/shared';
import { useTranslation } from '../i18n/content';

// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — Dome Experience
// Parcours en 3 actes avec artefacts IA
// ═══════════════════════════════════════════════════════════════════════════

const DomeExperience = ({
  domeId = 1,
  onNavigate,
  initialLanguage = 'fr',
}) => {
  const [currentAct, setCurrentAct] = useState(1);
  const [language, setLanguage] = useState(initialLanguage);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTranscription, setShowTranscription] = useState(false);
  const [transmutationProgress, setTransmutationProgress] = useState(0);
  const [isTransmuting, setIsTransmuting] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const t = useTranslation(language);

  // Couleurs par acte
  const actColors = {
    1: { bg: '#1a0a15', accent: colors.prune },      // Tourmente - sombre
    2: { bg: colors.fondAlt, accent: colors.denim }, // Compréhension - neutre
    3: { bg: '#0a1510', accent: colors.sarcelle },   // Espoir - lumineux
  };

  const currentColors = actColors[currentAct];

  // Navigation entre actes
  const goToAct = (act) => {
    if (act === currentAct || act < 1 || act > 3) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentAct(act);
      setTransitioning(false);
    }, 500);
  };

  // Transmutation (Acte 3)
  useEffect(() => {
    let interval;
    if (isTransmuting && transmutationProgress < 100) {
      interval = setInterval(() => {
        setTransmutationProgress(prev => Math.min(prev + 2, 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTransmuting, transmutationProgress]);

  // ═══════════════════════════════════════════════════════════════════════
  // HEADER
  // ═══════════════════════════════════════════════════════════════════════
  const Header = () => (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      padding: `${spacing[4]} ${spacing[6]}`,
      backgroundColor: `${colors.fond}cc`,
    }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Retour + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
          <button
            onClick={() => onNavigate?.('hall')}
            style={{
              padding: spacing[2],
              borderRadius: '50%',
              border: 'none',
              backgroundColor: `${colors.blanc}10`,
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.blanc} strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <Bars color={colors.sarcelle} size={16} />
          <Logo size="sm" />
        </div>

        {/* Info dôme */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: typography.sizes.xs, color: currentColors.accent }}>
            {t.domes[`dome${domeId}`]?.name}
          </p>
          <p style={{ fontSize: typography.sizes.sm, color: colors.blanc }}>
            {t.domes[`dome${domeId}`]?.story}
          </p>
        </div>

        {/* Contrôles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
          {/* Son */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              padding: spacing[2],
              borderRadius: '50%',
              border: 'none',
              backgroundColor: soundEnabled ? `${colors.sarcelle}30` : `${colors.blanc}10`,
              cursor: 'pointer',
            }}
            aria-label={soundEnabled ? t.controls.soundOff : t.controls.soundOn}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={soundEnabled ? colors.sarcelle : colors.blanc} strokeWidth="2">
              {soundEnabled ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              )}
            </svg>
          </button>

          {/* Transcription */}
          <button
            onClick={() => setShowTranscription(!showTranscription)}
            style={{
              padding: spacing[2],
              borderRadius: '50%',
              border: 'none',
              backgroundColor: showTranscription ? `${colors.denim}30` : `${colors.blanc}10`,
              cursor: 'pointer',
            }}
            aria-label={t.controls.transcription}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={showTranscription ? colors.denim : colors.blanc} strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </button>

          {/* Langue */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            style={{
              padding: `${spacing[1]} ${spacing[3]}`,
              borderRadius: '9999px',
              border: `1px solid ${colors.blanc}20`,
              backgroundColor: 'transparent',
              color: colors.blanc,
              fontSize: typography.sizes.xs,
              cursor: 'pointer',
            }}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </div>
    </header>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // INDICATEUR DE PROGRESSION
  // ═══════════════════════════════════════════════════════════════════════
  const ActProgress = () => (
    <div style={{
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 30,
      textAlign: 'center',
    }}>
      <ProgressIndicator
        currentStep={currentAct}
        totalSteps={3}
        onStepClick={goToAct}
        labels={[
          t.acts[1].title,
          t.acts[2].title,
          t.acts[3].title,
        ]}
        accentColors={[colors.prune, colors.denim, colors.sarcelle]}
      />
      <p style={{
        marginTop: spacing[3],
        fontSize: typography.sizes.sm,
        color: colors.lavande,
      }}>
        {t.acts[currentAct].title}
      </p>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // PANNEAU TRANSCRIPTION
  // ═══════════════════════════════════════════════════════════════════════
  const TranscriptionPanel = () => (
    <div style={{
      position: 'fixed',
      left: spacing[6],
      bottom: spacing[24],
      maxWidth: '320px',
      padding: spacing[6],
      borderRadius: '16px',
      backgroundColor: `${colors.fond}f0`,
      border: `1px solid ${colors.denim}30`,
      backdropFilter: 'blur(10px)',
      opacity: showTranscription ? 1 : 0,
      transform: showTranscription ? 'translateY(0)' : 'translateY(16px)',
      pointerEvents: showTranscription ? 'auto' : 'none',
      transition: transitions.slow,
    }}>
      <h3 style={{
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
        marginBottom: spacing[3],
        color: colors.denim,
      }}>
        {t.controls.transcription}
      </h3>
      <p style={{
        fontSize: typography.sizes.sm,
        lineHeight: 1.7,
        fontStyle: 'italic',
        color: colors.lavande,
      }}>
        "Il y a des jours où le silence pèse plus lourd que n'importe quel mot.
        Mais dans ce silence, j'ai appris à entendre ma propre voix..."
      </p>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // COMPOSANT ARTEFACT
  // ═══════════════════════════════════════════════════════════════════════
  const Artifact = ({ type, label, isActive, onClick }) => {
    const icons = {
      image: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      video: <><rect x="2" y="2" width="20" height="20" rx="2" /><polygon points="10 8 16 12 10 16 10 8" /></>,
      audio: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" /></>,
      object3d: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
      poetry: <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /></>,
      environment: <><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="10" ry="4" /><path d="M12 2v20" /></>,
    };

    return (
      <button
        onClick={onClick}
        style={{
          padding: spacing[6],
          borderRadius: '16px',
          border: `1px solid ${isActive ? currentColors.accent : `${colors.blanc}15`}`,
          backgroundColor: isActive ? `${currentColors.accent}30` : `${colors.blanc}08`,
          boxShadow: isActive ? `0 0 40px ${currentColors.accent}30` : 'none',
          cursor: 'pointer',
          transition: transitions.slow,
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: `${currentColors.accent}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={currentColors.accent} strokeWidth="1.5">
            {icons[type]}
          </svg>
        </div>
        <p style={{ fontSize: typography.sizes.sm, color: colors.lavande, textAlign: 'center' }}>
          {label}
        </p>
      </button>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════
  // ACTE 1 — CONFRONTATION
  // ═══════════════════════════════════════════════════════════════════════
  const Act1Content = () => (
    <div style={{ paddingTop: '160px', paddingBottom: spacing[24], padding: `160px ${spacing[6]} ${spacing[24]}` }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: spacing[16] }}>
          <Bars color={colors.prune} size={24} style={{ margin: '0 auto', marginBottom: spacing[4] }} />
          <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.medium, color: colors.blanc, marginBottom: spacing[3] }}>
            {t.acts[1].subtitle}
          </h1>
          <p style={{ fontSize: typography.sizes.lg, color: colors.lavande, maxWidth: '600px', margin: '0 auto' }}>
            {t.acts[1].description}
          </p>
        </div>

        {/* Zone immersive */}
        <div style={{
          aspectRatio: '16/9',
          borderRadius: '24px',
          marginBottom: spacing[12],
          background: `radial-gradient(ellipse at center, ${colors.prune}40 0%, ${currentColors.bg} 70%)`,
          border: `1px solid ${colors.prune}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              border: `2px solid ${colors.prune}`,
              backgroundColor: `${colors.prune}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.lavande} strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <path d="M12 2v20" />
              </svg>
            </div>
            <p style={{ color: colors.lavande }}>{t.artifacts.environment}</p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.gris, marginTop: spacing[2] }}>
              Version "tourmente"
            </p>
          </div>
        </div>

        {/* Grille artefacts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: spacing[4] }}>
          <Artifact type="image" label={t.artifacts.image} />
          <Artifact type="video" label={t.artifacts.video} />
          <Artifact type="audio" label={t.artifacts.audio} />
          <Artifact type="object3d" label={t.artifacts.object3d} />
          <Artifact type="poetry" label={t.artifacts.poetry} />
          <Artifact type="environment" label={t.artifacts.environment} />
        </div>

        <div style={{ textAlign: 'center', marginTop: spacing[16] }}>
          <Button onClick={() => goToAct(2)}>
            {t.controls.continue} →
          </Button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // ACTE 2 — COMPRÉHENSION
  // ═══════════════════════════════════════════════════════════════════════
  const Act2Content = () => (
    <div style={{ paddingTop: '160px', paddingBottom: spacing[24], padding: `160px ${spacing[6]} ${spacing[24]}` }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: spacing[12] }}>
          <Bars color={colors.denim} size={24} style={{ margin: '0 auto', marginBottom: spacing[4] }} />
          <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.medium, color: colors.blanc, marginBottom: spacing[3] }}>
            {t.acts[2].subtitle}
          </h1>
          <p style={{ fontSize: typography.sizes.lg, color: colors.lavande }}>
            {t.acts[2].description}
          </p>
        </div>

        {/* Vidéo documentaire */}
        <div style={{
          aspectRatio: '16/9',
          borderRadius: '24px',
          backgroundColor: colors.fond,
          border: `1px solid ${colors.denim}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              backgroundColor: colors.denim,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              cursor: 'pointer',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill={colors.fond}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <p style={{ color: colors.blanc }}>Témoignage & Résonance</p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.lavande, marginTop: spacing[2] }}>
              Vidéo documentaire — 5:32
            </p>
          </div>
        </div>

        {/* Indicateur élément humain */}
        <div style={{
          marginTop: spacing[8],
          padding: spacing[6],
          borderRadius: '16px',
          backgroundColor: `${colors.denim}15`,
          border: `1px solid ${colors.denim}20`,
          textAlign: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.denim} strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p style={{ fontSize: typography.sizes.sm, color: colors.lavande }}>
            L'élément humain — la voix authentique derrière l'œuvre.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: spacing[16] }}>
          <Button onClick={() => goToAct(3)} variant="primary" style={{ backgroundColor: colors.denim }}>
            {t.controls.continue} →
          </Button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // ACTE 3 — RÉSOLUTION (TRANSMUTATION)
  // ═══════════════════════════════════════════════════════════════════════
  const Act3Content = () => (
    <div style={{ paddingTop: '160px', paddingBottom: spacing[24], padding: `160px ${spacing[6]} ${spacing[24]}` }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: spacing[12] }}>
          <Bars color={colors.sarcelle} size={24} style={{ margin: '0 auto', marginBottom: spacing[4] }} />
          <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.medium, color: colors.blanc, marginBottom: spacing[3] }}>
            {t.acts[3].subtitle}
          </h1>
          <p style={{ fontSize: typography.sizes.lg, color: colors.lavande }}>
            {t.acts[3].description}
          </p>
        </div>

        {/* Zone transmutation */}
        <div style={{
          aspectRatio: '16/9',
          borderRadius: '24px',
          marginBottom: spacing[12],
          background: transmutationProgress >= 100
            ? `radial-gradient(ellipse at center, ${colors.sarcelle}40 0%, ${currentColors.bg} 70%)`
            : `radial-gradient(ellipse at center, ${colors.prune}30 0%, ${currentColors.bg} 70%)`,
          border: `1px solid ${transmutationProgress >= 100 ? colors.sarcelle : colors.prune}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 1s ease-out',
        }}>
          {transmutationProgress < 100 ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: spacing[4], color: colors.lavande }}>
                {t.controls.holdToTransmute}
              </p>
              <button
                onMouseDown={() => setIsTransmuting(true)}
                onMouseUp={() => setIsTransmuting(false)}
                onMouseLeave={() => setIsTransmuting(false)}
                onTouchStart={() => setIsTransmuting(true)}
                onTouchEnd={() => setIsTransmuting(false)}
                style={{
                  position: 'relative',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  border: 'none',
                  background: `conic-gradient(${colors.sarcelle} ${transmutationProgress}%, transparent ${transmutationProgress}%)`,
                  padding: '4px',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: currentColors.bg,
                  border: `2px solid ${isTransmuting ? colors.sarcelle : `${colors.blanc}30`}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={isTransmuting ? colors.sarcelle : colors.lavande} strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                  </svg>
                </div>
              </button>
              <p style={{ marginTop: spacing[4], fontSize: typography.sizes.sm, color: colors.gris }}>
                {transmutationProgress}%
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                border: `2px solid ${colors.sarcelle}`,
                backgroundColor: `${colors.sarcelle}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.sarcelle} strokeWidth="1.5">
                  <path d="M12 3v18M3 12h18" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <p style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.medium, color: colors.sarcelle }}>
                Transmutation accomplie
              </p>
              <p style={{ fontSize: typography.sizes.sm, color: colors.lavande, marginTop: spacing[2] }}>
                Les artefacts ont été transformés en espoir.
              </p>
            </div>
          )}
        </div>

        {/* Artefacts transformés */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: spacing[4],
          opacity: transmutationProgress >= 100 ? 1 : 0.5,
          transition: 'opacity 1s',
        }}>
          <Artifact type="image" label={t.artifacts.image} isActive={transmutationProgress >= 100} />
          <Artifact type="video" label={t.artifacts.video} />
          <Artifact type="audio" label={t.artifacts.audio} />
          <Artifact type="object3d" label={t.artifacts.object3d} />
          <Artifact type="poetry" label={t.artifacts.poetry} />
          <Artifact type="environment" label={t.artifacts.environment} />
        </div>

        {/* Indicateur version */}
        <div style={{ textAlign: 'center', marginTop: spacing[8] }}>
          <span style={{
            display: 'inline-block',
            padding: `${spacing[2]} ${spacing[4]}`,
            borderRadius: '9999px',
            fontSize: typography.sizes.sm,
            backgroundColor: transmutationProgress >= 100 ? `${colors.sarcelle}20` : `${colors.prune}20`,
            color: transmutationProgress >= 100 ? colors.sarcelle : colors.lavande,
            border: `1px solid ${transmutationProgress >= 100 ? colors.sarcelle : colors.prune}30`,
          }}>
            {transmutationProgress >= 100 ? 'Version "espoir"' : 'Version "tourmente"'}
          </span>
        </div>

        {transmutationProgress >= 100 && (
          <div style={{ textAlign: 'center', marginTop: spacing[16] }}>
            <Button onClick={() => onNavigate?.('hall')}>
              {t.domes.return}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Rendu de l'acte actuel
  const renderCurrentAct = () => {
    switch (currentAct) {
      case 1: return <Act1Content />;
      case 2: return <Act2Content />;
      case 3: return <Act3Content />;
      default: return <Act1Content />;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div style={{
      fontFamily: typography.fontFamily,
      backgroundColor: currentColors.bg,
      minHeight: '100vh',
      opacity: transitioning ? 0 : 1,
      transition: 'all 0.5s ease',
    }}>
      <Header />
      <ActProgress />
      <SafeSpaceButton label={t.global.safeSpace} onClick={() => onNavigate?.('safe-space')} />
      <TranscriptionPanel />

      <main>
        {renderCurrentAct()}
      </main>

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(6"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DomeExperience;
