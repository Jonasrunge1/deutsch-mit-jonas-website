import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderPage } from '../src/templates/page.mjs';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const LOCALES = [
  { code: 'de', file: 'src/i18n/de.json', out: 'index.html', path: '/' },
  { code: 'en', file: 'src/i18n/en.json', out: 'en/index.html', path: '/en/' },
  { code: 'es', file: 'src/i18n/es.json', out: 'es/index.html', path: '/es/' },
];

for (const locale of LOCALES) {
  const data = JSON.parse(readFileSync(path.join(root, locale.file), 'utf-8'));
  const html = renderPage(locale.code, data, locale.path);
  const outPath = path.join(root, locale.out);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf-8');
  console.log(`generated ${locale.out}`);
}
