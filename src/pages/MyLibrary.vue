<template>
  <PageWrapper>
    <HeroBanner
      class=""
      id="hero"
      title="Library"
      subtitle="
A curated collection of my writing, professional work, and personal projects."
      :showSearch="false"
      :searchValue="query"
      @update:searchValue="query = $event"
      @clear-search="clearFilters"
      searchPlaceholder="Search title, description, tags…"
    />

    <GridContainer style="padding-block-start: 0 !important">
      <!-- HEADER COMPONENT START -->
      <!-- <div
        class="grid-parent"
        style="
          padding-block-start: var(--spacing-lg);

          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <TextBlock
          style="grid-column: 1 / 3"
          title="Library"
          as="h2"
          description="A curated collection of my writing, professional work, and personal projects."
        />

        <p class="justify-end" style="align-self: center">
          <router-link v-if="viewAllTo" :to="viewAllTo">View All</router-link>
        </p>
      </div> -->

      <!-- HEADER COMPONENT END -->
      <div class="library-filterbar">
        <div class="library-filterbar__row">
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
            :disabled="
              query === '' &&
              selectedTypes.length === allTypeValues.length &&
              selectedTags.length === 0
            "
            label="Clear"
            @click="clearFilters"
          />
        </div>

        <div class="library-filterbar__row library-filterbar__row--chips">
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
      </div>

      <div v-if="hasActiveFilters" class="library-section__header">
        <div class="library-section__info">
          <p class="subtle results-label">Showing results for:</p>
          <div class="active-filters">
            <p v-for="tag in selectedTags" :key="tag" class="filter-tag">
              {{ tag }}
            </p>
          </div>
          <MyButton size="small" type="textlink" label="Clear filters" @click="clearFilters" />
        </div>
      </div>

      <!-- No filters: Show sections with headers -->
      <template v-if="!hasActiveFilters">
        <!-- Writing Section -->
        <TextBlock
          style="
            align-items: center;
            grid-template-columns: repeat(3, 1fr);
            padding-block-end: var(--spacing-md);
          "
          title="Writing"
          as="h2"
          description=""
          class="section-header"
        />
        <div v-if="filteredArticlesAndTools.length" class="library-section">
          <GridParent tight class="posts">
            <ArticleCard
              borderless
              mobileList
              v-for="(entry, index) in filteredArticlesAndTools"
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
              :index="index"
              @tag-click="handleTagClick"
            />
          </GridParent>
        </div>
        <!-- Case Studies Section -->
        <div v-if="filteredCaseStudiesAndProjects.length" class="library-section">
          <TextBlock
            style="
              align-items: center;
              grid-template-columns: repeat(3, 1fr);

              padding-block-end: var(--spacing-md);
            "
            title="Case Studies & Projects"
            as="h2"
            description=""
            class="section-header"
          />
          <GridParent tight class="posts">
            <ArticleCard
              borderless
              mobileList
              v-for="(entry, index) in filteredCaseStudiesAndProjects"
              :key="entry.id"
              :alt="entry.alt"
              :description="entry.description"
              :filename="entry.thumbnail"
              :imageVariant="entry.imageVariant"
              :bgcolor="entry.bgcolor"
              :label="entry.label"
              :route="entry.route"
              :btnroute="entry.btnroute"
              :link="entry.link"
              :eyebrow="entry.eyebrow"
              :title="entry.title"
              :tags="entry.tags"
              :type="entry.type"
              :index="index"
              @tag-click="handleTagClick"
            />
            <!-- <ImageCard
              v-for="entry in filteredCaseStudiesAndProjects"
              :key="entry.id"
              class="post"
              :data-category="entry.tag"
              :title="entry.title"
              :description="entry.description"
              :cta="entry.cta"
              :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
              :btnroute="entry.btnroute"
              :link="entry.link"
              :alt="entry.alt"
              :filename1="entry.filename1"
              :filename2="entry.filename2"
              :filename3="entry.filename3"
              :style="entry.bgcolor"
              :variant="entry.variant"
              :size="entry.size"
              :tags="entry.tags"
              @tag-click="handleTagClick"
            /> -->
          </GridParent>
        </div>
      </template>

      <!-- Filters active: Show all in one list -->
      <template v-else>
        <GridParent tight class="posts" v-if="filteredEntries.length">
          <!-- Articles and Tools use ArticleCard -->
          <ArticleCard
            borderless
            mobileList
            v-for="(entry, index) in filteredArticlesAndTools"
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
            :index="index"
            @tag-click="handleTagClick"
          />

          <ArticleCard
            mobileList
            v-for="(entry, index) in filteredCaseStudiesAndProjects"
            :key="entry.id"
            :alt="entry.alt"
            :description="entry.description"
            :filename="entry.thumbnail"
            :imageVariant="entry.imageVariant"
            :bgcolor="entry.bgcolor"
            :label="entry.label"
            :route="entry.route"
            :btnroute="entry.btnroute"
            :link="entry.link"
            :eyebrow="entry.eyebrow"
            :title="entry.title"
            :tags="entry.tags"
            :type="entry.type"
            :index="index"
            @tag-click="handleTagClick"
          />
        </GridParent>

        <p v-else class="subtle library-empty">No matches.</p>
      </template>
    </GridContainer>
    <!-- <GridParent rows tight class="posts" v-if="filteredEntries.length">
      <TextImage
        v-for="entry in filteredCaseStudiesAndProjects"
        :key="`textimage-${entry.id}`"
        :title="entry.title"
        :description="entry.description"
        :cta="entry.cta"
        :route="entry.route || (entry.btnroute ? `/${entry.btnroute}` : '')"
        :btnroute="entry.btnroute"
        :link="entry.link"
        :alt="entry.alt"
        :filename="entry.filename1"
        :tags="entry.tags"
        @tag-click="handleTagClick"
      />
    </GridParent> -->
  </PageWrapper>
