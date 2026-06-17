/* /inVISIBLE — bilingual toggle + accent receiver
   Used by each variation page when iframed inside the design canvas. */

(function () {
  const html = document.documentElement;

  // ── Language ──────────────────────────────────────────
  const savedLang = (() => {
    try { return localStorage.getItem('invisible.lang') || 'fr'; }
    catch { return 'fr'; }
  })();
  html.setAttribute('data-lang', savedLang);

  window.setLang = function (lang) {
    html.setAttribute('data-lang', lang);
    try { localStorage.setItem('invisible.lang', lang); } catch {}
    document.querySelectorAll('[data-lang-toggle]').forEach((el) => {
      el.querySelectorAll('button').forEach((b) => {
        b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
      });
    });
    // bubble up to parent canvas so siblings sync
    try { window.parent.postMessage({ type: 'invisible:lang', lang }, '*'); } catch {}
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang-toggle] button');
    if (btn && btn.dataset.lang) window.setLang(btn.dataset.lang);
  });

  // sync from parent / siblings
  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'invisible:lang' && e.data.lang) {
      html.setAttribute('data-lang', e.data.lang);
      try { localStorage.setItem('invisible.lang', e.data.lang); } catch {}
      document.querySelectorAll('[data-lang-toggle] button').forEach((b) => {
        b.setAttribute('aria-pressed', b.dataset.lang === e.data.lang ? 'true' : 'false');
      });
    }
    if (e.data.type === 'invisible:accent' && e.data.accent) {
      window.setAccent(e.data.accent);
    }
  });

  // initialise toggle ui state once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang-toggle] button').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.lang === savedLang ? 'true' : 'false');
    });
  });

  // ── Accent palette ─────────────────────────────────────
  const PALETTES = {
    teal:     { accent: '#7ec0bb', soft: 'rgba(126,192,187,0.18)' },
    lavender: { accent: '#b8b5d6', soft: 'rgba(184,181,214,0.22)' },
    plum:     { accent: '#8e4b75', soft: 'rgba(142,75,117,0.18)' },
    blue:     { accent: '#8aa6c8', soft: 'rgba(138,166,200,0.20)' },
  };
  const savedAccent = (() => {
    try { return localStorage.getItem('invisible.accent') || 'teal'; }
    catch { return 'teal'; }
  })();
  window.setAccent = function (name) {
    const p = PALETTES[name]; if (!p) return;
    document.documentElement.style.setProperty('--accent', p.accent);
    document.documentElement.style.setProperty('--accent-soft', p.soft);
    document.documentElement.setAttribute('data-accent', name);
    try { localStorage.setItem('invisible.accent', name); } catch {}
  };
  window.setAccent(savedAccent);
})();
