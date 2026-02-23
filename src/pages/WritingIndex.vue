<template>
  <PageWrapper>
    <HeroBanner id="hero" title="Writing" subtitle="All writing, organized by topic." />

    <GridContainer>
      <!-- <GridParent style="padding-block-end: var(--spacing-md); align-items: center">
        <TextBlock as="h2" style="grid-column: 1 / 3" title="Writing" description="" />
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

      <GridParent tight class="">
        <ArticleCard
          borderless
          v-for="(entry, index) in filtered"
          :key="entry.id"
          :alt="entry.alt"
          :description="entry.description"
          :filename="entry.thumbnail"
          :label="entry.label"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :eyebrow="entry.eyebrow"
          :title="entry.title"
          :tags="entry.tags"
          :type="entry.type"
          :contentFile="entry.contentFile"
          :index="index"
        />
      </GridParent>
    </GridContainer>
  </PageWrapper>
</template>

<script>
import library from "@/assets/data/library.json";
import ArticleCard from "@/components/card/ArticleCard/ArticleCard.vue";
import MyButton from "@/components/Button/Button.vue";
import { uniqueTags } from "@/utils/libraryData";

export default {
  name: "WritingIndex",
  components: { ArticleCard, MyButton },
  data() {
    return {
      library,
      selectedTag: "All",
    };
  },
  computed: {
    writingEntries() {
      return this.library.entries.filter((e) => e.title && e.type !== "case-study");
    },
    tags() {
      return uniqueTags(this.writingEntries.map((e) => e.eyebrow));
    },
    filtered() {
      if (this.selectedTag === "All") return this.writingEntries;
      return this.writingEntries.filter((e) => (e.eyebrow || "").includes(this.selectedTag));
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

