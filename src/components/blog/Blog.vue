<template>
  <Wrapper id="blog" class="">
    <HeroBanner
      title="Blog Landing"
      eyebrow="Blog"
    />
    <Container class="">
      <!--<div class="tags">
      <MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /><MyButton
          class="btn"
          label="Category Tag"
          secondary
          size="small"
        /></div> -->
      <BlogPosts class="posts" :posts="posts" :settings="settings.posts" />
    </Container>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import BlogPosts from "@/components/blog/BlogPosts.vue";
// import MyButton from "@/stories/Button.vue";

export default {
  name: "Blog2",
  components: {
    Wrapper,
    HeroBanner,
    Container,
    BlogPosts,
    // MyButton,
  },

  props: {
    settings: {
      type: Object,
      required: true,
      // TODO add validator for mandatory fields
    },

    posts: {
      type: Array,
      required: true,
      // TODO add validator for mandatory fields
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
