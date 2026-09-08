/**
 * Páez, Florencia & Co. - Controlador Global de Animaciones
 * Manejo de Scroll Reveal, Navbar Dinámico, Barra de Lectura y Contadores (60 FPS)
 */

(function () {
  'use strict';

  // 1. Inicialización en DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteAnimations);
  } else {
    initSiteAnimations();
  }

  function initSiteAnimations() {
    setupReadingProgressBar();
    setupBackToTopButton();
    setupNavbarScrollObserver();
    setupScrollReveal();
    setupNumberCounters();
    setupButtonSheenEffects();
    setupSmoothAnchors();
    setupSafetyFallback();
  }

  /* ══════════════════════════════════════════
     A. BARRA SUPERIOR DE PROGRESO DE LECTURA
     ══════════════════════════════════════════ */
  function setupReadingProgressBar() {
    let progressBar = document.getElementById('pf-scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'pf-scroll-progress';
      document.body.prepend(progressBar);
    }

    function updateProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        progressBar.style.width = percent + '%';
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ══════════════════════════════════════════
     B. BOTÓN FLOTANTE "VOLVER ARRIBA"
     ══════════════════════════════════════════ */
  function setupBackToTopButton() {
    let btn = document.getElementById('pf-back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'pf-back-to-top';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Volver al inicio de la página');
      btn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 22px;">arrow_upward</span>';
      document.body.appendChild(btn);
    }

    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    function toggleBtnVisibility() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 450) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', toggleBtnVisibility, { passive: true });
    toggleBtnVisibility();
  }

  /* ══════════════════════════════════════════
     C. NAVBAR DINÁMICO ELEVACIÓN EN SCROLL
     ══════════════════════════════════════════ */
  function setupNavbarScrollObserver() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    function handleNavElevation() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 24) {
        nav.classList.add('pf-nav-scrolled');
      } else {
        nav.classList.remove('pf-nav-scrolled');
      }
    }

    window.addEventListener('scroll', handleNavElevation, { passive: true });
    handleNavElevation();
  }

  /* ══════════════════════════════════════════
     D. SCROLL REVEAL CON INTERSECTION OBSERVER
     ══════════════════════════════════════════ */
  function setupScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.pf-reveal, [data-anim]').forEach(el => {
        el.classList.add('in', 'pf-visible');
      });
      return;
    }

    // Auto-detección y escalonamiento de tarjetas en cuadrículas comunes
    const gridContainers = document.querySelectorAll('.grid, .pf-stagger-group');
    gridContainers.forEach(grid => {
      // Ignorar el navbar o contenedores de layout principal
      if (grid.closest('nav') || grid.closest('footer')) return;
      const children = Array.from(grid.children).filter(c => !c.classList.contains('no-reveal'));
      if (children.length > 1 && children.length <= 12) {
        children.forEach((child, idx) => {
          if (!child.classList.contains('pf-reveal') && !child.hasAttribute('data-anim') && !child.classList.contains('multisector-card') && !child.classList.contains('statistic-card')) {
            child.classList.add('pf-reveal');
            const delayClass = `delay-${Math.min(600, (idx % 4) * 100 + 100)}`;
            child.classList.add(delayClass);
          }
        });
      }
    });

    const revealElements = document.querySelectorAll('.pf-reveal, [data-anim]');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('in', 'pf-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in', 'pf-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ══════════════════════════════════════════
     E. CONTADORES NUMÉRICOS DINÁMICOS
     ══════════════════════════════════════════ */
  function setupNumberCounters() {
    const counterElements = document.querySelectorAll('.pf-counter, [data-target-counter]');
    if (!counterElements.length) return;

    if (!('IntersectionObserver' in window)) {
      counterElements.forEach(el => {
        const target = el.getAttribute('data-target-counter') || el.innerText.trim();
        el.innerText = target;
      });
      return;
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => counterObserver.observe(el));

    function animateCounter(element) {
      const rawTarget = element.getAttribute('data-target-counter') || element.innerText;
      const numMatch = rawTarget.match(/[\d.,]+/);
      if (!numMatch) return;

      const targetNumber = parseFloat(numMatch[0].replace(/,/g, ''));
      const prefix = rawTarget.substring(0, numMatch.index) || '';
      const suffix = rawTarget.substring(numMatch.index + numMatch[0].length) || '';
      const isDecimal = numMatch[0].includes('.');

      const duration = 1600; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = targetNumber * easeOut;

        element.innerText = prefix + (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString('es-EC')) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          element.innerText = rawTarget;
        }
      }

      requestAnimationFrame(updateNumber);
    }
  }

  /* ══════════════════════════════════════════
     F. MICRO-INTERACCIONES EN BOTONES
     ══════════════════════════════════════════ */
  function setupButtonSheenEffects() {
    // Solo aplicar a botones reales con relleno, NUNCA a enlaces de texto del menú de navegación
    const primaryButtons = document.querySelectorAll('button.bg-heritage-red, button.bg-institutional-navy, a.bg-heritage-red, a.bg-institutional-navy.px-6, a.bg-institutional-navy.px-8, .btn-primary');
    primaryButtons.forEach(btn => {
      // Si está en el menú de navegación y no es un botón de relleno CTA, omitir
      if (btn.closest('nav') && !btn.classList.contains('px-6') && !btn.classList.contains('py-2')) {
        return;
      }
      if (!btn.classList.contains('pf-btn-sheen')) {
        btn.classList.add('pf-btn-sheen');
      }
    });

    // Asegurar que ningún enlace de texto del navbar tenga la clase pf-btn-sheen
    document.querySelectorAll('nav a:not(.px-6)').forEach(navLink => {
      navLink.classList.remove('pf-btn-sheen');
    });
  }

  /* ══════════════════════════════════════════
     G. DESPLAZAMIENTO SUAVE PARA ANCLAS
     ══════════════════════════════════════════ */
  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeight = (document.querySelector('nav')?.offsetHeight || 80) + 16;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     H. RED DE SEGURIDAD (FAILSAFE TIMEOUT)
     ══════════════════════════════════════════ */
  function setupSafetyFallback() {
    // Si por alguna razón el observador no se dispara en 2 segundos, asegurar que todo el contenido sea visible
    setTimeout(() => {
      document.querySelectorAll('.pf-reveal:not(.in), [data-anim]:not(.in)').forEach(el => {
        el.classList.add('in', 'pf-visible');
      });
    }, 2200);
  }
})();
