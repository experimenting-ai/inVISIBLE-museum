# /inVISIBLE — L'empreinte de nos silences

Musée virtuel immersif sur la santé mentale. Projet numérique qui traduit des témoignages de personnes vivant avec un trouble de santé mentale en artefacts sensoriels générés par l'IA.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📁 Structure du projet

```
invisible-museum/
├── src/
│   ├── components/
│   │   └── shared.jsx          # Composants réutilisables (Bars, Logo, Portal, etc.)
│   ├── pages/
│   │   ├── LandingPage.jsx     # Page d'accueil + Hall Central
│   │   ├── DomeExperience.jsx  # Expérience 3 actes avec artefacts IA
│   │   └── VRInterface.jsx     # Interface VR/WebXR
│   ├── styles/
│   │   └── design-system.js    # Couleurs, typographie, tokens de design
│   ├── i18n/
│   │   └── content.js          # Traductions FR/EN
│   ├── App.jsx                 # Application principale + routing
│   └── index.jsx               # Point d'entrée
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Fond | `#050508` | Arrière-plan principal |
| Sarcelle | `#86BBB6` | Accent principal, atmosphère |
| Prune | `#7A3B69` | Acte 3 (espoir), Espace Protégé |
| Denim | `#6B8FB3` | Acte 2 (compréhension) |
| Lavande | `#D4C9E3` | Texte secondaire |
| Blanc | `#FFFFFF` | Texte principal |

### Motif visuel

Les **barres obliques (///)** avec opacité décroissante représentent le parcours de l'invisible vers le visible.

### Typographie

- **Police**: IBM Plex Sans
- **Titres**: SemiBold (600)
- **Corps**: Regular (400)

## 🗂️ Pages

### 1. Landing Page
- Modal d'avertissement (contenu sensible)
- Hero avec portail lumineux
- Hall Central avec vidéo "Le Processus"
- Grille des 3 Dômes d'Expérience

### 2. Dome Experience
- **Acte 1 — Confrontation**: Artefacts IA version "tourmente"
- **Acte 2 — Compréhension**: Vidéo documentaire "Témoignage & Résonance"
- **Acte 3 — Résolution**: Interaction de transmutation vers version "espoir"

### 3. VR Interface
- HUD (Head-Up Display) pour WebXR
- Réticule de regard (gaze)
- Menu flottant
- Mode confort (vignette)
- Indicateur de présences (synapses lumineuses)

## ♿ Accessibilité

- Conforme WCAG 2.2 AA
- Support `prefers-reduced-motion`
- Transcriptions disponibles
- Mode intensité réduite
- Navigation clavier complète
- Bouton "Espace Protégé" toujours visible

## 🌐 Internationalisation

Bilingue FR/EN. Voir `src/i18n/content.js` pour les traductions.

## 🔧 Personnalisation

### Modifier les couleurs
Éditer `src/styles/design-system.js`

### Ajouter du contenu
Éditer `src/i18n/content.js`

### Ajouter des pages
1. Créer le composant dans `src/pages/`
2. Ajouter la route dans `src/App.jsx`

---

**Projet de**: SAT · Institut Douglas · Experimenting.ai
