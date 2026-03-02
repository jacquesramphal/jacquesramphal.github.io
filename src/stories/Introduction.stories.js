/**
 * Introduction — Storybook landing page
 *
 * A full-page showcase of the Ramphal component library.
 * No component import needed — pure HTML/CSS template story.
 */

const STYLES = `
  .intro-page {
    font-family: var(--fontFamily-primary);
    color: var(--foreground);
    background: var(--background);
    min-height: 100vh;
    box-sizing: border-box;
  }

  /* ── Shared section padding — mirrors GridContainer exactly ── */
  /* mobile: --spacing-sm (2.4rem), tablet+: --spacing-lg (8rem) */
  .intro-hero,
  .intro-sections,
  .intro-principles,
  .intro-stack,
  .intro-footer {
    padding: var(--spacing-sm);
  }
  @media (min-width: 768px) {
    .intro-hero,
    .intro-sections,
    .intro-principles,
    .intro-stack {
      padding: var(--spacing-lg);
    }
    .intro-footer {
      padding: var(--spacing-md) var(--spacing-lg);
    }
  }

  /* ── Hero ── */
  .intro-hero {
    border-bottom: var(--border);
  }
  .intro-eyebrow {
    font-size: var(--font-400);
    font-weight: var(--fontWeight-medium);
    color: var(--foreground-muted);
    margin: 0 0 var(--spacing-sm);
  }
  .intro-headline {
    font-size: clamp(var(--size-10), 6vw, var(--size-20));
    font-weight: var(--fontWeight-heavy);
    letter-spacing: var(--letterSpacing-tight);
    line-height: var(--lineHeight-shorter);
    margin: 0 0 var(--spacing-sm);
    max-width: 90rem;
  }
  .intro-headline em {
    font-style: normal;
    color: var(--color-blue);
  }
  .intro-tagline {
    font-size: var(--font-500);
    color: var(--foreground-muted);
    line-height: var(--lineHeight-tall);
    max-width: 72rem;
    margin: 0 0 var(--spacing-md);
  }
  .intro-links {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    align-items: center;
  }
  .intro-link {
    font-size: var(--font-2xs);
    font-weight: var(--fontWeight-bold);
    color: var(--foreground);
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    text-decoration-thickness: 0.15rem;
  }
  .intro-link:hover {
    opacity: 0.7;
  }

  /* ── Stats ── */
  .intro-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-bottom: var(--border);
  }
  @media (min-width: 768px) {
    .intro-stats {
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    }
  }
  .intro-stat {
    padding: var(--spacing-sm);
    border-right: var(--border);
    border-bottom: var(--border);
  }
  @media (min-width: 768px) {
    .intro-stat {
      padding: var(--spacing-md) var(--spacing-lg);
      border-bottom: none;
    }
    .intro-stat:last-child {
      border-right: none;
    }
  }
  .intro-stat-value {
    font-size: var(--font-700);
    font-weight: var(--fontWeight-heavy);
    letter-spacing: var(--letterSpacing-tight);
    line-height: 1;
    margin-bottom: var(--spacing-xxs);
  }
  @media (min-width: 768px) {
    .intro-stat-value {
      font-size: var(--font-800);
    }
  }
  .intro-stat-label {
    font-size: var(--font-400);
    color: var(--foreground-muted);
    font-weight: var(--fontWeight-medium);
  }

  /* ── Sections ── */
  .intro-sections {
    border-bottom: var(--border);
  }
  .intro-sections-title {
    font-size: var(--font-400);
    font-weight: var(--fontWeight-bold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--foreground-muted);
    margin: 0 0 var(--spacing-md);
  }
  .intro-section-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
  @media (min-width: 600px) {
    .intro-section-grid {
      grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
    }
  }
  .intro-section-card {
    padding: var(--spacing-md);
    border: var(--border);
    border-radius: var(--size-1);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xxs);
    transition: background 0.15s ease, box-shadow 0.15s ease;
  }
  .intro-section-card:hover {
    background: var(--background-darker);
    box-shadow: var(--shadow-z2);
  }
  .intro-section-card-tag {
    font-size: 1rem;
    font-weight: var(--fontWeight-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-blue);
  }
  .intro-section-card-title {
    font-size: var(--font-2xs);
    font-weight: var(--fontWeight-bold);
    margin: 0;
  }
  .intro-section-card-desc {
    font-size: var(--font-400);
    color: var(--foreground-muted);
    line-height: var(--lineHeight-base);
    margin: 0;
  }

  /* ── Stack ── */
  .intro-stack {
    border-bottom: var(--border);
  }
  .intro-stack-title {
    font-size: var(--font-400);
    font-weight: var(--fontWeight-bold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--foreground-muted);
    margin: 0 0 var(--spacing-md);
  }
  .intro-stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  .intro-stack-tag {
    font-size: var(--font-400);
    font-weight: var(--fontWeight-medium);
    padding: var(--spacing-xxxs) var(--spacing-xxs);
    border: var(--border);
    border-radius: var(--size-1);
    color: var(--foreground);
    background: var(--background-darker);
  }

  /* ── Principles ── */
  .intro-principles {
    border-bottom: var(--border);
  }
  .intro-principles-title {
    font-size: var(--font-400);
    font-weight: var(--fontWeight-bold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--foreground-muted);
    margin: 0 0 var(--spacing-md);
  }
  .intro-principles-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  @media (min-width: 600px) {
    .intro-principles-grid {
      grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
    }
  }
  .intro-principle {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xxs);
  }
  .intro-principle-heading {
    font-size: var(--font-2xs);
    font-weight: var(--fontWeight-bold);
    margin: 0;
  }
  .intro-principle-body {
    font-size: var(--font-400);
    color: var(--foreground-muted);
    line-height: var(--lineHeight-tall);
    margin: 0;
  }

  /* ── Footer ── */
  .intro-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  .intro-footer-copy {
    font-size: var(--font-400);
    color: var(--foreground-muted);
  }
`;

