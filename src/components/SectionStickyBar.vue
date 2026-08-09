<template>
  <!--
    Mobile sticky "on this page" bar. Shows the current section as you scroll
    past the first heading, and expands downward into the full list of the
    page's section headers (like a compact fullscreen nav) so you can jump
    around without scrolling back up. Driven by a plain [{ id, title }] list, so
    it works for both the Library section headers and an article's markdown
    body headings. Hidden on desktop, where the TOC sidebar / view toggle
    already covers this.
  -->
  <div v-if="sections.length" class="section-sticky" :class="{ 'section-sticky--visible': visible }">
    <div v-show="expanded" class="section-sticky__backdrop" @click="close"></div>

    <div class="section-sticky__bar">
      <button
        type="button"
        class="section-sticky__toggle"
        :aria-expanded="expanded ? 'true' : 'false'"
        aria-controls="section-sticky-panel"
        @click="toggle"
      >
        <span class="section-sticky__label">{{ currentTitle }}</span>
        <span
          class="section-sticky__icon"
          :class="{ 'section-sticky__icon--open': expanded }"
          aria-hidden="true"
        ></span>
        <span class="section-sticky__sr">{{ expanded ? 'Hide' : 'Show' }} page sections</span>
      </button>

      <nav
        v-show="expanded"
        id="section-sticky-panel"
        class="section-sticky__panel"
        aria-label="On this page"
      >
        <ul class="section-sticky__list">
          <li v-for="s in sections" :key="s.id">
            <button
              type="button"
              class="section-sticky__link"
              :class="{ 'section-sticky__link--active': s.id === currentId }"
              @click="go(s.id)"
            >
              {{ s.title }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// Distance below the top of the viewport at which a heading is considered the
// "current" section. Roughly the height of the sticky bar so the active title
// flips as each heading tucks under the bar.
const THRESHOLD = 72;

export default {
  name: 'SectionStickyBar',
  props: {
    // Ordered list of { id, title }. `id` must match a DOM element id on the page.
    sections: {
      type: Array,
      default: () => [],
    },
    // Space left above a heading when jumping to it (accounts for the bar).
    scrollOffset: {
      type: Number,
      default: 72,
    },
  },
  data() {
    return {
      expanded: false,
      currentId: null,
      atTop: true,
      pastFirst: false,
      ticking: false,
    };
  },
  computed: {
    visible() {
      return this.sections.length > 0 && this.pastFirst && !this.atTop;
    },
    currentTitle() {
      const found = this.sections.find((s) => s.id === this.currentId);
      return (found && found.title) || (this.sections[0] && this.sections[0].title) || '';
    },
  },
  watch: {
    sections() {
      this.$nextTick(this.recompute);
    },
    $route() {
      this.expanded = false;
      this.$nextTick(this.recompute);
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.$nextTick(this.recompute);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  },
  methods: {
    onScroll() {
      if (this.ticking) return;
      this.ticking = true;
      window.requestAnimationFrame(() => {
        this.recompute();
        this.ticking = false;
      });
    },
    recompute() {
      const y = window.scrollY || window.pageYOffset || 0;
      this.atTop = y < 8;
      if (this.atTop && this.expanded) this.expanded = false;

      const first = this.sections
        .map((s) => document.getElementById(s.id))
        .find((el) => el);
      if (!first) {
        this.pastFirst = false;
        return;
      }

      const firstTop = first.getBoundingClientRect().top + y;
      this.pastFirst = y + THRESHOLD >= firstTop;

      // Current section = the last heading whose top has scrolled to/above the
      // threshold line. Headings are in document order, so once one drops below
      // the line every later one does too.
      let current = null;
      for (const s of this.sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= THRESHOLD) {
          current = s.id;
        } else {
          break;
        }
      }
      this.currentId = current || (first && first.id) || null;
    },
    toggle() {
      this.expanded = !this.expanded;
    },
    close() {
      this.expanded = false;
    },
    go(id) {
      this.expanded = false;
      const el = document.getElementById(id);
      if (!el) return;
      const y =
        el.getBoundingClientRect().top +
        (window.scrollY || window.pageYOffset || 0) -
        this.scrollOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// Mobile-only: desktop already has the TOC sidebar (articles) and the view
// toggle (library), so the compact bar would be redundant there.
.section-sticky {
  @media only screen and (min-width: 768px) {
    display: none;
  }
}

.section-sticky__backdrop {
  position: fixed;
  inset: 0;
  z-index: 99988;
  background: rgba(0, 0, 0, 0.18);
}

.section-sticky__bar {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 99990;
  display: flex;
  flex-direction: column;
  background: var(--background);
  border-block-end: var(--border);
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-sticky--visible .section-sticky__bar {
  transform: translateY(0);
}

.section-sticky__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  inline-size: 100%;
  margin: 0;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: none;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  color: var(--foreground);
  text-align: start;
}

.section-sticky__label {
  min-inline-size: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // Match the sticky HeaderNav link size (global `a` = --font-500) so the
  // context bar reads as the same class of chrome, just bigger than before.
  font-size: var(--font-500);
  font-weight: var(--fontWeight-medium);
}

// Plus / minus icon, matching the disclosure glyph used elsewhere (markdown
// <summary>). currentColor + mask keeps it theme-aware.
.section-sticky__icon {
  flex-shrink: 0;
  inline-size: 22px;
  block-size: 22px;
  background-color: currentColor;
  mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.5V12.5M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.5V12.5M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
  mask-size: contain;
  -webkit-mask-size: contain;
}

.section-sticky__icon--open {
  mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
}

.section-sticky__sr {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.section-sticky__panel {
  max-block-size: 70vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border-block-start: var(--border);
}

.section-sticky__list {
  list-style: none;
  margin: 0;
  padding: var(--spacing-xxs) 0;
}

.section-sticky__link {
  display: block;
  inline-size: 100%;
  margin: 0;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: none;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-500);
  color: var(--foreground-subtle);
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: var(--background-darker);
    color: var(--foreground);
  }
}

.section-sticky__link--active {
  color: var(--foreground);
  font-weight: var(--fontWeight-medium);
  background: var(--background-darker);
}
</style>
