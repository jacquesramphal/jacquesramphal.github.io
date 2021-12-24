<template>
  <Wrapper id="blog">
    <Container>
        <blog-post-entry
          v-for="blogPost in posts"
          v-bind:key="blogPost.sys.id"
          :image="blogPost.image"
          :imgurl="blogPost.imgurl"
          :category="blogPost.category"
          :title="blogPost.title"
          :description="blogPost.description"
        />
    </Container>
  </Wrapper>
</template>

<script>
import BlogPostEntry from "@/components/blog/BlogPostEntry.vue";
import Container from "@/components/grid/Container.vue";
import Wrapper from "@/components/grid/Wrapper.vue";

export default {
  name: "BlogPosts",
  components: { BlogPostEntry, Container, Wrapper },
  props: {
    posts: {
      type: Array,
      required: true,
      // TODO: add validation
    },
  },
};
</script>

<style scoped lang="sass">
.blog
  display: grid
  grid-gap: var(--spacing-xs)
  background: var(--background)
  color: var(--text)
  font-size: var(--font-xs)
  font-family: inherit
.blog-post
  // font-size: var(--font-xxs)
  margin-bottom: var(--spacing-md)
  @media only screen and (min-width: 740px)
    margin-bottom: var(--spacing-lg)
.blog-post:first-child
  // margin-top: var(--spacing-lg)
  @media only screen and (min-width: 740px)
</style>
