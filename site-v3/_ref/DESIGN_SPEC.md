# /inVISIBLE — Site V3 — Design + Build Spec (source of truth for every page)

**Goal of V3:** take the **structure & UI of V1** (the original multi-page site), reskin it
with the **latest design direction** (the locked design system + v2 art direction), and fill
each page with **content placeholders driven strictly by the V4 content grid**. This is a
*merge*, not a redesign: keep what V1 does, dress it in the new look, populate per the grid.

## The three sources (all live in the repo, read them directly)
- **V1 structure (skeleton to KEEP):** the page of the same name at repo root, e.g.
  `../index.html`, `../sas-in.html`, `../hall-central.html`, `../dome1-acte1.html`, … Read your
  page's V1 source to preserve its sections, flow, navigation targets, and especially its
  **persistent UI** (presence pill, accessibility menu, support zone, espace-protégé modal,
  trauma warnings/overlays, footer, skip-link).
- **Latest design (the FRAME to apply):** `../design-system.html` (the locked system — palette,
  type scale, components, WCAG) and the v2 execution `../v2/index.html`, `../v2/hall.html`,
  `../v2/dome-derive.html` (organic gradient hero, paper theme, component styling). Read one
  v2 exemplar for layout language.
- **Content (the TRUTH for what goes on the page):** `_ref/grid_by_page.json` →
  the array under your page's filename. Each entry is one content ID.

## Hard rules
1. **Do NOT invent editorial/narrative content.** No fabricated poems, testimonials, quotes,
   statistics, helpline numbers, partner names, or descriptive paragraphs beyond what already
   exists in the **V1 source** (preserve its real structural/nav copy) or the **V4 grid**
   (use its descriptions, as labeled placeholders). Every content slot from the grid becomes a
   clearly-labeled **placeholder**, not finished copy. Sensitive content (dome poems, participant
   quotes, stats) is ALWAYS a placeholder.
2. **Keep V1's persistent UI verbatim in structure** (restyled only): the `.presence-zone`
   (presence pill + `.a11y-dot` accessibility menu with the 4 toggles + volume), the
   `.support-zone` (`.espace-protege` button + helpline dropdown), `#espace-protege-modal`,
   the `.skip-to-content` link, and the `.footer`. These ARE the grid's persistent elements
   EP.1.1–EP.1.5 — they must appear on every page.
3. **The menu must NOT follow the page.** The nav is **static / in normal flow** —
   `position: static` (NOT `fixed` or `sticky`), no scroll-reveal, no `nav-hidden` behavior.
   This is the one explicit change requested. It sits at the top of the document and scrolls
   away with the content.
4. **Preserve overlays & warnings.** Trauma/content warnings (grid PI.1.5 on Accueil,
   SAS.1.3 on SAS IN) and the espace-protégé modal stay as overlays.
5. **Bilingual:** keep the FR/EN toggle in the nav. Author content in **FR** (the grid is FR);
   EN can stay a stub as in V1. Set `<html lang="fr" data-lang="fr">`.
6. Link only to pages that exist in `site-v3/` (same filenames as V1) — relative, no `../`.

## Shared shell (identical on every page — use the canonical markup in `_ref/PARTIALS.html`)
Every page links the shared stylesheet and script and reuses the exact shared partials:
```html
<link rel="stylesheet" href="css/style.css">
...
<script src="js/site.js" defer></script>
```
Order in `<body>`: skip-link → **static nav** → `<main>` (page content) → footer →
support-zone → presence-zone → espace-protégé modal. Copy these blocks verbatim from
`_ref/PARTIALS.html`; only set the active nav link and the page's `<main>` content.

## Visual frame — design tokens (light "paper" theme)
Defined in `css/style.css` (built by the foundation step). Use these classes/vars, do not
hand-roll new color values:
- **Surface:** paper `--bg:#f4efe5`; ink `--ink:#121212`, `--ink-2:#2a2d36`, meta `--meta:#5e6068`.
- **Locked witness palette (same hues as V1, now on light):** Royal Plum `#7A3B69`,
  Dusty Denim `#6B8FB3`, Muted Teal `#86BBB6`, Thistle `#D4C9E3`. Surface tints must use the
  **deep-text** derivatives for text on paper: denim `#3F5F82`, teal `#2E6F73`, thistle `#6D5B96`.
