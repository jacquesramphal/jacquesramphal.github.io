<template>
  <PageWrapper>
      <HeroBanner title="Jacques’ Ramblings" eyebrow="Blog" />
    <blog
      class="blog"
      :posts="fakeposts"
      :settings="settings"
    />
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Blog from "@/components/blog/Blog.vue";
import HeroBanner from "@/components/HeroBanner.vue";

// Mock data
import fakeposts from "@/components/blog/data/posts.json";
import settings from "@/components/blog/data/settings.json";

export default {
  name: "MyBlog",
  components: { PageWrapper, Blog, HeroBanner },
  data() {
    return {
      fakeposts,
      settings,
    };
  },

};
</script>

<style scoped lang="sass"></style>
