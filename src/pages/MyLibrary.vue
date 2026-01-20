<template>
  <PageWrapper>
    <HeroBanner
    class=""
      id="hero"
      title="Library"
      subtitle="
A curated collection of my writing, professional work, and personal projects."
    />

      <CardRow2
        class="animate delay-1"
        title="Writing"
        kind="writing"
        :items="docs.entries"
        :viewAllTo="{ name: 'WritingIndex' }"
        :limit="3"
      />

      <CardRow2
        title="Work"
        kind="work"
        :items="workEntries"
        :viewAllTo="{ name: 'WorkIndex' }"
        :limit="3"
      />

      <CardRow2
        title="Play / Misc"
        kind="play"
        :items="playMiscEntries"
        :viewAllTo="{ name: 'PlayIndex' }"
        :limit="5"
      />
  </PageWrapper>
</template>

<script>
import work from "@/assets/data/work.json";
import docs from "../assets/data/docs.json";
import info from "@/assets/data/info.json";
// import FilterBar from "@/components/FilterBar.vue";
import CardRow2 from "@/components/CardRow2.vue";
import { getWorkLogoEntries } from "@/utils/libraryData";

export default {
  name: "MyLibrary",
  components: {
    // FilterBar,
    CardRow2,
  },
  props: {},
  data() {
    return {
      work,
      docs,
      info,
      filterCategories: [
        { value: "All", label: "All" },
        { value: "Tag1", label: "Tag1" },
        { value: "Tag2", label: "Tag2" },
        { value: "Tag3", label: "Tag3" },
        { value: "Product-Design", label: "Product-Design" },
        { value: "Tag5", label: "Tag5" },
        { value: "Tag6", label: "Tag6" },
        // Add other categories here
      ],
      selectedCategory: "All",
      groupName: "categories",
    };
  },
  computed: {
    workEntries() {
      return this.work.entries.filter((entry) => entry.category === "Work");
    },
    playMiscEntries() {
      // Logos are intentionally static: they don't provide route/link/btnroute/title.
      const logos = getWorkLogoEntries().map((e) => ({ ...e, tag: "Misc" }));
      const play = this.work.entries.filter((entry) => entry.category === "Play");
      return [...logos, ...play];
    },
    filteredEntries() {
      if (this.selectedCategory === "All") {
        return this.work.entries;
      } else {
        const filtered = this.work.entries.filter((entry) =>
          entry.tag.split(" ").includes(this.selectedCategory)
        );
        console.log("Filtered Entries:", filtered);
        return filtered;
      }
    },
  },
  methods: {
    isCategoryVisible(tag) {
      return (
        this.selectedCategory === "All" || tag.includes(this.selectedCategory)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#hero {
  border-block-end: none !important;
}

.container {
  padding-block-start: 0 !important;
}
</style>
