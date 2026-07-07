import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

function i18nWatcher() {
  return {
    name: 'i18n-page-rebuild',
    configureServer(server) {
      const rebuild = (file) => {
        if (!file) return;
        if (file.includes('/src/i18n/') || file.includes('/src/templates/page.mjs')) {
          try {
            execSync('node scripts/build-pages.mjs', { cwd: server.config.root, stdio: 'inherit' });
            server.ws.send({ type: 'full-reload' });
          } catch (err) {
            console.error(err);
          }
        }
      };
      server.watcher.add(['src/i18n', 'src/templates']);
      server.watcher.on('change', rebuild);
    }
  };
}

export default defineConfig({
  plugins: [i18nWatcher()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        en: 'en/index.html',
        es: 'es/index.html',
        impressum: 'impressum.html',
        datenschutz: 'datenschutz.html',
        cookiePolicy: 'cookie-policy.html'
      }
    }
  }
});
