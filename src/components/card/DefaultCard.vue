<template>
  <div id="defaultCard" class="defaultCard card" :data-category="`${tag}`">
    <div class="image">
      <router-link :to="`${route}`">
        <img v-if="imgurl" :src="imgurl" alt="Blog Image" />
        <img
          draggable="false"
          v-if="filename"
          :src="require(`@/assets/images/${filename}`)"
          :alt="`${alt}`"
        />
      </router-link>
    </div>

    <div class="info">
      <TextBlock
        clamped
        class="textblock"
        :eyebrow="`${tag}`"
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
    filename: {
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
    tag: {
      default: "",
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
  display: flex
  flex-direction: column
  border-radius: var(--spacing-xxs) !important
  background: var(--background)
  overflow: hidden
  -moz-transition: all 0.25s ease-in-out
  -o-transition: all 0.25s ease-in-out
  -webkit-transition: all 0.25s ease-in-out
  // box-shadow: var(--shadow-light)
  // border: var(--border)
  &:hover
    background: var(--background)
    box-shadow: var(--shadow-heavy)
    transform: scale(1.01)
    img
      transform: scale(1.1)

  &:active
    // box-shadow: var(--shadow-hover  )
    // transform: rotate(1deg)

.info
  // grid-row: span
  display: flex
  flex: 1
  padding: var(--spacing-md)
  // justify-content: space-between
.textblock-description
  background: blue !important
.card-description
  margin-bottom: var(--spacing-md) !important
  overflow: hidden




img
  width: 100%
  height: 101% !important
  object-fit: cover !important
  max-width: 100%
  border-radius: 0 !important
  -moz-transition: transform 0.25s ease-in-out
  -o-transition: transform 0.25s ease-in-out
  -webkit-transition: transform 0.25s ease-in-out
.image
  overflow: hidden
  aspect-ratio: 16/9

  border-radius: 0 !important
.card-title
  line-height: 1.5
  margin-bottom: var(--spacing-xxs)
</style>
