<template>
  <div class="blog-posts">
    <div v-for="(post, i) in posts" :key="i" class="blog-post">
      <h6 class="blog-post-title" v-text="post.title" />

      <ul class="blog-post-list">
        <blog-post-entry
          v-for="(entry, j) in post.entries"
          :key="j"
          :image="entry.image"
          :category="entry.category"
          :title="entry.title"
          :description="entry.description"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import BlogPostEntry from "@/components/blog/BlogPostEntry.vue";

export default {
  name: "BlogPosts",
  components: { BlogPostEntry },
  props: {
    posts: {
      type: Array,
      required: true,
      // TODO: add validation
    },
    settings: {
      type: Object,
      required: true,
      // TODO: add validation
    },
  },
};
</script>

<style scoped lang="sass">
.blog-post
  margin-bottom: var(--spacing-md)
  @media only screen and (min-width: 740px)
    margin-bottom: var(--spacing-lg)
.blog-post:first-child
  // margin-top: var(--spacing-lg)
  @media only screen and (min-width: 740px)
</style>
