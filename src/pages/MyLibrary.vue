<template>
  <PageWrapper>
    <HeroBanner
    class=""
      id="hero"
      title="Library"
      subtitle="
A curated collection of my writing, professional work, and personal projects."
    />

    <GridContainer >
      <div class="filters">
        <MyInput
          id="library-search"
          v-model="query"
          type="text"
          name="search"
          label=""
          :hideLabel="true"
          placeholder="Search title, description, tags…"
          autocomplete="off"
          :required="false"
          inputClass="library-search"
        />

        <MyButton
          size="small"
          type="ghost"
          class="filter-btn"
          :disabled="query === '' && selectedTypes.length === allTypeValues.length && selectedTags.length === 0"
          label="Clear"
          @click="clearFilters"
        />

        <div class="filters__group">
          <MyButton
            v-for="t in allTypes"
            :key="t.value"
            size="small"
            :type="selectedTypes.includes(t.value) ? 'outline' : 'ghost'"
            class="filter-btn"
            :label="t.label"
            @click="toggleType(t.value)"
          />
        </div>

        <div class="filters__group" v-if="availableTags.length > 0">
          <MyButton
            v-for="tag in availableTags"
            :key="tag"
            size="small"
            :type="selectedTags.includes(tag) ? 'outline' : 'ghost'"
            class="filter-btn"
            :label="tag"
            @click="toggleTag(tag)"
          />
        </div>
      </div>

      <div class="library-section">
        <div class="library-section__header">
          <h2>Writing</h2>
          <span class="subtle" v-if="filteredWriting.length">{{ filteredWriting.length }} items</span>
        </div>
        <GridParent tight class="posts" v-if="filteredWriting.length">
          <ArticleCard
            borderless
            v-for="entry in filteredWriting"
            :key="`writing-${entry.id}`"
            :alt="entry.alt"
            :description="entry.description"
            :filename="entry.thumbnail"
            :label="entry.label"
            :route="entry.route"
            :btnroute="entry.btnroute"
            :link="entry.link"
            :eyebrow="entry.eyebrow"
            :title="entry.title"
          />
        </GridParent>
        <div v-else class="subtle library-empty">No matches.</div>
      </div>

      <div class="library-section">
        <div class="library-section__header">
          <h2>Work</h2>
          <span class="subtle" v-if="filteredWork.length">{{ filteredWork.length }} items</span>
        </div>
        <GridParent tight class="posts" v-if="filteredWork.length">
          <ImageCard
            v-for="entry in filteredWork"
            :key="`work-${entry.id}`"
            class="post"
            :data-category="entry.tag"
            :title="entry.title"
            :description="entry.description"
            :cta="entry.cta"
            :route="entry.btnroute ? `/${entry.btnroute}` : ''"
            :btnroute="entry.btnroute"
            :link="entry.link"
            :alt="entry.alt"
            :filename3="entry.filename3 || entry.filename2 || entry.filename1 || entry.images?.filename1 || entry.images?.filename3"
            :style="entry.bgcolor"
            size="large"
          />
        </GridParent>
        <div v-else class="subtle library-empty">No matches.</div>
      </div>

      <div class="library-section">
        <div class="library-section__header">
          <h2>Play / Misc</h2>
          <span class="subtle" v-if="filteredPlay.length">{{ filteredPlay.length }} items</span>
        </div>
        <GridParent tight class="posts" v-if="filteredPlay.length">
          <ImageCard
            v-for="entry in filteredPlay"
            :key="`play-${entry.id}`"
            class="post"
            :data-category="entry.tag"
            :title="entry.title"
            :description="entry.description"
            :cta="entry.cta"
            :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
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
        <div v-else class="subtle library-empty">No matches.</div>
      </div>
    </GridContainer>
  </PageWrapper>
</template>

<script>
import work from "@/assets/data/work.json";
import docs from "../assets/data/docs.json";
import info from "@/assets/data/info.json";
import MyButton from "@/components/Button/Button.vue";
import ImageCard from "@/components/card/ImageCard/ImageCard.vue";
import ArticleCard from "@/components/card/ArticleCard/ArticleCard.vue";
import GridContainer from "@/components/grid/GridContainer.vue";
import GridParent from "@/components/grid/GridParent.vue";
import MyInput from "@/components/form/MyInput.vue";
import { parseTags, uniqueTags, getWorkLogoEntries } from "@/utils/libraryData";

