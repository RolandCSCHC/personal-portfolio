import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/projects',
  }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    features: z.array(z.string()).min(1),
    stack: z.array(z.string()).min(1),
    liveUrl: z.url(),
    repositories: z.array(
      z.object({
        label: z.string().min(1),
        url: z.url(),
      }),
    ),
    image: z
      .object({
        src: z.string().min(1),
        alt: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      })
      .nullable(),
    order: z.number().int(),
  }),
});

export const collections = { projects };
