import { WHATSAPP_URL, esc, faviconTags, hreflangTags, langSwitcher, whatsappFloat } from './shared.mjs';

const STRIPE_URL = 'https://buy.stripe.com/bJedRbfDXbfW7Mw3hD53O00';

// Per-language paths for THIS page, mirroring the homepage's LANGUAGES pattern.
export const TELC_LANGUAGES = [
  { code: 'de', label: 'DE', path: '/telc-b1-kurs' },
  { code: 'en', label: 'EN', path: '/en/telc-b1-kurs' },
  { code: 'es', label: 'ES', path: '/es/telc-b1-kurs' },
];

function trustTiles(items) {
  return items
    .map(
      (item) => `
          <div class="telc-trust-tile">
            <span class="telc-trust-value">${esc(item.value)}</span>
            <span class="telc-trust-label">${esc(item.label)}</span>
          </div>`
    )
    .join('');
}

function skillCards(cards) {
  return cards
    .map(
      (c) => `
          <div class="telc-skill-card telc-card">
            <div class="telc-skill-photo"><img src="${esc(c.image)}" alt="" /></div>
            <div class="telc-skill-body">
              <h3>${esc(c.title)}</h3>
              <p>${esc(c.text)}</p>
            </div>
          </div>`
    )
    .join('');
}

function featureCards(features) {
  return features
    .map(
      (f) => `
          <div class="telc-feature-card telc-card">
            <div class="telc-feature-photo"><img src="${esc(f.image)}" alt="" /></div>
            <div class="telc-feature-body">
              <h3>${esc(f.title)}</h3>
              <p>${esc(f.text)}</p>
            </div>
          </div>`
    )
    .join('');
}

function teacherStats(stats) {
  return stats
    .map(
      (s) => `
              <div class="telc-teacher-stat telc-card telc-card--elevated">
                <div class="telc-teacher-stat-value">${esc(s.value)}</div>
                <div class="telc-teacher-stat-title">${esc(s.title)}</div>
                <ul>${s.bullets.map((b) => `
                  <li>${esc(b)}</li>`).join('')}
                </ul>
              </div>`
    )
    .join('');
}

function testimonialCards(items) {
  return items
    .map(
      (t) => `
          <div class="telc-testimonial-card telc-card telc-card--testimonial">
            <div class="telc-testimonial-head">
              <div class="telc-testimonial-avatar">${esc(t.avatar)}</div>
              <div>
                <div class="telc-testimonial-name">${esc(t.name)}</div>
                <div class="telc-testimonial-role">${esc(t.role)}</div>
              </div>
            </div>
            <p>${esc(t.quote)}</p>
            <span class="telc-testimonial-heart">♥</span>
          </div>`
    )
    .join('');
}

function schedulePills(pills) {
  return pills.map((p) => `<span class="telc-soft-pill">${esc(p)}</span>`).join('');
}

