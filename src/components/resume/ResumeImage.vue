<template>
  <div class="resume-image">
    <img
        :src="image"
        alt="Resume picture"
    >
  </div>
</template>

<script>
export default {
  name: 'ResumeImage',
  props: {
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
.resume-image
  margin: 0 0 2rem 0
  >img
    width: 12rem
    max-width: 100%
    border-radius: 1rem

</style>