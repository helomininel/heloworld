import type { Lang } from '~/i18n/content';

/** Category ids used in craft frontmatter. Add new ones here (e.g. clay) and in `craftCategories`. */
export const craftCategoryIds = ['crochet'] as const;

export type CraftCategory = (typeof craftCategoryIds)[number];

export const craftCategories: Record<Lang, Record<CraftCategory, string>> = {
  en: { crochet: 'Crochet' },
  pt: { crochet: 'Crochê' },
};

export const craftsCopy = {
  en: {
    home: 'Home',
    crafts: 'Crafts',
    backToCrafts: 'Back to Crafts',
    pill: 'Made by Hand',
    title: 'Crafts & DIY',
    intro: 'Crochet patterns and handmade projects, written up so you can make them too.',
    patterns: 'Patterns',
    categories: 'Categories',
    searchPlaceholder: 'Search by pattern or description...',
    all: 'All',
    viewPattern: 'View Pattern',
    empty: 'No patterns found. Try a different search or filter.',
    metaTitle: 'Crafts & DIY',
    metaDescription: 'Crochet patterns and handmade projects. Patterns I designed and made, shared step by step.',
  },
  pt: {
    home: 'Início',
    crafts: 'Artesanato',
    backToCrafts: 'Voltar para Artesanato',
    pill: 'Feito à mão',
    title: 'Arte & Artesanato',
    intro: 'Gráficos de crochê e projetos feitos à mão, escritos para você fazer também.',
    patterns: 'Gráficos',
    categories: 'Categorias',
    searchPlaceholder: 'Pesquisar por gráfico ou descrição...',
    all: 'Todos',
    viewPattern: 'Ver gráfico',
    empty: 'Nenhum gráfico encontrado. Tente outra pesquisa ou filtro.',
    metaTitle: 'Arte & Artesanato',
    metaDescription: 'Gráficos de crochê e projetos feitos à mão. Padrões criados por mim, passo a passo.',
  },
} as const;
