<template>
  <div>  <resume class="resume" :segments="segments" :skills="skills" :information="information" :settings="settings" />
</div>
</template>

<script>
import Resume from "@/components/resume/Resume.vue"
// Mock data
import segments from '@/components/resume/data/segments.json'
import skills from '@/components/resume/data/skills.json'
import information from '@/components/resume/data/information.json'
import settings from '@/components/resume/data/settings.json'
export default {
  name: "MyResume",
  components: { Resume },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
