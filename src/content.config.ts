import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    /** Alternative text for the cover image. Leave empty for decorative stock photos. */
    imageAlt: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

// One file per recipe and language: src/data/recipes/<en|pt>/<slug>.md.
// The body holds the sections (## Ingredients, ## Instructions, ## Tips,
// ## Sources); see src/utils/recipes.ts for how they are read.
const recipeCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/data/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      categoryLabel: z.string(),
      category: z.enum(['main', 'bread', 'desserts']),
      time: z.string(),
      servings: z.string(),
      /** Difficulty shown in the hero metrics (e.g. 'Easy' / 'Fácil'). */
      level: z.string().optional(),
      desc: z.string(),
      alt: z.string(),
      image: image().optional(),
      /** Extra photos shown as a gallery under the instructions. */
      gallery: z.array(image()).optional(),
    }),
});

export const collections = {
  post: postCollection,
  recipes: recipeCollection,
};
