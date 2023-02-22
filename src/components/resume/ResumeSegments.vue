<template>
  <div class="resume-segments">
    <div v-for="(segment, i) in segments" :key="i" class="resume-segment">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h5
          class="subtle resume-segment-title"
          v-text="segment.title"
          style="text-align: left"
        />
        <!-- <p class="external justify-end">
          <router-link :to="{ name: 'Work' }">View All</router-link>
        </p> -->
      </div>

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

<style scoped lang="sass">
.resume-segment
  margin-bottom: var(--spacing-md)
  @media only screen and (min-width: 740px)
    margin-bottom: var(--spacing-lg)
.resume-segment:first-child
  margin-top: var(--spacing-md)
  @media only screen and (min-width: 740px)
    margin-top: 0
</style>
