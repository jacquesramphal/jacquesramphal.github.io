<template>
  <div class="resume-segments">
    <div v-for="(segment, i) in segments" :key="i" class="resume-segment">
      <div class=" resume-segment-title">
        <DynamicText
          v-if="segment.title"
          :text="segment.title"
          :attrs="{ class: 'subtle' }"
        />
      </div>
      <!-- <hr /> -->

      <ul class="resume-segment-list">
        <resume-segment-entry
          v-for="(entry, j) in segment.entries"
          :key="j"
          :title="entry.title"
          :description="entry.description"
          :callout="entry.callout"
          :from="entry.from"
          :to="entry.to"
          :location="entry.location"
          :position="entry.position"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ResumeSegmentEntry from "@/components/resume/ResumeSegmentEntry.vue";
export default {
  name: "ResumeSegments",
  components: { ResumeSegmentEntry },
  props: {
    segments: {
      type: Array,
      required: true,
      // TODO: add validation
    },
    settings: {
      type: Object,
      required: true,
      // TODO: add validation
    },
  },
};
</script>

<style scoped lang="scss">
.resume-segment {
  &:first-child {
    margin-block-start: 0;
  }
  // background-color: lightblue;
  margin: var(--spacing-md) 0;
  
  @media only screen and (min-width: 768px) {
    margin-block-end: var(--spacing-lg);
  }
}
.resume-segment-title {
  padding-block-end: var(--spacing-xxs);
  border-block-end: var(--border);
}
.resume-segment-list {
  display: grid;
  padding-block-start: var(--spacing-md);
  grid-gap: var(--spacing-md);
}
</style>
