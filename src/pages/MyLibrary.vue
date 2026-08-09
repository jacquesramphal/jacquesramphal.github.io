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
        <div
          class="section-header-row section-header-row--accordion"
          :class="{ 'is-collapsed': !isSectionOpen('writing') }"
        >
          <TextBlock title="Writing" as="h2" description="" class="section-header" />
          <div class="section-header-actions">
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
            <button
              type="button"
              class="section-accordion-toggle"
              :aria-expanded="isSectionOpen('writing') ? 'true' : 'false'"
              aria-controls="library-section-writing"
              @click="toggleSection('writing')"
            >
              {{ isSectionOpen('writing') ? 'Close' : 'Expand' }}
            </button>
          </div>
        </div>
        <div
          v-show="isSectionOpen('writing')"
          v-if="filteredArticlesAndTools.length"
          id="library-section-writing"
          class="library-section"
        >
          <GridParent
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              :list="viewMode === 'list'"
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
        <div v-if="filteredCourses.length" class="library-section">
          <div
            class="section-header-row section-header-row--accordion"
            :class="{ 'is-collapsed': !isSectionOpen('courses') }"
          >
            <TextBlock title="Courses" as="h2" description="" class="section-header" />
            <div class="section-header-actions">
              <button
                type="button"
                class="section-accordion-toggle"
                :aria-expanded="isSectionOpen('courses') ? 'true' : 'false'"
                aria-controls="library-section-courses"
                @click="toggleSection('courses')"
              >
                {{ isSectionOpen('courses') ? 'Close' : 'Expand' }}
              </button>
            </div>
          </div>
          <GridParent
            v-show="isSectionOpen('courses')"
            id="library-section-courses"
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              :list="viewMode === 'list'"
              v-for="(entry, index) in filteredCourses"
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
        <div v-if="filteredCaseStudiesAndProjects.length" class="library-section">
          <div
            class="section-header-row section-header-row--accordion"
            :class="{ 'is-collapsed': !isSectionOpen('work') }"
          >
            <TextBlock title="Select Work" as="h2" description="" class="section-header" />
            <div class="section-header-actions">
              <button
                type="button"
                class="section-accordion-toggle"
                :aria-expanded="isSectionOpen('work') ? 'true' : 'false'"
                aria-controls="library-section-work"
                @click="toggleSection('work')"
              >
                {{ isSectionOpen('work') ? 'Close' : 'Expand' }}
              </button>
            </div>
          </div>
          <GridParent
            v-show="isSectionOpen('work')"
            id="library-section-work"
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              :list="viewMode === 'list'"
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
          <div
            class="section-header-row section-header-row--accordion"
            :class="{ 'is-collapsed': !isSectionOpen('tools') }"
          >
            <TextBlock title="Open Source" as="h2" description="" class="section-header" />
            <div class="section-header-actions">
              <button
                type="button"
                class="section-accordion-toggle"
                :aria-expanded="isSectionOpen('tools') ? 'true' : 'false'"
                aria-controls="library-section-tools"
                @click="toggleSection('tools')"
              >
                {{ isSectionOpen('tools') ? 'Close' : 'Expand' }}
              </button>
            </div>
          </div>
          <GridParent
            v-show="isSectionOpen('tools')"
            id="library-section-tools"
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              :list="viewMode === 'list'"
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
        <div v-if="filteredLabs.length" class="library-section">
          <div
            class="section-header-row section-header-row--accordion"
            :class="{ 'is-collapsed': !isSectionOpen('lab') }"
          >
            <TextBlock title="Lab" as="h2" description="" class="section-header" />
            <div class="section-header-actions">
              <button
                type="button"
                class="section-accordion-toggle"
                :aria-expanded="isSectionOpen('lab') ? 'true' : 'false'"
                aria-controls="library-section-lab"
                @click="toggleSection('lab')"
              >
                {{ isSectionOpen('lab') ? 'Close' : 'Expand' }}
              </button>
            </div>
          </div>
          <GridParent
            v-show="isSectionOpen('lab')"
            id="library-section-lab"
            tight
            :rows="viewMode === 'list'"
            :class="['posts', { 'posts--list': viewMode === 'list' }]"
          >
            <ArticleCard
              borderless
              :list="viewMode === 'list'"
              v-for="(entry, index) in filteredLabs"
              :key="entry.id"
              :mobileList="index !== 0"
              :alt="entry.alt"
              :description="entry.description"
              :filename="entry.thumbnail"
              :label="entry.label"
              :link="entry.link"
              eyebrow=""
              :title="entry.title"
              :tags="entry.tags"
              :type="entry.type"
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
            :list="viewMode === 'list'"
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
      selectedTypes: ['article', 'course', 'tool', 'case-study', 'design-project', 'lab'],
      selectedTags: [],
      modalOpen: false,
      selectedProject: '',
      // Mobile accordion: section headers collapse on small screens. Content stays
      // in the DOM (v-show, not v-if) so it remains in the prerendered HTML for SEO;
      // only its visibility toggles. Sections are closed by default on mobile.
      isMobile: false,
      openSections: {},
    };
  },
  computed: {
    allTypes() {
      return [
        { value: 'article', label: 'Articles' },
        { value: 'course', label: 'Courses' },
        { value: 'tool', label: 'Tools' },
        { value: 'case-study', label: 'Case Studies' },
        { value: 'design-project', label: 'Design Projects' },
        { value: 'lab', label: 'Lab' },
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
    filteredCourses() {
      return this.filteredEntries
        .filter((e) => e.type === 'course')
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
    filteredLabs() {
      return this.filteredEntries
        .filter((e) => e.type === 'lab')
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
        course: 'Courses',
        tool: 'Tools',
        'case-study': 'Case Studies',
        'design-project': 'Design Projects',
        lab: 'Lab',
      };
      if (this.query.trim()) labels.push(`"${this.query.trim()}"`);
      if (this.selectedTypes.length < this.allTypeValues.length) {
        this.selectedTypes.forEach((t) => labels.push(typeMap[t] || t));
      }
      this.selectedTags.forEach((t) => labels.push(t));
      return labels;
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      // Match the 768px breakpoint used throughout the library styles.
      this.isMobile = window.innerWidth < 768;
    },
    // On desktop every section is always expanded (no toggle shown). On mobile a
    // section is open only if the user has toggled it open; default is collapsed.
    isSectionOpen(key) {
      if (!this.isMobile) return true;
      return !!this.openSections[key];
    },
    toggleSection(key) {
      this.openSections = { ...this.openSections, [key]: !this.openSections[key] };
    },
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

// Mobile: the card grid stacks into a single column of mobile-list rows, each
// with its own top-border divider and symmetric block padding. The grid's flex
// gap would stack on top of that padding and make the space between rows larger
// than the divider spacing (as it does on the homepage list). Drop the gap on
// mobile so the row padding owns the spacing and Library matches Home. Desktop
// grid gaps are unchanged.
@media only screen and (max-width: 767px) {
  .posts {
    grid-gap: 0 !important;
  }

  // The first card in a section is a full card (e.g. the featured article),
  // not a mobile-list row, so it has no bottom padding of its own. With the
  // grid gap removed above, it would sit flush against the divider of the next
  // row. Give it matching bottom padding so that divider is evenly spaced.
  .library-section .posts > *:first-child {
    padding-block-end: var(--spacing-sm);
  }
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

// Container for the right-hand controls in a section header. On desktop this
// holds the Grid/List view toggle; on mobile it holds the accordion Expand/Close
// text link. Only one of the two is ever visible at a given breakpoint.
.section-header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

// The accordion toggle is a real <button> for accessibility (keyboard focus +
// aria-expanded), but is styled to match the CardRow "View All" text link
// (see typography.scss `a`): underlined, foreground color, medium weight.
// Hidden on desktop, where sections are always expanded.
.section-accordion-toggle {
  display: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-500);
  font-weight: var(--fontWeight-medium);
  color: var(--foreground);
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: var(--link-underline-offset);
  text-decoration-thickness: var(--link-underline-thickness);

  &:hover {
    text-decoration: underline wavy var(--foreground);
    text-decoration-thickness: var(--link-underline-thickness-hover);
  }
}

// Mobile: turn the section headers into accordion rows. The Expand/Close text
// link appears on the far right and each header carries a bottom border so the
// collapsed sections read as divided rows. Content stays in the DOM (v-show) so
// it remains in the prerendered HTML for SEO — only visibility changes.
@media only screen and (max-width: 767px) {
  .section-accordion-toggle {
    display: inline-flex;
    align-items: center;
  }

  // Normalize the header padding to the list-view card rows
  // (ArticleCard .defaultcard--mobile-list): symmetric spacing-sm around the
  // divider with no min-height, so a collapsed section header sits on the exact
  // same vertical rhythm as the cards it toggles.
  .section-header-row--accordion {
    padding-block: var(--spacing-sm);
    min-height: 0;
    border-block-end: var(--border);
  }

  // The section wrapper's desktop bottom margin (spacing-lg) was leaving large,
  // uneven gaps between the collapsed accordion rows. Drop it on mobile so every
  // section header stacks on the same tight, divider-driven rhythm as the
  // list-view cards; the header's own symmetric padding + border owns the
  // spacing. Desktop keeps the spacing-lg separation between expanded sections.
  .library-section {
    margin-block-end: 0;
  }
}

// The desktop list-row styling now lives in ArticleCard's `list` variant
// (the single source), applied here via :list="viewMode === 'list'". Mobile is
// handled by the card's `mobileList` variant as before.

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
