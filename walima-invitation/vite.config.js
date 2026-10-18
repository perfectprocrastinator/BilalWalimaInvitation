import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { wedding } from './src/config/wedding.js';

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteBase = env.VITE_SITE_URL ? `${env.VITE_SITE_URL.replace(/\/+$/, '')}/` : '/';
  return {
    plugins: [react(), tailwindcss(), {
      name: 'wedding-sharing-metadata',
      transformIndexHtml(html) {
        return html.replaceAll('__WEDDING_TITLE__', escapeHtml(wedding.pageTitle))
          .replaceAll('__WEDDING_DESCRIPTION__', escapeHtml(wedding.pageDescription))
          .replaceAll('__SITE_BASE__', escapeHtml(siteBase))
          .replace('__CANONICAL__', env.VITE_SITE_URL ? `<link rel="canonical" href="${escapeHtml(siteBase)}" /><meta property="og:url" content="${escapeHtml(siteBase)}" />` : '');
      },
    }],
    server: { port: 5173, strictPort: true },
    preview: { port: 4173, strictPort: true },
  };
});
