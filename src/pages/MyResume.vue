<template>
  <PageWrapper>
    <div class="resume-actions">
      <a href="/resume.html?print" target="_blank" class="resume-print-link">Print / Save PDF</a>
    </div>
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
.resume-actions {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-sm) var(--spacing-md);
}
.resume-print-link {
  font-size: var(--font-400);
  color: var(--link);
  text-decoration: none;
  cursor: pointer;
}
.resume-print-link:hover {
  text-decoration: underline;
}
#info > .container {
  /* padding-block-start: 0 !important; */
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 768px) {
  #image-highlight {
    block-size: 60vh;
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
