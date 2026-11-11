import { getCollection } from 'astro:content';
import type { Lang } from '~/i18n/content';

export interface RecipeSource {
  label: string;
  url: string;
}

export interface Recipe {
  id: string;
  category: 'main' | 'bread' | 'desserts';
  categoryLabel: string;
  title: string;
  time: string;
  servings: string;
  /** Difficulty shown in the hero metrics (e.g. 'Easy' / 'Fácil'). */
  level?: string;
  desc: string;
  alt: string;
  /** Resolved image URL, or '' when the recipe has no photo yet. */
  img: string;
  gallery?: string[];
  /** '## ' prefix renders a bold group header. */
  ingredients: string[];
  /** Step titles are wrapped in <strong>. */
  instructions: string[];
  tips: string[];
  sources: RecipeSource[];
}

// Section headings as written in each language's markdown files.
const HEADINGS: Record<Lang, { ingredients: string; instructions: string; tips: string; sources: string }> = {
  en: { ingredients: 'Ingredients', instructions: 'Instructions', tips: 'Tips', sources: 'Sources' },
  pt: {
    ingredients: 'Ingredientes',
    instructions: 'Preparação',
    tips: 'Dicas e Notas',
    sources: 'Fontes das Receitas',
  },
};

// Groups the body by its `## ` headings. Each list item must sit on one line.
const splitSections = (body: string) => {
  const sections = new Map<string, string[]>();
  let current: string[] = [];
  for (const line of body.split('\n')) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = [];
      sections.set(heading[1].trim(), current);
    } else {
      current.push(line);
    }
  }
  return sections;
};

const ingredientsFrom = (lines: string[] = []) => {
  const items: string[] = [];
  for (const line of lines) {
    const group = line.match(/^###\s+(.+)$/);
    const item = line.match(/^-\s+(.+)$/);
    if (group) items.push(`## ${group[1].trim()}`);
    else if (item) items.push(item[1].trim());
  }
  return items;
};

const instructionsFrom = (lines: string[] = []) =>
  lines.flatMap((line) => {
    const step = line.match(/^\d+\.\s+(.+)$/);
    if (!step) return [];
    const title = step[1].match(/^\*\*(.+?)\*\*\s*(.*)$/);
    return [title ? `<strong>${title[1]}</strong> ${title[2]}` : step[1]];
  });

const listFrom = (lines: string[] = []) =>
  lines.flatMap((line) => {
    const item = line.match(/^-\s+(.+)$/);
    return item ? [item[1].trim()] : [];
  });

const sourcesFrom = (lines: string[] = []) =>
  lines.flatMap((line) => {
    const link = line.match(/^-\s+\[(.+?)\]\((.+?)\)$/);
    return link ? [{ label: link[1], url: link[2] }] : [];
  });

/** All recipes in one language, read from src/data/recipes/<lang>/*.md. */
export const getRecipes = async (lang: Lang): Promise<Recipe[]> => {
  const entries = await getCollection('recipes', ({ id }) => id.startsWith(`${lang}/`));
  const headings = HEADINGS[lang];

  return entries.map(({ id, data, body }) => {
    const sections = splitSections(body ?? '');
    return {
      id: id.slice(lang.length + 1),
      category: data.category,
      categoryLabel: data.categoryLabel,
      title: data.title,
      time: data.time,
      servings: data.servings,
      level: data.level,
      desc: data.desc,
      alt: data.alt,
      img: data.image?.src ?? '',
      gallery: data.gallery?.map((photo) => photo.src),
      ingredients: ingredientsFrom(sections.get(headings.ingredients)),
      instructions: instructionsFrom(sections.get(headings.instructions)),
      tips: listFrom(sections.get(headings.tips)),
      sources: sourcesFrom(sections.get(headings.sources)),
    };
  });
};
