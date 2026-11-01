import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Set site in astro.config.mjs before building robots.txt.');
  }

  const sitemap = new URL('/sitemap.xml', site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
