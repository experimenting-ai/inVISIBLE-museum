/* ════════════════════════════════════════════════════════════════════════
   /inVISIBLE — i18n.js
   FR/EN toggle. Reads markup like:
     <span data-lang="fr">Bonjour</span><span data-lang="en">Hello</span>
     <div class="lang-pill" data-lang-toggle>
       <button data-lang="fr" aria-pressed="true">FR</button>
       <button data-lang="en" aria-pressed="false">EN</button>
     </div>
   The actual visibility toggle is handled by CSS rules in shared/brand.css
   (html[data-lang="X"] [data-lang="Y"] { display: none; }) — this script
   only flips the html[data-lang] attribute and wires the toggle buttons.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var html = document.documentElement;
  var STORAGE_KEY = "invisible.lang";

  function setLang(lang) {
    if (lang !== "fr" && lang !== "en") return;
    html.setAttribute("data-lang", lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    document.querySelectorAll("[data-lang-toggle] button[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    document.querySelectorAll("html[lang], html").forEach(function (h) {
      if (h === html) h.setAttribute("lang", lang);
    });
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var initial = saved || html.getAttribute("data-lang") || "fr";
    setLang(initial);

    document.querySelectorAll("[data-lang-toggle] button[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.dataset.lang); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
