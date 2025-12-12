// Menú mobile
const btn = document.querySelector('.nav__toggle');
const nav = document.querySelector('[data-nav]');

btn?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Año footer
document.getElementById('y').textContent = new Date().getFullYear();

