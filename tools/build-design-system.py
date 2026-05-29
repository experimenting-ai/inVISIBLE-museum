#!/usr/bin/env python3
"""Encapsulate the inVISIBLE design system HTML into a single self-contained file.

Strategy
--------
- Keep original markup (src="assets/icon-X.png") intact.
- Append an inline <script> at the end of <body> that holds each icon ONCE
  as base64, then walks the DOM and rewrites each <img src="assets/…"> to the
  matching data URI. This deduplicates the payload (plum is referenced 10x).
- Inject the CSS variables that originally came from shared/brand.css.
- Add a Google Fonts loader for IBM Plex Sans + IBM Plex Mono.
- Replace the 2 missing iframes (final-landing-grad / final-hall-grad) with a
  styled placeholder.
- Drop the dead <link rel="stylesheet" href="shared/brand.css">.
"""
from __future__ import annotations

import base64
import json
import pathlib
import re
import sys

SRC = pathlib.Path("/Users/audricgagnon/PENGUIN Dropbox/Audric Gagnon/Mac/Downloads/design-system.html")
ICON_DIR = pathlib.Path("/Users/audricgagnon/PENGUIN Dropbox/Audric Gagnon/PENGUIN_OWNERS/RD/RD_AI/MNC_IN_VISIBLE/BRANDING/LOGO_FINAL")
OUT = pathlib.Path("/Users/audricgagnon/PENGUIN Dropbox/Audric Gagnon/PENGUIN_OWNERS/RD/RD_AI/MNC_IN_VISIBLE/MNC_SITE_WEB_PREVIEW/design-system.html")

# Map the asset path used in the HTML → real file on disk.
# Note: disk uses "icon_thristle.png" (typo); HTML correctly says "thistle".
ICON_MAP = {
    "assets/icon-onyx.png":      ICON_DIR / "icon_onyx.png",
    "assets/icon-plum-v2.png":   ICON_DIR / "icon_plum.png",
    "assets/icon-denim-v2.png":  ICON_DIR / "icon_denim.png",
    "assets/icon-teal-v2.png":   ICON_DIR / "icon_teal.png",
    "assets/icon-thistle.png":   ICON_DIR / "icon_thristle.png",
    # Wordmark — 792×128 px source, used in the new "Logotype" sub-section.
    "assets/wordmark-onyx.png":  ICON_DIR / "invisible_logo_onyx.png",
    "assets/wordmark-black.png": ICON_DIR / "invisible_logo_black.png",
    "assets/wordmark-white.png": ICON_DIR / "invisible_logo_white.png",
}

