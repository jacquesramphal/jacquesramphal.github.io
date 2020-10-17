<template>
  <span class="grid-card hero grey">
    <span class="caption"><p>{{ title }}</p></span>
    <a class="zoom"
      ><img draggable="false" :src="require(`@/assets/images/${filename}`)"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbLarge",
  props: {
    title: String,
    filename: String
  },
};
</script>

<style scoped>
</style>