- **Type:** display = **IBM Plex Sans 700** (`.h-display/.h-section/.h-block`), body = IBM Plex
  Sans 300/400, eyebrows/IDs = **IBM Plex Mono** (`.eyebrow`, uppercase, letter-spacing .2em).
  **Chestuh Script** (`--f-script`) ONLY as a rare `em` accent inside a heading (one word,
  1.25–1.6× parent) — never body, never whole headlines.
- **Organic gradient** for hero/dome backgrounds (SVG feTurbulence warp, witness tint → pale),
  per `design-system.html` §Brand gradient and `v2/index.html`. Deeper tint for Acte 1
  (tourmente), pale tint for Acte 3 (résolution/espoir).
- **Components:** `.eyebrow`, `.lede`, `.btn-primary`, `.btn-ghost`, `.pill-cartel`, `.pill-tag`,
  `.cartel` card, `.player-mini` — as documented in `design-system.html` §Composants.

## Dôme → witness mapping (matches V1's pips: plum / denim / teal)
| Dôme | Participant | Accent | Acte 1 bg (tourmente) | Acte 3 bg (espoir) |
|---|---|---|---|---|
| Dôme 1 | Participant·e 1 | Royal Plum `#7A3B69` | deep plum `#4D2342` | pale plum `#EBD9E3` |
| Dôme 2 | Participant·e 2 | Dusty Denim `#6B8FB3` | deep denim `#2D4769` | pale denim `#D5E0EC` |
| Dôme 3 | Participant·e 3 | Muted Teal `#86BBB6` | deep teal `#1F5358` | pale teal `#D7E7E4` |

Acte 2 (Compréhension) = intimate, near-neutral paper with the witness accent used sparingly.
Participant identities are placeholders ("Participant·e 1") — do NOT invent names.

## Content placeholder convention (every grid content ID → one of these)
```html
<article class="content-block" id="ID" data-content-id="ID" data-media="image|video|audio|3d|interactive|text">
  <header class="cb-head">
    <span class="cb-id">ID</span>
    <span class="cb-section">Section · Sous-section</span>
  </header>
  <h3 class="cb-title">Short human label (derive from the grid object name, FR)</h3>
  <div class="ph ph-TYPE" role="group" aria-label="Placeholder — short label">
    <span class="ph-type">Image · Vidéo · Audio · 3D · Interactif · Texte</span>
    <p class="ph-desc">«grid description verbatim» (objet_artefact_image / objet_video_audio / media_interactif)</p>
  </div>
  <details class="cb-brief">
    <summary>Intention éditoriale (grille V4)</summary>
    <p class="cb-obj"><b>Objectif :</b> «objectif_section»</p>
    <p class="cb-ton"><b>Ton &amp; style :</b> «ton_style_section»</p>
  </details>
</article>
```
- Pick `data-media` from which grid column is filled: artefact/image → `image`; video/audio →
  `video` or `audio`; media_interactif → `interactive` (or `3d` if it says 3D/GLB/GLTF); pure
  text item → `text`.
- The `.ph-desc` text is the grid's own description — quote it, don't rewrite it.
- Items the grid marks **« Immersive uniquement »** (e.g. SAS.1.4/1.5, HC.3.1–3.4): keep the
  placeholder but add a `.ph-note` line stating it is immersive-3D only / covered natively in
  the HTML-lite version, per the grid note. Do not drop it.
- The `<details>` brief is collapsed guidance, not page copy — it shows the grid's intent.

## Accessibility (carry V1 + design-system)
WCAG 2.2 AA: skip-link, visible focus, ≥44px targets, `prefers-reduced-motion` honored,
alt text / labels on every placeholder, the a11y menu toggles (reduce-motion, high-contrast,
large-text, focus-enhanced, volume) wired by `js/site.js` via `data-key` — keep their markup.
