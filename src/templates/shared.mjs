export const WHATSAPP_URL = 'https://wa.me/4915225631994';
export const SITE_URL = 'https://learngermanwithjonas.de';

export const LANGUAGES = [
  { code: 'de', label: 'DE', path: '/' },
  { code: 'en', label: 'EN', path: '/en/' },
  { code: 'es', label: 'ES', path: '/es/' },
];

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const icon = (name) => `/brand_assets/icons/${name}.svg`;

// Original width + generated small-variant width (px) for every photo that has
// WebP + resized siblings (see brand_assets/*/gen_webp.py output). Used by
// picture() to build a correct srcset without probing the files at build time.
const IMAGE_DIMS = {
  'jonas-web.jpg': { ow: 933, sw: 480 },
  'hero-bestanden-berlin.jpg': { ow: 1200, sw: 480 },
  'jonas-teacher.jpg': { ow: 1400, sw: 480 },
  'celebration.jpg': { ow: 896, sw: 480 },
  'speaking.jpg': { ow: 1344, sw: 420 },
  'listening.jpg': { ow: 1344, sw: 420 },
  'writing.jpg': { ow: 1344, sw: 420 },
  'reading-language.jpg': { ow: 1344, sw: 420 },
  'live-classes.jpg': { ow: 896, sw: 420 },
  'materials.jpg': { ow: 896, sw: 420 },
  'community.jpg': { ow: 896, sw: 420 },
};

/**
 * Renders a <picture> with a WebP source (+ small mobile variant) and a
 * same-sized JPG fallback, so mobile doesn't download the full desktop
 * resolution. Falls back to a plain <img> for photos without generated
 * variants (e.g. non-photographic assets).
 * @param {string} src - JPG path, e.g. '/brand_assets/telc-b1/speaking.jpg'
 * @param {{alt?:string, className?:string, sizes?:string, loading?:'lazy'|'eager'}} [opts]
 */
export function picture(src, opts = {}) {
  const { alt = '', className = '', sizes = '100vw', loading = 'lazy' } = opts;
  const name = src.split('/').pop();
  const dims = IMAGE_DIMS[name];
  const cls = className ? ` class="${className}"` : '';
  if (!dims) {
    return `<img${cls} src="${src}" alt="${esc(alt)}" loading="${loading}" />`;
  }
  const base = src.replace(/\.jpg$/, '');
  const { ow, sw } = dims;
  return `<picture>
            <source type="image/webp" srcset="${base}-${sw}w.webp ${sw}w, ${base}.webp ${ow}w" sizes="${sizes}" />
            <source type="image/jpeg" srcset="${base}-${sw}w.jpg ${sw}w, ${base}.jpg ${ow}w" sizes="${sizes}" />
            <img${cls} src="${src}" alt="${esc(alt)}" loading="${loading}" />
          </picture>`;
}

export function faviconTags() {
  return `
  <link rel="icon" type="image/png" sizes="32x32" href="/brand_assets/favicon/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/brand_assets/favicon/favicon-16.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/brand_assets/favicon/icon-192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/brand_assets/favicon/apple-touch-icon.png" />`;
}

/**
 * @param {string} path - canonical path for the CURRENT language (e.g. '/' or '/en/telc-b1-kurs')
 * @param {{code:string, path:string}[]} [pages] - per-language paths for this same logical page.
 *   Defaults to the homepage's own LANGUAGES paths.
 */
export function hreflangTags(path, pages = LANGUAGES) {
  const tags = pages
    .map((l) => `  <link rel="alternate" hreflang="${l.code}" href="${SITE_URL}${l.path}" />`)
    .join('\n');
  const defaultPath = pages.find((l) => l.code === 'de')?.path || '/';
  return `${tags}\n  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${defaultPath}" />\n  <link rel="canonical" href="${SITE_URL}${path}" />`;
}

/**
 * @param {string} current - active language code
 * @param {{code:string, label:string, path:string}[]} [pages] - per-language paths to switch between.
 *   Defaults to the homepage's own LANGUAGES paths.
 */
export function langSwitcher(current, pages = LANGUAGES) {
  return `
        <div class="lang-toggle">
          ${pages
            .map((l) => `<a href="${l.path}"${l.code === current ? ' class="active"' : ''}>${l.label}</a>`)
            .join('\n          ')}
        </div>`;
}

export function whatsappFloat(label) {
  return `
  <a class="whatsapp-float" href="${WHATSAPP_URL}" target="_blank" rel="noopener" aria-label="${esc(label)}">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.37 4 15c0 2.36.68 4.55 1.86 6.4L4 29l7.8-1.82A11.9 11.9 0 0 0 16.02 27C22.65 27 28 21.63 28 15S22.65 3 16.02 3Zm6.98 16.98c-.3.85-1.5 1.56-2.46 1.76-.66.14-1.52.25-4.4-.94-3.7-1.53-6.08-5.28-6.27-5.53-.18-.25-1.5-2-1.5-3.8 0-1.8.94-2.68 1.28-3.05.3-.32.7-.42.94-.42.23 0 .47 0 .67.01.22.01.5-.08.78.6.3.72 1.02 2.5 1.11 2.68.09.18.15.4.03.65-.12.25-.18.4-.36.62-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.93 1.53 2 2.48 1.38 1.23 2.54 1.61 2.9 1.79.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.09.99 2.45 1.17.36.18.6.27.68.42.1.16.1.9-.2 1.75Z"/></svg>
  </a>`;
}
