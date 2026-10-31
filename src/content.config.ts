import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.object({
  en: z.string().min(1),
  es: z.string().min(1),
});

const localizedList = z
  .object({
    en: z.array(z.string().min(1)).min(1),
    es: z.array(z.string().min(1)).min(1),
  })
  .refine((lists) => lists.en.length === lists.es.length, {
    message: 'English and Spanish lists must have the same length.',
  });

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/projects',
  }),
  schema: z.object({
    name: z.string(),
    summary: localizedText,
    features: localizedList,
    stack: z.array(z.string()).min(1),
    liveUrl: z.url(),
    repositories: z.array(
      z.object({
        label: localizedText,
        url: z.url(),
      }),
    ),
    image: z
      .object({
        src: z.string().min(1),
        alt: localizedText,
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      })
      .nullable(),
    order: z.number().int(),
  }),
});

export const collections = { projects };
