import type { APIRoute } from 'astro';
import { loadProjects } from '../data/projects';
import { locales } from '../i18n/locales';
import { publicRoutePaths } from '../i18n/routes';
import { absoluteLocaleUrl, localeAlternates } from '../seo/urls';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error(
      'Set site in astro.config.mjs before building the sitemap.',
    );
  }

  const projects = await loadProjects();
  const routePaths = publicRoutePaths(projects.map((project) => project.id));
  const urls = routePaths.flatMap((routePath) =>
    locales.map((locale) => ({
      loc: absoluteLocaleUrl(site, locale, routePath),
      alternates: localeAlternates(site, routePath),
    })),
  );

  for (const url of urls) {
    if (!url.loc.startsWith('https://')) {
      throw new Error(`Sitemap URL is not absolute: ${url.loc}`);
    }
  }

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls.map((url) =>
      [
        '  <url>',
        `    <loc>${escapeXml(url.loc)}</loc>`,
        ...url.alternates.map((alternate) => {
          const hreflang = escapeXml(alternate.hreflang);
          const href = escapeXml(alternate.href);
          return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
        }),
        '  </url>',
      ].join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
