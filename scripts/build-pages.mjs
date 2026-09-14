import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderPage } from '../src/templates/page.mjs';
import { renderTelcPage } from '../src/templates/telc-page.mjs';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const LOCALES = [
  { code: 'de', file: 'src/i18n/de.json', out: 'index.html', path: '/' },
  { code: 'en', file: 'src/i18n/en.json', out: 'en/index.html', path: '/en/' },
  { code: 'es', file: 'src/i18n/es.json', out: 'es/index.html', path: '/es/' },
];

const TELC_LOCALES = [
  { code: 'de', file: 'src/i18n/telc-de.json', out: 'telc-b1-kurs.html', path: '/telc-b1-kurs' },
  { code: 'en', file: 'src/i18n/telc-en.json', out: 'en/telc-b1-kurs.html', path: '/en/telc-b1-kurs' },
  { code: 'es', file: 'src/i18n/telc-es.json', out: 'es/telc-b1-kurs.html', path: '/es/telc-b1-kurs' },
];

function generate(locales, render) {
  for (const locale of locales) {
    const data = JSON.parse(readFileSync(path.join(root, locale.file), 'utf-8'));
    const html = render(locale.code, data, locale.path);
    const outPath = path.join(root, locale.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf-8');
    console.log(`generated ${locale.out}`);
  }
}

generate(LOCALES, renderPage);
generate(TELC_LOCALES, renderTelcPage);