export default {
  name: "MyLibrary",
  components: {
    MyButton,
    ImageCard,
    ArticleCard,
    GridContainer,
    GridParent,
    MyInput,
  },
  props: {},
  data() {
    return {
      work,
      docs,
      info,
      query: "",
      selectedTypes: ["writing", "work", "play"],
      selectedTags: [],
    };
  },
  computed: {
    allTypes() {
      return [
        { value: "writing", label: "Writing" },
        { value: "work", label: "Work" },
        { value: "play", label: "Play" },
      ];
    },
    allTypeValues() {
      return this.allTypes.map((t) => t.value);
    },
    availableTags() {
      // Use a stable, full set (not filtered by current type selection)
      const stableAll = [
        ...uniqueTags((this.docs?.entries || []).map((e) => e.eyebrow)),
        ...uniqueTags(
          (this.work?.entries || [])
            .filter((e) => e.category === "Work")
            .map((e) => e.tag)
        ),
        ...uniqueTags(
          [
            ...getWorkLogoEntries().map((e) => ({ ...e, tag: "Misc" })),
            ...(this.work?.entries || []).filter((e) => e.category === "Play"),
          ].map((e) => e.tag)
        ),
      ];

      return Array.from(new Set(stableAll)).sort((a, b) => a.localeCompare(b));
    },
    filteredWriting() {
      if (!this.selectedTypes.includes("writing")) return [];
      const q = (this.query || "").trim().toLowerCase();
      const tagSet = new Set(this.selectedTags);
      const entries = this.docs?.entries || [];

      return entries.filter((e) => {
        const tags = parseTags(e.eyebrow);
        if (tagSet.size > 0 && !tags.some((t) => tagSet.has(t))) return false;
        if (!q) return true;
        const hay = [e.title || "", e.description || "", tags.join(" ")]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    },
    filteredWork() {
      if (!this.selectedTypes.includes("work")) return [];
      const q = (this.query || "").trim().toLowerCase();
      const tagSet = new Set(this.selectedTags);
      const entries = (this.work?.entries || []).filter((e) => e.category === "Work");

      return entries.filter((e) => {
        const tags = parseTags(e.tag);
        if (tagSet.size > 0 && !tags.some((t) => tagSet.has(t))) return false;
        if (!q) return true;
        const hay = [e.title || "", e.description || "", tags.join(" ")]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    },
    filteredPlay() {
      if (!this.selectedTypes.includes("play")) return [];
      const q = (this.query || "").trim().toLowerCase();
      const tagSet = new Set(this.selectedTags);
      const logos = getWorkLogoEntries().map((e) => ({ ...e, tag: "Misc" }));
      const play = (this.work?.entries || []).filter((e) => e.category === "Play");
      const entries = [...logos, ...play];

      return entries.filter((e) => {
        const tags = parseTags(e.tag);
        if (tagSet.size > 0 && !tags.some((t) => tagSet.has(t))) return false;
        if (!q) return true;
        const hay = [e.title || "", e.description || "", tags.join(" ")]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    },
  },
  methods: {
    clearFilters() {
      this.query = "";
      this.selectedTypes = [...this.allTypeValues];
      this.selectedTags = [];
    },
    toggleType(type) {
      if (this.selectedTypes.includes(type)) {
        const next = this.selectedTypes.filter((t) => t !== type);
        // Never allow “none selected” — revert to all.
        this.selectedTypes = next.length ? next : [...this.allTypeValues];
        return;
      }
      this.selectedTypes = [...this.selectedTypes, type];
    },
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((t) => t !== tag);
        return;
      }
      this.selectedTags = [...this.selectedTags, tag];
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

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs);
  margin-block-end: var(--spacing-sm);
  align-items: center;
}

.filters__group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs);
}

.filter-btn :deep(.custom-btn) {
  padding: var(--spacing-xxs) var(--spacing-xs) !important;
}

:deep(.library-search) {
  min-width: min(520px, 100%);
  padding: var(--spacing-xxs) var(--spacing-xs);
  border: var(--border);
  border-radius: var(--spacing-xxxs);
  background: transparent;
  color: var(--foreground);
}

.library-section {
  margin-block: var(--spacing-lg);
}

.library-section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding-block-end: var(--spacing-xxs);
  border-block-end: var(--border);
}

.library-empty {
  margin-block-start: var(--spacing-sm);
}
</style>
