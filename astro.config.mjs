// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Locale codes must stay aligned with `src/i18n/locales.ts`.
const defaultLocale = 'en';
const locales = ['en', 'es'];

// https://astro.build/config
export default defineConfig({
  // Canonical, hreflang, and Open Graph URLs use the production origin.
  site: 'https://rolandschlosser.dev',
  output: 'static',
  trailingSlash: 'never',
  redirects: {
    '/about': '/',
    '/es/about': '/es',
  },
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
