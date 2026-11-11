# Add a Page

## Steps

1. Create a new `.astro` file in `src/pages/`
2. Use `PageLayout` for standard pages or `Layout` for custom layouts
3. Compose the page using widget components from `src/components/widgets/`

## Template

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';

const metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
};
---

<Layout metadata={metadata}>
  <Hero
    tagline="Optional tagline"
    title="Page Heading"
    subtitle="Supporting text"
    image={{
      src: '~/assets/images/hero.png',
      alt: 'Hero image description',
    }}
  />
</Layout>
```

## Available Widget Components

Hero, Features2, Features3, Stats, Steps2, Team, Timeline, Newsletter

## Notes

- Pages in `src/pages/` are automatically routed by filename
- Use `PageLayout` (includes the site header and footer) or `Layout` (bare)
- All widgets accept an `id` prop for anchor links
- Icons use the `tabler:icon-name` format from `@iconify-json/tabler`
