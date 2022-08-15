<template>
  <div class="card grid-parent" :data-category="`${eyebrow}`">
    <div class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" alt="Blog Image"
      /></router-link>
    </div>

    <div class="info">
      <TextBlock
        clamped
        class="textblock"
        :eyebrow="`${eyebrow}`"
        :header5="`${title}`"
        :details="`${description}`"
        :btnroute="`${route}`"
        :cta="`${label}`"
      />

    </div>
          <!-- <MyButton style="" secondary :label="`${label}`" size="large" :route="`${route}`" /> -->

  </div>
</template>

<script>
export default {
  name: "DefaultCard",
  components: {},
  props: {
    imgurl: {
      type: String,
    },
    eyebrow: {
      default: "",
      required: false,
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
// #textblock

.info
  // grid-row: span

  padding: var(--spacing-md)
  // justify-content: space-between
.card-description
  margin-bottom: var(--spacing-md) !important
  overflow: hidden

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
