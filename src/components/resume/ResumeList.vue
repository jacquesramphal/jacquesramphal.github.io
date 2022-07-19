<template>
  <div class="resume-list">
    <ul>
      <li class="resume-list-entry" v-for="(entry, i) in list" :key="i">
        <!-- <a
            v-if="entry.url"
            :href="entry.url"
            v-text="entry.title"
        /> -->
        <TextLink
          v-if="entry.url"
          :link="entry.url"
          :label="entry.title"
        />

        <span v-else v-text="entry.title" />
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

<style scoped lang="sass"></style>
