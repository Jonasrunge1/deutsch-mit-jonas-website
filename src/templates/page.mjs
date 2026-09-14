const WHATSAPP_URL = 'https://wa.me/4915225631994';
const SITE_URL = 'https://learngermanwithjonas.de';

const LANGUAGES = [
  { code: 'de', label: 'DE', path: '/' },
  { code: 'en', label: 'EN', path: '/en/' },
  { code: 'es', label: 'ES', path: '/es/' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const icon = (name) => `/brand_assets/icons/${name}.svg`;

function faviconTags() {
  return `
  <link rel="icon" type="image/png" sizes="32x32" href="/brand_assets/favicon/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/brand_assets/favicon/favicon-16.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/brand_assets/favicon/icon-192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/brand_assets/favicon/apple-touch-icon.png" />`;
}

function hreflangTags(path) {
  const tags = LANGUAGES.map(
    (l) => `  <link rel="alternate" hreflang="${l.code}" href="${SITE_URL}${l.path}" />`
  ).join('\n');
  return `${tags}\n  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />\n  <link rel="canonical" href="${SITE_URL}${path}" />`;
}

function langSwitcher(current) {
  return `
        <div class="lang-toggle">
          ${LANGUAGES.map(
            (l) => `<a href="${l.path}"${l.code === current ? ' class="active"' : ''}>${l.label}</a>`
          ).join('\n          ')}
        </div>`;
}

function whatsappFloat(label) {
  return `
  <a class="whatsapp-float" href="${WHATSAPP_URL}" target="_blank" rel="noopener" aria-label="${esc(label)}">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.36.68 4.55 1.86 6.4L4 29l7.8-1.82A11.9 11.9 0 0 0 16.02 27C22.65 27 28 21.63 28 15S22.65 3 16.02 3Zm6.98 16.98c-.3.85-1.5 1.56-2.46 1.76-.66.14-1.52.25-4.4-.94-3.7-1.53-6.08-5.28-6.27-5.53-.18-.25-1.5-2-1.5-3.8 0-1.8.94-2.68 1.28-3.05.3-.32.7-.42.94-.42.23 0 .47 0 .67.01.22.01.5-.08.78.6.3.72 1.02 2.5 1.11 2.68.09.18.15.4.03.65-.12.25-.18.4-.36.62-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.93 1.53 2 2.48 1.38 1.23 2.54 1.61 2.9 1.79.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.09.99 2.45 1.17.36.18.6.27.68.42.1.16.1.9-.2 1.75Z"/></svg>
  </a>`;
}

function socialTiles(items) {
  return items
    .map(
      (item) => `
        <div class="social-tile">
          <span class="social-value">${esc(item.value)}</span>
          <span class="social-label">${esc(item.label)}</span>
        </div>`
    )
    .join('');
}

function resultChips(chips) {
  return chips
    .map(
      (text) => `
      <div class="result-chip reveal">
        <img src="${icon('star')}" alt="" />
        <span>${esc(text)}</span>
      </div>`
    )
    .join('');
}

function heroChoices(choices) {
  return choices
    .map(
      (c) => `
        <div class="hero-choice reveal">
          ${c.badge ? `<span class="hero-choice-badge">${esc(c.badge)}</span>` : ''}
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.text)}</p>
          <a class="btn btn--block${c.ghost ? ' btn--ghost' : ''}" href="${esc(c.href)}"${c.external ? ' target="_blank" rel="noopener"' : ''}>${esc(c.cta)}</a>
        </div>`
    )
    .join('');
}

function skillCards(items) {
  return items
    .map(
      (s) => `
      <div class="skill-card reveal">
        <div class="skill-photo"><img src="${s.image}" alt="" /></div>
        <div class="skill-body">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </div>
      </div>`
    )
    .join('');
}

function evidenceStats(stats) {
  return stats
    .map(
      (s) => `
        <div class="evidence-stat reveal">
          <img class="evidence-stat-icon" src="${icon(s.icon)}" alt="" />
          <h3 class="evidence-stat-title">${esc(s.title)}</h3>
          <p class="evidence-stat-text">${esc(s.text)}</p>
        </div>`
    )
    .join('');
}

function evidenceSources(sources) {
  return `
        <ol class="evidence-sources">${sources
          .map(
            (s) => `
          <li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.text)}</a></li>`
          )
          .join('')}
        </ol>`;
}

