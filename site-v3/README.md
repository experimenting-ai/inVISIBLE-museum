# /inVISIBLE — Site V3

**Une fusion :** la **structure et l'UI de la V1** (site multipage original) + le **frame visuel de la
direction « design system »** (le `design-system.html` du repo et son exécution `v2/`, alignée sur le
design system) + le **contenu de la Grille V4** posé en **placeholders**.

> Ce n'est pas une refonte : on garde ce que la V1 fait, on l'habille du nouveau look, on remplit
> chaque page selon la grille. Aucun contenu éditorial final n'a été inventé.

## Les trois sources
- **Structure = V1** — le parcours et les pages d'origine, conservés (`index → sas-in → hall-central →
  dôme 1·2·3 × acte 1·2·3 → sas-out`, plus `projet / credits / ressources / accessibilite`).
- **Design = design system** — thème « paper » clair `#f4efe5`, palette verrouillée (prune `#7A3B69`,
  denim `#6B8FB3`, sarcelle `#86BBB6`, chardon `#D4C9E3`), IBM Plex Sans + IBM Plex Mono, **Chestuh
  Script** en accent rare, dégradés organiques. *(Source : `../design-system.html` + `../v2/`, la
  direction alignée sur le design system — pas la branche d'expérimentation `v2-full-uplift`.)*
- **Contenu = Grille V4** (`INVISIBLE_Grille_de_contenu_V4_20260522.xlsx`) — 128 contenus, chacun
  rendu en **placeholder** étiqueté par son no. de contenu, citant le texte de la grille.

## Pages (18)
Accueil · SAS IN · Hall Central · Dôme 1 (actes 1-2-3) · Dôme 2 (1-2-3) · Dôme 3 (1-2-3) ·
SAS OUT · Le Projet · Crédits & Contact · Ressources · Accessibilité · **Ressources supplémentaires**
*(nouvel onglet V4 — NA_223)*.

## Dôme → témoin (couleurs, comme les pastilles de la V1)
| Dôme | Participant·e | Accent | Acte 1 (tourmente) | Acte 3 (espoir) |
|---|---|---|---|---|
| Dôme 1 | Participant·e 1 | Prune `#7A3B69` | prune profond | prune pâle |
| Dôme 2 | Participant·e 2 | Denim `#6B8FB3` | denim profond | denim pâle |
| Dôme 3 | Participant·e 3 | Sarcelle `#86BBB6` | sarcelle profond | sarcelle pâle |

## UI persistante conservée de la V1 (sur chaque page)
- **Pastille de présence** (`.presence-indicator`) — *gardée*.
- **Menu d'accessibilité** (`.a11y-dropdown`) — 4 réglages natifs (animations, contraste, texte
  agrandi, focus) + volume. **Aucun overlay tiers.** *gardé*.
- **Espace protégé** + **lignes d'aide** (`.support-zone`) et **modale** `#espace-protege-modal` — *gardés*.
- Lien d'évitement, bascule **FR/EN**, pied de page.

## Le seul changement demandé
**Le menu ne suit plus la page.** La barre de navigation est en flux normal (`position: static`) —
plus de nav fixe/collante ni de révélation au défilement.

## Contenu = placeholders pilotés par la grille
Chaque no. de contenu devient un bloc `.content-block` :
identifiant + section, libellé, **placeholder média typé** (Image / Vidéo / Audio / 3D / Interactif /
Texte) citant la description de la grille, et une intention éditoriale repliée (objectif + ton).
Les items « immersive uniquement » (SAS.1.4/1.5, HC.3.1-3.4) sont conservés avec une note.
**Aucun poème, témoignage, citation, statistique ou numéro n'a été inventé.**

## Aperçu
Aucune compilation. Ouvrir `index.html` directement, ou servir / déployer le dossier `site-v3/`
en statique (ex. Vercel). `css/style.css` + `js/site.js` + `fonts/` + `img/` + `assets/` sont
autoportants.

## Couverture
Voir [`_ref/COVERAGE.md`](_ref/COVERAGE.md) — **128 / 128** contenus V4
(123 contenus de page + 5 éléments persistants EP), vérifié par grep sur disque.

## Structure du dossier
```
site-v3/
├── index.html  sas-in.html  hall-central.html
├── dome{1,2,3}-acte{1,2,3}.html   sas-out.html
├── projet.html  credits.html  ressources.html  accessibilite.html
├── ressources-supplementaires.html
├── css/style.css        # thème paper, composants, nav statique
├── js/site.js           # nav, présence, a11y, espace protégé (repris de la V1)
├── fonts/  img/  assets/ # autoportants
└── _ref/                 # DESIGN_SPEC.md, PARTIALS.html, grid_*.json, COVERAGE.md
```
