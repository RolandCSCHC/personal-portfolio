/** Keep aligned with `i18n.locales` in `astro.config.mjs`. */
export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' satisfies Locale;

/** Open Graph locale tags. English copy is not country-specific; Spanish copy is Chilean. */
export const openGraphLocale = {
  en: 'en_US',
  es: 'es_CL',
} as const satisfies Record<Locale, string>;

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

export function currentLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}
