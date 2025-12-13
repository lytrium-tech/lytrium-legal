(() => {
  // Cambia este número por el WhatsApp oficial del negocio (formato internacional, sin + ni espacios).
  // Ejemplo Colombia: 573141234567
  const WHATSAPP_NUMBER = "573000000000";

  const buildWhatsAppUrl = (text) => {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const defaultText =
    "Hola Lytrium. Quiero automatizar atención, agendamiento y seguimiento por WhatsApp. ¿Podemos hablar?";

  const whatsappTop = document.getElementById("whatsappTopCta");
  const whatsappHero = document.getElementById("whatsappHeroCta");
  const whatsappFaq = document.getElementById("whatsappFaqCta");

  [whatsappTop, whatsappHero, whatsappFaq].forEach((btn) => {
    if (!btn) return;
    btn.href = buildWhatsAppUrl(defaultText);
    btn.target = "_blank";
    btn.rel = "noopener";
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (document.getElementById("name")?.value || "").trim();
      const company = (document.getElementById("company")?.value || "").trim();
      const phone = (document.getElementById("phone")?.value || "").trim();
      const message = (document.getElementById("message")?.value || "").trim();

      const payload =
        `Hola Lytrium. Soy ${name} de ${company}.\n` +
        `Mi WhatsApp: ${phone}\n\n` +
        `${message}\n\n` +
        `Objetivo: automatización inteligente por WhatsApp para mejorar eficiencia operativa.`;

      window.open(buildWhatsAppUrl(payload), "_blank", "noopener");
    });
  }
})();


// Año en footer (seguro para páginas que sí lo tengan)
(function setYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// Oculta el link del footer de la página actual (legal + productos)
(function hideCurrentFooterLink(){
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const footerLinks = document.querySelector(".footer-links");
  if (!footerLinks) return;

  footerLinks.querySelectorAll("a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    // Normaliza ./file.html
    const normalized = href.replace("./", "");
    if (normalized === current) a.style.display = "none";
  });
})();
