<template>
  <li class="entry grid-parent imgzoom">
    <div class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" alt="Blog Image"
      /></router-link>
    </div>

    <div class="info">
      <h4 class="entry-title">
        <span v-if="title" v-text="title" />
      </h4>

      <p v-if="description" class="entry-description" v-html="description" />
      <MyButton label="Read More" size="large" :route="`${route}`"/>
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

*
  border-radius: 0
.entry
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
  border: var(--border)
  &:hover
    box-shadow: var(--shadow-heavy  )
.info
  padding: var(--spacing-md)
.entry-description
  margin-bottom: var(--spacing-md) !important
  
img
  width: 100%
  max-width: 100%
  border-radius: 0 !important
.image
  border-radius: 0 !important
.entry-title
  line-height: 1.5
  margin-bottom: var(--spacing-xxs)
</style>
