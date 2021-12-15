<template>
  <Wrapper id="blog">
    <Container>
      <BlogPosts :posts="posts" :settings="settings.posts" />
    </Container>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import BlogPosts from "@/components/blog/BlogPosts.vue";

export default {
  name: "Blog2",
  components: {
    Wrapper,
    Container,
    BlogPosts,
  },

  props: {
    settings: {
      type: Object,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
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
  font-size: var(--font-xxs)
  font-family: inherit
.tags
  display: grid
  grid-template-columns: repeat(2, 1fr)
  grid-gap: var(--spacing-xs)
  @media only screen and (min-width: 740px)
    grid-template-columns: repeat(12, auto)
  @media only screen and (min-width: 1201px)
</style>
