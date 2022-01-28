<template>
  <div id="textheader" style="display: grid; grid-gap: var(--spacing-md)">
    <h2 class="" style="text-align: center" v-if="title" v-text="title" />
    <div
      class="grid-parent"
      style="text-align: center; grid-template-columns: repeat(2, 1fr)"
    >
      <p id="tag1" class="subtle justify-end">{{ tag1 }}</p>
      <p id="tag2" class="subtle justify-start">{{ tag2 }}</p>
    </div>
    <p style="text-align: center">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TextHeader",
  components: {},
  props: {
    title: {
      type: String,
      default: "Text Header Default",
    },
    tag1: {
      type: String,
      default: "3 min read",
    },
    tag2: {
      type: String,
      default: "Category",
    },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  },
};
</script>

<style lang="sass" scoped>
*
  color: inherit
#textheader
  @media only screen and (min-width: 740px)
  @media only screen and (min-width: 1201px)
</style>
