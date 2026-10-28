/**
 * Client-side translations for the EN/PT toggle in the header.
 *
 * Elements opt in with `data-i18n="key"` (textContent) or
 * `data-i18n-html="key"` (innerHTML, for keys that contain markup).
 * The chosen language is persisted in localStorage under `hw-lang`.
 */

export const LANG_STORAGE_KEY = 'hw-lang';

export type Lang = 'en' | 'pt';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Header / footer
    'brand.tagline': 'LEARN · MAKE · DISCOVER',
    'nav.home': 'Home',
    'nav.about': 'About me',
    'nav.data': 'Data',
    'nav.recipes': 'Recipes',
    'nav.crafts': 'Crafts',
    'nav.travel': 'Travel',
    'cta.connect': "Let's Connect",
    'footer.note': '© 2026 HeloWorld · Made with curiosity, yarn & flavor · All rights reserved.',

    // Hero
    'hero.badge': 'Exploring data, fibers & flavors',
    'hero.title': `Hello, world! <span class="text-[#C85A32]">I'm Helo.</span>`,
    'hero.subtitle':
      'Welcome to my little corner of the internet, where I share what I learn, make, and discover.',

    // Category cards
    'cards.data.title': 'Data & Analytics',
    'cards.data.desc': "Data projects, articles, and things I've learned along the way.",
    'cards.data.cta': 'Browse projects & articles →',
    'cards.recipes.title': 'Recipes',
    'cards.recipes.desc':
      "Recipes I've tried, favorites I've collected, and kitchen experiments worth sharing.",
    'cards.recipes.cta': 'Explore recipes →',
    'cards.crafts.title': 'Crafts & DIY',
    'cards.crafts.desc':
      "Things I'm making, new hobbies I'm trying, and creative projects in progress.",
    'cards.crafts.cta': 'View gallery →',
    'cards.travel.title': 'Travel Journal',
    'cards.travel.desc':
      "Places I've visited, little discoveries, travel notes, and tips for future adventures.",
    'cards.travel.cta': 'Read journeys →',

    // About me
    'about.title': 'A Little About Me',
    'about.p1':
      "I'm Helo, a Senior Data Analyst who spends a lot of time working with data, solving problems, and finding patterns. Outside work, I like trying new hobbies, making things, experimenting with recipes, and exploring new places.",
    'about.p2':
      'HeloWorld is my little corner of the internet to document the things I learn and try along the way. Some projects might be carefully planned; others might just start with a bit of curiosity and a desire to try something new.',
    'about.p3':
      "I'm not trying to be an expert at everything I share. I just enjoy learning and making things, and now I'd like to start documenting the process, too. Hopefully, I'll share something useful or inspiring with someone else along the way.",
    'about.badge': '● Senior Data Analyst',

    // Tags
    'tag.sql': 'SQL',
    'tag.python': 'Python',
    'tag.storytelling': 'Storytelling',
    'tag.cooking': 'Cooking',
    'tag.baking': 'Baking',
    'tag.experimenting': 'Experimenting',
    'tag.crochet': 'Crochet',
    'tag.pottery': 'Pottery',
    'tag.scrapbooking': 'Scrapbooking',
    'tag.planning': 'Planning trips',
    'tag.traveling': 'Traveling',
    'tag.hiking': 'Hiking',

    // Connect banner
    'connect.label': 'Open for collaborations & chats',
    'connect.title': "Let's connect",
    'connect.desc':
      "Have a question about data modeling, a recipe tip, a craft idea, or just want to say hi? I'd love to hear from you.",
  },

  pt: {
    // Header / footer
    'brand.tagline': 'APRENDER · CRIAR · DESCOBRIR',
    'nav.home': 'Início',
    'nav.about': 'Sobre mim',
    'nav.data': 'Dados',
    'nav.recipes': 'Receitas',
    'nav.crafts': 'Artesanato',
    'nav.travel': 'Viagens',
    'cta.connect': 'Vamos conversar',
    'footer.note': '© 2026 HeloWorld · Feito com curiosidade, fio e sabor · Todos os direitos reservados.',

    // Hero
    'hero.badge': 'Explorando dados, fibras & sabores',
    'hero.title': `Olá, mundo! <span class="text-[#C85A32]">Eu sou a Helo.</span>`,
    'hero.subtitle':
      'Boas-vindas ao meu cantinho na internet, onde compartilho o que aprendo, crio e descubro.',

    // Category cards
    'cards.data.title': 'Dados & Análises',
    'cards.data.desc': 'Projetos de dados, artigos e coisas que aprendi pelo caminho.',
    'cards.data.cta': 'Ver projetos & artigos →',
    'cards.recipes.title': 'Receitas',
    'cards.recipes.desc':
      'Receitas que já testei, favoritas que colecionei e experimentos de cozinha que valem a pena compartilhar.',
    'cards.recipes.cta': 'Explorar receitas →',
    'cards.crafts.title': 'Artesanato & DIY',
    'cards.crafts.desc':
      'Coisas que estou criando, novos hobbies que estou experimentando e projetos criativos em andamento.',
    'cards.crafts.cta': 'Ver galeria →',
    'cards.travel.title': 'Diário de Viagem',
    'cards.travel.desc':
      'Lugares que visitei, pequenas descobertas, notas de viagem e dicas para futuras aventuras.',
    'cards.travel.cta': 'Ler diários →',

    // About me
    'about.title': 'Um Pouquinho Sobre Mim',
    'about.p1':
      'Sou a Helo, analista de dados sênior que passa bastante tempo trabalhando com dados, resolvendo problemas e encontrando padrões. Fora do trabalho, gosto de experimentar novos hobbies, criar coisas, testar receitas e explorar lugares novos.',
    'about.p2':
      'O HeloWorld é meu cantinho na internet para documentar as coisas que aprendo e experimento pelo caminho. Alguns projetos podem ser cuidadosamente planejados; outros podem começar só com um pouco de curiosidade e vontade de tentar algo novo.',
    'about.p3':
      'Não estou tentando ser especialista em tudo o que compartilho. Eu só gosto de aprender e criar coisas, e agora quero começar a documentar o processo também. Quem sabe, assim, compartilho algo útil ou inspirador com outra pessoa pelo caminho.',
    'about.badge': '● Analista de Dados Sênior',

    // Tags
    'tag.sql': 'SQL',
    'tag.python': 'Python',
    'tag.storytelling': 'Storytelling',
    'tag.cooking': 'Culinária',
    'tag.baking': 'Confeitaria',
    'tag.experimenting': 'Experimentar',
    'tag.crochet': 'Crochê',
    'tag.pottery': 'Cerâmica',
    'tag.scrapbooking': 'Scrapbook',
    'tag.planning': 'Planejar viagens',
    'tag.traveling': 'Viajar',
    'tag.hiking': 'Trilhas',

    // Connect banner
    'connect.label': 'Aberta para colaborações & conversas',
    'connect.title': 'Vamos conversar',
    'connect.desc':
      'Tem uma pergunta sobre modelagem de dados, uma dica de receita, uma ideia de artesanato ou quer só dizer oi? Adoraria ouvir de você.',
  },
};

export const getLang = (): Lang =>
  (localStorage.getItem(LANG_STORAGE_KEY) as Lang) === 'pt' ? 'pt' : 'en';