function detailsList(items) {
  return items.map((i) => `
              <li>${esc(i)}</li>`).join('');
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

export function renderTelcPage(lang, data, path) {
  const t = data;
  const pageLangs = TELC_LANGUAGES;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(t.meta.title)}</title>
  <meta name="description" content="${esc(t.meta.description)}" />
${hreflangTags(path, pageLangs)}
${faviconTags()}
  <link rel="stylesheet" href="/src/style.css" />
</head>
<body class="telc-page">

  <header class="site-header">
    <div class="container">
      <a href="/" class="brand">
        <img class="brand-logo" src="/brand_assets/favicon/icon-192.png" alt="" width="40" height="40" />
        <span class="brand-name">Deutsch mit <span class="accent">Jonas</span></span>
      </a>

      <nav class="main-nav" id="main-nav">
        <ul>
          <li><a href="#skills">${esc(t.nav.skills)}</a></li>
          <li><a href="#course">${esc(t.nav.course)}</a></li>
          <li><a href="#teacher">${esc(t.nav.teacher)}</a></li>
          <li><a href="#pricing">${esc(t.nav.pricing)}</a></li>
          <li><a href="#faq">${esc(t.nav.faq)}</a></li>
        </ul>
      </nav>

      <div class="header-actions">${langSwitcher(lang, pageLangs)}
        <a class="telc-btn telc-btn--sm" href="${STRIPE_URL}" target="_blank" rel="noopener">${esc(t.nav.startNow)}</a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </header>

  <main id="top">

    <!-- Hero -->
    <section class="telc-hero telc-band telc-band--creme">
      <div class="container">
        <div class="telc-hero-blob telc-hero-blob--1"></div>
        <div class="telc-hero-blob telc-hero-blob--2"></div>

        <div class="telc-hero-copy">
          <span class="telc-eyebrow">${esc(t.hero.eyebrow)}</span>
          <h1>${esc(t.hero.headline)}</h1>
          <p class="telc-hero-subline">${esc(t.hero.subline)}</p>
          <p class="telc-hero-caption">${esc(t.hero.caption)}</p>
          <a class="telc-btn" href="${STRIPE_URL}" target="_blank" rel="noopener">${esc(t.hero.cta)}</a>
        </div>

        <div class="telc-hero-visual">
          <div class="telc-hero-photo">
            <img src="/brand_assets/telc-b1/jonas-teacher.jpg" alt="Jonas, telc B1 exam teacher" />
          </div>
          <div class="telc-hero-badge telc-glass">
            <div class="telc-hero-badge-top">
              <span class="telc-live-tag"><span class="dot"></span>${esc(t.hero.badgeLive)}</span>
              <span>${esc(t.hero.badgeNextCohort)}</span>
            </div>
            <strong>${esc(t.hero.badgeTitle)}</strong>
            <span class="date">${esc(t.hero.badgeDate)}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust bar + exam skill cards -->
    <section id="skills" class="telc-band telc-band--alt telc-curve">
      <div class="container">
        <div class="telc-trust-grid">${trustTiles(t.trust)}
        </div>

        <div class="telc-head center">
          <h2>${esc(t.skillsSection.title)}</h2>
          <p>${esc(t.skillsSection.sub)}</p>
        </div>
        <div class="telc-skills-grid">${skillCards(t.skillsSection.cards)}
        </div>
      </div>
    </section>

    <!-- The course + mid-page CTA + teacher -->
    <section id="course" class="telc-band telc-band--creme telc-curve">
      <div class="container">
        <div class="telc-head center">
          <h2>${esc(t.courseSection.title)}</h2>
          <p>${esc(t.courseSection.sub)}</p>
        </div>
        <div class="telc-features-grid">${featureCards(t.courseSection.features)}
        </div>

        <div class="telc-banner telc-glass">
          <div>
            <h3>${esc(t.courseSection.banner.title)}</h3>
            <p>${esc(t.courseSection.banner.text)}</p>
          </div>
          <a class="telc-btn" href="${STRIPE_URL}" target="_blank" rel="noopener">${esc(t.courseSection.banner.cta)}</a>
        </div>

        <div id="teacher" class="telc-teacher-layout">
          <div class="telc-teacher-photo">
            <img src="/brand_assets/telc-b1/jonas-teacher.jpg" alt="Jonas, German teacher" />
          </div>
          <div>
            <div class="telc-head">
              <h2>${esc(t.teacher.title)}</h2>
              <p>${esc(t.teacher.sub)}</p>
            </div>
            <div class="telc-teacher-stats">${teacherStats(t.teacher.stats)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="telc-band telc-band--transparent">
      <div class="container">
        <div class="telc-head center">
          <span class="telc-eyebrow">${esc(t.testimonials.eyebrow)}</span>
          <h2>${esc(t.testimonials.title)}</h2>
        </div>
        <div class="telc-testimonial-grid">${testimonialCards(t.testimonials.items)}
        </div>
      </div>
    </section>

    <!-- Course details / pricing -->
    <section id="pricing" class="telc-band telc-band--transparent">
      <div class="container">
        <div class="telc-details-wrap">
          <div class="telc-course-hero">
            <div class="telc-course-hero-photo">
              <img src="/brand_assets/telc-b1/celebration.jpg" alt="Three learners jumping with their passed telc certificates" />
            </div>
            <div class="telc-course-hero-body">
              <div class="telc-badge-circle">${esc(t.details.badgeCircle)}</div>
              <span class="telc-soft-pill telc-soft-pill--kicker">${esc(t.details.kicker)}</span>
              <h2>${esc(t.details.headingBlack)} <span class="accent">${esc(t.details.headingOrange)}</span></h2>
              <p class="telc-course-hero-sub">${esc(t.details.sub)}</p>
              <div class="telc-schedule-pills">${schedulePills(t.details.pills)}
              </div>
              <p class="telc-course-hero-dates">${esc(t.details.dates)}</p>
              <ul class="telc-details-list">${detailsList(t.details.list)}
              </ul>
              <div class="telc-details-price-row">
                <span class="telc-details-price">${esc(t.details.price)}</span>
                <span class="telc-details-price-unit">${esc(t.details.priceUnit)}</span>
              </div>
              <a class="telc-btn" href="${STRIPE_URL}" target="_blank" rel="noopener">${esc(t.details.cta)} <span>→</span></a>
              <div class="telc-details-note">
                <span>${esc(t.details.note1)}</span>
                <span>${esc(t.details.note2)}</span>
              </div>
            </div>
          </div>

          <div class="telc-oncall">
            <div>
              <span class="telc-soft-pill telc-soft-pill--kicker">${esc(t.oncall.kicker)}</span>
              <h2>${esc(t.oncall.title)}</h2>
              <p>${esc(t.oncall.text)}</p>
            </div>
            <a class="telc-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.oncall.cta)} <span>→</span></a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="telc-band telc-band--alt telc-curve">
      <div class="container">
        <div class="telc-head center">
          <span class="telc-eyebrow">${esc(t.faq.eyebrow)}</span>
          <h2>${esc(t.faq.title)}</h2>
        </div>
        <div class="faq-list">${faqItems(t.faq.items)}
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="telc-final telc-band telc-band--creme telc-curve">
      <div class="container">
        <span class="telc-eyebrow">${esc(t.final.eyebrow)}</span>
        <h2>${esc(t.final.title)}</h2>
        <p>${esc(t.final.text)}</p>
        <div class="telc-final-actions">
          <a class="telc-btn" href="${STRIPE_URL}" target="_blank" rel="noopener">${esc(t.final.ctaPrimary)}</a>
          <a class="telc-btn telc-btn--ghost" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${esc(t.final.ctaSecondary)}</a>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer telc-band telc-band--alt telc-curve">
    <div class="container">
      <div class="footer-top">
        <div>
          <a href="#top" class="brand">
            <img class="brand-logo" src="/brand_assets/favicon/icon-192.png" alt="" width="36" height="36" />
            <span class="brand-name">Deutsch mit <span class="accent">Jonas</span></span>
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
        <span>&copy; <span id="year"></span> ${esc(t.footer.rights)}</span>${langSwitcher(lang, pageLangs)}
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
