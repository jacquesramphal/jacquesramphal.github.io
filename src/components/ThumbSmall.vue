<template>
  <span class="grid-card">
    <div class="box"></div>
    <span class="caption">
      <p>
        {{ title
        }}<!-- @slot Use this slot to place content --><slot
        ></slot></p
    ></span>
    <a class=""
      ><img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbSmall",
  props: {
    /**
     * Sets the caption text
     */
    title: {
      type: String,
    },
    /**
     * Sets the image
     */
    filename: {
      type: String,
      default: "template-m.svg",
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/all.css";
.grid-card {
}
</style>
