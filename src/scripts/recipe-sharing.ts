/**
 * Shared recipe-sharing helpers: the social share menu (WhatsApp / Facebook /
 * X / copy link / native share), the Markdown recipe builder for the
 * "copy recipe" action, and the toast notification.
 *
 * Localized strings come from the caller, so the same logic serves the EN and
 * PT pages. The share menu is a per-document singleton: call mountShareMenu()
 * from an `astro:page-load` handler (the view transitions replace the body,
 * so the menu must be recreated and the buttons re-bound on each navigation).
 */

export interface ShareLabels {
  /** Toast text when the recipe text is copied. */
  copyToast: string;
  /** Toast text when a link is copied. */
  linkToast: string;
  /** Markdown section headings. */
  sections: { ingredients: string; instructions: string; tips: string; sources: string };
  /** Share menu item labels. */
  menu: {
    whatsapp: string;
    facebook: string;
    x: string;
    copy: string;
    native: string;
    copied: string;
  };
}

/** The recipe page URL for a slug, based on the current grid/locale path. */
export const recipeUrlFor = (slug: string) =>
  `${window.location.origin}${window.location.pathname.replace(/\/recipes(\/.*)?$/, '/recipes')}/${slug}`;

/** Builds a readable Markdown version of the recipe (pastes nicely anywhere). */
export const buildRecipeMarkdown = (
  data: {
    title: string;
    time: string;
    servings: string;
    desc: string;
    ingredients: string[];
    instructions: string[];
    tips?: string[];
    sources?: { label: string; url: string }[];
  },
  labels: ShareLabels
): string => {
  const lines: string[] = [`# ${data.title}`, '', `${data.time} · ${data.servings}`, '', data.desc];

  if (data.ingredients.length) {
    lines.push('', `## ${labels.sections.ingredients}`, '');
    data.ingredients.forEach((s) => {
      if (s.startsWith('## ')) lines.push('', `### ${s.slice(3)}`);
      else lines.push(`- ${s}`);
    });
  }

  if (data.instructions.length) {
    lines.push('', `## ${labels.sections.instructions}`, '');
    data.instructions.forEach((s, i) =>
      lines.push(`${i + 1}. ${s.replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')}`)
    );
  }

  if (data.tips?.length) {
    lines.push('', `## ${labels.sections.tips}`, '');
    data.tips.forEach((s) => lines.push(`- ${s}`));
  }

  if (data.sources?.length) {
    lines.push('', `## ${labels.sections.sources}`, '');
    data.sources.forEach((s) => lines.push(`- [${s.label}](${s.url})`));
  }

  return lines.join('\n');
};

// Singleton state — survives view transitions (the document/window persist).
let menu: HTMLDivElement | null = null;
let ctx: { title: string; url: string } | null = null;
let labels: ShareLabels | null = null;
let globalWired = false;

const showToast = (message: string) => {
  const toast = document.getElementById('recipe-toast');
  const text = document.getElementById('recipe-toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3000);
};

const closeShareMenu = () => {
  menu?.classList.add('hidden');
  ctx = null;
};

const ensureMenu = (l: ShareLabels): HTMLDivElement | null => {
  // The body is replaced by view transitions, so a stale reference must be
  // recreated (with the current page's localized labels).
  if (menu && !menu.isConnected) menu = null;
  if (menu) return menu;

  menu = document.createElement('div');
  menu.id = 'recipe-share-menu';
  menu.className = 'fixed z-[60] hidden w-44 bg-white rounded-2xl border border-[#F6D3C6] shadow-lg py-2 text-sm';
  menu.innerHTML = `
    <button type="button" data-share="whatsapp" class="w-full text-left px-4 py-2 hover:bg-[#FFF1EC] text-[#2E2825] flex items-center gap-2">${l.menu.whatsapp}</button>
    <button type="button" data-share="facebook" class="w-full text-left px-4 py-2 hover:bg-[#FFF1EC] text-[#2E2825] flex items-center gap-2">${l.menu.facebook}</button>
    <button type="button" data-share="x" class="w-full text-left px-4 py-2 hover:bg-[#FFF1EC] text-[#2E2825] flex items-center gap-2">${l.menu.x}</button>
    <button type="button" data-share="copy" class="w-full text-left px-4 py-2 hover:bg-[#FFF1EC] text-[#2E2825] flex items-center gap-2">${l.menu.copy}</button>
    ${navigator.share ? `<button type="button" data-share="native" class="w-full text-left px-4 py-2 hover:bg-[#FFF1EC] text-[#2E2825] flex items-center gap-2">${l.menu.native}</button>` : ''}
  `;
  document.body.appendChild(menu);

  menu.addEventListener('click', async (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('[data-share]');
    if (!item || !ctx) return;
    const { title, url } = ctx;
    const action = item.dataset.share;
    closeShareMenu();
    if (action === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`, '_blank', 'noopener');
    } else if (action === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener');
    } else if (action === 'x') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        '_blank',
        'noopener'
      );
    } else if (action === 'native') {
      navigator.share?.({ title, url }).catch(() => {});
    } else if (action === 'copy') {
      await navigator.clipboard?.writeText(url);
      const label = item.querySelector('span') ?? item;
      const original = label.textContent;
      label.textContent = l.menu.copied;
      setTimeout(() => (label.textContent = original), 1200);
      showToast(l.linkToast);
    }
  });

  // Global closers are wired only once (document/window persist).
  if (!globalWired) {
    globalWired = true;
    document.addEventListener('click', (e) => {
      if (ctx && !menu?.contains(e.target as HTMLElement) && !(e.target as HTMLElement).closest('.share-btn, #page-share-btn'))
        closeShareMenu();
    });
    window.addEventListener('scroll', closeShareMenu, { passive: true });
    window.addEventListener('resize', closeShareMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeShareMenu();
    });
  }

  return menu;
};

export function mountShareMenu(opts: {
  /** CSS selector for the share button(s). */
  shareBtnSel: string;
  /** CSS selector for an optional "copy recipe" button. */
  copyBtnSel?: string;
  /** Returns the share context for the clicked button (or null to skip). */
  getShare: (btn: HTMLElement) => { title: string; url: string } | null;
  /** Returns the Markdown text for the copy action. */
  getMarkdown: () => string;
  labels: ShareLabels;
  /** Toast element ids (optional; falls back to per-item feedback). */
  toastId?: string;
  toastTextId?: string;
}): void {
  labels = opts.labels;

  const m = ensureMenu(opts.labels);

  document.querySelectorAll<HTMLElement>(opts.shareBtnSel).forEach((btn) => {
    if (btn.dataset.shareBound) return;
    btn.dataset.shareBound = '1';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (m && !m.classList.contains('hidden') && ctx) {
        closeShareMenu();
        return;
      }
      const share = opts.getShare(btn);
      if (!share) return;
      ctx = share;
      const rect = btn.getBoundingClientRect();
      if (!m) return;
      m.style.top = `${Math.min(rect.bottom + 8, window.innerHeight - 220)}px`;
      m.style.left = `${Math.min(rect.left, window.innerWidth - 190)}px`;
      m.classList.remove('hidden');
    });
  });

  if (opts.copyBtnSel) {
    document.querySelectorAll<HTMLElement>(opts.copyBtnSel).forEach((btn) => {
      if (btn.dataset.copyBound) return;
      btn.dataset.copyBound = '1';
      btn.addEventListener('click', async () => {
        await navigator.clipboard?.writeText(opts.getMarkdown());
        showToast(labels?.copyToast ?? '');
      });
    });
  }
}
