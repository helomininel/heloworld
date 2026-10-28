# 🌞 HeloWorld

Helo's corner of the internet — a personal portfolio & craft hub where data projects, recipes, and little adventures live side by side.

**Live site:** https://helomininel.github.io/heloworld/

## What's inside

- **Home** — hero, about section, and skill tags (EN/PT)
- **Data & Analytics** — data projects and articles
- **Recipes** — a small cookbook with bilingual (`/recipes` + `/pt/recipes`) detail pages, generated from [`src/data/recipes.ts`](src/data/recipes.ts)
- **Crafts & DIY** — crochet patterns and projects
- **Travel** — a travel journal

## Tech

[Astro](https://astro.build/) (static) + [Tailwind CSS v4](https://tailwindcss.com/). Content is code-first: page copy lives in [`src/i18n/content.ts`](src/i18n/content.ts) (EN/PT), recipes in [`src/data/recipes.ts`](src/data/recipes.ts), and site-wide settings (base path, SEO defaults, blog flags) in [`src/config.yaml`](src/config.yaml).

## Development

```bash
npm install
npm run dev        # or: astro dev --background (manage with astro dev stop/status/logs)
npm run build      # production build into dist/
npm run check      # astro check + eslint + prettier
```

Node 24 is required (`.nvmrc` / `engines`).

### Image metadata policy

Committed images must not carry EXIF/XMP/metadata. A `pre-commit` hook (`.githooks/pre-commit`, via `core.hooksPath`) auto-strips staged JPEGs/PNGs using `scripts/strip-image-meta.mjs`. After a fresh clone, enable it with:

```
git config core.hooksPath .githooks
```

## Deployment

Deployed to **GitHub Pages** from `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — merges to `main` build and publish automatically. The site runs under the base path `/heloworld/`, configured in `src/config.yaml`.

## Credits

Built on top of the open-source [AstroWind](https://github.com/onwidget/astrowind) template (MIT), heavily redesigned with custom layouts, styling, i18n, and a recipes data model. The original [MIT license notice](LICENSE.md) is retained.