function injectIntroStyles() {
  if (document.getElementById('_intro-styles')) return;
  const el = document.createElement('style');
  el.id = '_intro-styles';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

export default {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
};

export const Welcome = () => ({
  setup() {
    injectIntroStyles();

    const year = new Date().getFullYear();
    const careerYears = year - 2013;

    const sections = [
      {
        tag: 'Foundation',
        title: 'Design Tokens',
        desc: 'CSS custom properties for color, typography, spacing, shadows, and radius — all live and theme-aware.',
        story: 'foundation-tokens--colors',
      },
      {
        tag: 'Primitives',
        title: 'Button, Icon, TextLink, Logo',
        desc: 'Atomic building blocks. Multiple variants, sizes, and accessible states.',
        story: 'components-primitives-button--all-types',
      },
      {
        tag: 'Forms',
        title: 'Input, Select, Textarea',
        desc: 'Form elements with validation states, labels, and keyboard accessibility.',
        story: 'components-forms-input--default',
      },
      {
        tag: 'Navigation',
        title: 'Header, StickyNav, Footer',
        desc: 'Responsive navigation with scroll behaviors, mobile menu, and theme toggle.',
        story: 'components-navigation-headernav--default',
      },
      {
        tag: 'Layout',
        title: 'HeroBanner, TextBlock, TextGrid',
        desc: 'Page-level layout components. Composable with slots, props, and variants.',
        story: 'components-layout-herobanner--default',
      },
      {
        tag: 'Cards',
        title: 'ArticleCard, ImageCard, ThumbDetail',
        desc: 'Content cards for writing, work, and media — with multiple display modes.',
        story: 'components-cards-articlecard--default',
      },
      {
        tag: 'Blog',
        title: 'AuthorBioBar, ShareWidget, FilterBar',
        desc: 'Writing-specific components for article pages and content feeds.',
        story: 'components-blog-authorbiobar--default',
      },
      {
        tag: 'Patterns',
        title: 'Artboard',
        desc: 'Components composed together as a full-page system — the real thing in action.',
        story: 'patterns-artboard--artboard',
      },
    ];

    const stack = [
      'Vue 3',
      'Vue Router',
      'Vuex',
      'JavaScript',
      'SCSS',
      'CSS Custom Properties',
      'GSAP',
      'Storybook 7',
      'Webpack 5',
      'Markdown-it',
      'Highlight.js',
      'Contentful',
      'Vueuse',
    ];

    const principles = [
      {
        heading: 'Token-based by default',
        body: 'Every value — color, size, spacing, shadow — is a CSS custom property. Components inherit theme and respond to light/dark mode without a line of JS.',
      },
      {
        heading: 'Coded by the designer',
        body: 'No handoff gap. These components were designed and built by the same person. Design intent is preserved because the designer held the keyboard.',
      },
      {
        heading: 'Accessible from the start',
        body: 'ARIA labels, keyboard navigation, focus-visible states, and contrast-safe color use are built in — not bolted on.',
      },
      {
        heading: 'Composable, not monolithic',
        body: 'Atomic primitives compose into layouts. A Button, an Icon, and a TextBlock combine into a HeroBanner. The system scales without new code.',
      },
    ];

    return { careerYears, year, sections, stack, principles };
  },
  template: `
    <div class="intro-page">

      <!-- ── Hero ── -->
      <section class="intro-hero">
        <p class="intro-eyebrow">Ramphal Component Library</p>
        <h1 class="intro-headline">
          Built by a<br/><em>full stack designer.</em>
        </h1>
        <p class="intro-tagline">
          Every component in this library was designed and coded from scratch in Vue 3.
          Token-based theming, accessible patterns, and production-quality code —
          built by the same person who drew the designs.
        </p>
        <div class="intro-links">
          <a class="intro-link" href="https://ramphal.design" target="_blank">
            ramphal.design ↗
          </a>
          <a class="intro-link" href="https://github.com/jacquesramphal" target="_blank">
            github.com/jacquesramphal ↗
          </a>
        </div>
      </section>

      <!-- ── Stats ── -->
      <div class="intro-stats">
        <div class="intro-stat">
          <div class="intro-stat-value">30+</div>
          <div class="intro-stat-label">Components</div>
        </div>
        <div class="intro-stat">
          <div class="intro-stat-value">{{ careerYears }}</div>
          <div class="intro-stat-label">Years experience</div>
        </div>
        <div class="intro-stat">
          <div class="intro-stat-value">100+</div>
          <div class="intro-stat-label">Design tokens</div>
        </div>
        <div class="intro-stat">
          <div class="intro-stat-value">2</div>
          <div class="intro-stat-label">Themes (light + dark)</div>
        </div>
      </div>

      <!-- ── Sections ── -->
      <section class="intro-sections">
        <p class="intro-sections-title">What's inside</p>
        <div class="intro-section-grid">
          <div class="intro-section-card" v-for="s in sections" :key="s.tag">
            <span class="intro-section-card-tag">{{ s.tag }}</span>
            <p class="intro-section-card-title">{{ s.title }}</p>
            <p class="intro-section-card-desc">{{ s.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ── Principles ── -->
      <section class="intro-principles">
        <p class="intro-principles-title">Design principles</p>
        <div class="intro-principles-grid">
          <div class="intro-principle" v-for="p in principles" :key="p.heading">
            <h3 class="intro-principle-heading">{{ p.heading }}</h3>
            <p class="intro-principle-body">{{ p.body }}</p>
          </div>
        </div>
      </section>

      <!-- ── Stack ── -->
      <section class="intro-stack">
        <p class="intro-stack-title">Built with</p>
        <div class="intro-stack-list">
          <span class="intro-stack-tag" v-for="t in stack" :key="t">{{ t }}</span>
        </div>
      </section>

      <!-- ── Footer ── -->
      <footer class="intro-footer">
        <span class="intro-footer-copy">
          Jacques Ramphal · Full Stack Design Lead · Toronto
        </span>
        <span class="intro-footer-copy">
          © {{ year }} — use these patterns freely
        </span>
      </footer>

    </div>
  `,
});
Welcome.storyName = 'Welcome';
