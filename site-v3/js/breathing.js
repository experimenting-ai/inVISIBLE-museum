/* ============================================
   /inVISIBLE — Exercice de respiration guidé
   Technique 4-7-8 (inspiré de la relaxation clinique)
   ============================================ */

class BreathingExercise {
  constructor(container) {
    this.container = container;
    this.circle = container.querySelector('.breathing-circle');
    this.label = container.querySelector('.breathing-label');
    this.startBtn = container.querySelector('.breathing-start');
    this.stopBtn = container.querySelector('.breathing-stop');
    this.isRunning = false;
    this.timer = null;
    this.cycleCount = 0;

    // 4-7-8 pattern (seconds)
    this.phases = [
      { name: 'Inspirez', className: 'inhale', duration: 4000, labelFr: 'Inspirez...', labelEn: 'Breathe in...' },
      { name: 'Retenez', className: 'hold', duration: 7000, labelFr: 'Retenez...', labelEn: 'Hold...' },
      { name: 'Expirez', className: 'exhale', duration: 8000, labelFr: 'Expirez...', labelEn: 'Breathe out...' },
    ];

    this.init();
  }

  init() {
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.start());
    }
    if (this.stopBtn) {
      this.stopBtn.addEventListener('click', () => this.stop());
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.cycleCount = 0;

    if (this.startBtn) this.startBtn.style.display = 'none';
    if (this.stopBtn) this.stopBtn.style.display = 'inline-flex';

    this.label.textContent = 'Préparez-vous...';
    this.label.setAttribute('aria-live', 'polite');

    setTimeout(() => this.runPhase(0), 1500);
  }

  stop() {
    this.isRunning = false;
    clearTimeout(this.timer);

    this.circle.className = 'breathing-circle';
    this.label.textContent = '';

    if (this.startBtn) this.startBtn.style.display = 'inline-flex';
    if (this.stopBtn) this.stopBtn.style.display = 'none';
  }

  runPhase(index) {
    if (!this.isRunning) return;

    const phase = this.phases[index];
    this.circle.className = 'breathing-circle ' + phase.className;
    this.label.textContent = phase.labelFr;

    this.timer = setTimeout(() => {
      const nextIndex = (index + 1) % this.phases.length;
      if (nextIndex === 0) this.cycleCount++;
      this.runPhase(nextIndex);
    }, phase.duration);
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.breathing-container');
  containers.forEach(c => new BreathingExercise(c));
});
