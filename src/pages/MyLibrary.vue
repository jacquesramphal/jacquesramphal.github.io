<template>
  <PageWrapper>
    <GridContainer style="padding-block-start: var(--spacing-xl) !important">
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
      <!-- <TextBlock title="Writing" as="h2" description="" class="section-header" /> -->

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

      <!-- No filters: sectioned view -->
      <template v-if="!hasActiveFilters">
        <div class="section-header-row">
          <TextBlock title="Writing" as="h2" description="" class="section-header" />
          <div class="view-toggle">
            <MyButton
              size="small"
              :type="viewMode === 'grid' ? 'outline' : 'ghost'"
              label="Grid"
              @click="setViewMode('grid')"
            />
            <MyButton
              size="small"
              :type="viewMode === 'list' ? 'outline' : 'ghost'"
              label="List"
              @click="setViewMode('list')"
            />
          </div>
        </div>
        <div v-if="filteredArticlesAndTools.length" class="library-section">
          <GridParent
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              v-for="(entry, index) in filteredArticlesAndTools"
              :key="entry.id"
              :mobileList="index !== 0"
              :featured="viewMode !== 'list' && index === 0"
              :alt="entry.alt"
              :description="entry.description"
              :filename="entry.thumbnail"
              :label="entry.label"
              :route="entry.route"
              :btnroute="entry.btnroute"
              :link="entry.link"
              :eyebrow="index === 0 ? 'Featured' : ''"
              :title="entry.title"
              :tags="entry.tags"
              :type="entry.type"
              :contentFile="entry.contentFile"
              :date="entry.date"
              :index="index"
              @tag-click="handleTagClick"
            />
          </GridParent>
        </div>
        <div v-if="filteredCaseStudiesAndProjects.length" class="library-section">
          <TextBlock
            title="Select Work"
            as="h2"
            description=""
            class="section-header-row"
            style="padding-block-end: var(--spacing-md)"
          />
          <GridParent
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              v-for="(entry, index) in filteredCaseStudiesAndProjects"
              :key="entry.id"
              :featured="viewMode !== 'list' && index === 0"
              :mobileList="index !== 0"
              :alt="entry.alt"
              :description="entry.description"
              :filename="entry.thumbnail"
              :imageVariant="entry.imageVariant"
              :bgcolor="entry.bgcolor"
              :label="entry.label"
              :route="entry.route"
              :btnroute="entry.btnroute"
              :link="entry.link"
              :eyebrow="index === 0 ? 'Featured' : ''"
              :title="entry.title"
              :tags="entry.tags"
              :type="entry.type"
              :contentFile="entry.contentFile"
              :date="entry.date"
              :index="index + 1"
              :locked="!!entry.locked"
              @tag-click="handleTagClick"
              @request-access="handleRequestAccess"
            />
          </GridParent>
        </div>
        <div v-if="filteredTools.length" class="library-section">
          <TextBlock
            title="Tools & Open Source"
            as="h2"
            description=""
            class="section-header-row"
            style="padding-block-end: var(--spacing-md)"
          />
          <GridParent
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              v-for="(entry, index) in filteredTools"
              :key="entry.id"
              :mobileList="index !== 0"
              :alt="entry.alt"
              :description="entry.description"
              :filename="entry.thumbnail"
              :label="entry.label"
              :route="entry.route"
              :btnroute="entry.btnroute"
              :link="entry.link"
              eyebrow=""
              :title="entry.title"
              :tags="entry.tags"
              :type="entry.type"
              :contentFile="entry.contentFile"
              :date="entry.date"
              :index="index"
              @tag-click="handleTagClick"
            />
          </GridParent>
        </div>
      </template>

      <!-- Filters active: single unified list -->
      <template v-else>
        <div class="section-header-row">
          <div class="library-section__header">
            <div class="library-section__info">
              <p class="subtle results-label">Showing results for:</p>
              <div class="active-filters">
                <p v-for="label in activeFilterLabels" :key="label" class="filter-tag">
                  {{ label }}
                </p>
              </div>
              <MyButton size="small" type="textlink" label="Clear" @click="clearFilters" />
            </div>
          </div>
          <div class="view-toggle">
            <MyButton
              size="small"
              :type="viewMode === 'grid' ? 'outline' : 'ghost'"
              label="Grid"
              @click="setViewMode('grid')"
            />
            <MyButton
              size="small"
              :type="viewMode === 'list' ? 'outline' : 'ghost'"
              label="List"
              @click="setViewMode('list')"
            />
          </div>
        </div>
        <GridParent
          v-if="filteredEntries.length"
          tight
          :rows="viewMode === 'list'"
          :class="['posts', { 'posts--list': viewMode === 'list' }]"
        >
          <ArticleCard
            borderless
            mobileList
            v-for="(entry, index) in filteredEntries"
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
            eyebrow=""
            :title="entry.title"
            :tags="entry.tags"
            :type="entry.type"
            :contentFile="entry.contentFile"
            :date="entry.date"
            :index="index"
            :locked="!!entry.locked"
            @tag-click="handleTagClick"
            @request-access="handleRequestAccess"
          />
        </GridParent>
        <p v-else class="subtle library-empty">No matches.</p>
      </template>
    </GridContainer>

    <ContactModal :isOpen="modalOpen" :projectTitle="selectedProject" @close="closeModal" />
  </PageWrapper>
