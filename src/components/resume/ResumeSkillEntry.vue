<template>
  <li class="resume-skill-entry">
    <span v-text="title" />
    <!-- TODO: Add level depending on settings-->
  </li>
</template>

<script>
export default {
  name: 'ResumeSkillEntry',
  props: {
    title: {
      type: String,
      required: true
      // TODO: add validation
    },
    level: {
      type: Number,
      default: 0
      // TODO: add validation
    }
  }
}
</script>

<style scoped lang="sass">
.resume-skill-entry
  font-weight: var(--font-normal)
  margin: 0
  display: inline
  line-height: 1.4
  &:after
    content: ','
    margin: 0 .3rem 0 0
  &:last-child
    &:after
      content: ''
</style>