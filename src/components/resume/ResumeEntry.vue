<template>
  <li class="resume-segment-entry">
    <div v-if="from || to || location" class="resume-segment-entry-information">
      <div v-if="from || to" class="resume-segment-entry-information-date">
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
        class="resume-segment-entry-information-location"
        v-text="location"
      />
    </div>
    <h2 class="resume-segment-entry-title">
      <span v-if="title" v-text="title" />
      <span v-if="position" v-text="positionInBrackets" />
    </h2>
    <p
      v-if="description"
      class="resume-segment-entry-description"
      v-html="description"
    />
  </li>
</template>

<script>
export default {
  name: "ResumeEntry",
  props: {
    title: {
      required: true,
      type: String,
    },
    description: {
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

<style lang="sass"></style>
