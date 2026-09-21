/* =========================================================
   ROSHAN EBINESAR — LUXURY FILM INTERACTIVE ENGINE
   1. Cinematic Prologue & Timecode Controller
   2. Scene Tracker & Real-Time Timecode Header
   3. Dust Motes & Atmospheric Canvas Engine
   4. Camera Parallax & 3D Tilt
   5. Custom Cinematic Cursor
   6. Certificate Lightbox Modal
   7. Navigation & Scroll Interactions
   ========================================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* =========================================================
     1. CINEMATIC PROLOGUE & TIMECODE CONTROLLER
     ========================================================= */
  const prologueEl = document.getElementById('cinematicPrologue');
  const skipBtn = document.getElementById('skipPrologue');
  const timecodeEl = document.getElementById('prologueTimecode');

  let prologueTimer = null;
  let timecodeInterval = null;
  let frames = 0;
  let seconds = 0;

  function formatTimecode(sec, fr) {
    const s = String(sec).padStart(2, '0');
    const f = String(fr).padStart(2, '0');
    return `00:00:${s}:${f}`;
  }

  function startPrologueTimecode() {
    if (!timecodeEl) return;
    timecodeInterval = setInterval(() => {
      frames += 2;
      if (frames >= 24) {
        frames = 0;
        seconds++;
      }
      timecodeEl.textContent = formatTimecode(seconds, frames);
    }, 1000 / 24);
  }

  function completePrologue() {
    if (!prologueEl || prologueEl.classList.contains('prologue-complete')) return;
    prologueEl.classList.add('prologue-complete');
    sessionStorage.setItem('roshan_film_seen', 'true');
    clearInterval(timecodeInterval);
    setTimeout(() => {
      prologueEl.style.display = 'none';
    }, 1200);
  }

  if (prologueEl) {
    if (sessionStorage.getItem('roshan_film_seen') === 'true') {
      prologueEl.classList.add('prologue-complete');
      prologueEl.style.display = 'none';
    } else {
      startPrologueTimecode();
      // Slow cinematic pacing: 6.8s auto-transition
      prologueTimer = setTimeout(completePrologue, 6800);

      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          clearTimeout(prologueTimer);
          completePrologue();
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          clearTimeout(prologueTimer);
          completePrologue();
        }
      });
    }
  }

  /* =========================================================
     2. SCENE TRACKER & REAL-TIME TIMECODE HEADER
     ========================================================= */
  const sceneTagEl = document.getElementById('currentSceneTag');
  const sceneSections = document.querySelectorAll('.film-scene');
  const navLinks = document.querySelectorAll('[data-nav]');

  if (sceneSections.length) {
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sceneName = entry.target.getAttribute('data-scene') || 'SCENE // SHOWCASE';
            if (sceneTagEl) sceneTagEl.textContent = sceneName;

            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
    );

    sceneSections.forEach((sec) => sceneObserver.observe(sec));
  }

  /* =========================================================
     3. DUST MOTES & ATMOSPHERIC CANVAS ENGINE
     ========================================================= */
  const canvas = document.getElementById('filmCanvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    const count = window.innerWidth < 768 ? 28 : 60;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class DustMote {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.4;
        this.alpha = Math.random() * 0.45 + 0.15;
        this.color = Math.random() > 0.8 ? 'rgba(226, 183, 116, ' : 'rgba(56, 189, 248, ';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;

        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        // Subtle slow deflection near cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.9;
            this.y -= (dy / dist) * force * 0.9;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initDust() {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new DustMote());
      }
    }

    let animId;
    function loop() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
      resize();
      initDust();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(loop);
      }
    });

    resize();
    initDust();
    loop();
  }

  /* =========================================================
     4. CAMERA PARALLAX & 3D CARD TILT
     ========================================================= */
  if (!isTouchDevice && !prefersReducedMotion) {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
    });

    function renderParallax() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      parallaxItems.forEach((el) => {
        const factor = parseFloat(el.getAttribute('data-parallax')) || 0.03;
        const ox = currentX * factor * 100;
        const oy = currentY * factor * 100;
        el.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      });

      requestAnimationFrame(renderParallax);
    }
    renderParallax();

    // 3D Perspective Tilt on Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rx = ((y - cy) / cy) * -6;
        const ry = ((x - cx) / cx) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* =========================================================
     5. CUSTOM CINEMATIC CURSOR
     ========================================================= */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorText = document.getElementById('cursorText');

  if (!isTouchDevice && cursorDot && cursorRing) {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    function updateRing() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(updateRing);
    }
    updateRing();

    const hoverTargets = document.querySelectorAll('[data-cursor], a, button, .tilt-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('cursor-active');
        const type = el.getAttribute('data-cursor');
        if (type === 'view') {
          cursorText.textContent = 'VIEW';
        } else if (type === 'action') {
          cursorText.textContent = 'OPEN';
        } else if (type === 'link') {
          cursorText.textContent = 'LINK';
        } else {
          cursorText.textContent = '';
        }
      });

      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('cursor-active');
        cursorText.textContent = '';
      });
    });
  }

  /* =========================================================
     6. CERTIFICATE LIGHTBOX MODAL
     ========================================================= */
  const modal = document.getElementById('previewModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalBody = document.getElementById('modalBody');
  const modalOpenExt = document.getElementById('modalOpenExternal');
  const closeModalBtn = document.getElementById('closeModal');

  function openModal(src, title, meta, type = 'image') {
    if (!modal) return;
    modalTitle.textContent = title;
    modalMeta.innerHTML = meta || '';
    modalOpenExt.href = src;

    modalBody.innerHTML = '';
    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = title;
      modalBody.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      modalBody.appendChild(img);
    }

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.close();
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inDialog) closeModal();
    });

    modal.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  }

  // Bind FusionX 2026 Spotlight
  const fusionxCard = document.getElementById('fusionxCertCard');
  const fusionxBtn = document.getElementById('openFusionxModal');
  const fusionxData = {
    src: 'assets/certificates/fusionx-2026-certificate.jpg',
    title: 'FusionX 2026 — 24 Hrs Hackathon 3rd Prize Winner',
    meta: 'AWS Student Builder Group &bull; SKP Engineering College (10.9.2026) &bull; Team Leader',
    type: 'image'
  };

  [fusionxCard, fusionxBtn].forEach((el) => {
    if (el) {
      el.addEventListener('click', () => {
        openModal(fusionxData.src, fusionxData.title, fusionxData.meta, fusionxData.type);
      });
    }
  });

  // Bind AWS Community Day Spotlight
  const awsCard = document.getElementById('awsCertCard');
  const awsBtn = document.getElementById('openAwsModal');
  const awsData = {
    src: 'assets/certificates/aws-student-community-day-2026.jpg',
    title: 'AWS Student Community Day 2026 — Certificate of Appreciation',
    meta: 'SKP Engineering College, Tiruvannamalai &bull; 31st August 2026',
    type: 'image'
  };

  [awsCard, awsBtn].forEach((el) => {
    if (el) {
      el.addEventListener('click', () => {
        openModal(awsData.src, awsData.title, awsData.meta, awsData.type);
      });
    }
  });

  // Bind Certificate Gallery Cards
  const certCards = document.querySelectorAll('.film-cert-card');
  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-cert-src');
      const title = card.getAttribute('data-cert-title');
      const meta = card.getAttribute('data-cert-meta');
      const type = card.getAttribute('data-cert-type') || 'image';
      openModal(src, title, meta, type);
    });
  });

  /* =========================================================
     7. NAVIGATION & SCROLL INTERACTIONS
     ========================================================= */
  const navbar = document.getElementById('filmNavbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
  }, { passive: true });

  if (navToggle && navMenu) {
    const closeMenu = () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navMenu.querySelectorAll('[data-nav]').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (prefersReducedMotion) {
      reveals.forEach((el) => el.classList.add('in-view'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach((el) => observer.observe(el));
    }
  }

  // Back to Top Button
  const topBtn = document.getElementById('backToTop');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

})();
