# /inVISIBLE — L'empreinte de nos silences

Musée virtuel immersif sur la santé mentale, porté par la Société des Arts Technologiques (SAT) en partenariat avec Sparkling, Experimenting AI et l'Institut universitaire en santé mentale Douglas. Subventionné par Musées numériques Canada (catégorie « Grand investissement »).

Ce dépôt contient le **site web accessible** (HTML / CSS / JS), version complémentaire à l'expérience immersive 3D développée sur Satellite (SAT).

## Démarrage rapide

Aucun build : ouvrir `index.html` dans un navigateur ou servir le dossier en statique.

```bash
# Option 1 — Python
python3 -m http.server 8080

# Option 2 — Node
npx serve .
```

## Structure

```
.
├── index.html              # Accueil
├── sas-in.html             # Sas d'entrée — préparation émotionnelle
├── hall-central.html       # Hall central — La Maison (hub)
├── dome[1-3]-acte[1-3].html  # 3 dômes × 3 actes (Confrontation / Compréhension / Résolution)
├── sas-out.html            # Sas de sortie — décompression + ressources
├── projet.html             # À propos du projet
├── credits.html            # Crédits
├── ressources.html         # Lignes d'aide et organismes
├── accessibilite.html      # Page accessibilité
├── css/style.css           # Charte graphique + styles partagés
├── js/
│   ├── nav.js              # Navigation, dropdowns, espace protégé
│   └── breathing.js        # Exercice de respiration guidée
└── img/                    # Logos + hero
```

## Charte graphique

Voir `BRANDING/GUIDE_DE_NORMES/Guide_NormesGraphiques_V2.pdf` (hors dépôt, dans Dropbox).

| Couleur | Hex | Rôle |
|---|---|---|
| Charbon Doux — Onyx | `#121212` | Fondation, ambiance immersive |
| Blanc | `#FFFFFF` | Texte principal sur fond sombre |
| Prune Royale | `#7A3B69` | Confrontation, profondeur |
| Denim Délavé | `#6B8FB3` | Calme, sécurité, sas |
| Sarcelle Discret | `#86BBB6` | Apaisement, hall, pauses |
| Étranglement | `#D4C9E3` | Douceur, résolution |

Typographie : IBM Plex Sans (en attente du licensing Chestuh ou choix de remplacement).

## Accessibilité

Cible : **WCAG 2.2 AA** + accessibilité universelle.

Implémenté :
- `:focus-visible` global, skip-to-content
- Touch targets ≥ 44 px sur la nav
- Espace protégé permanent
- Indicateur de présence
- Réglages a11y rapides (UI en place — logique JS à finaliser)
- `prefers-reduced-motion` partiellement respecté

À finaliser (voir issues) :
- Persistance localStorage des toggles a11y
- Focus trap dans toutes les modales
- Mode lecture simple
- Audiodescriptions des artefacts IA
- Sous-titres personnalisables
- Glossaire contextuel
- Indicateur de progression du parcours
- Pause globale (animations + son)
- Validation lecteur d'écran complet (NVDA / VoiceOver)

## Branches

- `main` — site web accessible (production)
- `archive/react-prototype-2026-02` — prototype React/Vite initial, abandonné en faveur du HTML/CSS/JS pur (conservé pour traçabilité)

## Partenaires

Société des Arts Technologiques · Studio Sparkling · Experimenting AI · Institut universitaire en santé mentale Douglas

Subvention : Musées numériques Canada