</template>

<script>
import library from '@/assets/data/library.json';
import MyButton from '@/components/Button/Button.vue';
import ArticleCard from '@/components/card/ArticleCard/ArticleCard.vue';
import ContactModal from '@/components/ContactModal.vue';
import GridContainer from '@/components/grid/GridContainer.vue';
import GridParent from '@/components/grid/GridParent.vue';
import MyInput from '@/components/form/MyInput.vue';
import TextBlock from '@/components/text/TextBlock/TextBlock.vue';

export default {
  name: 'MyLibrary',
  components: {
    MyButton,
    ArticleCard,
    ContactModal,
    GridContainer,
    GridParent,
    MyInput,
    TextBlock,
  },
  props: {},
  data() {
    return {
      library,
      viewMode: localStorage.getItem('libraryViewMode') || 'grid',
      query: '',
      selectedTypes: ['article', 'tool', 'case-study', 'design-project'],
      selectedTags: [],
      modalOpen: false,
      selectedProject: '',
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
        // Skip unpublished entries
        if (e.published === false) return false;

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
      return this.filteredEntries
        .filter((e) => e.type === 'article')
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    },
    filteredTools() {
      return this.filteredEntries
        .filter((e) => e.type === 'tool')
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    },
    filteredCaseStudiesAndProjects() {
      return this.filteredEntries
        .filter((e) => e.type === 'case-study' || e.type === 'design-project')
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    },
    hasActiveFilters() {
      return (
        this.selectedTags.length > 0 ||
        this.selectedTypes.length < this.allTypeValues.length ||
        this.query.trim() !== ''
      );
    },
    activeFilterLabels() {
      const labels = [];
      const typeMap = {
        article: 'Articles',
        tool: 'Tools',
        'case-study': 'Case Studies',
        'design-project': 'Design Projects',
      };
      if (this.query.trim()) labels.push(`"${this.query.trim()}"`);
      if (this.selectedTypes.length < this.allTypeValues.length) {
        this.selectedTypes.forEach((t) => labels.push(typeMap[t] || t));
      }
      this.selectedTags.forEach((t) => labels.push(t));
      return labels;
    },
  },
  methods: {
    setViewMode(mode) {
      this.viewMode = mode;
      localStorage.setItem('libraryViewMode', mode);
    },
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
      } else {
        this.selectedTypes = [...this.selectedTypes, type];
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((t) => t !== tag);
      } else {
        this.selectedTags = [...this.selectedTags, tag];
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleTagClick(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags = [...this.selectedTags, tag];
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleRequestAccess(projectTitle) {
      this.selectedProject = projectTitle;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
      this.selectedProject = '';
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

.library-section .posts > *:nth-child(2) {
  border-block-start: var(--border);
}

.section-header-row {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block-end: var(--spacing-md);
  min-height: var(--spacing-md);

  @media only screen and (min-width: 768px) {
    min-height: var(--spacing-lg);
  }
}

.section-header {
  grid-column: unset;
}

@media only screen and (min-width: 768px) {
  .posts--list :deep(.default-card:not(.defaultcard--featured)) {
    border-radius: 0 !important;
    box-shadow: none !important;
    border: none !important;
    border-block-start: var(--border) !important;
    min-height: 0 !important;
    height: auto !important;
    padding-block: var(--spacing-xs);
    padding-block-start: var(--spacing-sm);
    display: grid !important;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xs);

    &:first-child {
      border-block-start: none !important;
    }
    &:hover {
      background: transparent;
      box-shadow: none !important;
    }
  }

  .posts--list :deep(.default-card:not(.defaultcard--featured) .image) {
    display: none !important;
  }

  .posts--list :deep(.default-card:not(.defaultcard--featured) .info) {
    grid-column: 1 / 3;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 !important;
  }

  .posts--list :deep(.default-card:not(.defaultcard--featured) .card-footer) {
    padding-block-start: var(--spacing-xxs);
    margin-block-start: auto;
    //   border-block-end: var(--border) !important;
  }

  // .posts--list :deep(.default-card:last-child) {
  //   border-block-end: var(--border) !important;
  // }
}

.view-toggle {
  display: none;
  gap: var(--spacing-xxs);
  flex-shrink: 0;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
}

.library-section__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-block-end: 0;
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
