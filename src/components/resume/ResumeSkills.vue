<template>
  <div class="resume-skills">
    <div v-for="(skill, i) in skills" :key="i" class="resume-skills-category">
      <h6 class="resume-skills-category-title" v-text="skill.title" />
      <ul class="resume-skills-category-entries">
        <resume-skill-entry
          v-for="(entry, j) in skill.entries"
          :key="j"
          :title="entry.title"
          :level="entry.level"
          class="resume-skills-category-entry"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ResumeSkillEntry from "@/components/resume/ResumeSkillEntry.vue";
export default {
  name: "ResumeSkills",
  components: {
    ResumeSkillEntry,
  },
  props: {
    skills: {
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
.resume-skills
  margin-top: var(--spacing-sm)
  >.resume-skills-category
    margin-top: var(--spacing-sm)
    .resume-skills-category-entries
      margin-top: var(--spacing-xxs)
      list-style: none
      display: flex
      flex-direction: row
      flex-wrap: wrap
ul
  font-size: var(--font-xs)
</style>
