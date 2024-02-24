<template>
  <div class="resume-list">
    <ul>
      <li class="resume-list-entry" v-for="(entry, i) in list" :key="i">
        <TextLink v-if="entry.url" :link="entry.url" :label="entry.title" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ResumeList",
  props: {
    list: {
      type: Array,
      required: true,
      // TODO validator
    },
  },
};
</script>

<style scoped lang="scss">
* {
  // margin-top: var(--spacing-sm);
}
ul {
  list-style: none;
}
li {
  list-style: none;
  margin-bottom: var(--spacing-xs);
}
</style>
