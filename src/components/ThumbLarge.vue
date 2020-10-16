<template>
  <span class="grid-card hero grey">
    <span class="caption"><p>{{ title }}</p></span>
    <a class="zoom"
      ><img draggable="false" src="@/assets/images/blank-wide.svg"
    /></a>
  </span>
</template>

<script>
export default {
  name: "ThumbLarge",
  props: {
    title: String
  },
};
</script>

<style scoped>
</style>
