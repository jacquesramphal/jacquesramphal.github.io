<template>
  <div class="resume-slogan">
    <p v-html="slogan" />
  </div>
</template>

<script>
export default {
  name: 'ResumeSlogan',
  props: {
    slogan: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
.resume-slogan

</style>