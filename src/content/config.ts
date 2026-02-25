import { defineCollection, z } from 'astro:content';

const perspectives = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    sector: z.string(),
    thesis: z.string(),
    order: z.number(),
  }),
});

export const collections = { perspectives };
