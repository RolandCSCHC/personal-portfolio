import type { Locale } from './locales';

const monthPattern = /^(\d{4})-(\d{2})$/;

/** Format `YYYY-MM` in the active locale. English: "March 2014". Spanish: "marzo de 2014". */
export function formatMonth(isoMonth: string, locale: Locale): string {
  const match = monthPattern.exec(isoMonth);
  if (!match) {
    throw new Error(`Invalid month: ${isoMonth}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${isoMonth}`);
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
