<template>
  <li class="resume-segment-entry">
    <div
        v-if="from || to || location"
        class="resume-segment-entry-information"
    >
      <div
          v-if="from || to"
          class="subtle resume-segment-entry-information-date"
      >
        <span
            v-if="from"
            class="resume-segment-entry-information-from"
            v-text="from"
        />
        <span
            v-if="to"
            class="resume-segment-entry-information-to"
            v-text="to"
        />
      </div>
      <div
          v-if="location"
          class="subtle resume-segment-entry-information-location"
          v-text="location"
      />
    </div>
    <h5 class="resume-segment-entry-title">
      <span
          v-if="title"
          v-text="title"
      />
      <span
          v-if="position"
          v-text="positionInBrackets"
      />
    </h5>
    <p
        v-if="description"
        class="resume-segment-entry-description"
        v-html="description"
    />
  </li>
</template>

<script>
export default {
  name: 'ResumeSegmentEntry',
  props: {
    title: {
      required: true,
      type: String
    },
    description: {
      default: '',
      type: String
    },
    position: {
      default: '',
      type: String
    },
    location: {
      default: '',
      type: String
    },
    from: {
      default: '',
      type: String
    },
    to: {
      default: '',
      type: String
    }
  },
  computed: {
    positionInBrackets () {
      return ` (${this.position})`
    }
  }
}
</script>

<style scoped lang="sass">
.resume-segment-entry
  position: relative
  display: flex
  flex-flow: column wrap
  justify-content: flex-start
  align-items: flex-start
  margin-top: var(--spacing-xs)
  padding: 4rem
  border-radius: 1rem
  background-color: var(--bg-darker)
  // &:before
  //   content: ''
  //   position: absolute
  //   left: -13px
  //   background: var(--link)
  //   width: 3px
  //   height: 100%
  // &:after
  //   content: ''
  //   position: absolute
  //   left: -17px
  //   top: 18px
  //   width: .75rem
  //   height: .75rem
  //   background: var(--link)
  //   border: 2px solid var(--link)
  //   border-radius: 50%
  >.resume-segment-entry-information
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    .resume-segment-entry-information-date
      display: flex
      flex-direction: row
      flex-wrap: nowrap
      margin-bottom: var(--spacing-xs)
      .resume-segment-entry-information-from
        margin: 0 .15rem 0 0
        &::after
          content: '-'
          margin: 0 0 0 .15rem
      .resume-segment-entry-information-to
        margin: 0 .15rem 0 0
        &::after
          content: '•'
          margin: 0 .5rem 0 .5rem
  >.resume-segment-entry-title
    line-height: 1.5
    margin-bottom: var(--spacing-xxs)
</style>