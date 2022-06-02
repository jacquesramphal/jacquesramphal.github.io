<template>
  <li class="card grid-parent">
    <div class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" alt="Blog Image"
      /></router-link>
    </div>

    <div class="info">
      <h4 class="card-title">
        <span v-if="title" v-text="title" />
      </h4>

      <p v-if="description" class="card-description line-clamp" v-html="description" />
      <MyButton secondary :label="`${label}`" size="large" :route="`${route}`" />
      <!-- <MyButton label="Read More" size="large" :onclick="window.location='http://www.google.com';" /> -->
    </div>
  </li>
</template>

<script>
import MyButton from "@/stories/Button.vue";

export default {
  name: "DefaultCard",
  components: {
    MyButton,
  },
  props: {
    imgurl: {
      type: String,
    },
    title: {
      default: "Hello World",
      required: true,
      type: String,
    },
    description: {
      default:
        "This is a short description taken from the article. Maybe a little longer ...",
      type: String,
    },
    category: {
      default: "Read More",
      type: String,
    },
    route: {
      type: String,
      required: true,
    },
    label: {
      default: "Read More",
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="sass">

*
  border-radius: 0
.card
  position: relative
  display: grid
  grid-gap: 0
  grid-template-columns: repeat(1, 1fr)
  border-radius: var(--spacing-xxs) !important
  background: var(--background)
  overflow: hidden
  -moz-transition: all 0.25s ease-in-out
  -o-transition: all 0.25s ease-in-out
  -webkit-transition: all 0.25s ease-in-out
  box-shadow: var(--shadow-light)
  // border: var(--border)
  &:hover
    // box-shadow: var(--shadow-hover  )
    // transform: scale(1.01)
    img
      // transform: scale(1.5)
  &:active
    // box-shadow: var(--shadow-hover  )
    // transform: rotate(1deg)

.info
  padding: var(--spacing-md)
.card-description
  margin-bottom: var(--spacing-md) !important
  overflow: hidden

.line-clamp 
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical 

img
  aspect-ratio: 16/9
  width: 100%
  max-width: 100%
  border-radius: 0 !important
.image
  border-radius: 0 !important
.card-title
  line-height: 1.5
  margin-bottom: var(--spacing-xxs)
</style>
