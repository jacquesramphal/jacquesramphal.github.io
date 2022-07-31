<template>
  <div class="resume-image">
     <img
          class="justify-end"
          draggable="false"
          src="@/assets/images/portrait.jpg"
          alt="Resume picture"
          style="width: 120px; aspect-ratio: 1 / 1;"
        />
    <!-- <img
        :src="image"
        alt="Resume picture"
    > -->
   
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
    border-radius: 0.8rem

</style>