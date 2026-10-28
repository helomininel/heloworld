import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

// Single source of truth for social profile URLs — used by the footer,
// the home page "Let's connect" banner, and anywhere else they appear.
export const socialUrls = {
  github: 'https://github.com/helomininel',
  linkedin: 'https://www.linkedin.com/in/heloisa-senarese-mininel/',
};

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About me',
      href: getPermalink('/about'),
    },
    {
      text: 'Data',
      href: getBlogPermalink(),
    },
    {
      text: 'Recipes',
      href: getPermalink('/recipes'),
    },
    {
      text: 'Crafts',
      href: getPermalink('/crochet'),
    },
    {
      text: 'Travel',
      href: getBlogPermalink(),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Data & Tech',
      links: [
        { text: 'Articles', href: getBlogPermalink() },
        // { text: 'Projects', href: getPermalink('/projects') },
      ],
    },
    {
      title: 'Crafts',
      links: [
        { text: 'Recipes', href: getPermalink('/recipes') },
        { text: 'Crochet patterns', href: getPermalink('/crochet') },
      ],
    },
    {
      title: 'About',
      links: [{ text: 'About me', href: getPermalink('/about') }],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: socialUrls.github },
  ],
  footNote: `
    Made with ❤️ by HeloWorld · All rights reserved.
  `,
};
