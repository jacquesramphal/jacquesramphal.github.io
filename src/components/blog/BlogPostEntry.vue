<template>
  <li class="blog-post-entry grid-parent">
    <div class="blog-image">
      <!-- <router-link :to="`/read/${blogPost.id}`"> -->
    <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" alt="Blog Image"
      /></router-link>
    </div>

    <div class="blog-info">
      <div v-if="category" class="blog-post-entry-information">
        <p
          v-if="category"
          class="subtle blog-post-entry-information-category"
          v-text="category"
        />
      </div>

      <h4 class="blog-post-entry-title">
        <span v-if="title" v-text="title" />
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
  data() {
    return {
      blogPost: [],
    }
  },
  name: "BlogPostEntry",
  props: {
    imgurl: {
      default: "https://wallpaperaccess.com/full/399952.jpg",
      required: true,
      type: String,
    },
    title: {
      default: "Title",
      required: true,
      type: String,
    },
    description: {
      default: "Description",
      type: String,
    },
    category: {
      default: "Category",
      type: String,
    },
    route: {
      type: String,
      required: true,
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
  // margin-top: var(--spacing-xs)
  padding: 0 0 var(--spacing-md) 0
  grid-template-columns: repeat(1, 1fr)
  &:last-child
    border-bottom: none
  >.blog-image
    // aspect-ratio: 4 / 3
    // margin: 0 0 2rem 0
    >img
      width: 100%
      max-width: 100%
      border-radius: 0.8rem
  >.blog-post-entry-title
    line-height: 1.5
    margin-bottom: var(--spacing-xxs)
  @media only screen and (min-width: 740px)
    padding: var(--spacing-md) 0 var(--spacing-md) 0
    grid-gap: var(--spacing-lg)
    border-bottom: var(--border)
    grid-template-columns: repeat(9, 1fr)
    >.blog-image
      grid-column: 1 / 5
    >.blog-info
      grid-column: 5 / 10
  @media only screen and (min-width: 1201px)
    >.blog-image
      // aspect-ratio: 16 / 9
      grid-column: 1 / 3
    >.blog-info 
      grid-column: 3 / 10
</style>