function painpointCards(cards) {
  return cards
    .map(
      (text) => `
      <div class="painpoint-card reveal">
        <img src="${icon('check')}" alt="" />
        <p>${esc(text)}</p>
      </div>`
    )
    .join('');
}

function perfectBullets(bullets) {
  return bullets
    .map(
      (text) => `
      <li class="perfect-item reveal">
        <img src="${icon('check')}" alt="" />
        <span>${esc(text)}</span>
      </li>`
    )
    .join('');
}

function benefitCards(items) {
  return items
    .map(
      (item) => `
      <div class="benefit-card reveal">
        <img class="benefit-icon" src="${icon(item.icon)}" alt="" />
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
      </div>`
    )
    .join('');
}

function howSteps(steps) {
  return steps
    .map(
      (step, i) => `${i > 0 ? '<div class="how-arrow" aria-hidden="true">→</div>' : ''}
      <div class="how-step reveal">
        <div class="number">${esc(step.number)}</div>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.text)}</p>
      </div>`
    )
    .join('');
}

function aboutBio(paragraphs) {
  return paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n          ');
}

function courseCards(cards, duration) {
  return cards
    .map(
      (card) => `
      <div class="course-card reveal">
        <span class="course-level">${esc(card.level)}</span>
        <h3>${esc(card.name)}</h3>
        <p>${esc(card.text)}</p>
        <div class="course-duration">${esc(duration)}</div>
      </div>`
    )
    .join('');
}

function offerCards(cards, ctaButton, comingSoon) {
  return cards
    .map((card) => {
      const href = card.href || WHATSAPP_URL;
      const external = !card.href;
      const label = card.ctaLabel || ctaButton;
      const badge = card.badge || (card.soon ? comingSoon : null);
      return `
      <div class="offer-card reveal">
        ${badge ? `<span class="tag tag--soon">${esc(badge)}</span>` : ''}
        <h3>${esc(card.title)}</h3>
        <p>${esc(card.text)}</p>
        <a class="btn btn--block" href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${esc(label)}</a>
      </div>`;
    })
    .join('');
}

function outcomeChips(items) {
  return items
    .map(
      (text) => `
      <div class="outcome-chip reveal">
        <img src="${icon('check')}" alt="" />
        <span>${esc(text)}</span>
      </div>`
    )
    .join('');
}

function faqItems(items) {
  return items
    .map(
      (item, i) => `
      <div class="faq-item reveal">
        <button class="faq-question" data-index="${i}" aria-expanded="false">
          <span>${esc(item.q)}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer"><p>${esc(item.a)}</p></div>
      </div>`
    )
    .join('');
}

export function renderPage(lang, data, path) {
  const t = data;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(t.meta.title)}</title>
  <meta name="description" content="${esc(t.meta.description)}" />
