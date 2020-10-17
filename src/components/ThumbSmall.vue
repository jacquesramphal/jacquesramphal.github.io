<template>
  <span class="grid-card grey">
    <span class="caption"><p>{{ title }}</p></span>
    <a class="zoom"
      ><img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbSmall",
  props: {
    title: String,
    filename: String
  },
};
</script>

<style scoped>
</style>
