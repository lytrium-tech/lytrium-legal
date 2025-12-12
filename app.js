// Lytrium — tiny JS (fast, accessible)

(() => {
  // Año footer
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Menú mobile
  const btn = document.querySelector('.nav__toggle');
  const nav = document.querySelector('[data-nav]');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Cierra menú al hacer click en un link
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('a')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header elevation on scroll
  const header = document.querySelector('[data-elevate]');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-elevated', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on view (subtle)
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  } else {
    // fallback
    els.forEach(el => el.classList.add('is-in'));
  }
})();