${hreflangTags(path)}
${faviconTags()}
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body>

  <header class="site-header">
    <div class="container">
      <a href="#top" class="brand">
        <img class="brand-logo" src="/brand_assets/favicon/icon-192.png" alt="" width="40" height="40" />
        <span class="brand-name">${esc(t.brand.pre)}<span class="accent">${esc(t.brand.accent)}</span></span>
      </a>

      <nav class="main-nav" id="main-nav">
        <ul>
          <li><a href="#about">${esc(t.nav.about)}</a></li>
          <li><a href="#benefits">${esc(t.nav.benefits)}</a></li>
          <li><a href="#how">${esc(t.nav.how)}</a></li>
          <li><a href="#offers">${esc(t.nav.pricing)}</a></li>
          <li><a href="#contact">${esc(t.nav.contact)}</a></li>
        </ul>
      </nav>

      <div class="header-actions">${langSwitcher(lang)}
        <a class="btn btn--header" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.nav.cta)}</a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </header>

  <main id="top">

    <!-- Hero -->
    <section class="hero">
      <div class="hero-blob hero-blob--1"></div>
      <div class="hero-blob hero-blob--2"></div>
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">${esc(t.hero.kicker)}</span>
          <h1>${esc(t.hero.headline)}</h1>
          <p class="hero-subline">${esc(t.hero.subline)}</p>
          <p class="hero-question">${esc(t.hero.question)}</p>
          <div class="hero-choices">${heroChoices(t.hero.choices)}
          </div>
          <p class="hero-support">${esc(t.hero.supportLine)}</p>
        </div>
        <div class="hero-visual">
          <img class="hero-shape" src="/brand_assets/shapes/burst.svg" alt="" />
          <div class="hero-photo-frame">
            <img class="photo-warm" src="/brand_assets/portrait-web/jonas-web.jpg" alt="Jonas, Deutschlehrer" />
          </div>
          <div class="hero-badge">
            <span class="dot"></span>
            <span>${esc(t.hero.badge)}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="results">
      <div class="container">
        <p class="results-title">${esc(t.results.title)}</p>
        <div class="results-chips">${resultChips(t.results.chips)}
        </div>
      </div>
    </section>

    <!-- Social proof -->
    <section class="social-proof">
      <div class="container">
        <div class="social-proof-grid">${socialTiles(t.social.items)}
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.skills.title)}</h2>
        </div>
        <div class="skills-grid">${skillCards(t.skills.items)}
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about">
      <div class="container about-layout">
        <div class="about-visual reveal">
          <div class="about-photo">
            <img class="photo-warm" src="/brand_assets/portrait-web/jonas-web.jpg" alt="Jonas" />
          </div>
          <div class="about-badge about-badge--1">
            <span class="dot"></span>
            <span>${esc(t.about.badge1)}</span>
          </div>
          <div class="about-badge about-badge--2">${esc(t.about.badge2)}</div>
        </div>
        <div class="about-copy reveal">
          <div class="section-head">
            <h2>${esc(t.about.title)}</h2>
          </div>
          <p class="about-tagline">${esc(t.about.tagline)}</p>
          <div>
          ${aboutBio(t.about.bio)}
          </div>
        </div>
      </div>
    </section>

    <!-- Pain points -->
    <section id="painpoints" class="painpoints">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.painpoints.title)}</h2>
        </div>
        <div class="painpoints-grid">${painpointCards(t.painpoints.cards)}
        </div>
        <p class="painpoints-conclusion reveal">${esc(t.painpoints.conclusion)}</p>
      </div>
    </section>

    <!-- Perfect for you -->
    <section id="perfect" class="perfect">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.perfect.title)}</h2>
        </div>
        <ul class="perfect-list reveal">${perfectBullets(t.perfect.bullets)}
        </ul>
        <a class="perfect-closing reveal" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.perfect.closing)}</a>
      </div>
    </section>

    <!-- Benefits -->
    <section id="benefits">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.benefits.title)}</h2>
          <p>${esc(t.benefits.sub)}</p>
        </div>
        <div class="benefits-grid">${benefitCards(t.benefits.items)}
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.how.title)}</h2>
          <p>${esc(t.how.sub)}</p>
        </div>
        <div class="how-steps">${howSteps(t.how.steps)}
        </div>
        <div class="how-cta">
          <a class="btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.how.ctaButton)}</a>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section id="courses" class="courses">
      <div class="container">
        <div class="section-head center reveal">
          <span class="eyebrow">${esc(t.courses.kicker)}</span>
          <h2>${esc(t.courses.title)}</h2>
          <p>${esc(t.courses.subtitle)}</p>
          <p class="courses-grammar-note">${esc(t.courses.grammarNote)}</p>
        </div>
        <div class="courses-grid">${courseCards(t.courses.cards, t.courses.duration)}
        </div>
        <p class="courses-explanation reveal">${esc(t.courses.explanation)}</p>
        <div class="courses-accordion faq-item reveal" id="courses-accordion">
          <button class="faq-question" id="courses-accordion-btn" aria-expanded="false">
            <span>${esc(t.courses.accordionQ)}</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer"><p>${esc(t.courses.accordionA)}</p></div>
        </div>
        <div class="courses-cta reveal">
          <p>${esc(t.courses.ctaText)}</p>
          <a class="btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.courses.ctaButton)}</a>
        </div>
      </div>
    </section>

    <!-- Offers -->
    <section id="offers">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.offers.title)}</h2>
          <p>${esc(t.offers.sub)}</p>
        </div>
        <div class="offers-grid">${offerCards(t.offers.cards, t.offers.ctaButton, t.offers.comingSoon)}
        </div>
      </div>
    </section>

    <!-- Evidence-based learning -->
    <section id="evidence" class="evidence">
      <div class="container">
        <div class="section-head center reveal">
          <span class="evidence-badge"><img src="${icon('check')}" alt="" />${esc(t.evidence.badge)}</span>
          <h2>${esc(t.evidence.title)}</h2>
          <p>${esc(t.evidence.intro)}</p>
        </div>
        <div class="evidence-stats">${evidenceStats(t.evidence.stats)}
        </div>
        <p class="evidence-closing reveal">${esc(t.evidence.closing)}</p>
        ${evidenceSources(t.evidence.sources)}
      </div>
    </section>

    <!-- Outcomes -->
    <section id="outcomes">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.outcomes.title)}</h2>
        </div>
        <div class="outcomes-grid">${outcomeChips(t.outcomes.items)}
        </div>
        <div class="outcomes-cta">
          <a class="btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.outcomes.ctaButton)}</a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq">
      <div class="container">
        <div class="section-head center reveal">
          <h2>${esc(t.faq.title)}</h2>
        </div>
        <div class="faq-list">${faqItems(t.faq.items)}
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta" id="contact">
      <div class="container">
        <p class="final-cta-tagline">${esc(t.cta.tagline)}</p>
        <h2>${esc(t.cta.title)}</h2>
        <p>${esc(t.cta.sub)}</p>
        <a class="btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.cta.button)}</a>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <a href="#top" class="brand">
            <img class="brand-logo" src="/brand_assets/favicon/icon-192.png" alt="" width="36" height="36" />
            <span class="brand-name">${esc(t.brand.pre)}<span class="accent">${esc(t.brand.accent)}</span></span>
          </a>
          <p>${esc(t.footer.tagline)}</p>
        </div>
        <div class="footer-col">
          <h4>${esc(t.footer.contactTitle)}</h4>
          <ul>
            <li><a href="mailto:hey@expatly.de">hey@expatly.de</a></li>
            <li><a href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.footer.whatsapp)}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${esc(t.footer.legalTitle)}</h4>
          <ul>
            <li><a href="/impressum.html">${esc(t.footer.impressum)}</a></li>
            <li><a href="/datenschutz.html">${esc(t.footer.datenschutz)}</a></li>
            <li><a href="/cookie-policy.html">${esc(t.footer.cookiePolicy)}</a></li>
            <li><button type="button" class="footer-link-btn" id="cookie-settings-link">${esc(t.footer.cookieSettings)}</button></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year"></span> ${esc(t.footer.rights)}</span>${langSwitcher(lang)}
      </div>
    </div>
  </footer>
${whatsappFloat(t.whatsapp.label)}
  <script type="module" src="/src/js/consent.js"></script>
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
}
