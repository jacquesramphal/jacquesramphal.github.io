<template>
  <PageWrapper id="doc" class="markdown-page-wrapper">
    <!-- <HeroBanner :eyebrow="pageData.date" :title="pageData.title" /> -->
    <GridContainer class="markdown-layout">
      <main id="markdown-content-end" class="markdown-main">
        <MarkdownRenderer
          class="content"
          :markdown="markdownContent"
          @headings="updateHeadings"
        />
      </main>
    </GridContainer>
    <div id="related-writing-section" style="background: transparent !important;">
      <CardRow2 title="Related Writing"/>
    </div>
  </PageWrapper>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import router from "@/router";
import frontMatter from "front-matter";

export default {
  name: "MarkdownPage",
  setup() {
    const pageData = ref({});
    const markdownContent = ref("");
    const headings = ref([]);
    const activeHeading = ref(null);
    
    // Inject update functions from App.vue
    const updateMarkdownHeadings = inject('updateMarkdownHeadings', () => {});
    const updateMarkdownActiveHeading = inject('updateMarkdownActiveHeading', () => {});

    onMounted(async () => {
      try {
        const docId = parseInt(router.currentRoute.value.params.id);
        const module = await import(`../assets/content/doc_${docId}.md`);
        const { attributes, body } = frontMatter(module.default);

        console.log("MarkdownPage: Attributes:", attributes);
        console.log("MarkdownPage: Body length:", body?.length);
        console.log("MarkdownPage: Body preview:", body?.substring(0, 200));

        pageData.value = attributes; // Store the front matter data
        // Pass the full markdown content (with frontmatter) to MarkdownRenderer
        // MarkdownRenderer will parse it again
        markdownContent.value = module.default;
      } catch (error) {
        console.error("Error loading Markdown content:", error);
        router.push({ name: "NotFound" }); // Redirect to a 404 page in case of an error
      }
    });

    return {
      pageData,
      markdownContent,
      headings,
      activeHeading,
      updateMarkdownHeadings,
      updateMarkdownActiveHeading,
    };
  },
  watch: {
    headings(newHeadings) {
      if (this.updateMarkdownHeadings) {
        this.updateMarkdownHeadings(newHeadings);
      }
    },
    activeHeading(newActive) {
      if (this.updateMarkdownActiveHeading) {
        this.updateMarkdownActiveHeading(newActive);
      }
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
        // Find the heading that's currently in view
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length > 0) {
          // Use the first visible heading (topmost)
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
    },
  },
};
</script>

<style lang="scss" scoped>
// GridContainer will use 3-column grid on desktop
.markdown-layout {
  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-lg);
  }
}

// Main content area
.markdown-main {
  width: 100%;
  grid-column: 1 / -1; // Full width on mobile and tablet
  
  @media only screen and (min-width: 1201px) {
    grid-column: 2 / 4; // Last 2 columns of 3-column layout on desktop
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
