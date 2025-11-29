<template>
  <PageWrapper id="doc" class="">
    <!-- <HeroBanner :eyebrow="pageData.date" :title="pageData.title" /> -->
    <GridContainer class="markdown-layout" >
      <GridParent>
        <MarkdownTOC
          class="toc-column"
          :headings="headings"
          :active-heading="activeHeading"
        />
        <MarkdownRenderer
          class="content"
          :markdown="markdownContent"
          @headings="updateHeadings"
        />
      </GridParent>
    </GridContainer>
    <GridContainer>
      <AuthorBioBar
        :name="pageData.author || 'Jake Ramphal'"
        :title="pageData.authorTitle || 'Staff Product Designer, Design Lead for Genie | Orium'"
        :description="pageData.authorDescription || ''"
      />
    </GridContainer>
    <CardRow2 title="Related Writing" style="background: var(--background-darker)"/>
  </PageWrapper>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";
import frontMatter from "front-matter";
import AuthorBioBar from "@/components/AuthorBioBar.vue";
import MarkdownTOC from "@/components/MarkdownTOC.vue";
import GridParent from "@/components/grid/GridParent.vue";
// import CardRow2 from "@/components/CardRow2.vue";

export default {
  name: "MarkdownPage",
  components: {
    AuthorBioBar,
    MarkdownTOC,
    GridParent,
    // CardRow2,
  },
  data() {
    return {
      showSidebar: true,
      headings: [],
      activeHeading: null,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    gridStyle() {
      if (this.windowWidth >= 768) {
        return {
          gridTemplateAreas: this.showSidebar
            ? '"sidebar segments"'
            : '"segments"',
          gridTemplateColumns: this.showSidebar ? "15% 1fr" : "1fr",
        };
      } else {
        return {
          gridTemplateAreas: this.showSidebar
            ? '"sidebar" "segments"'
            : '"segments"',
          gridTemplateColumns: "1fr",
        };
      }
    },
  },
  setup() {
    const pageData = ref({});
    const markdownContent = ref("");

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
    };
  },
  methods: {
    updateHeadings(headings) {
      console.log("MarkdownPage received headings:", headings);
      this.headings = headings;
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
.sidebar {
  overflow-x: hidden;
  position: relative;
  inline-size: auto;
  justify-content: start;

  @media only screen and (min-width: 768px) {
    // inline-size: 25vw;
    padding-block-start: var(--spacing-xl);
    inset-block-start: 0;
    inset-block-end: 0;
    position: fixed;
    // background-color: red;
    padding-block-end: var(--spacing-md) !important;
  }

  /* override styles when printing */
}
.sidebar .active {
  font-weight: bold;
  color: var(--primary-color);
}
.toc-column {
  display: none;
  
  @media only screen and (min-width: 1201px) {
    display: block;
    grid-column: 1 / 2; // Column 1 out of 3 (1/3 width)
    position: fixed;
    align-self: start;
    inset-block-start: var(--spacing-xl);
    inset-inline-start: var(--spacing-xl); // Match GridContainer padding
    block-size: calc(100vh - var(--spacing-xl));
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
    background: var(--background);
    scrollbar-width: thin;
    scrollbar-color: var(--foreground-subtle) transparent;
    // Since fixed, calculate 1/3 width accounting for container padding
    // GridParent creates 3 equal columns, so approximately 1/3 of container
    inline-size: calc((100vw - (var(--spacing-xl) * 2) - (var(--spacing-lg) * 2)) / 3);
    max-inline-size: calc((100vw - (var(--spacing-xl) * 2) - (var(--spacing-lg) * 2)) / 3);
    box-sizing: border-box;
  }
}

.content {
  @media only screen and (min-width: 768px) {
    padding-top: var(--spacing-lg);
  }
  
  @media only screen and (min-width: 1201px) {
    grid-column: 2 / 4; // Content starts at column 2, spans columns 2 and 3 (2/3 width)
  }
}

/* TOC scrollbar styling */
.toc-column::-webkit-scrollbar {
  width: 4px;
}

.toc-column::-webkit-scrollbar-track {
  background: transparent;
}

.toc-column::-webkit-scrollbar-thumb {
  background: var(--foreground-subtle);
  border-radius: 2px;
}

.toc-column::-webkit-scrollbar-thumb:hover {
  background: var(--foreground);
}
.section {
  padding-block-end: var(--spacing-lg);
}
</style>
