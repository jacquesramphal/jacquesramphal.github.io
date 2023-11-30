<template>
  <GridContainer class="resume">
    <resume-segments
      class="segments"
      :segments="segments"
      :settings="settings.segments"
    />
    <aside class="sidebar">
      <resume-image
        class="image"
        :image="information.image"
        v-if="information.image"
      />

      <resume-header
        class="header"
        :name="information.name"
        :label="information.label"
      />

      <resume-slogan
        class="slogan"
        :slogan="information.slogan"
        v-if="information.slogan"
      />
      <resume-list
        :list="information.list"
        class="list"
        v-if="information.list"
      />
      <resume-skills
        class="skills"
        :skills="skills"
        :settings="settings.skills"
        v-if="skills"
      />
      <resume-footer class="footer" :information="information.footer" />
    </aside>
  </GridContainer>
</template>

<script>
import ResumeHeader from "@/components/resume/ResumeHeader.vue";
import ResumeFooter from "@/components/resume/ResumeFooter.vue";
import ResumeSegments from "@/components/resume/ResumeSegments.vue";
import ResumeSkills from "@/components/resume/ResumeSkills.vue";
import ResumeList from "@/components/resume/ResumeList.vue";
import ResumeImage from "@/components/resume/ResumeImage.vue";
import ResumeSlogan from "@/components/resume/ResumeSlogan.vue";
export default {
  name: "TheResume",
  components: {
    ResumeSlogan,
    ResumeImage,
    ResumeList,
    ResumeHeader,
    ResumeFooter,
    ResumeSegments,
    ResumeSkills,
  },
  props: {
    settings: {
      type: Object,
      required: true,
      // TODO add validator for mandatory fields
    },
    information: {
      type: Object,
      required: true,
      // TODO add validator for mandatory fields
    },
    segments: {
      type: Array,
      required: true,
      // TODO add validator for mandatory fields
    },
    skills: {
      type: Array,
      required: true,
      // TODO add validator for mandatory fields
    },
  },
};
</script>

<style scoped lang="sass">
.resume
  display: grid
  grid-template-areas: "sidebar header" "sidebar segments" "footer footer"
  grid-template-columns: 30% 1fr
  grid-template-rows: auto 1fr auto
  grid-gap: var(--spacing-lg)
  background: var(--background)
  color: var(--text)
  font-size: var(--font-xxs)
  @media screen and (max-width: 240mm)
    grid-template-areas: "header" "sidebar" "segments" "footer"
    grid-template-columns: 1fr
    grid-template-rows: auto auto auto auto
    min-height: auto

  // ALIGNMENT
  >.header
    grid-area: header
    @media screen and (max-width: 240mm)
  >.segments
    grid-area: segments
    @media screen and (max-width: 240mm)
  >.sidebar
    grid-area: sidebar
    height: 90vh
    width: 25vw
    position: fixed
    z-index: 1
    overflow-x: hidden
    margin-bottom: var(--spacing-md)
    @media screen and (max-width: 240mm)
      height: 100%
      position: relative
      width: auto
  >.footer
    grid-area: footer
</style>
