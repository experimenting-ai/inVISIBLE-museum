/* ============================================
   /inVISIBLE — Navigation & Persistent Elements
   Logo adaptatif : blanc sur fond sombre, noir sur fond clair
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // --- Scroll progress bar ---
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // --- Fade-in on scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Espace protégé ---
  // Redirects to the breathing/calm section in the web experience
  const espaceBtn = document.querySelector('.espace-protege');
  if (espaceBtn) {
    espaceBtn.addEventListener('click', () => {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (currentPage === 'sas-in.html') {
        // Already on experience page — scroll to breathing section
        const breathingSection = document.getElementById('respiration');
        if (breathingSection) {
          breathingSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to experience page breathing section
        window.location.href = 'sas-in.html#respiration';
      }
    });
  }

  // --- Support / info dropdown (beside espace protégé) ---
  const supportDot = document.querySelector('.support-dot');
  const supportDropdown = document.querySelector('.support-dropdown');

  if (supportDot && supportDropdown) {
    supportDot.addEventListener('click', (e) => {
      e.stopPropagation();
      supportDropdown.classList.toggle('open');
      supportDot.setAttribute('aria-expanded', supportDropdown.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (!supportDropdown.contains(e.target) && e.target !== supportDot) {
        supportDropdown.classList.remove('open');
        supportDot.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && supportDropdown.classList.contains('open')) {
        supportDropdown.classList.remove('open');
        supportDot.setAttribute('aria-expanded', 'false');
        supportDot.focus();
      }
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
    // Dome pages → mark "Expérience" active
    if (currentPage.startsWith('dome') || currentPage === 'hall-central.html' || currentPage === 'sas-in.html' || currentPage === 'sas-out.html') {
      if (href === 'sas-in.html' || href === 'hall-central.html') {
        link.classList.add('active');
      }
    }
  });

  // --- Random presence count with singular/plural ---
  const presenceCount = document.querySelector('.presence-count');
  const presenceLabel = document.querySelector('.presence-label');
  if (presenceCount) {
    const n = Math.floor(Math.random() * 15) + 3;
    presenceCount.textContent = n;
    if (presenceLabel) {
      presenceLabel.textContent = n > 1 ? 'présences' : 'présence';
    }
  }

  // --- Contrast-adaptive logo ---
  // Detects if the page has a light or dark background
  // and swaps the logo image accordingly.
  const logoImg = document.querySelector('.nav-logo-img');
  const logoText = document.querySelector('.nav-logo-text');
  const nav = document.querySelector('.nav');

  if (logoImg) {
    function detectTheme() {
      // Check for explicit light class
      const isLight = document.body.classList.contains('hall-light') ||
                      document.body.dataset.theme === 'light';
      return isLight ? 'light' : 'dark';
    }

    function setLogoVariant() {
      const theme = detectTheme();
      if (theme === 'light') {
        logoImg.src = 'img/logo-onyx.png';
        logoImg.alt = '/inVISIBLE';
      } else {
        logoImg.src = 'img/logo-white.png';
        logoImg.alt = '/inVISIBLE';
      }
    }

    // Handle logo load failure — show text fallback
    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
      if (logoText) logoText.style.display = 'inline';
    });

    setLogoVariant();

    // Watch for class changes on body (e.g. dynamic theme switching)
    const bodyObserver = new MutationObserver(() => setLogoVariant());
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  }

  // --- Accessibility preferences (shared between dropdown + /accessibilite.html) ---
  const a11yPrefs = [
    { attr: 'data-reduce-motion', key: 'a11y-reduce-motion' },
    { attr: 'data-high-contrast', key: 'a11y-high-contrast' },
    { attr: 'data-large-text', key: 'a11y-large-text' },
    { attr: 'data-focus-enhanced', key: 'a11y-focus-enhanced' }
  ];

  // Restore saved preferences on every page
  a11yPrefs.forEach(({ attr, key }) => {
    if (localStorage.getItem(key) === 'true') {
      document.body.setAttribute(attr, 'true');
      if (key === 'a11y-large-text') {
        document.documentElement.style.fontSize = '20px';
      }
    }
  });

  // --- A11y quick-access dropdown (beside presence indicator) ---
  const a11yDot = document.querySelector('.a11y-dot');
  const a11yDropdown = document.querySelector('.a11y-dropdown');

  if (a11yDot && a11yDropdown) {
    // Toggle dropdown
    a11yDot.addEventListener('click', (e) => {
      e.stopPropagation();
      a11yDropdown.classList.toggle('open');
      a11yDot.setAttribute('aria-expanded', a11yDropdown.classList.contains('open'));
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!a11yDropdown.contains(e.target) && e.target !== a11yDot) {
        a11yDropdown.classList.remove('open');
        a11yDot.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && a11yDropdown.classList.contains('open')) {
        a11yDropdown.classList.remove('open');
        a11yDot.setAttribute('aria-expanded', 'false');
        a11yDot.focus();
      }
    });

    // Wire up mini-toggles
    a11yDropdown.querySelectorAll('.a11y-mini-toggle').forEach(toggle => {
      const key = toggle.dataset.key;
      const pref = a11yPrefs.find(p => p.key === key);
      if (!pref) return;

      // Restore state
      if (localStorage.getItem(key) === 'true') {
        toggle.classList.add('active');
        toggle.setAttribute('aria-checked', 'true');
      }

      toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        toggle.setAttribute('aria-checked', isActive ? 'true' : 'false');

        if (isActive) {
          document.body.setAttribute(pref.attr, 'true');
          localStorage.setItem(key, 'true');
          if (key === 'a11y-large-text') {
            document.documentElement.style.fontSize = '20px';
          }
        } else {
          document.body.removeAttribute(pref.attr);
          localStorage.removeItem(key);
          if (key === 'a11y-large-text') {
            document.documentElement.style.fontSize = '';
          }
        }

        // Sync with accessibilite.html toggles if on that page
        const checkbox = document.getElementById(
          key === 'a11y-reduce-motion' ? 'toggle-reduce-motion' :
          key === 'a11y-high-contrast' ? 'toggle-high-contrast' :
          key === 'a11y-large-text' ? 'toggle-large-text' :
          key === 'a11y-focus-enhanced' ? 'toggle-focus-enhanced' : ''
        );
        if (checkbox) checkbox.checked = isActive;
      });
    });

    // --- Volume slider + mute button ---
    const muteBtn = a11yDropdown.querySelector('.a11y-mute-btn');
    const volumeSlider = a11yDropdown.querySelector('.a11y-volume-slider');
    const volumeValue = a11yDropdown.querySelector('.a11y-volume-value');
    const svgVolOn = '<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
    const svgVolOff = '<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';

    if (muteBtn && volumeSlider) {
      // Restore saved volume
      const savedVol = localStorage.getItem('a11y-volume');
      const savedMute = localStorage.getItem('a11y-muted') === 'true';
      const vol = savedVol !== null ? parseInt(savedVol, 10) : 80;
      volumeSlider.value = vol;
      if (volumeValue) volumeValue.textContent = vol + '%';

      if (savedMute) {
        muteBtn.classList.add('muted');
        muteBtn.innerHTML = svgVolOff;
        muteBtn.setAttribute('aria-label', 'Réactiver le son');
      }

      volumeSlider.addEventListener('input', () => {
        const v = parseInt(volumeSlider.value, 10);
        if (volumeValue) volumeValue.textContent = v + '%';
        localStorage.setItem('a11y-volume', v);
        // If was muted, unmute on slider move
        if (muteBtn.classList.contains('muted')) {
          muteBtn.classList.remove('muted');
          muteBtn.innerHTML = svgVolOn;
          muteBtn.setAttribute('aria-label', 'Couper le son');
          localStorage.removeItem('a11y-muted');
        }
        // Dispatch event for any audio consumers
        document.dispatchEvent(new CustomEvent('a11y-volume-change', { detail: { volume: v / 100, muted: false } }));
      });

      muteBtn.addEventListener('click', () => {
        const isMuted = muteBtn.classList.toggle('muted');
        muteBtn.innerHTML = isMuted ? svgVolOff : svgVolOn;
        muteBtn.setAttribute('aria-label', isMuted ? 'Réactiver le son' : 'Couper le son');
        if (isMuted) {
          localStorage.setItem('a11y-muted', 'true');
        } else {
          localStorage.removeItem('a11y-muted');
        }
        document.dispatchEvent(new CustomEvent('a11y-volume-change', {
          detail: { volume: parseInt(volumeSlider.value, 10) / 100, muted: isMuted }
        }));
      });
    }
  }
});
