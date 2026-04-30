// ═══════════════════════════════════════════════════════════════════════════
// IN/VISIBLE — Contenu multilingue (FR/EN)
// ═══════════════════════════════════════════════════════════════════════════

export const content = {
  fr: {
    // Global
    global: {
      tagline: "L'empreinte de nos silences",
      safeSpace: "Sortir",
      loading: "Chargement...",
    },

    // Navigation
    nav: {
      home: "Accueil",
      explore: "Explorer",
      project: "Le Projet",
      resources: "Ressources",
    },

    // Avertissement
    warning: {
      title: "Avant d'entrer",
      message: "Cette expérience aborde des thèmes sensibles liés à la santé mentale.",
      advice: "Prenez le temps qu'il vous faut.",
      enter: "Entrer",
      resources: "Ressources d'aide",
    },

    // Hero
    hero: {
      subtitle: "Musée virtuel immersif",
      cta: "Entrer dans le musée",
      scroll: "Défiler",
    },

    // Hall Central
    hall: {
      subtitle: "Hall Central",
      title: "La Maison",
      description: "Découvrez le processus créatif et choisissez votre parcours.",
      video: "Le Processus",
    },

    // Dômes
    domes: {
      title: "Dômes d'Expérience",
      subtitle: "Trois récits, trois parcours vers la lumière",
      dome1: { name: "Dôme 1", story: "L'histoire de Marie" },
      dome2: { name: "Dôme 2", story: "L'histoire de Thomas" },
      dome3: { name: "Dôme 3", story: "L'histoire de Sophie" },
      enter: "Explorer",
      return: "Retour au Hall",
    },

    // Actes
    acts: {
      1: {
        title: "Acte 1 — Confrontation",
        subtitle: "L'écho de la tourmente",
        description: "Plongez dans l'univers sensoriel de la douleur intérieure.",
      },
      2: {
        title: "Acte 2 — Compréhension",
        subtitle: "Témoignage & Résonance",
        description: "Écoutez la voix humaine derrière l'œuvre.",
      },
      3: {
        title: "Acte 3 — Résolution",
        subtitle: "La transmutation de l'espoir",
        description: "Transformez la tourmente en lumière.",
      },
    },

    // Artefacts
    artifacts: {
      image: "Image générée par IA",
      video: "Vidéo générative",
      audio: "Ambiance sonore spatialisée",
      object3d: "Objet 3D interactif",
      poetry: "Fragment poétique",
      environment: "Environnement 360°",
    },

    // Contrôles
    controls: {
      sound: "Son",
      soundOn: "Activer le son",
      soundOff: "Couper le son",
      transcription: "Transcription",
      continue: "Continuer",
      transmute: "Transmuter",
      holdToTransmute: "Maintenez pour transmuter",
      back: "Retour",
    },

    // VR
    vr: {
      menu: "Menu",
      recenter: "Recentrer",
      comfort: "Mode confort",
      presence: "présences",
      exit: "Quitter",
      pointToSelect: "Pointez pour sélectionner",
      pressToActivate: "Appuyez pour activer",
    },

    // Accessibilité
    accessibility: {
      reducedIntensity: "Mode intensité réduite",
      transcriptionAvailable: "Transcription disponible",
    },

    // Footer
    footer: {
      partners: "SAT · Institut Douglas · Experimenting.ai",
      credits: "Crédits",
      accessibilityPage: "Accessibilité",
      contact: "Contact",
    },
  },

  en: {
    // Global
    global: {
      tagline: "The Imprint of Our Silences",
      safeSpace: "Exit",
      loading: "Loading...",
    },

    // Navigation
    nav: {
      home: "Home",
      explore: "Explore",
      project: "The Project",
      resources: "Resources",
    },

    // Warning
    warning: {
      title: "Before Entering",
      message: "This experience addresses sensitive mental health themes.",
      advice: "Take the time you need.",
      enter: "Enter",
      resources: "Support resources",
    },

    // Hero
    hero: {
      subtitle: "Immersive Virtual Museum",
      cta: "Enter the museum",
      scroll: "Scroll",
    },

    // Central Hall
    hall: {
      subtitle: "Central Hall",
      title: "The House",
      description: "Discover the creative process and choose your path.",
      video: "The Process",
    },

    // Domes
    domes: {
      title: "Experience Domes",
      subtitle: "Three stories, three paths toward the light",
      dome1: { name: "Dome 1", story: "Marie's Story" },
      dome2: { name: "Dome 2", story: "Thomas's Story" },
      dome3: { name: "Dome 3", story: "Sophie's Story" },
      enter: "Explore",
      return: "Return to Hall",
    },

    // Acts
    acts: {
      1: {
        title: "Act 1 — Confrontation",
        subtitle: "The Echo of Turmoil",
        description: "Immerse yourself in the sensory universe of inner pain.",
      },
      2: {
        title: "Act 2 — Understanding",
        subtitle: "Testimony & Resonance",
        description: "Listen to the human voice behind the work.",
      },
      3: {
        title: "Act 3 — Resolution",
        subtitle: "The Transmutation of Hope",
        description: "Transform turmoil into light.",
      },
    },

    // Artifacts
    artifacts: {
      image: "AI-generated image",
      video: "Generative video",
      audio: "Spatialized soundscape",
      object3d: "Interactive 3D object",
      poetry: "Poetic fragment",
      environment: "360° environment",
    },

    // Controls
    controls: {
      sound: "Sound",
      soundOn: "Turn sound on",
      soundOff: "Turn sound off",
      transcription: "Transcription",
      continue: "Continue",
      transmute: "Transmute",
      holdToTransmute: "Hold to transmute",
      back: "Back",
    },

    // VR
    vr: {
      menu: "Menu",
      recenter: "Recenter",
      comfort: "Comfort mode",
      presence: "presences",
      exit: "Exit",
      pointToSelect: "Point to select",
      pressToActivate: "Press to activate",
    },

    // Accessibility
    accessibility: {
      reducedIntensity: "Reduced intensity mode",
      transcriptionAvailable: "Transcription available",
    },

    // Footer
    footer: {
      partners: "SAT · Douglas Institute · Experimenting.ai",
      credits: "Credits",
      accessibilityPage: "Accessibility",
      contact: "Contact",
    },
  },
};

// Hook pour utiliser les traductions
export const useTranslation = (language = 'fr') => {
  return content[language] || content.fr;
};

export default content;
