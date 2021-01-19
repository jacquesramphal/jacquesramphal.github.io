<template>
  <span class="grid-card">
    <span class="caption"><p>{{ title }}</p></span>
    <div id="avatar" draggable="false" />
  </span>
</template>

<script>
export default {
  name: "ThumbSmall2",
  props: {
    title: String,
    filename: String
  },
};
</script>

<style scoped>
#avatar {
  cursor: help;
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url('../assets/images/avatar.svg');
}
#avatar:hover {
  background-image: url('../assets/images/avatar-h.svg');
}
#avatar:active {
  background-image: url('../assets/images/avatar-a.svg');
}
</style>