</template>

<script>
import library from '@/assets/data/library.json';
import MyButton from '@/components/Button/Button.vue';
import ArticleCard from '@/components/card/ArticleCard/ArticleCard.vue';
import GridContainer from '@/components/grid/GridContainer.vue';
import GridParent from '@/components/grid/GridParent.vue';
import MyInput from '@/components/form/MyInput.vue';
import TextBlock from '@/components/text/TextBlock/TextBlock.vue';

export default {
  name: 'MyLibrary',
  components: {
    MyButton,
    ArticleCard,
    GridContainer,
    GridParent,
    MyInput,
    TextBlock,
  },
  props: {},
  data() {
    return {
      library,
      query: '',
      selectedTypes: ['article', 'tool', 'case-study', 'design-project'],
      selectedTags: [],
    };
  },
  computed: {
    allTypes() {
      return [
        { value: 'article', label: 'Articles' },
        { value: 'tool', label: 'Tools' },
        { value: 'case-study', label: 'Case Studies' },
        { value: 'design-project', label: 'Design Projects' },
      ];
    },
    allTypeValues() {
      return this.allTypes.map((t) => t.value);
    },
    availableTags() {
      // Collect all unique tags from library entries
      const allTags = new Set();
      (this.library?.entries || []).forEach((entry) => {
        if (entry.tags && Array.isArray(entry.tags)) {
          entry.tags.forEach((tag) => allTags.add(tag));
        }
      });
      return Array.from(allTags).sort((a, b) => a.localeCompare(b));
    },
    filteredEntries() {
      const q = (this.query || '').trim().toLowerCase();
      const tagSet = new Set(this.selectedTags);
      const entries = this.library?.entries || [];

      return entries.filter((e) => {
        // Filter by type
        if (this.selectedTypes.length > 0 && !this.selectedTypes.includes(e.type)) {
          return false;
        }

        // Filter by tags
        const entryTags = e.tags || [];
        if (tagSet.size > 0 && !entryTags.some((t) => tagSet.has(t))) {
          return false;
        }

        // Filter by search query
        if (q) {
          const searchable = [e.title || '', e.description || '', ...(entryTags || [])]
            .join(' ')
            .toLowerCase();
          return searchable.includes(q);
        }

        return true;
      });
    },
    filteredArticlesAndTools() {
      return this.filteredEntries.filter((e) => e.type === 'article' || e.type === 'tool');
    },
    filteredCaseStudiesAndProjects() {
      return this.filteredEntries.filter(
        (e) => e.type === 'case-study' || e.type === 'design-project'
      );
    },
    hasActiveFilters() {
      return (
        this.selectedTags.length > 0 ||
        this.selectedTypes.length < this.allTypeValues.length ||
        this.query.trim() !== ''
      );
    },
  },
  methods: {
    clearFilters() {
      this.query = '';
      this.selectedTypes = [...this.allTypeValues];
      this.selectedTags = [];
    },
    toggleType(type) {
      if (this.selectedTypes.includes(type)) {
        const next = this.selectedTypes.filter((t) => t !== type);
        // Allow empty selection (shows no results)
        this.selectedTypes = next;
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
    handleTagClick(tag) {
      // Add the clicked tag to selectedTags if not already selected
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags = [...this.selectedTags, tag];
      }
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

.library-filterbar {
  display: none !important;
  box-shadow: var(--shadow-z1);
  border-radius: var(--spacing-xxs);
  background: var(--background);
  padding: var(--spacing-sm);
  margin-block-end: var(--spacing-md);
}

.library-filterbar__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs);
  align-items: center;
  justify-content: flex-start;
}

.library-filterbar__row--chips {
  margin-block-start: var(--spacing-xxs);
  justify-content: flex-start;
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
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--spacing-xxs);
  background: var(--background-darker);
  color: var(--foreground);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

:deep(.library-search:focus),
:deep(.library-search:focus-visible) {
  outline: 2px solid transparent;
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 3px rgba(255, 255, 255, 0.06);
}

.library-section {
  margin-block-end: var(--spacing-lg);
  grid-column: 1 / -1;
}

.section-header {
  grid-column: 1 / -1;
}

.library-section__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-block-end: var(--spacing-md);
}

.library-section__info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.results-label {
  margin: 0;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs);
}

.filter-tag {
  margin: 0;
}

.filter-tag:not(:last-child)::after {
  content: ',';
}

.library-empty {
  margin-block-start: var(--spacing-sm);
}
</style>
