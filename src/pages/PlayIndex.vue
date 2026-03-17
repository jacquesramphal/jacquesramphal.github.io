<template>
  <PageWrapper>
    <HeroBanner id="hero" title="Play" subtitle="Experiments, tools, and miscellany." />

    <GridContainer tight>
      <!-- <GridParent style="padding-block-end: var(--spacing-md); align-items: center">
        <TextBlock as="h2" style="grid-column: 1 / 3" title="Play / Misc" description="" />
      </GridParent>

      <div class="filters" v-if="tags.length > 0">
        <MyButton
          v-for="t in ['All', ...tags]"
          :key="t"
          size="small"
          type="ghost"
          class="filter-btn"
          :label="t"
          :disabled="selectedTag === t"
          @click="selectedTag = t"
        />
      </div> -->

      <GridParent tight class="posts">
        <ImageCard
          v-for="entry in filtered"
          :key="entry.id"
          class="post"
          :data-category="entry.tag"
          :title="entry.title"
          :description="entry.description"
          :cta="entry.cta"
          :route="entry.route || ''"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :alt="entry.alt"
          :filename1="entry.filename1 || entry.filename3"
          :filename2="entry.filename2"
          :filename3="entry.filename3"
          :style="entry.bgcolor"
          :size="entry.size"
          :variant="entry.variant"
        />
      </GridParent>
    </GridContainer>
  </PageWrapper>
</template>

<script>
import library from "@/assets/data/library.json";
import ImageCard from "@/components/card/ImageCard/ImageCard.vue";
// import MyButton from "@/components/Button/Button.vue";

export default {
  name: "PlayIndex",
  components: { ImageCard },
  data() {
    return {
      library,
      selectedTag: "All",
    };
  },
  computed: {
    entries() {
      // Filter library for tools and design-projects (previously "Play" content)
      return (this.library?.entries || []).filter((e) =>
        e.type === "tool" || e.type === "design-project"
      );
    },
    tags() {
      // Extract unique tags from entries
      const allTags = new Set();
      this.entries.forEach((entry) => {
        if (entry.tags && Array.isArray(entry.tags)) {
          entry.tags.forEach((tag) => allTags.add(tag));
        }
      });
      return Array.from(allTags).sort((a, b) => a.localeCompare(b));
    },
    filtered() {
      if (this.selectedTag === "All") return this.entries;
      return this.entries.filter((e) =>
        (e.tags || []).includes(this.selectedTag)
      );
    },
  },
};
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs);
  margin-block-end: var(--spacing-sm);
}

.filter-btn :deep(.custom-btn) {
  padding: var(--spacing-xxs) var(--spacing-xs) !important;
}
</style>

