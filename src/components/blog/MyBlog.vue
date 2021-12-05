<template>
  <div>
    <blog2
      class="blog"
      :posts="posts"
      :information="information"
      :settings="settings"
    />
  </div>
</template>

<script>
import Blog2 from "@/components/blog/Blog2.vue";
// Mock data
import posts from "@/components/blog/data/posts.json";
import settings from "@/components/blog/data/settings.json";
export default {
  name: "MyBlog",
  components: { Blog2 },
  data() {
    return {
      posts,
      settings,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
