function initFaqAccordion(container) {
  container.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      container.querySelectorAll('.faq-item.open').forEach((open) => {
        if (open !== item) {
          open.classList.remove('open');
          open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

function initCoursesAccordion() {
  const item = document.getElementById('courses-accordion');
  if (!item) return;
  const btn = document.getElementById('courses-accordion-btn');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
}

function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Elements already in view at render time skip the animation — no flash-hidden.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    el.classList.add('reveal-armed');
    revealObserver.observe(el);
  });
}

function initMobileNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

initFaqAccordion(document.querySelector('.faq-list'));
initCoursesAccordion();
initReveal();
initMobileNav();
initYear();
