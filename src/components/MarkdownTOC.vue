<template>
  <aside class="markdown-toc">
    <nav v-if="h2Headings.length > 0">
      <ul class="toc-list">
        <li
          v-for="heading in h2Headings"
          :key="heading.slug"
          :class="[
            'toc-item',
            `toc-item--level-${heading.level}`,
            { 'toc-item--active': activeHeading === heading.slug }
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
    <div v-else class="toc-empty">
      <p class="toc-debug">TOC: {{ headings.length }} headings</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "MarkdownTOC",
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
    h2Headings() {
      return this.headings.filter(heading => heading.level === 2);
    },
  },
  mounted() {
    console.log("MarkdownTOC mounted with headings:", this.headings);
  },
  watch: {
    headings: {
      handler(newHeadings) {
        console.log("MarkdownTOC headings updated:", newHeadings);
      },
      immediate: true,
    },
  },
  methods: {
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
          behavior: "smooth",
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
            behavior: "smooth",
          });
          
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, `#${slug}`);
          }
        } else {
          console.warn("TOC: Could not find heading with id:", slug);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-toc {
  display: none;

  @media only screen and (min-width: 1201px) {
    display: block;
    max-inline-size: 100%;
    inline-size: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    scrollbar-width: thin;
    scrollbar-color: var(--foreground-subtle) transparent;
  }
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
  font-size: var(--font-sm);
  font-weight: var(--font-weight-semibold);
  margin-block-start: var(--spacing-xs);
  
  &:first-child {
    margin-block-start: 0;
  }
}

.toc-item--level-2 {
  font-size: var(--font-xs);
  padding-inline-start: var(--spacing-sm);
  margin-block-start: var(--spacing-xxs);
}

.toc-item--level-3 {
  font-size: var(--font-xs);
  padding-inline-start: var(--spacing-md);
  color: var(--foreground-subtle);
}

.toc-item--level-4,
.toc-item--level-5,
.toc-item--level-6 {
  font-size: var(--font-xs);
  padding-inline-start: var(--spacing-lg);
  color: var(--foreground-subtle);
}

.toc-item a {
  color: var(--foreground-subtle);
  text-decoration: none;
  transition: color 0.2s ease;
  display: block;
  padding: var(--spacing-xxs) 0;
  
  &:hover {
    color: var(--foreground);
  }
}

.toc-link--active {
  color: var(--foreground) !important;
  font-weight: var(--font-weight-semibold);
}

.toc-item--active {
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    inset-inline-start: calc(-1 * var(--spacing-xs));
    inset-block-start: 0;
    inset-block-end: 0;
    inline-size: 2px;
    background-color: var(--foreground);
  }
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

.toc-empty {
  padding: var(--spacing-sm);
  font-size: var(--font-xs);
  color: var(--foreground-subtle);
}

.toc-debug {
  margin: 0;
  padding: 0;
}
</style>

