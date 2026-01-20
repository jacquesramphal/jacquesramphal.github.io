<template>
  <PageWrapper>
    <HeroBanner id="hero" title="Work" subtitle="Case studies and project work." />

    <GridContainer tight>
      <!-- <GridParent style="padding-block-end: var(--spacing-md); align-items: center">
        <TextBlock as="h2" style="grid-column: 1 / 3" title="Work" description="" />
      </GridParent> -->

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
      </div>

      <GridParent tight class="posts">
        <ImageCard
          v-for="entry in filtered"
          :key="entry.id"
          class="post"
          :data-category="entry.tag"
          :title="entry.title"
          :description="entry.description"
          :cta="entry.cta"
          :route="entry.btnroute ? `/${entry.btnroute}` : ''"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :alt="entry.alt"
          filename1="blank.svg"
          :filename3="entry.filename3 || entry.filename2 || entry.filename1 || entry.images?.filename1 || entry.images?.filename3"
          :style="entry.bgcolor"
          size="large"
        />
      </GridParent>
    </GridContainer>
  </PageWrapper>
</template>

<script>
import work from "@/assets/data/work.json";
import ImageCard from "@/components/card/ImageCard/ImageCard.vue";
import MyButton from "@/components/Button/Button.vue";
import { uniqueTags } from "@/utils/libraryData";

export default {
  name: "WorkIndex",
  components: { ImageCard, MyButton },
  data() {
    return {
      work,
      selectedTag: "All",
    };
  },
  computed: {
    entries() {
      return this.work.entries.filter((e) => e.category === "Work");
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

