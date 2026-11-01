import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLocale, locales, type Locale } from '../i18n/locales';

export function absoluteLocaleUrl(
  site: URL,
  locale: Locale,
  routePath: string,
): string {
  const relative = getRelativeLocaleUrl(
    locale,
    routePath === '' ? undefined : routePath,
  );
  return new URL(relative, site).href;
}

export function localeAlternates(
  site: URL,
  routePath: string,
): { hreflang: string; href: string }[] {
  return [
    ...locales.map((code) => ({
      hreflang: code,
      href: absoluteLocaleUrl(site, code, routePath),
    })),
    {
      hreflang: 'x-default',
      href: absoluteLocaleUrl(site, defaultLocale, routePath),
    },
  ];
}

export function personId(site: URL): string {
  return new URL('/#person', site).href;
}

export function websiteId(site: URL): string {
  return new URL('/#website', site).href;
}
