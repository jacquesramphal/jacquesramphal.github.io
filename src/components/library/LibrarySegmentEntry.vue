<template>
  <li class="library-segment-entry">
    <div class="library-segment-entry-title">
      <DynamicText as="h3" v-if="title" :text="title" :attrs="{ class: '' }" />
      <DynamicText
        as="h3"
        v-if="position"
        :text="positionInBrackets"
      />
    </div>

    <div v-if="from || to || location" class="library-segment-entry-information">
      <div
        v-if="from || to"
        class="subtle library-segment-entry-information-date"
      >
        <DynamicText
          v-if="from"
          :text="from"
          :attrs="{ class: 'library-segment-entry-information-from' }"
        />
        <DynamicText
          v-if="to"
          :text="to"
          :attrs="{ class: 'library-segment-entry-information-to' }"
        />
      </div>

      <DynamicText
        v-if="location"
        :text="location"
        :attrs="{ class: 'subtle library-segment-entry-information-location' }"
      />
    </div>

    <DynamicText
      isHtml="true"
      v-if="description"
      :text="description"
      :attrs="{ class: '' }"
    />

    <blockquote v-if="callout">
      <DynamicText isHtml="true" :text="callout" :attrs="{ class: '' }" />
    </blockquote>
  </li>
</template>

<script>
export default {
  name: "LibrarySegmentEntry",
  props: {
    title: {
      required: true,
      type: String,
    },
    description: {
      default: "",
      type: String,
    },
    callout: {
      default: "",
      type: String,
    },
    position: {
      default: "",
      type: String,
    },
    location: {
      default: "",
      type: String,
    },
    from: {
      default: "",
      type: String,
    },
    to: {
      default: "",
      type: String,
    },
  },
  computed: {
    positionInBrackets() {
      return ` (${this.position})`;
    },
  },
};
</script>

<style scoped lang="sass">

.library-segment-entry
  position: relative
  display: flex
  flex-flow: column wrap
  justify-content: flex-start
  align-items: flex-start
  list-style-type: disc
  margin-block-end: var(--spacing-sm)
  -moz-transition: all 0.25s ease-in-out
  -o-transition: all 0.25s ease-in-out
  -webkit-transition: all 0.25s ease-in-out
  &:last-child
    margin-block-end: 0
  &:hover
    // box-shadow: var(--shadow-deep)
  >.library-segment-entry-information
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    font-size: var(--font-xs)
    font-weight: var(--fontWeight-normal)
    .library-segment-entry-information-location
      margin-block-end: var(--spacing-xs)

    .library-segment-entry-information-date
      display: flex
      flex-direction: row
      flex-wrap: nowrap
      margin-block-end: var(--spacing-xs)
      .library-segment-entry-information-from
        margin: 0 .15rem 0 0
        &::after
          content: '-'
          margin: 0 0 0 .15rem
      .library-segment-entry-information-to
        margin: 0 .15rem 0 0
        &::after
          content: '•'
          margin: 0 .5rem 0 .5rem
  >.library-segment-entry-title
    line-height: var(--lineHeight-tall)
    margin-block-end: var(--spacing-xxs)
</style>
