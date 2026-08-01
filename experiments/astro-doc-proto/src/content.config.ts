import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content collection = the Astro-native equivalent of your docs.json /
// library.json registry. Each Markdown file's frontmatter is validated at
// build time against this schema, so a malformed doc fails the build instead
// of rendering broken at runtime.
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
    date: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
  }),
});

export const collections = { docs };
