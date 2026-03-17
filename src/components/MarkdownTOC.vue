<template>
  <aside ref="tocContainer" class="markdown-toc">
    <nav v-if="h2h3Headings.length > 0">
      <ul class="toc-list">
        <li
          v-for="(heading, index) in h2h3Headings"
          :key="heading.slug"
          :data-slug="heading.slug"
          :class="[
            'toc-item',
            'glow',
            'animate',
            `toc-item--level-${heading.level}`,
            { 'toc-item--active': activeHeading === heading.slug },
            getDelayClass(index),
          ]"
        >
          <a
            :href="`#${heading.slug}`"
            :class="{ 'toc-link--active': activeHeading === heading.slug }"
            @click.prevent="handleClick($event, heading.slug)"
          >
            {{ heading.title }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'MarkdownTOC',
  props: {
    headings: {
      type: Array,
      default: () => [],
    },
    activeHeading: {
      type: String,
      default: null,
    },
  },
  computed: {
    h2h3Headings() {
      return this.headings.filter((heading) => heading.level === 2);
    },
  },
  mounted() {
    console.log('MarkdownTOC mounted with headings:', this.headings);
  },
  watch: {
    headings: {
      handler(newHeadings) {
        console.log('MarkdownTOC headings updated:', newHeadings);
      },
      immediate: true,
    },
    activeHeading(newHeading) {
      if (newHeading) {
        this.$nextTick(() => {
          this.scrollToActiveItem(newHeading);
        });
      }
    },
  },
  methods: {
    getDelayClass(index) {
      // Normal order: first item gets delay-1, last item gets highest delay
      const delayMap = {
        0: 'delay-1',
        1: 'delay-1-5',
        2: 'delay-2',
        3: 'delay-2-5',
        4: 'delay-3',
        5: 'delay-3-5',
        6: 'delay-4',
      };
      return delayMap[index] || delayMap[Math.min(index, 6)];
    },
    scrollToActiveItem(slug) {
      const tocContainer = this.$refs.tocContainer;
      if (!tocContainer) return;

      // Find the active item by data-slug attribute
      const activeItem = tocContainer.querySelector(`[data-slug="${slug}"]`);

      if (activeItem) {
        // Find the scrollable parent container (toc-drawer__content)
        let scrollContainer = tocContainer.closest('.toc-drawer__content');
        if (!scrollContainer) {
          // Fallback: try to find any scrollable parent
          scrollContainer = tocContainer.parentElement;
          while (scrollContainer && scrollContainer !== document.body) {
            const overflow = window.getComputedStyle(scrollContainer).overflowY;
            if (overflow === 'auto' || overflow === 'scroll') {
              break;
            }
            scrollContainer = scrollContainer.parentElement;
          }
        }

        if (scrollContainer) {
          const itemRect = activeItem.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();
          const scrollTop = scrollContainer.scrollTop;

          // Calculate position relative to container
          const itemTop = itemRect.top - containerRect.top + scrollTop;
          const itemBottom = itemTop + itemRect.height;
          const containerHeight = containerRect.height;
          const currentScroll = scrollTop;

          // Scroll to center the active item if it's not fully visible
          let targetScroll = currentScroll;
          if (itemTop < currentScroll) {
            // Item is above visible area
            targetScroll = itemTop - containerHeight / 4; // Scroll to show item with some padding
          } else if (itemBottom > currentScroll + containerHeight) {
            // Item is below visible area
            targetScroll = itemBottom - containerHeight + containerHeight / 4;
          }

          scrollContainer.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
        } else {
          // Fallback: use scrollIntoView
          activeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      }
    },
    handleClick(e, slug) {
      e.preventDefault();

      // Find the heading element by ID
      const element = document.getElementById(slug);

      if (element) {
        // Get the element's position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;

        // Scroll to element with offset for any fixed headers
        const offset = 100;
        const targetPosition = Math.max(0, elementTop - offset);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL hash
        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, `#${slug}`);
        } else {
          window.location.hash = `#${slug}`;
        }
      } else {
        // Fallback: try to find by anchor link
        const anchor = document.querySelector(`a.anchor[href="#${slug}"]`);
        if (anchor && anchor.parentElement) {
          const heading = anchor.parentElement;
          const rect = heading.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const elementTop = rect.top + scrollTop;

          window.scrollTo({
            top: Math.max(0, elementTop - 100),
            behavior: 'smooth',
          });

          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, `#${slug}`);
          }
        } else {
          console.warn('TOC: Could not find heading with id:', slug);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-toc {
  display: block;
  inline-size: fit-content;
  max-inline-size: 100%;
  overflow: visible;
  padding: 0;
  position: relative;
  margin-block-start: 0;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}

.toc-item {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.toc-item--level-1 {
  font-size: var(--font-xs);
  margin-block-start: var(--spacing-xs);

  &:first-child {
    margin-block-start: 0;
  }
}

.toc-item--level-2 {
  font-size: var(--font-xs);
  padding-inline-start: 0;
  margin-block-start: var(--spacing-xxs);
}

.toc-item--level-3 {
  font-size: var(--font-xs);
  padding-inline-start: var(--spacing-md);
}

.toc-item--level-4,
.toc-item--level-5,
.toc-item--level-6 {
  font-size: var(--font-xs);
  padding-inline-start: var(--spacing-lg);
  color: var(--foreground-subtle);
}

// Override global link styles - inactive items use muted color
.markdown-toc .toc-item:not(.toc-item--active) a,
.markdown-toc .toc-item a:not(.toc-link--active) {
  opacity: 0.75;
  text-decoration: none;
  transition: color 0.2s ease;
  display: block;
  padding: 0;
  font-size: inherit;

  &:hover {
    color: var(--foreground);
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 0.15rem;
  }
}

// Active items use foreground color
.markdown-toc .toc-link--active,
.markdown-toc .toc-item--active a {
  color: var(--foreground);
  font-size: var(--font-xs);
  opacity: 1;

  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 0.15rem;

  &:hover {
    color: var(--foreground);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 0.15rem;
  }
}

.toc-item--active {
  position: relative;
}

/* Scrollbar styling */
.markdown-toc::-webkit-scrollbar {
  width: 4px;
}

.markdown-toc::-webkit-scrollbar-track {
  background: transparent;
}

.markdown-toc::-webkit-scrollbar-thumb {
  background: var(--foreground-subtle);
  border-radius: 2px;
}

.markdown-toc::-webkit-scrollbar-thumb:hover {
  background: var(--foreground);
}
</style>
