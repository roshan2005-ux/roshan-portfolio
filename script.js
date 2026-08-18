/* =========================================================
   ROSHAN EBINESAR — PORTFOLIO SCRIPT
   Sections:
   1. Navbar scroll state
   2. Mobile menu toggle
   3. Active nav link on scroll
   4. Scroll-reveal animations
   5. Terminal typing effect (hero)
   6. Back-to-top button
   ========================================================= */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Navbar scroll state ---------- */
(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- 2. Mobile menu toggle ---------- */
(function mobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a section is selected
  menu.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ---------- 3. Active nav link on scroll ---------- */
(function activeNavLink() {
  const links = document.querySelectorAll('[data-nav]');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ---------- 4. Scroll-reveal animations ---------- */
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
})();

/* ---------- 5. Terminal typing effect ---------- */
(function terminalTyping() {
  const codeEl = document.getElementById('typedCode');
  if (!codeEl) return;

  const lines = [
    "const developer = {",
    "  name: 'Roshan Ebinesar',",
    "  role: 'Full-Stack Developer',",
    "  status: 'CSE Student',",
    "  stack: ['HTML', 'CSS', 'JS'],",
    "  learning: ['React', 'Node.js',",
    "             'Cybersecurity'],",
    "  mindset: 'build, break, fix, repeat'",
    "};"
  ];

  const fullText = lines.join('\n');

  if (prefersReducedMotion) {
    codeEl.textContent = fullText;
    return;
  }

  let i = 0;
  const speed = 22;

  function type() {
    if (i <= fullText.length) {
      codeEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }

  // Start once the terminal scrolls into view
  const terminal = document.querySelector('.terminal');
  if (!terminal) { type(); return; }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        type();
        obs.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(terminal);
})();

/* ---------- 6. Back-to-top button ---------- */
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => btn.classList.toggle('visible', window.scrollY > 600),
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
})();
