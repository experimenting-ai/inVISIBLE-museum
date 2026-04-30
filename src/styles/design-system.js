// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — Design System
// L'empreinte de nos silences
// ═══════════════════════════════════════════════════════════════════════════

// Palette de couleurs — Fidèle au branding
export const colors = {
  // Base
  fond: '#050508',
  fondAlt: '#0a0a0f',

  // Palette principale
  denim: '#6B8FB3',      // Bleu — Calme, accueil
  lavande: '#D4C9E3',    // Étranglement — Texte secondaire
  sarcelle: '#86BBB6',   // Teal — Atmosphère dominante
  prune: '#7A3B69',      // Violet — Espoir, résolution

  // Neutres
  blanc: '#FFFFFF',
  gris: '#888899',
  grisFonce: '#444455',

  // États
  urgence: '#7A3B69',    // Espace protégé (= prune)
};

// Associations couleurs par contexte
export const colorsByContext = {
  landing: colors.sarcelle,
  hall: colors.sarcelle,
  acte1: colors.fond,        // Tourmente — Obscurité
  acte2: colors.denim,       // Compréhension — Calme
  acte3: colors.prune,       // Résolution — Espoir
  safeSpace: colors.prune,
};

// Typographie
export const typography = {
  fontFamily: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",

  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    '4xl': '2.5rem',   // 40px
    '5xl': '3.5rem',   // 56px
    '6xl': '4.5rem',   // 72px
  },

  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.1em',
    wider: '0.2em',
    widest: '0.3em',
  },
};

// Espacements
export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
};

// Bordures et rayons
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

// Ombres (lueurs)
export const shadows = {
  glow: {
    sarcelle: `0 0 60px ${colors.sarcelle}40`,
    prune: `0 0 40px ${colors.prune}40`,
    denim: `0 0 40px ${colors.denim}30`,
  },
  button: `0 4px 20px ${colors.sarcelle}30`,
  safeSpace: `0 4px 20px ${colors.prune}50`,
};

// Transitions
export const transitions = {
  fast: '150ms ease',
  normal: '300ms ease',
  slow: '500ms ease',
  verySlow: '700ms ease',
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

// Z-index
export const zIndex = {
  base: 0,
  content: 10,
  navigation: 40,
  modal: 50,
  safeSpace: 50,
};

// Styles globaux (à injecter)
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily};
    background-color: ${colors.fond};
    color: ${colors.blanc};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :focus-visible {
    outline: 2px solid ${colors.sarcelle};
    outline-offset: 2px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    html {
      scroll-behavior: auto;
    }
  }
`;

export default {
  colors,
  colorsByContext,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  globalStyles,
};
