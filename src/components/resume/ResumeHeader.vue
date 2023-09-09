<template>
  <div class="resume-header">
    <p
        v-text="name"
        class="resume-header-name"
    />
    <p
        v-text="label"
        class="subtle resume-header-label"
    />
  </div>
</template>

<script>
export default {
  name: 'ResumeHeader',
  props: {
    name: {
      type: String,
      required: true
      // TODO: add validation
    },
    label: {
      type: String,
      required: true
      // TODO: add validation
    }
  },
  computed: {
    alt () {
      return `Resume picture of ${this.settings.name}`
    }
  }
}
</script>

<style scoped lang="sass">
.resume-header
  margin-bottom: var(--spacing-md)
</style>