import React from 'react';
import { colors, typography, transitions, shadows } from '../styles/design-system';

// ═══════════════════════════════════════════════════════════════════════════
// BARRES OBLIQUES — Motif central du branding
// Trois barres avec opacité décroissante (gauche → droite)
// ═══════════════════════════════════════════════════════════════════════════

export const Bars = ({
  color = colors.blanc,
  size = 24,
  opacities = [0.9, 0.5, 0.25],
  className = '',
  style = {},
}) => (
  <svg
    width={size * 1.2}
    height={size}
    viewBox="0 0 30 24"
    className={className}
    style={{ display: 'inline-block', ...style }}
    aria-hidden="true"
  >
    <rect
      x="2" y="2" width="5" height="20" rx="1"
      fill={color} opacity={opacities[0]}
      transform="skewX(-12)"
    />
    <rect
      x="12" y="2" width="5" height="20" rx="1"
      fill={color} opacity={opacities[1]}
      transform="skewX(-12)"
    />
    <rect
      x="22" y="2" width="5" height="20" rx="1"
      fill={color} opacity={opacities[2]}
      transform="skewX(-12)"
    />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════
// LOGO — /inVISIBLE
// ═══════════════════════════════════════════════════════════════════════════

export const Logo = ({
  size = 'md',
  showTagline = false,
  tagline = "L'empreinte de nos silences",
  accentColor = colors.sarcelle,
}) => {
  const sizes = {
    sm: { fontSize: '1.125rem', taglineSize: '0.625rem' },
    md: { fontSize: '1.5rem', taglineSize: '0.75rem' },
    lg: { fontSize: '2.5rem', taglineSize: '0.875rem' },
    xl: { fontSize: '3.5rem', taglineSize: '0.875rem' },
  };

  const s = sizes[size];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{
        fontSize: s.fontSize,
        fontWeight: typography.weights.semibold,
        letterSpacing: typography.letterSpacing.tight,
        margin: 0,
      }}>
        <span style={{
          color: accentColor,
          fontStyle: 'italic',
          fontWeight: typography.weights.regular,
        }}>
          /in
        </span>
        <span style={{ color: colors.blanc }}>VISIBLE</span>
      </h1>

      {showTagline && (
        <p style={{
          marginTop: '12px',
          fontSize: s.taglineSize,
          letterSpacing: typography.letterSpacing.wider,
          textTransform: 'uppercase',
          color: colors.lavande,
          opacity: 0.8,
        }}>
          {tagline}
        </p>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PORTAIL LUMINEUX — CTA principal
// L'ellipse lumineuse qui invite à entrer
// ═══════════════════════════════════════════════════════════════════════════

export const Portal = ({
  onClick,
  width = 256,
  height = 64,
  glowColor = colors.sarcelle,
  accentColor = colors.prune,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Lueur externe */}
      <div style={{
        position: 'absolute',
        inset: '-32px',
        borderRadius: '50%',
        filter: 'blur(24px)',
        background: `radial-gradient(ellipse, ${glowColor}30 0%, transparent 70%)`,
        opacity: isHovered ? 0.8 : 0.5,
        transition: transitions.slow,
      }} />

      {/* Ellipse principale */}
      <div style={{
        position: 'relative',
        width,
        height,
        borderRadius: '9999px',
        background: `linear-gradient(180deg, ${glowColor}40 0%, ${accentColor}20 100%)`,
        boxShadow: `0 0 60px ${glowColor}40, inset 0 2px 20px ${colors.blanc}20`,
        border: `1px solid ${glowColor}50`,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: transitions.slow,
      }} />

      {/* Reflet intérieur */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '75%',
        height: '8px',
        borderRadius: '9999px',
        background: `linear-gradient(90deg, transparent, ${colors.blanc}30, transparent)`,
      }} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BOUTON ESPACE PROTÉGÉ — Toujours visible
// ═══════════════════════════════════════════════════════════════════════════

export const SafeSpaceButton = ({
  label = 'Sortir',
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        borderRadius: '9999px',
        border: 'none',
        backgroundColor: `${colors.urgence}dd`,
        color: colors.blanc,
        boxShadow: shadows.safeSpace,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: transitions.normal,
      }}
      aria-label={label}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span style={{ fontSize: typography.sizes.sm }}>{label}</span>
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BOUTON PRIMAIRE
// ═══════════════════════════════════════════════════════════════════════════

export const Button = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, ghost
  size = 'md',
  fullWidth = false,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const variants = {
    primary: {
      backgroundColor: colors.sarcelle,
      color: colors.fond,
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.blanc,
      border: `1px solid ${colors.blanc}30`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.lavande,
      border: 'none',
    },
  };

  const sizes = {
    sm: { padding: '8px 16px', fontSize: typography.sizes.sm },
    md: { padding: '16px 32px', fontSize: typography.sizes.base },
    lg: { padding: '20px 40px', fontSize: typography.sizes.lg },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        width: fullWidth ? '100%' : 'auto',
        borderRadius: '12px',
        fontWeight: typography.weights.medium,
        opacity: disabled ? 0.5 : isHovered ? 0.9 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: transitions.normal,
      }}
    >
      {children}
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FOND ATMOSPHÉRIQUE
// Recréé les lueurs cosmiques du branding
// ═══════════════════════════════════════════════════════════════════════════

export const AtmosphericBackground = ({
  variant = 'hero', // hero, hall, dome
  children,
}) => {
  const backgrounds = {
    hero: `
      radial-gradient(ellipse 120% 60% at 50% 0%, ${colors.sarcelle}25 0%, transparent 60%),
      radial-gradient(ellipse 80% 40% at 30% 20%, ${colors.denim}15 0%, transparent 50%),
      radial-gradient(ellipse 60% 30% at 70% 15%, ${colors.prune}15 0%, transparent 40%)
    `,
    hall: `
      radial-gradient(ellipse 60% 40% at 20% 50%, ${colors.denim}08 0%, transparent 50%),
      radial-gradient(ellipse 50% 50% at 80% 60%, ${colors.prune}08 0%, transparent 50%)
    `,
    dome: `
      radial-gradient(ellipse 80% 60% at 50% 30%, ${colors.prune}20 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 30% 70%, ${colors.sarcelle}10 0%, transparent 50%)
    `,
  };

  return (
    <div style={{
      position: 'relative',
      backgroundColor: colors.fond,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: backgrounds[variant],
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// INDICATEUR DE PROGRESSION (ACTES)
// ═══════════════════════════════════════════════════════════════════════════

export const ProgressIndicator = ({
  currentStep = 1,
  totalSteps = 3,
  onStepClick,
  labels = ['Confrontation', 'Compréhension', 'Résolution'],
  accentColors = [colors.prune, colors.denim, colors.sarcelle],
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    }}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const accentColor = accentColors[i] || colors.sarcelle;

        return (
          <button
            key={step}
            onClick={() => onStepClick?.(step)}
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: `2px solid ${isActive ? accentColor : `${colors.blanc}30`}`,
              backgroundColor: isActive ? `${accentColor}30` : 'transparent',
              color: colors.blanc,
              fontWeight: typography.weights.semibold,
              cursor: 'pointer',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: transitions.slow,
            }}
            aria-current={isActive ? 'step' : undefined}
            aria-label={labels[i]}
          >
            {step}
          </button>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CARTE DÔME
// ═══════════════════════════════════════════════════════════════════════════

export const DomeCard = ({
  number,
  title,
  subtitle,
  onClick,
  accentColor = colors.sarcelle,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Cercle avec lueur */}
      <div style={{
        position: 'relative',
        width: '112px',
        height: '112px',
        margin: '0 auto 24px',
      }}>
        {/* Lueur au hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          filter: 'blur(20px)',
          backgroundColor: accentColor,
          opacity: isHovered ? 0.3 : 0,
          transition: transitions.slow,
        }} />

        {/* Cercle principal */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(circle at 30% 30%, ${accentColor}20 0%, transparent 60%)`,
          border: `1px solid ${accentColor}40`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: transitions.slow,
        }}>
          <span style={{
            fontSize: typography.sizes['3xl'],
            fontWeight: typography.weights.light,
            color: colors.blanc,
          }}>
            {number}
          </span>
        </div>
      </div>

      {/* Texte */}
      <p style={{
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
        color: colors.blanc,
        marginBottom: subtitle ? '4px' : 0,
      }}>
        {title}
      </p>

      {subtitle && (
        <p style={{
          fontSize: typography.sizes.xs,
          color: colors.lavande,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default {
  Bars,
  Logo,
  Portal,
  SafeSpaceButton,
  Button,
  AtmosphericBackground,
  ProgressIndicator,
  DomeCard,
};
