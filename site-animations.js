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
    setupMultisectorCarousel();
    setupPhoneActionModal();
    setupGlobalContactForm();
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

  /* ══════════════════════════════════════════
     I. CARRUSEL MULTISECTORIAL (AUTOPLAY 4S + HOVER PAUSE)
     ══════════════════════════════════════════ */
  function setupMultisectorCarousel() {
    const track = document.getElementById("multisector-track");
    const wrapper = document.getElementById("multisector-carousel-wrapper");
    if (!track || !wrapper) return;
    if (track.dataset.carouselActive === "true") return;
    track.dataset.carouselActive = "true";

    if (!track.classList.contains("relative")) {
      track.classList.add("relative");
    }

    const prevBtn = document.getElementById("multisector-prev");
    const nextBtn = document.getElementById("multisector-next");
    const dotsContainer = document.getElementById("multisector-dots");
    const cards = Array.from(track.querySelectorAll(".multisector-card"));
    const totalCards = cards.length;
    if (totalCards === 0) return;

    let currentIndex = 0;
    let autoTimer = null;
    const PAUSE_MS = 4000;

    function getVisibleCount() {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, totalCards - getVisibleCount());
    }

    function updateCarousel(animate = true) {
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      const targetCard = cards[currentIndex];
      const offset = targetCard ? targetCard.offsetLeft - cards[0].offsetLeft : 0;

      track.style.transition = animate ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)" : "none";
      track.style.transform = `translateX(-${offset}px)`;

      renderDots();
    }

    function renderDots() {
      if (!dotsContainer) return;
      const maxIndex = getMaxIndex();
      dotsContainer.innerHTML = "";
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir a posición ${i + 1}`);
        dot.className = (i === currentIndex)
          ? "w-7 h-2 rounded-full bg-heritage-red transition-all duration-300 cursor-pointer"
          : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300 cursor-pointer";
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateCarousel(true);
          startTimer();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel(true);
    }

    function prevSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex <= 0) {
        currentIndex = maxIndex;
      } else {
        currentIndex--;
      }
      updateCarousel(true);
    }

    function startTimer() {
      stopTimer();
      autoTimer = setInterval(nextSlide, PAUSE_MS);
    }

    function stopTimer() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Hover pause: se detiene al pasar el cursor por encima y se reanuda al salir
    wrapper.addEventListener("mouseenter", stopTimer);
    wrapper.addEventListener("mouseleave", startTimer);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startTimer();
      });
      prevBtn.addEventListener("mouseenter", stopTimer);
      prevBtn.addEventListener("mouseleave", startTimer);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startTimer();
      });
      nextBtn.addEventListener("mouseenter", stopTimer);
      nextBtn.addEventListener("mouseleave", startTimer);
    }

    // Soporte para gestos táctiles (Swipe en móviles)
    let touchStartX = 0;
    let touchEndX = 0;
    wrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopTimer();
    }, { passive: true });

    wrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startTimer();
    }, { passive: true });

    window.addEventListener("resize", () => {
      updateCarousel(false);
    });

    // Iniciar de inmediato
    updateCarousel(false);
    startTimer();
  }

  // Exponer globalmente
  window.setupMultisectorCarousel = setupMultisectorCarousel;

  /* ══════════════════════════════════════════
     J. MODAL DE ACCIÓN PARA TELÉFONOS (WHATSAPP O LLAMADA)
     ══════════════════════════════════════════ */
  function setupPhoneActionModal() {
    let modal = document.getElementById("pf-phone-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "pf-phone-modal";
      modal.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(10,25,47,0.72);backdrop-filter:blur(6px);opacity:0;pointer-events:none;transition:opacity 0.25s ease;";
      modal.innerHTML = `
        <div id="pf-phone-modal-card" style="position:relative;width:100%;max-width:380px;background:#ffffff;border-radius:24px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);padding:28px 24px;transform:scale(0.94);transition:transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);font-family:inherit;">
          <button type="button" id="pf-phone-modal-close" aria-label="Cerrar ventana" style="position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;background:#F1F5F9;border:none;color:#64748B;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">
            <span class="material-symbols-outlined" style="font-size:18px;">close</span>
          </button>
          <div style="text-align:center;margin-bottom:20px;">
            <div id="pf-modal-badge" style="width:52px;height:52px;margin:0 auto 12px;border-radius:50%;background:rgba(10,25,47,0.08);color:#0A192F;display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:28px;">headset_mic</span>
            </div>
            <h3 id="pf-modal-city-title" style="margin:0 0 4px;font-size:19px;font-weight:700;color:#0A192F;letter-spacing:-0.02em;">Oficina Quito</h3>
            <p id="pf-modal-phone-num" style="margin:0 0 6px;font-size:18px;font-weight:800;color:#871B1F;letter-spacing:0.04em;">099 710 2616</p>
            <p style="margin:0;font-size:13px;color:#64748B;">¿Cómo deseas comunicarte con nuestro equipo?</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <!-- WhatsApp Option -->
            <a id="pf-modal-btn-wpp" href="#" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px 18px;background:#25D366;color:#ffffff;font-size:14px;font-weight:700;border-radius:14px;text-decoration:none;box-shadow:0 4px 12px rgba(37,211,102,0.3);transition:all 0.15s;cursor:pointer;">
              <svg style="width:20px;height:20px;fill:currentColor;flex-shrink:0;" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Escribir por WhatsApp</span>
            </a>
            <!-- Call Option -->
            <a id="pf-modal-btn-call" href="#" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px 18px;background:#0A192F;color:#ffffff;font-size:14px;font-weight:700;border-radius:14px;text-decoration:none;box-shadow:0 4px 12px rgba(10,25,47,0.25);transition:all 0.15s;cursor:pointer;">
              <span class="material-symbols-outlined" style="font-size:20px;flex-shrink:0;">call</span>
              <span>Llamar por Teléfono</span>
            </a>
          </div>
          <div style="margin-top:16px;text-align:center;">
            <button type="button" id="pf-phone-modal-cancel" style="background:none;border:none;color:#94A3B8;font-size:12px;font-weight:600;cursor:pointer;padding:6px 12px;transition:color 0.2s;">
              Cancelar
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const card = modal.querySelector("#pf-phone-modal-card");
      const closeBtn = modal.querySelector("#pf-phone-modal-close");
      const cancelBtn = modal.querySelector("#pf-phone-modal-cancel");
      const wppBtn = modal.querySelector("#pf-modal-btn-wpp");
      const callBtn = modal.querySelector("#pf-modal-btn-call");

      function closeModal() {
        modal.style.opacity = "0";
        modal.style.pointerEvents = "none";
        card.style.transform = "scale(0.94)";
      }

      closeBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.opacity === "1") closeModal();
      });

      wppBtn.addEventListener("click", () => {
        setTimeout(closeModal, 400);
      });
      callBtn.addEventListener("click", () => {
        setTimeout(closeModal, 400);
      });
    }

    function openModalForCity(city, phoneRaw) {
      const modal = document.getElementById("pf-phone-modal");
      if (!modal) return;
      const card = modal.querySelector("#pf-phone-modal-card");
      const cityTitle = modal.querySelector("#pf-modal-city-title");
      const phoneNum = modal.querySelector("#pf-modal-phone-num");
      const wppBtn = modal.querySelector("#pf-modal-btn-wpp");
      const callBtn = modal.querySelector("#pf-modal-btn-call");

      const isQuito = city.toLowerCase().includes("quito") || phoneRaw.includes("0997102616") || phoneRaw.includes("09997102616");
      const cleanCity = isQuito ? "Oficina Quito" : "Oficina Guayaquil";
      const cleanDisplay = isQuito ? "099 710 2616" : "099 845 2649";
      const intlNumber = isQuito ? "593997102616" : "593998452649";
      const telHref = isQuito ? "tel:0997102616" : "tel:0998452649";
      const textMsg = encodeURIComponent(`Hola Páez Florencia (${cleanCity}), quisiera solicitar información sobre sus servicios.`);

      cityTitle.textContent = cleanCity;
      phoneNum.textContent = cleanDisplay;
      wppBtn.href = `https://wa.me/${intlNumber}?text=${textMsg}`;
      callBtn.href = telHref;

      modal.style.opacity = "1";
      modal.style.pointerEvents = "auto";
      card.style.transform = "scale(1)";
    }

    // Interceptar clics en enlaces de teléfonos móviles en toda la web
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href*="0997102616"], a[href*="09997102616"], a[href*="0998452649"], [data-phone-action]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href") || "";
        const dataPhone = link.getAttribute("data-phone") || "";
        const dataCity = link.getAttribute("data-city") || "";
        const combined = href + " " + dataPhone + " " + dataCity + " " + link.textContent;
        const city = (combined.toLowerCase().includes("guayaquil") || combined.includes("0998452649")) ? "Guayaquil" : "Quito";
        openModalForCity(city, combined);
      }
    });

    window.openPhoneActionModal = openModalForCity;
  }

  /* ══════════════════════════════════════════
     K. FORMULARIO DE CONTACTO INSTITUCIONAL GLOBAL
     ══════════════════════════════════════════ */
  function setupGlobalContactForm() {
    const pageLoadTimestamp = Date.now();

    // 1. Inyectar estilos para los inputs del formulario si no existen
    if (!document.getElementById('pf-form-styles')) {
      const style = document.createElement('style');
      style.id = 'pf-form-styles';
      style.textContent = `
        .form-input-box {
          transition: all 0.2s ease-in-out;
        }
        .form-input-box:focus-within {
          border-color: #B22222 !important;
          box-shadow: 0 0 0 3px rgba(178, 34, 34, 0.12) !important;
          background-color: #ffffff !important;
        }
      `;
      document.head.appendChild(style);
    }

    // 2. Inyectar contenedor de Toast si no existe
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 pointer-events-none transition-all duration-300 max-w-md bg-white border border-border-light rounded-2xl shadow-xl p-4 flex items-start gap-3';
      toast.innerHTML = `
        <div class="w-10 h-10 rounded-xl bg-heritage-red/10 text-heritage-red flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined" style="font-size:22px">check_circle</span>
        </div>
        <div class="flex-1 pr-2">
          <h4 id="toast-title" class="font-headline-md text-sm font-bold text-institutional-navy mb-0.5">Notificación</h4>
          <p id="toast-desc" class="font-body-md text-xs text-secondary leading-relaxed">Mensaje del sistema</p>
        </div>
        <button onclick="hideToast()" class="text-secondary hover:text-institutional-navy p-1 rounded-lg">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      `;
      document.body.appendChild(toast);
    }

    let toastTimer = null;
    function showToast(title, desc) {
      const t = document.getElementById('toast');
      if (!t) return;
      const tTitle = document.getElementById('toast-title');
      const tDesc = document.getElementById('toast-desc');
      if (tTitle) tTitle.textContent = title;
      if (tDesc) tDesc.textContent = desc;

      t.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
      t.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        hideToast();
      }, 5000);
    }

    function hideToast() {
      const t = document.getElementById('toast');
      if (!t) return;
      t.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      t.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }

    window.showToast = showToast;
    window.hideToast = hideToast;

    // 3. Manejador de Envío de Formulario con Capas de Seguridad
    async function handleContactSubmit(e) {
      if (e) e.preventDefault();
      const form = (e && e.target && e.target.tagName === 'FORM') ? e.target : document.getElementById('contact-form');
      if (!form) return;

      // Capa 1: Honeypot
      const gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value.trim() !== '') {
        console.warn('Bot detectado mediante Honeypot. Envío bloqueado silenciosamente.');
        showToast('¡Requerimiento Recibido!', 'Nos comunicaremos a la brevedad.');
        form.reset();
        return;
      }

      // Capa 2: Time-gate (< 2.5s)
      const timeElapsed = Date.now() - pageLoadTimestamp;
      if (timeElapsed < 2500) {
        console.warn('Envío demasiado rápido (< 2.5s).');
        showToast('Envío muy rápido', 'Por favor verifique sus datos antes de presionar enviar.');
        return;
      }

      const nameEl = form.querySelector('[name="nombre"]');
      const name = nameEl ? nameEl.value.trim() : '';
      const serviceEl = form.querySelector('[name="servicio"]');
      const service = serviceEl ? serviceEl.value : '';
      const sedeEl = form.querySelector('[name="sede"]');
      const sede = sedeEl ? sedeEl.value : '';

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Procesando envío seguro...</span>
        `;
      }

      const endpoint = form.getAttribute('action') || 'https://formspree.io/f/mqpkgbgg';
      const formData = new FormData(form);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }

        if (response.ok) {
          showToast(
            `¡Gracias ${name || 'por su contacto'}!`,
            `Su requerimiento sobre ${service || 'nuestros servicios'} para ${sede || 'su empresa'} fue enviado a nuestro equipo directivo.`
          );
          form.reset();
        } else {
          const data = await response.json();
          const errorMsg = (data.errors && data.errors.map(e => e.message).join(', ')) || 'Hubo un error al procesar el mensaje.';
          showToast('Atención', errorMsg);
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
        console.error('Error en envío Formspree:', err);
        showToast('Conexión interrumpida', 'No se pudo conectar al servicio de correo. Por favor intente vía WhatsApp.');
      }
    }

    // 4. Enviar vía WhatsApp
    function sendViaWhatsApp() {
      const nameInput = document.getElementById('form-name');
      const companyInput = document.getElementById('form-company');
      const sedeInput = document.getElementById('form-sede');
      const serviceInput = document.getElementById('form-service');
      const messageInput = document.getElementById('form-message');

      const name = (nameInput && nameInput.value.trim()) || 'Estimados señores';
      const company = (companyInput && companyInput.value.trim()) || 'No especificada';
      const sede = (sedeInput && sedeInput.value) || 'Quito';
      const service = (serviceInput && serviceInput.value) || 'Auditoría Externa';
      const message = (messageInput && messageInput.value.trim()) || 'Deseo solicitar información sobre sus servicios profesionales.';

      const phoneTarget = (sede === 'Guayaquil') ? '593998452649' : '593997102616';

      const text = encodeURIComponent(
        `*REQUERIMIENTO WEB — PAEZ, FLORENCIA & CO.*\n\n` +
        `*Nombre:* ${name}\n` +
        `*Empresa:* ${company}\n` +
        `*Sede:* ${sede}\n` +
        `*Servicio de Interés:* ${service}\n\n` +
        `*Mensaje:* ${message}`
      );

      window.open(`https://wa.me/${phoneTarget}?text=${text}`, '_blank');
    }

    window.handleContactSubmit = handleContactSubmit;
    window.sendViaWhatsApp = sendViaWhatsApp;
  }
})();
