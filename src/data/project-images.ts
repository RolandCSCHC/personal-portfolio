import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '../assets/projects/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
);

/** Supplied screenshot in `src/assets/projects`, matched by file name. */
export function projectImage(fileName: string): ImageMetadata {
  const matches = Object.entries(images).filter(([path]) =>
    path.endsWith(`/${fileName}`),
  );

  if (matches.length !== 1) {
    throw new Error(
      `Expected one project image named ${fileName}. Found ${matches.length}.`,
    );
  }

  return matches[0][1];
}
