<template>
  <PageWrapper id="doc" class="">
    <!-- <HeroBanner :eyebrow="pageData.date" :title="pageData.title" /> -->
    <MarkdownRenderer :markdown="markdownContent" />
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
};
</script>

<style lang="scss" scoped>
.section {
  padding-block-end: var(--spacing-lg);
}
</style>
