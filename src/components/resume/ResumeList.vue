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
  // margin-block-start: var(--spacing-sm);
}
ul {
  list-style: none;
}
li {
  list-style: none;
  margin-block-end: var(--spacing-xs);
}

// Print styles - inline contact info with URLs
@media print {
  .resume-list {
    margin-block-end: 0.6rem;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    display: inline;
    margin: 0;

    &:not(:last-child)::after {
      content: ' | ';
      margin: 0 0.25rem;
    }
  }

  // Show actual URLs for ATS parsing
  a {
    &::after {
      content: ' (' attr(href) ')';
      font-size: 0.9em;
    }
  }
}
</style>
