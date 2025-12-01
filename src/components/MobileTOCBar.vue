<template>
  <div 
    v-if="isMarkdownPage && hasHeadings && headings && headings.length > 0"
    ref="tocBar"
    class="mobile-toc-bar"
  >
    <nav class="mobile-toc-nav">
      <ul class="mobile-toc-list">
        <li
          v-for="(heading, index) in h2Headings"
          :key="heading.slug"
          :data-slug="heading.slug"
          :class="[
            'mobile-toc-item',
            'glow',
            'animate',
            { 'mobile-toc-item--active': activeHeading === heading.slug },
            getDelayClass(index)
          ]"
        >
          <a
            :href="`#${heading.slug}`"
            :class="{ 'mobile-toc-link--active': activeHeading === heading.slug }"
            @click.prevent="handleClick($event, heading.slug)"
          >
            {{ heading.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MobileTOCBar",
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
    isMarkdownPage() {
      return this.$route?.path?.startsWith('/doc/');
    },
    hasHeadings() {
      return this.headings && this.headings.length > 0;
    },
    h2Headings() {
      return this.headings.filter(heading => heading.level === 2);
    },
  },
  watch: {
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
      const tocBar = this.$refs.tocBar;
      if (!tocBar) return;
      
      // Find the active item by data-slug attribute
      const activeItem = tocBar.querySelector(`[data-slug="${slug}"]`);
      
      if (activeItem) {
        const itemRect = activeItem.getBoundingClientRect();
        const containerRect = tocBar.getBoundingClientRect();
        const scrollLeft = tocBar.scrollLeft;
        
        // Calculate position relative to container
        const itemLeft = itemRect.left - containerRect.left + scrollLeft;
        
        // Scroll to center the active item
        const targetScroll = itemLeft - (containerRect.width / 2) + (itemRect.width / 2);
        
        tocBar.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        });
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
        
        // Scroll to element with offset for fixed headers
        const offset = 120; // Account for header + mobile TOC bar
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-toc-bar {
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  z-index: 99998;
  background: var(--background);
  border-block-end: var(--border);
  padding-block: var(--spacing-xs);
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  // Only show on mobile
  display: block;
  
  @media only screen and (min-width: 768px) {
    display: none;
  }
}

.mobile-toc-nav {
  inline-size: max-content;
  min-inline-size: 100%;
}

.mobile-toc-list {
  list-style: none;
  margin: 0;
  padding: 0 var(--spacing-sm);
  display: flex;
  flex-direction: row;
  gap: 0;
  align-items: center;
  white-space: nowrap;
  inline-size: max-content;
}

.mobile-toc-item {
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

.mobile-toc-item a {
  color: var(--foreground-subtle);
  text-decoration: none;
  padding: var(--spacing-xxs) var(--spacing-xs);
  border-radius: 4px;
  transition: all 0.2s ease;
  display: block;
  white-space: nowrap;
  
  &:hover {
    color: var(--foreground);
    background: var(--background-darker);
  }
}

.mobile-toc-link--active,
.mobile-toc-item--active a {
  color: var(--foreground) !important;
  font-weight: var(--font-weight-semibold);
  background: var(--background-darker);
}

/* Hide scrollbar but keep functionality */
.mobile-toc-bar::-webkit-scrollbar {
  height: 2px;
}

.mobile-toc-bar::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-toc-bar::-webkit-scrollbar-thumb {
  background: var(--foreground-subtle);
  border-radius: 1px;
}
</style>
