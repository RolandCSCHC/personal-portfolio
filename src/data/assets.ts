import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/locales';

/**
 * Supplied personal files. Do not generate a portrait or a CV.
 *
 * Photograph: src/assets/profile/roland-schlosser.jpg
 * English CV: public/cv/roland-schlosser-cv-en.pdf
 * Spanish CV: public/cv/roland-schlosser-cv-es.pdf
 *
 * The photograph also accepts .jpeg, .png, or .webp with the same base name.
 * Keep only one photograph.
 */

const portraits = import.meta.glob<ImageMetadata>(
  '../assets/profile/roland-schlosser.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
);

export function portraitImage(): ImageMetadata | null {
  const found = Object.entries(portraits);

  if (found.length > 1) {
    throw new Error(
      `Keep one photograph named roland-schlosser. Found ${found
        .map(([path]) => path)
        .join(', ')}.`,
    );
  }

  return found[0]?.[1] ?? null;
}

const cvFileNames = {
  en: 'roland-schlosser-cv-en.pdf',
  es: 'roland-schlosser-cv-es.pdf',
} as const satisfies Record<Locale, string>;

export function cvDownload(locale: Locale): { href: string } | null {
  const fileName = cvFileNames[locale];
  const path = join(process.cwd(), 'public', 'cv', fileName);

  if (!existsSync(path)) {
    return null;
  }

  return { href: `/cv/${fileName}` };
}
