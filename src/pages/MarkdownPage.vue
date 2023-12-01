<template>
  <PageWrapper id="mdoc" class="">
    <!-- Testing front matter - not working -->
    <!-- <HeroBanner
      id="hero"
      class="display"
      :eyebrow="pageData.date"
      :title="pageData.title"
    />
    <div>
      <h1>{{ pageData.title }}</h1>
      <p>{{ pageData.date }}</p>
    </div> -->
    <MarkdownRenderer :markdown="pageContent" />
    <div id="disqus_thread"></div>
    <!-- Remove <script> tag from here -->
    <noscript
      >Please enable JavaScript to view the
      <a href="https://disqus.com/?ref_noscript"
        >comments powered by Disqus.</a
      ></noscript
    >
  </PageWrapper>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";
import frontMatter from "front-matter";

export default {
  name: "MarkdownPage",
  components: {},
  setup() {
    const pageContentRef = ref("");
    const pageDataRef = ref({});

    onMounted(async () => {
      try {
        const mdocId = parseInt(router.currentRoute.value.params.id);
        const module = await import(`../assets/content/mdoc_${mdocId}.md`);
        const markdown = module.default;

        parseMarkdown(markdown);

        pageContentRef.value = markdown;
      } catch (error) {
        console.error("Error loading Markdown content:", error);
        router.push({ name: "NotFound" });
      }
    });

    const parseMarkdown = (markdown) => {
      const { attributes } = frontMatter(markdown);
      pageDataRef.value = attributes;
      configureDisqus(attributes);
    };

    const configureDisqus = (attributes) => {
      window.disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = attributes.identifier || window.location.href;
      };
    };

    // Move <script> tag content here

    return {
      pageData: pageDataRef,
      pageContent: pageContentRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding-bottom: var(--spacing-lg);
}
</style>
