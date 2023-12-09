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
    <!-- <section class="comments" aria-labelledby="comment">
      <h2 id="comment">Comments</h2>
      <Disqus shortname="ramphal" />
    </section> -->
    <CardRow2 />
  </PageWrapper>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";
import frontMatter from "front-matter";
import CardRow2 from "@/components/CardRow2.vue";
// import { Disqus } from 'vue-disqus'

export default {
  name: "MarkdownPage",
  components: {
    CardRow2
},
  setup() {
    const pageContentRef = ref("");
    const pageDataRef = ref({}); // Define pageData as a ref

    onMounted(async () => {
      try {
        const mdocId = parseInt(router.currentRoute.value.params.id);
        const module = await import(`../assets/content/mdoc_${mdocId}.md`);
        const markdown = module.default;

        // Call parseMarkdown to extract front matter data
        parseMarkdown(markdown);

        pageContentRef.value = markdown;
      } catch (error) {
        console.error("Error loading Markdown content:", error);
        router.push({ name: "NotFound" }); // Redirect to the 404 page
      }
    });

    const parseMarkdown = (markdown) => {
      const { attributes } = frontMatter(markdown);

      // Use 'attributes' as your metadata
      pageDataRef.value = attributes;
    };

    return {
      pageData: pageDataRef, // Make pageData available to the template
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
