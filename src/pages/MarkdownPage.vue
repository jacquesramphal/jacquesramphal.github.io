<template>
  <PageWrapper id="doc" class="">
    <!-- <HeroBanner :eyebrow="pageData.date" :title="pageData.title" /> -->
    <GridContainer class="offset">
        <!-- <aside class="sidebar animate glow">
          <ul>
            <li><p>Heading Link</p></li>
            <li><p>Heading Link</p></li>
            <li><p>Heading Link</p></li>
            <li v-for="heading in headings" :key="heading.id">
              <p>
                <a :href="'#' + heading.id">{{ heading.text }}</a>
              </p>
            </li>
          </ul>
        </aside> -->
        

        <aside class="sidebar animate glow" v-if="showSidebar">
          <ul style="block-size: 100%">
            <li v-for="heading in headings" :key="heading.id">
              <p><a :href="'#' + heading.id">{{ heading.text }}</a></p>
            </li>
          </ul>
        </aside><!-- 
        <MyButton label="Toggle Nav" @click="showSidebar = !showSidebar">
          {{ showSidebar ? "Hide" : "Show" }} Sidebar
        </MyButton> -->

        <!-- <GridParent style="background-color:pink;"> -->

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
    };
  },
  computed: {
    gridStyle() {
      // If the window width is greater than or equal to 768 pixels (desktop view)

      if (this.windowWidth >= 768) {
        return {
          // If the sidebar is shown, set the grid areas to 'sidebar' and 'segments'
          // Otherwise, set the grid area to 'segments' only

          gridTemplateAreas: this.showSidebar
            ? '"sidebar segments"'
            : '"segments"',
          // If the sidebar is shown, set the grid columns to 30% for the sidebar and the rest for the segments
          // Otherwise, set the grid column to take up the full width

          gridTemplateColumns: this.showSidebar ? "15% 1fr" : "1fr",
        };
      } else {
        // If the window width is less than 768 pixels (mobile view)
        return {
          // If the sidebar is shown, set the grid areas to 'sidebar' and 'segments' (stacked on top of each other)
          // Otherwise, set the grid area to 'segments' only

          gridTemplateAreas: this.showSidebar
            ? '"sidebar" "segments"'
            : '"segments"',
          // Set the grid column to take up the full width

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
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  grid-area: sidebar;
  overflow-x: hidden;
  position: relative;
  inline-size: auto;
  justify-content: start;
  flex-direction: column;
  display: flex;
  background-color: pink;
  flex: 1;

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
.section {
  padding-block-end: var(--spacing-lg);
}
</style>
