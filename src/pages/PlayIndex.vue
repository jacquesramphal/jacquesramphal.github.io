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
import work from "@/assets/data/work.json";
import ImageCard from "@/components/card/ImageCard/ImageCard.vue";
// import MyButton from "@/components/Button/Button.vue";
import { getWorkLogoEntries, uniqueTags } from "@/utils/libraryData";

export default {
  name: "PlayIndex",
  components: { ImageCard },
  data() {
    return {
      work,
      selectedTag: "All",
    };
  },
  computed: {
    entries() {
      const logos = getWorkLogoEntries().map((e) => ({ ...e, tag: "Misc" }));
      const play = this.work.entries.filter((e) => e.category === "Play");
      return [...logos, ...play];
    },
    tags() {
      return uniqueTags(this.entries.map((e) => e.tag));
    },
    filtered() {
      if (this.selectedTag === "All") return this.entries;
      return this.entries.filter((e) => (e.tag || "").includes(this.selectedTag));
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

