# Archive — Prototype React/Vite (février 2026)

Cette branche conserve le prototype React/Vite initial du projet /inVISIBLE pour traçabilité.

**Statut : abandonné en avril 2026** au profit du site HTML/CSS/JS pur (`main`), qui a été choisi pour :

- Maturité plus avancée (17 pages complètes vs 3 pages)
- Meilleure accessibilité par défaut (skip-to-content, landmarks ARIA, focus-visible)
- Pas de tooling à maintenir, livraison statique simple
- Performance supérieure sans hydration React
- Conformité plus simple WCAG 2.2 AA sans gérer le rendering client

## Contenu

- `src/App.jsx` — Routing manuel par état React
- `src/pages/LandingPage.jsx` — Hero + Hall en une seule page
- `src/pages/DomeExperience.jsx` — Expérience trois actes
- `src/pages/VRInterface.jsx` — Interface WebXR (HUD, gaze, etc.)
- `src/components/shared.jsx` — Bars, Logo, Portal, SafeSpaceButton, etc.
- `src/styles/design-system.js` — Tokens design en JS
- `src/i18n/content.js` — Traductions FR/EN

## À ressortir potentiellement

Quelques idées de cette version méritent d'être ré-implémentées dans `main` :

- Le composant `VRInterface` (HUD + réticule de regard) servira de référence si le pont Satellite devient nécessaire côté web.
- Le système d'i18n par dictionnaire JS est plus léger que des fichiers JSON séparés, à reconsidérer si on internationalise davantage.
- Le `WarningModal` à l'entrée (avertissement contenu sensible) n'existe pas encore dans `main` — à porter.

## Ne pas exécuter

Ne pas lancer `npm install` sur cette branche : elle n'est pas maintenue.

Pour explorer :
```bash
git checkout archive/react-prototype-2026-02
# Lecture seule
```
