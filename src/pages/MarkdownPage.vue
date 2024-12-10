<template>
  <PageWrapper id="doc" class="">
    <!-- <HeroBanner :eyebrow="pageData.date" :title="pageData.title" /> -->
    <GridContainer class="offset">
      <GridWrapper>
        <aside class="sidebar animate glow">
          <ul>
            <li>test link DND</li>
            <li v-for="heading in headings" :key="heading.id">
              <p>
                <a :href="'#' + heading.id" :class="{ active: activeHeading === heading.id }">{{ heading.text }}</a>
              </p>
            </li>
          </ul>
        </aside>
      </GridWrapper>
      <MarkdownRenderer
        class=""
        :markdown="markdownContent"
        @headings="updateHeadings"
      />
    </GridContainer>
    <!-- <CardRow2 /> -->
  </PageWrapper>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";
import frontMatter from "front-matter";
// import CardRow2 from "@/components/CardRow2.vue";

export default {
  name: "MarkdownPage",
  components: {
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

        console.log(attributes); // Check the parsed front matter
        console.log(body); // Check the Markdown body
        console.log("Raw Markdown File Content:", markdownContent);

        pageData.value = attributes; // Store the front matter data
        markdownContent.value = body; // Store the body of the markdown content
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
      this.headings = headings;
      this.observeHeadings();
    },
    observeHeadings() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeHeading = entry.target.id;
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);
      this.$nextTick(() => {
        this.headings.forEach((heading) => {
          const element = document.getElementById(heading.id);
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
.section {
  padding-block-end: var(--spacing-lg);
}
</style>
