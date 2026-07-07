const STORAGE_KEY = 'cookie_consent';
const CONSENT_VERSION = 1;

function getStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function storeConsent(marketing) {
  const consent = {
    version: CONSENT_VERSION,
    necessary: true,
    marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  return consent;
}

// Scripts that must wait for consent are marked in HTML as:
// <script type="text/plain" data-consent="marketing" data-src="...">
function applyConsent(consent) {
  if (!consent.marketing) return;
  document.querySelectorAll('script[data-consent="marketing"]').forEach((placeholder) => {
    const script = document.createElement('script');
    Array.from(placeholder.attributes).forEach((attr) => {
      if (attr.name === 'type') return;
      script.setAttribute(attr.name === 'data-src' ? 'src' : attr.name, attr.value);
    });
    if (placeholder.textContent.trim()) script.textContent = placeholder.textContent;
    placeholder.replaceWith(script);
  });
}

function buildBanner() {
  const wrapper = document.createElement('div');
  wrapper.id = 'cookie-consent';
  wrapper.innerHTML = `
    <div class="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-banner-title">
      <div class="cookie-banner-text">
        <p id="cookie-banner-title" class="cookie-banner-title">Diese Website nutzt Cookies</p>
        <p>Wir verwenden technisch notwendige Cookies bzw. lokalen Speicher, damit die Seite funktioniert. Mit deiner Zustimmung nutzen wir zusätzlich nicht-notwendige Cookies (z.&nbsp;B. für Marketing/Analyse). Mehr dazu in unserer <a href="/cookie-policy.html">Cookie-Richtlinie</a> und <a href="/datenschutz.html">Datenschutzerklärung</a>.</p>
      </div>
      <div class="cookie-banner-actions">
        <button type="button" class="btn btn--ghost" data-action="deny">Nur notwendige</button>
        <button type="button" class="btn btn--ghost" data-action="preferences">Einstellungen verwalten</button>
        <button type="button" class="btn" data-action="accept">Alle akzeptieren</button>
      </div>
    </div>
    <div class="cookie-preferences" hidden>
      <div class="cookie-preferences-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-prefs-title">
        <p id="cookie-prefs-title" class="cookie-banner-title">Cookie-Einstellungen</p>
        <div class="cookie-category">
          <div class="cookie-category-head">
            <span>Technisch notwendig</span>
            <span class="cookie-toggle cookie-toggle--locked" aria-hidden="true"><span class="cookie-toggle-dot"></span></span>
          </div>
          <p>Erforderlich, damit die Website funktioniert (z.&nbsp;B. Spracheinstellung, Speicherung deiner Cookie-Auswahl). Kann nicht deaktiviert werden.</p>
        </div>
        <div class="cookie-category">
          <div class="cookie-category-head">
            <span>Marketing &amp; Analyse</span>
            <button type="button" class="cookie-toggle" id="cookie-toggle-marketing" role="switch" aria-checked="false" aria-label="Marketing &amp; Analyse Cookies">
              <span class="cookie-toggle-dot"></span>
            </button>
          </div>
          <p>Aktuell setzt diese Website keine Marketing- oder Analyse-Cookies ein. Diese Kategorie ist vorbereitet, falls künftig entsprechende Dienste eingebunden werden.</p>
        </div>
        <div class="cookie-banner-actions">
          <button type="button" class="btn btn--ghost" data-action="close-preferences">Zurück</button>
          <button type="button" class="btn" data-action="save-preferences">Auswahl speichern</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);
  return wrapper;
}

function initConsentBanner() {
  const wrapper = document.getElementById('cookie-consent') || buildBanner();
  const banner = wrapper.querySelector('.cookie-banner');
  const preferences = wrapper.querySelector('.cookie-preferences');
  const marketingToggle = wrapper.querySelector('#cookie-toggle-marketing');

  function setMarketingToggle(on) {
    marketingToggle.setAttribute('aria-checked', String(on));
    marketingToggle.classList.toggle('is-on', on);
  }

  function showBanner() {
    banner.hidden = false;
    preferences.hidden = true;
    wrapper.classList.add('is-visible');
  }

  function showPreferences() {
    const current = getStoredConsent();
    setMarketingToggle(current ? current.marketing : false);
    banner.hidden = true;
    preferences.hidden = false;
    wrapper.classList.add('is-visible');
  }

  function hideAll() {
    wrapper.classList.remove('is-visible');
  }

  wrapper.querySelector('[data-action="accept"]').addEventListener('click', () => {
    applyConsent(storeConsent(true));
    hideAll();
  });

  wrapper.querySelector('[data-action="deny"]').addEventListener('click', () => {
    storeConsent(false);
    hideAll();
  });

  wrapper.querySelector('[data-action="preferences"]').addEventListener('click', showPreferences);
  wrapper.querySelector('[data-action="close-preferences"]').addEventListener('click', showBanner);

  marketingToggle.addEventListener('click', () => {
    setMarketingToggle(marketingToggle.getAttribute('aria-checked') !== 'true');
  });

  wrapper.querySelector('[data-action="save-preferences"]').addEventListener('click', () => {
    const marketing = marketingToggle.getAttribute('aria-checked') === 'true';
    applyConsent(storeConsent(marketing));
    hideAll();
  });

  const stored = getStoredConsent();
  if (stored) {
    applyConsent(stored);
  } else {
    showBanner();
  }

  window.openCookieSettings = showPreferences;
}

document.addEventListener('DOMContentLoaded', initConsentBanner);
document.addEventListener('click', (e) => {
  if (e.target.id === 'cookie-settings-link') {
    e.preventDefault();
    if (window.openCookieSettings) window.openCookieSettings();
  }
});
