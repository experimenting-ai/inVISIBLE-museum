import React, { useState } from 'react';
import { colors, typography, spacing, transitions } from '../styles/design-system';
import { Bars, Logo, Portal, SafeSpaceButton, Button, DomeCard } from '../components/shared';
import { useTranslation } from '../i18n/content';

// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — Landing Page
// SAS IN + Hall Central + Introduction aux Dômes
// ═══════════════════════════════════════════════════════════════════════════

const LandingPage = ({ onNavigate }) => {
  const [showWarning, setShowWarning] = useState(true);
  const [language, setLanguage] = useState('fr');
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useTranslation(language);

  // ═══════════════════════════════════════════════════════════════════════
  // MODAL AVERTISSEMENT
  // ═══════════════════════════════════════════════════════════════════════
  const WarningModal = () => (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing[6],
      backgroundColor: colors.fond,
    }}>
      {/* Lueur de fond */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at 50% 70%, ${colors.prune}15 0%, transparent 50%)`,
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '384px',
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Barres obliques */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing[12] }}>
          <Bars color={colors.lavande} size={48} />
        </div>

        <h2 style={{
          fontSize: typography.sizes.xl,
          fontWeight: typography.weights.medium,
          marginBottom: spacing[8],
          color: colors.blanc,
        }}>
          {t.warning.title}
        </h2>

        <p style={{
          fontSize: typography.sizes.sm,
          lineHeight: 1.6,
          marginBottom: spacing[3],
          color: colors.lavande,
        }}>
          {t.warning.message}
        </p>

        <p style={{
          fontSize: typography.sizes.sm,
          marginBottom: spacing[12],
          color: colors.gris,
        }}>
          {t.warning.advice}
        </p>

        <Button onClick={() => setShowWarning(false)} fullWidth size="md">
          {t.warning.enter}
        </Button>

        <button
          onClick={() => onNavigate?.('resources')}
          style={{
            marginTop: spacing[4],
            background: 'none',
            border: 'none',
            fontSize: typography.sizes.sm,
            color: colors.lavande,
            cursor: 'pointer',
          }}
        >
          {t.warning.resources}
        </button>

        {/* Sélecteur de langue */}
        <div style={{
          marginTop: spacing[12],
          display: 'flex',
          justifyContent: 'center',
          gap: spacing[6],
          fontSize: typography.sizes.xs,
        }}>
          <button
            onClick={() => setLanguage('fr')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: language === 'fr' ? colors.blanc : colors.gris,
            }}
          >
            FR
          </button>
          <button
            onClick={() => setLanguage('en')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: language === 'en' ? colors.blanc : colors.gris,
            }}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════
  const Navigation = () => (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      padding: `${spacing[5]} ${spacing[6]}`,
    }}>
      <div style={{
        maxWidth: '1152px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo avec barres */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
          <Bars color={colors.sarcelle} size={20} />
          <Logo size="sm" />
        </div>

        {/* Desktop nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[8],
        }}
        className="desktop-nav"
        >
          {Object.values(t.nav).map((item, i) => (
            <a
              key={i}
              href="#"
              style={{
                fontSize: typography.sizes.sm,
                color: colors.lavande,
                textDecoration: 'none',
                transition: transitions.normal,
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          className="mobile-menu-btn"
        >
          <Bars color={colors.blanc} size={20} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: spacing[6],
          backgroundColor: `${colors.fond}f5`,
        }}>
          {Object.values(t.nav).map((item, i) => (
            <a
              key={i}
              href="#"
              style={{
                display: 'block',
                padding: `${spacing[3]} 0`,
                fontSize: typography.sizes.sm,
                color: colors.lavande,
                textDecoration: 'none',
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // HERO SECTION
  // ═══════════════════════════════════════════════════════════════════════
  const HeroSection = () => (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: colors.fond,
    }}>
      {/* Fond atmosphérique */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '66%',
        background: `
          radial-gradient(ellipse 120% 60% at 50% 0%, ${colors.sarcelle}25 0%, transparent 60%),
          radial-gradient(ellipse 80% 40% at 30% 20%, ${colors.denim}15 0%, transparent 50%),
          radial-gradient(ellipse 60% 30% at 70% 15%, ${colors.prune}15 0%, transparent 40%)
        `,
      }} />

      <div style={{
        position: 'absolute',
        top: '25%',
        left: '-25%',
        width: '50%',
        height: '50%',
        borderRadius: '50%',
        filter: 'blur(48px)',
        backgroundColor: colors.prune,
        opacity: 0.1,
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${colors.sarcelle}15 0%, transparent 60%)`,
      }} />

      {/* Contenu */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `0 ${spacing[6]}`,
      }}>
        <div style={{ marginBottom: spacing[8] }}>
          <Bars color={colors.lavande} size={32} />
        </div>

        <Logo size="xl" showTagline tagline={t.global.tagline} />

        <div style={{ height: spacing[24] }} />

        <Portal onClick={() => onNavigate?.('hall')} />

        <p style={{
          marginTop: spacing[6],
          fontSize: typography.sizes.sm,
          letterSpacing: typography.letterSpacing.wide,
          textTransform: 'uppercase',
          color: colors.sarcelle,
          opacity: 0.8,
        }}>
          {t.hero.cta}
        </p>
      </div>

      {/* Indicateur scroll */}
      <div style={{
        position: 'absolute',
        bottom: spacing[8],
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <div style={{
          width: '1px',
          height: '48px',
          margin: '0 auto',
          background: `linear-gradient(to bottom, transparent, ${colors.lavande}50, transparent)`,
        }} />
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // HALL SECTION
  // ═══════════════════════════════════════════════════════════════════════
  const HallSection = () => (
    <section style={{
      padding: `${spacing[32]} ${spacing[6]}`,
      position: 'relative',
      backgroundColor: colors.fond,
    }}>
      {/* Lueurs de fond */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 20% 50%, ${colors.denim}08 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 80% 60%, ${colors.prune}08 0%, transparent 50%)
        `,
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '896px',
        margin: '0 auto',
      }}>
        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: spacing[20] }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing[6] }}>
            <Bars color={colors.sarcelle} size={24} />
          </div>
          <p style={{
            fontSize: typography.sizes.xs,
            letterSpacing: typography.letterSpacing.widest,
            textTransform: 'uppercase',
            marginBottom: spacing[3],
            color: colors.sarcelle,
          }}>
            {t.hall.subtitle}
          </p>
          <h2 style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.medium,
            color: colors.blanc,
          }}>
            {t.hall.title}
          </h2>
        </div>

        {/* Zone vidéo */}
        <div style={{
          position: 'relative',
          aspectRatio: '16/9',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: spacing[24],
          background: `
            radial-gradient(ellipse at 50% 100%, ${colors.sarcelle}20 0%, transparent 50%),
            radial-gradient(ellipse at 20% 50%, ${colors.denim}15 0%, transparent 40%),
            radial-gradient(ellipse at 80% 30%, ${colors.prune}10 0%, transparent 40%),
            ${colors.fond}
          `,
          border: `1px solid ${colors.sarcelle}15`,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                cursor: 'pointer',
                backgroundColor: `${colors.sarcelle}30`,
                border: `1px solid ${colors.sarcelle}50`,
                transition: transitions.normal,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.blanc}>
                  <polygon points="6 4 20 12 6 20" />
                </svg>
              </div>
              <p style={{ fontSize: typography.sizes.sm, color: colors.lavande }}>
                {t.hall.video}
              </p>
            </div>
          </div>
        </div>

        {/* Dômes */}
        <div style={{ textAlign: 'center', marginBottom: spacing[16] }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing[6] }}>
            <Bars color={colors.prune} size={24} />
          </div>
          <h3 style={{
            fontSize: typography.sizes['2xl'],
            fontWeight: typography.weights.medium,
            color: colors.blanc,
          }}>
            {t.domes.title}
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: spacing[12],
        }}>
          {[1, 2, 3].map((dome) => (
            <DomeCard
              key={dome}
              number={dome}
              title={t.domes[`dome${dome}`].name}
              subtitle={t.domes[`dome${dome}`].story}
              onClick={() => onNavigate?.(`dome-${dome}`)}
              accentColor={dome === 3 ? colors.prune : colors.sarcelle}
            />
          ))}
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════════════════
  const Footer = () => (
    <footer style={{
      padding: `${spacing[16]} ${spacing[6]}`,
      backgroundColor: colors.fond,
      borderTop: `1px solid ${colors.blanc}08`,
    }}>
      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
          <Bars color={colors.sarcelle} size={18} />
          <Logo size="sm" />
        </div>
        <p style={{ fontSize: typography.sizes.xs, color: colors.gris }}>
          {t.footer.partners}
        </p>
      </div>
    </footer>
  );

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: typography.fontFamily, backgroundColor: colors.fond }}>
      {showWarning && <WarningModal />}
      <Navigation />
      <SafeSpaceButton label={t.global.safeSpace} onClick={() => onNavigate?.('safe-space')} />

      <main>
        <HeroSection />
        <HallSection />
      </main>

      <Footer />

      {/* Styles responsives */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
