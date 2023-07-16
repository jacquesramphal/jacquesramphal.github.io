<template>
  <PageWrapper id="mdoc" class="">
    <MarkdownRenderer :markdown="pageContent" />
      </PageWrapper>
</template>

<script>
import { ref, onMounted } from 'vue';
import router from "@/router";

export default {
  name: "MarkdownPage",
  setup() {
    const pageContent = ref("");

    onMounted(async () => {
      try {
        const mdocId = parseInt(router.currentRoute.value.params.id);
        const module = await import(`../assets/content/mdoc_${mdocId}.md`);
        const markdown = module.default;
        pageContent.value = markdown;
      } catch (error) {
        console.error("Error loading Markdown content:", error);
        // You can handle the error here, such as displaying an error message or redirecting to an error page
      }
    });

    return {
      pageContent
    };
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding-bottom: var(--spacing-lg);
}
</style>
