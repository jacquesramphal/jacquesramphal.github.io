<template>
  <li class="blog-post-entry grid-parent">
      <div class="blog-image">
          <router-link :to="`${route}`">

        <img v-if="image" :src="image" alt="Blog picture" /></router-link></div
    >
    <div class="blog-info">
      <div v-if="category" class="blog-post-entry-information">
        <div
          v-if="category"
          class="subtle blog-post-entry-information-category"
          v-text="category"
        />
      </div>
      <h4 class="blog-post-entry-title">
        <span v-if="title" v-text="title" />
        <span v-if="position" v-text="positionInBrackets" />
      </h4>
      <p
        v-if="description"
        class="blog-post-entry-description"
        v-html="description"
      />
    </div>
  </li>
</template>

<script>
export default {
  name: "BlogPostEntry",
  props: {
    image: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    description: {
      default: "",
      type: String,
    },
    position: {
      default: "",
      type: String,
    },
    category: {
      default: "",
      type: String,
    },
    route: {
      type: String,
      required: true,
      default: "post",
    },
  },
  computed: {
    positionInBrackets() {
      return ` (${this.position})`;
    },
  },
};
</script>

<style scoped lang="sass">
.blog-post-entry-information
  margin-bottom: var(--spacing-xs) !important

.blog-post-entry
  position: relative
  display: grid
  margin-top: var(--spacing-xs)
  padding: var(--spacing-md) 0 var(--spacing-md) 0
  grid-template-columns: repeat(1, 1fr)
  &:last-child
    border-bottom: none
  >.blog-image
    aspect-ratio: 4 / 3
    margin: 0 0 2rem 0
    >img
      width: 100%
      max-width: 100%
      border-radius: 0.8rem
  >.blog-post-entry-title
    line-height: 1.5
    margin-bottom: var(--spacing-xxs)
  >.blog-post-entry-description
  @media only screen and (min-width: 740px)
    grid-gap: var(--spacing-lg)
    border-bottom: var(--border)
    grid-template-columns: repeat(9, 1fr)
    >img
    >.blog-image
      grid-column: 1 / 5
    >.blog-info
      grid-column: 5 / 10
  @media only screen and (min-width: 1201px)
    >.blog-image
      aspect-ratio: 16 / 9
      grid-column: 1 / 3
    >.blog-info
      grid-column: 3 / 10
</style>
