<template>
  <div class="resume-skills">
    <div v-for="(skill, i) in skills" :key="i" class="resume-skills-tag">
      <p class="subtle resume-skills-tag-title" v-text="skill.title" />
      <ul class="resume-skills-tag-entries">
        <resume-skill-entry
          v-for="(entry, j) in skill.entries"
          :key="j"
          :title="entry.title"
          :level="entry.level"
          class="resume-skills-tag-entry"
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
  margin-block-end: var(--spacing-sm)
  >.resume-skills-tag
    margin-block-end : var(--spacing-sm)
    .resume-skills-tag-entries
      // margin-block-start: var(--spacing-xxs)
      list-style: none
      display: flex
      flex-direction: row
      flex-wrap: wrap
ul
  font-size: var(--font-xs)
</style>
