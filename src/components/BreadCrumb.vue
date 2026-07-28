<template>
  <div class="breadcrumb-nav">
    <!-- Home Link -->
    <TextLink
      class="nav-item"
      :class="{ active: isHome }"
      :label="!isDesktopScreen ? 'Jake Ramphal' : 'Jacques Ramphal'"
      route="/"
      :isSvg="false"
      iconsize="20"
    />
    <!-- :unicode="!isHome ? '←' : false" -->

    <!-- <TextLink
            class="wordmark"
            :style="isMobileScreen ? 'text-decoration: none' : ''"
            :label="isMobileScreen ? 'Jacques Ramphal' : 'Jacques Ramphal'"
            route="/"
            v-show="!menuOpen"
          /> -->

    <!-- Dynamic Breadcrumb Trail -->
    <template v-if="!isHome">
      <DynamicText v-show="isDesktopScreen" :as="p" text="/" style="line-height: inherit" />

      <TextLink
        v-if="courseContext"
        class="nav-item"
        :label="courseContext.course.title"
        :route="`/course/${courseContext.course.slug}`"
        v-show="isDesktopScreen"
      />
      <TextLink
        v-else-if="isLibraryOrDeeper"
        class="nav-item"
        label="Library"
        route="/library"
        v-show="isDesktopScreen"
      />
      <router-link
        v-else-if="courseHub"
        :to="$route.path"
        class="nav-item"
        active-class="active"
        exact
        v-show="isDesktopScreen"
      >
        {{ courseHub.title }}
      </router-link>

      <template v-if="isProjectOrDoc">
        <DynamicText
          v-if="isLibraryOrDeeper || courseContext"
          v-show="isDesktopScreen"
          :as="p"
          text="/"
          style="line-height: inherit"
        />
        <router-link
          :to="$route.path"
          class="nav-item"
          active-class="active"
          exact
          v-show="isDesktopScreen"
        >
          {{ pageTitle }}
        </router-link>
      </template>
    </template>
  </div>
</template>

<script>
import workData from '../assets/data/work.json';
import DynamicText from '../components/text/DynamicText.vue';
import TextLink from '../components/text/TextLink.vue';
import { getDocRecordById, isNumericRouteParam } from '@/utils/docRegistry';
import { getChapterContext, getCourseBySlug, getDefaultCourse } from '@/utils/courseRegistry';
export default {
  name: 'BreadCrumb',
  components: { DynamicText, TextLink },
  props: {
    isDesktopScreen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      pageTitle: '',
    };
  },
  computed: {
    isHome() {
      return this.$route?.path === '/';
    },
    isLibrary() {
      return this.$route?.path === '/library';
    },
    isLibraryOrDeeper() {
      // Show Library in breadcrumb for library page and all doc pages
      return this.$route?.path?.startsWith('/library') || this.$route?.path?.startsWith('/doc/');
    },
    isProjectOrDoc() {
      return this.$route?.meta?.dynamicTitle || !!this.$route?.meta?.title;
    },
    // When the current /doc/ page is a course chapter, resolve its course so the
    // breadcrumb points back to the course hub instead of the Library.
    courseContext() {
      const path = this.$route?.path || '';
      if (
        !path.startsWith('/doc/') &&
        !path.startsWith('/secured/doc/') &&
        !path.startsWith('/session/')
      )
        return null;

      const param = (this.$route.params.slug || this.$route.params.id || '').toString().trim();
      if (!param) return null;

      let slug = param;
      if (isNumericRouteParam(param)) {
        const record = getDocRecordById(parseInt(param, 10));
        slug = record?.slug || '';
      }

      return slug ? getChapterContext(slug) : null;
    },
    // On a course hub page (/course or /course/:slug), resolve the course so it
    // shows as the current crumb (Home / Course Title).
    courseHub() {
      const path = (this.$route?.path || '').toLowerCase();
      if (!path.startsWith('/course')) return null;
      const slug = (this.$route.params.slug || '').toString().trim();
      return slug ? getCourseBySlug(slug) : getDefaultCourse();
    },
  },
  async created() {
    if (this.$route) {
      await this.updatePageTitle();
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      async handler(newRoute, oldRoute) {
        if (newRoute) {
          // Only update if route path or params changed
          if (
            !oldRoute ||
            newRoute.path !== oldRoute.path ||
            JSON.stringify(newRoute.params) !== JSON.stringify(oldRoute?.params)
          ) {
            // Wait for route to be fully updated
            await this.$nextTick();
            await this.updatePageTitle();
          }
        }
      },
    },
  },
  methods: {
    // Convert kebab-case to readable format with spaces and capitalize all words (Title Case)
    formatSlugToReadable(slug) {
      if (!slug) return '';

      const words = slug.split('-');

      // Capitalize first letter of each word (Title Case)
      const capitalizedWords = words.map((word) => {
        if (!word) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      return capitalizedWords.join(' ');
    },

    async updatePageTitle() {
      if (!this.$route) {
        this.pageTitle = '';
        return;
      }

      // Reset title first
      this.pageTitle = '';

      if (this.$route.meta?.title) {
        this.pageTitle = this.$route.meta.title;
      } else if (this.$route.path.startsWith('/work/')) {
        const workId = parseInt(this.$route.params.id);
        const work = workData.entries.find((entry) => entry.id === workId);
        this.pageTitle = work ? work.title : 'Work';
      } else if (
        this.$route.path.startsWith('/doc/') ||
        this.$route.path.startsWith('/secured/doc/') ||
        this.$route.path.startsWith('/session/')
      ) {
        // Course chapters carry a short title in the manifest; prefer it so the
        // crumb reads "Arrive" rather than the full slug "Still Yourself Arrive".
        if (this.courseContext?.current?.title) {
          this.pageTitle = this.courseContext.current.title;
          return;
        }

        // Use the slug directly from the route for cleaner breadcrumbs
        const param = (this.$route.params.slug || this.$route.params.id || '').toString().trim();

        if (!param) {
          this.pageTitle = 'document';
          return;
        }

        const isNumeric = isNumericRouteParam(param);

        if (isNumeric) {
          // For numeric IDs, try to get the slug from the record
          const docId = parseInt(param, 10);
          const record = getDocRecordById(docId);
          const slug = record?.slug || `doc ${docId}`;
          this.pageTitle = this.formatSlugToReadable(slug);
        } else {
          // Use the slug directly and format with spaces
          this.pageTitle = this.formatSlugToReadable(param);
        }
      } else {
        this.pageTitle = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap; // Allow wrapping instead of compressing
}

.nav-item {
  text-decoration: none;
  transition: opacity 0.2s ease;
  white-space: nowrap; // Prevent individual links from breaking
  flex-shrink: 0; // Prevent compression
  &:hover:not(.active) {
    opacity: 0.8;
  }

  &.active {
    // Current-page crumb: theme foreground, de-emphasised by opacity rather
    // than a hardcoded grey, so it tracks light and dark mode.
    color: var(--foreground) !important;
    // !important beats the global `a { opacity: 1 !important }` in typography.scss.
    opacity: 0.6 !important;
    cursor: default;
    pointer-events: none;
  }
}
</style>