# HTML block injected at the top of the Iconographie section, before the 5 monograms.
WORDMARK_BLOCK = """    <!-- Wordmark · marque primaire -->
    <h3 class="h-block" style="margin-bottom:8px">Le logotype &mdash; marque primaire</h3>
    <p class="p" style="max-width:78ch; margin-bottom:32px">
      Le mot-marque <em style="font-style:normal;color:var(--ink)">/inVISIBLE</em>
      est la signature visuelle officielle du projet. Le monogramme « trois
      traits » plus bas en est la <b>version compacte</b> &mdash; r&eacute;serv&eacute;e aux
      contextes o&ugrave; le logotype ne tient pas (favicon, app icon, badge dans
      un pill, vignette d'index, en-t&ecirc;te de pi&egrave;ce). Partout o&ugrave; l'espace le
      permet, le logotype passe en premier.
    </p>

    <style>
      .wm-row {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
        margin-bottom: 24px;
      }
      @media (max-width: 980px) { .wm-row { grid-template-columns: 1fr; } }
      .wm-tile {
        border: 1px solid var(--line); border-radius: 16px;
        background: var(--bg); overflow: hidden;
        display: grid; grid-template-rows: auto 1fr;
      }
      .wm-tile .art {
        aspect-ratio: 16 / 7;
        display: grid; place-items: center;
        padding: 36px 32px;
      }
      .wm-tile.paper .art { background: var(--c-paper); }
      .wm-tile.paper-warm .art {
        background:
          repeating-linear-gradient(135deg, var(--c-paper) 0 18px, rgba(18,18,18,0.025) 18px 19px);
      }
      .wm-tile.dark .art {
        background:
          radial-gradient(ellipse 70% 60% at 50% 20%, rgba(122,59,105,0.32), transparent 65%),
          linear-gradient(180deg, #1a0e16 0%, #3a1e34 100%);
      }
      .wm-tile .art img { width: 100%; max-width: 240px; height: auto; display: block; }
      .wm-tile .body {
        padding: 16px 20px 18px; border-top: 1px solid var(--line);
        display: grid; gap: 6px;
      }
      .wm-tile .nm {
        font-family: var(--f-display); font-weight: 700;
        font-size: 16px; letter-spacing: var(--t-h4); color: var(--ink);
      }
      .wm-tile .hex {
        font-family: var(--f-mono); font-size: 10px;
        letter-spacing: var(--t-caps); text-transform: uppercase; color: var(--meta);
      }
      .wm-tile .role { font-size: 12px; color: var(--ink-2); letter-spacing: var(--t-small); margin-top: 2px; }
      .wm-meta {
        display: grid; grid-template-columns: 1fr 1fr; gap: 22px;
        margin-top: 8px; margin-bottom: 72px;
        padding: 22px 26px;
        border: 1px solid var(--line); border-radius: 14px;
        background: var(--bg-2);
      }
      @media (max-width: 980px) { .wm-meta { grid-template-columns: 1fr; } }
      .wm-meta h5 {
        font-family: var(--f-mono); font-size: 10px;
        letter-spacing: var(--t-caps); text-transform: uppercase;
        color: var(--meta); margin-bottom: 10px;
      }
      .wm-meta p, .wm-meta li {
        font-size: 13px; color: var(--ink-2); line-height: 1.55;
        letter-spacing: var(--t-small);
      }
      .wm-meta ul { list-style: none; padding: 0; display: grid; gap: 8px; }
      .wm-meta ul li {
        position: relative; padding-left: 18px;
      }
      .wm-meta ul li::before {
        content: "\\B7"; position: absolute; left: 4px; top: -4px;
        color: var(--c-plum); font-size: 22px; line-height: 1; font-weight: 700;
      }
      .wm-meta code {
        font-family: var(--f-mono); font-size: 11px;
        background: rgba(18,18,18,0.06); padding: 1px 6px; border-radius: 4px;
        color: var(--ink);
      }
    </style>

    <div class="wm-row">
      <div class="wm-tile paper">
        <div class="art"><img src="assets/wordmark-onyx.png" alt="Logotype /inVISIBLE — Onyx sur paper"></div>
        <div class="body">
          <span class="nm">Onyx &middot; usage par d&eacute;faut</span>
          <span class="hex">#121212 sur paper #F4EFE5</span>
          <span class="role">Landing, hall, en-t&ecirc;te de document, communications standard</span>
        </div>
      </div>
      <div class="wm-tile paper-warm">
        <div class="art"><img src="assets/wordmark-black.png" alt="Logotype /inVISIBLE — Noir pur"></div>
        <div class="body">
          <span class="nm">Noir pur &middot; print &amp; mono</span>
          <span class="hex">#000000 &middot; contraste maximal</span>
          <span class="role">Impression offset, fax / mono strict, contextes l&eacute;gaux</span>
        </div>
      </div>
      <div class="wm-tile dark">
        <div class="art"><img src="assets/wordmark-white.png" alt="Logotype /inVISIBLE — Blanc sur fond sombre"></div>
        <div class="body">
          <span class="nm">Blanc &middot; surface sombre</span>
          <span class="hex">#FFFFFF &middot; sur d&ocirc;me dark, photo, vid&eacute;o</span>
          <span class="role">Sas d'entr&eacute;e, splash, signature vid&eacute;o, fond photo immersif</span>
        </div>
      </div>
    </div>

    <div class="wm-meta">
      <div>
        <h5>Cadrage &amp; tailles</h5>
        <ul>
          <li>Ratio natif <b>6.19:1</b> (source 792&times;128 px, vectorielle dans <code>invisible_logo.ai</code>)</li>
          <li>Largeur minimale utile <b>120 px</b>. Sous ce seuil, basculer sur le monogramme.</li>
          <li>Marge de respiration minimale autour du logotype&nbsp;: <b>hauteur du &laquo;&nbsp;/&nbsp;&raquo; initial</b> sur les quatre c&ocirc;t&eacute;s.</li>
          <li>Aucun aplat color&eacute; entre le logotype et son fond (le witness color ne touche jamais directement les lettres).</li>
        </ul>
      </div>
      <div>
        <h5>&Agrave; &eacute;viter</h5>
        <ul>
          <li>Recolorer le logotype dans une teinte t&eacute;moin (plum / denim / teal / thistle). Le logotype reste neutre &mdash; les t&eacute;moins parlent par le monogramme.</li>
          <li>Poser le logotype <em style="font-style:normal;color:var(--ink)">Onyx</em> sur un d&ocirc;me dark&nbsp;: contraste cass&eacute;. Toujours bascule sur la variante <b>Blanc</b>.</li>
          <li>Italique, gras, ombre, contour ou tracking custom&nbsp;: la forme est fix&eacute;e par le fichier vectoriel, ne pas la r&eacute;-rendre en CSS.</li>
          <li>Tronquer le slash initial ou le mot &laquo;&nbsp;VISIBLE&nbsp;&raquo; pour un cadrage carr&eacute; &mdash; utiliser le monogramme pour ces contextes.</li>
        </ul>
      </div>
    </div>

"""


def b64_data_uri(path: pathlib.Path) -> str:
    return f"data:image/png;base64,{base64.b64encode(path.read_bytes()).decode('ascii')}"


