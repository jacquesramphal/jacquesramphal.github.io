<template>
  <PageWrapper>
    <the-resume
      class="resume"
      :segments="segments"
      :skills="skills"
      :information="information"
      :settings="settings"
    />
  </PageWrapper>
</template>

<script>
import TheResume from "@/components/resume/TheResume.vue";
// Mock data
import segments from "@/components/resume/data/segments.json";
import skills from "@/components/resume/data/skills.json";
import information from "@/components/resume/data/information.json";
import settings from "@/components/resume/data/settings.json";
export default {
  name: "MyResume",
  components: { TheResume },
  data() {
    return {
      segments,
      skills,
      information,
      settings,
    };
  },
};
</script>

<style scoped>
#info > .container {
  /* padding-top: 0 !important; */
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #image-highlight {
    height: 60vh;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #info {
      margin: var(--spacing-lg);
    }
  }
}
</style>

<style scoped></style>
