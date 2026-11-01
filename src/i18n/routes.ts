import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './locales';

const staticRoutes = new Set(['', 'experience', 'projects', 'cv']);

/** Public pages in sitemap order. Project slugs are the collection ids. */
export function publicRoutePaths(projectSlugs: readonly string[]): string[] {
  return [
    '',
    'experience',
    'projects',
    ...projectSlugs.map((slug) => `projects/${slug}`),
    'cv',
  ];
}

/** Path without a leading slash or locale prefix. The homepage is an empty string. */
export function toRoutePath(pathname: string): string {
  let path = pathname;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  if (path === '/es') {
    return '';
  }
  if (path.startsWith('/es/')) {
    path = path.slice(3);
  }
  if (path === '/') {
    return '';
  }
  return path.replace(/^\//, '');
}

export function isPublicRoute(
  routePath: string,
  projectSlugs: readonly string[],
): boolean {
  if (staticRoutes.has(routePath)) {
    return true;
  }

  const separator = routePath.indexOf('/');
  if (separator === -1 || routePath.slice(0, separator) !== 'projects') {
    return false;
  }

  const slug = routePath.slice(separator + 1);
  return slug.length > 0 && !slug.includes('/') && projectSlugs.includes(slug);
}

export function localeHref(locale: Locale, routePath: string): string {
  return getRelativeLocaleUrl(locale, routePath === '' ? undefined : routePath);
}

/** Equivalent page in `locale`, or that language's homepage when the page does not exist. */
export function equivalentPath(
  locale: Locale,
  pathname: string,
  projectSlugs: readonly string[],
): string {
  const routePath = toRoutePath(pathname);
  const target = isPublicRoute(routePath, projectSlugs) ? routePath : '';
  return localeHref(locale, target);
}