def main() -> int:
    if not SRC.exists():
        print(f"ERROR: source HTML not found: {SRC}", file=sys.stderr)
        return 1

    html = SRC.read_text(encoding="utf-8")

    # 1. Build the icon registry — one entry per unique icon.
    registry: dict[str, str] = {}
    for src_path, file_path in ICON_MAP.items():
        if not file_path.exists():
            print(f"ERROR: icon source missing: {file_path}", file=sys.stderr)
            return 1
        registry[src_path] = b64_data_uri(file_path)
        n = html.count(f'src="{src_path}"')
        print(f"  ✓ registered {src_path}  ({len(registry[src_path]):,} chars, {n} refs)")

    # 2. Drop the dead brand.css link
    html = html.replace('<link rel="stylesheet" href="shared/brand.css">', "")

    # 3. Inject Google Fonts loader + missing CSS vars right after <title>
    head_inject = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;700&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@400;700&display=swap">
<style>
/* Variables originally provided by shared/brand.css — inlined for standalone delivery */
:root {
  --f-sans:  "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --f-mono:  "IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
  --c-paper: #f4efe5;
  --c-ink:   #121212;
  --c-plum:  #7A3B69;
  --c-denim: #6B8FB3;
  --c-teal:  #86BBB6;
  --c-thistle: #D4C9E3;
  --c-onyx:  #121212;
}
/* Avoid layout shift while base64 icons resolve */
img[src^="assets/"] { background: rgba(18,18,18,0.04); }
/* Reduced-motion floor (originally in brand.css) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
html { scroll-behavior: smooth; }
</style>
"""
    html = html.replace("<title>", head_inject + "<title>", 1)

    # 4. Iframes — keep the live <iframe src="final-…-grad.html"> if the target
    #    files exist next to the output (repo build), otherwise swap for a
    #    placeholder (standalone delivery).
    iframe_pattern = re.compile(
        r'<iframe src="(final-(?:landing|hall)-grad\.html)[^"]*"[^>]*></iframe>',
        re.IGNORECASE,
    )
    iframe_targets = set(m.group(1) for m in iframe_pattern.finditer(html))
    missing = [t for t in iframe_targets if not (OUT.parent / t).exists()]
    if missing:
        placeholder_template = (
            '<div style="width:100%;height:460px;display:grid;place-items:center;'
            'background:repeating-linear-gradient(135deg, var(--c-paper) 0 18px, '
            'rgba(18,18,18,0.04) 18px 19px);text-align:center;padding:24px;">'
            '<div style="max-width:36ch;display:grid;gap:10px;">'
            '<span style="font-family:var(--f-mono);font-size:10px;letter-spacing:0.20em;'
            'text-transform:uppercase;color:var(--meta);">Aperçu non embarqué</span>'
            '<p style="font-family:var(--f-sans);font-size:13px;color:var(--ink-2);line-height:1.55;margin:0;">'
            '<code style="font-family:var(--f-mono);background:rgba(18,18,18,0.06);padding:1px 6px;border-radius:4px;">{name}</code> '
            'sera servi par la build du site &mdash; cette version standalone du système ne l\'inline pas.</p>'
            '</div></div>'
        )
        def maybe_replace(m: re.Match[str]) -> str:
            name = m.group(1)
            if name in missing:
                return placeholder_template.format(name=name)
            return m.group(0)
        html, n_iframes = iframe_pattern.subn(maybe_replace, html)
        print(f"  ⚠ {len(missing)} target(s) missing → placeholdered: {missing}")
    else:
        print(f"  ✓ all {len(iframe_targets)} iframe target(s) present → kept live")

    # 5. Splice the Wordmark sub-section before "<!-- 5 icons -->"
    anchor = "    <!-- 5 icons -->"
    if anchor not in html:
        print(f"ERROR: anchor not found in HTML: {anchor!r}", file=sys.stderr)
        return 1
    html = html.replace(anchor, WORDMARK_BLOCK + anchor, 1)
    print("  ✓ injected wordmark sub-section before monogram set")

    # 6. Append the icon-resolver script before </body>
    registry_json = json.dumps(registry, ensure_ascii=False)
    resolver = f"""
<script>
/* Single-file delivery: every <img src="assets/…"> is rewired at load time to
   a base64 data URI held once in this registry. Saves ~180 KB vs inline duplication. */
(function () {{
  var registry = {registry_json};
  function resolve() {{
    document.querySelectorAll('img[src^="assets/"]').forEach(function (img) {{
      var key = img.getAttribute('src');
      if (registry[key]) img.setAttribute('src', registry[key]);
    }});
  }}
  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', resolve);
  }} else {{
    resolve();
  }}
}})();
</script>
</body>"""
    if "</body>" not in html:
        print("ERROR: no </body> tag found", file=sys.stderr)
        return 1
    html = html.replace("</body>", resolver, 1)

    # Sanity: assets/ refs should still be present (they'll be rewritten by JS at runtime)
    remaining_assets = sorted(set(re.findall(r'(?:src|href)="(assets/[^"]+)"', html)))
    print(f"  ℹ {len(remaining_assets)} unique asset path(s) kept in markup, "
          f"rewired by JS at runtime")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    size_kb = OUT.stat().st_size / 1024
    print(f"\n✅ Wrote {OUT}  ({size_kb:.1f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
