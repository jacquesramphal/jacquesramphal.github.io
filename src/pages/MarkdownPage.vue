<template>
  <PageWrapper id="doc" class="markdown-page-wrapper" :overflow-visible="true">
    <GridContainer class="markdown-layout">
      <main id="markdown-content-end" class="markdown-main">
        <MarkdownRenderer
          class="content"
          :markdown="markdownContent"
          @headings="updateHeadings"
        />
      </main>
      <div 
        v-if="headings && headings.length > 0"
        ref="tocSidebarWrap"
        class="toc-sidebar-wrap"
      >
        <aside 
          ref="tocSidebar"
          class="toc-sidebar"
        >
          <MarkdownTOC
            :headings="headings"
            :active-heading="activeHeading"
          />
        </aside>
      </div>
    </GridContainer>
    <div id="related-writing-section" style="background: transparent !important;">
      <CardRow2 title="Related Writing"/>
    </div>
  </PageWrapper>
</template>

<script>
import { ref, onMounted, inject, watch } from "vue";
import router from "@/router";
import frontMatter from "front-matter";
import MarkdownTOC from "@/components/MarkdownTOC.vue";

export default {
  name: "MarkdownPage",
  setup() {
    const pageData = ref({});
    const markdownContent = ref("");
    const headings = ref([]);
    const activeHeading = ref(null);
    const tocSidebar = ref(null);
    const tocSidebarWrap = ref(null);

    const updateMarkdownHeadings = inject('updateMarkdownHeadings', () => {});
    const updateMarkdownActiveHeading = inject('updateMarkdownActiveHeading', () => {});

    const loadMarkdownContent = async (docId) => {
      try {
        const module = await import(`../assets/content/doc_${docId}.md`);
        const { attributes, body } = frontMatter(module.default);
        console.log("MarkdownPage: Attributes:", attributes);
        console.log("MarkdownPage: Body length:", body?.length);
        console.log("MarkdownPage: Body preview:", body?.substring(0, 200));
        pageData.value = attributes;
        markdownContent.value = module.default;
      } catch (error) {
        console.error("Error loading Markdown content:", error);
        router.push({ name: "NotFound" });
      }
    };

    onMounted(() => {
      const docId = parseInt(router.currentRoute.value.params.id);
      loadMarkdownContent(docId);
    });

    watch(() => router.currentRoute.value.params.id, (newId) => {
      if (newId) {
        const docId = parseInt(newId);
        loadMarkdownContent(docId);
        headings.value = [];
        activeHeading.value = null;
        window.scrollTo(0, 0);
      }
    });

    return {
      pageData,
      markdownContent,
      headings,
      activeHeading,
      tocSidebar,
      tocSidebarWrap,
      updateMarkdownHeadings,
      updateMarkdownActiveHeading,
    };
  },
  components: {
    MarkdownTOC,
  },
  data() {
    return {
      scrollHandler: null,
    };
  },
  mounted() {
    // Setup will be called when headings are available
  },
  beforeUnmount() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  },
  watch: {
    headings(newHeadings) {
      if (this.updateMarkdownHeadings) {
        this.updateMarkdownHeadings(newHeadings);
      }
      // Re-setup sticky when headings change
      if (newHeadings && newHeadings.length > 0) {
        this.$nextTick(() => {
          this.setupTOCSticky();
        });
      }
    },
    activeHeading(newActive) {
      if (this.updateMarkdownActiveHeading) {
        this.updateMarkdownActiveHeading(newActive);
      }
    },
    '$route'() {
      // Re-setup sticky on route change
      this.$nextTick(() => {
        if (this.headings && this.headings.length > 0) {
          this.setupTOCSticky();
        }
      });
    },
  },
  methods: {
    updateHeadings(headings) {
      console.log("MarkdownPage received headings:", headings);
      this.headings = headings;
      if (this.updateMarkdownHeadings) {
        this.updateMarkdownHeadings(headings);
      }
      this.observeHeadings();
    },
    observeHeadings() {
      const options = {
        root: null,
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      };

      const callback = (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length > 0) {
          this.activeHeading = visibleHeadings[0];
        }
      };

      const observer = new IntersectionObserver(callback, options);

      this.$nextTick(() => {
        this.headings.forEach((heading) => {
          const element = document.getElementById(heading.slug);
          if (element) {
            observer.observe(element);
          }
        });
      });

      // Setup sticky positioning when headings are available
      this.setupTOCSticky();
    },
    setupTOCSticky() {
      // Clean up existing handler
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
        this.scrollHandler = null;
      }

      this.$nextTick(() => {
        if (!this.$refs.tocSidebar || !this.$refs.tocSidebarWrap) {
          setTimeout(() => this.setupTOCSticky(), 300);
          return;
        }

        const sidebarElement = this.$refs.tocSidebar;
        const wrapElement = this.$refs.tocSidebarWrap;

        const handleScroll = () => {
          if (!sidebarElement || !wrapElement) return;

          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const sidebarTop = wrapElement.offsetTop;
          const sidebarHeight = sidebarElement.offsetHeight;
          const wrapHeight = wrapElement.offsetHeight;
          const stopPoint = sidebarTop + wrapHeight - sidebarHeight;
          
          // Get the wrapper's position to maintain right column alignment
          const wrapRect = wrapElement.getBoundingClientRect();
          const wrapLeft = wrapRect.left;

          if (scrollTop > sidebarTop && scrollTop < stopPoint) {
            // Stick to top of viewport, maintain right column position
            sidebarElement.style.position = 'fixed';
            sidebarElement.style.top = '20px';
            sidebarElement.style.left = `${wrapLeft}px`;
            sidebarElement.style.width = `${wrapElement.offsetWidth}px`;
          } else if (scrollTop >= stopPoint) {
            // Stick to bottom of wrapper
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = `${wrapHeight - sidebarHeight}px`;
            sidebarElement.style.left = '0';
            sidebarElement.style.width = '100%';
          } else {
            // Normal position at top
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = '0';
            sidebarElement.style.left = '0';
            sidebarElement.style.width = '100%';
          }
        };

        // Initial position
        handleScroll();

        // Add scroll listener
        this.scrollHandler = handleScroll;
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-layout {
  align-items: start;
  overflow: visible !important; // Critical for sticky to work

  @media only screen and (min-width: 1201px) {
    grid-template-columns: 2fr 1fr;
    grid-gap: var(--spacing-lg);
  }
}

.markdown-main {
  width: 100%;
  grid-column: 1 / -1;

  @media only screen and (min-width: 1201px) {
    grid-column: 1 / 2;
  }
}

// TOC sidebar wrapper - matches the v0 pattern
.toc-sidebar-wrap {
  display: none;

  @media only screen and (min-width: 1201px) {
    display: block;
    grid-column: 2 / 3;
    grid-row: 1;
    height: auto;
    width: 100%;
    position: relative;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 0;
    // This creates the height context for the sidebar
    min-height: 100%;
  }
}

// TOC sidebar - starts as absolute, changes to fixed/absolute via JS
.toc-sidebar {
  display: none;

  @media only screen and (min-width: 1201px) {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: fit-content;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    padding-block-start: var(--spacing-lg);
    box-sizing: border-box;
  }
}

.content {
  @media only screen and (min-width: 768px) {
    padding-top: var(--spacing-lg);
  }
}

.section {
  padding-block-end: var(--spacing-lg);
}

#related-writing-section {
  background: transparent !important;
}
</style>