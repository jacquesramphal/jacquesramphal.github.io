<template>
  <div class="breadcrumb-nav">
    <!-- Home Link -->
    <TextLink
      class="nav-item"
      :class="{ 'active': isHome }"
      label="Jacques Ramphal"
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
      <DynamicText
        v-show="isDesktopScreen"
        :as="p"
        text="/"
        style="line-height: inherit"
      />

      <TextLink
        v-if="isLibraryOrDeeper"
        class="nav-item"
        label="Library"
        route="/library"
        v-show="isDesktopScreen"
      />

      <template v-if="isProjectOrDoc">
        <DynamicText
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
import {
  getDocRecordById,
  isNumericRouteParam,
} from "@/utils/docRegistry";
export default {
  name: "BreadCrumb",
  components: { DynamicText, TextLink },
  props: {
    isDesktopScreen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      pageTitle: ''
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
      return this.$route?.path?.startsWith('/library') ||
             this.$route?.path?.startsWith('/doc/');
    },
    isProjectOrDoc() {
      return this.$route?.meta?.dynamicTitle;
    }
  },
  async created() {
    if (this.$route) {
      await this.updatePageTitle();
    }
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      async handler(newRoute, oldRoute) {
        if (newRoute) {
          // Only update if route path or params changed
          if (!oldRoute || newRoute.path !== oldRoute.path || 
              JSON.stringify(newRoute.params) !== JSON.stringify(oldRoute?.params)) {
            // Wait for route to be fully updated
            await this.$nextTick();
            await this.updatePageTitle();
          }
        }
      }
    }
  },
  methods: {
    // Convert kebab-case to readable format with spaces and capitalize all words (Title Case)
    formatSlugToReadable(slug) {
      if (!slug) return '';

      const words = slug.split('-');

      // Capitalize first letter of each word (Title Case)
      const capitalizedWords = words.map(word => {
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

      if (this.$route.path.startsWith('/work/')) {
        const workId = parseInt(this.$route.params.id);
        const work = workData.entries.find(entry => entry.id === workId);
        this.pageTitle = work ? work.title : 'Work';
      } else if (this.$route.path.startsWith('/doc/')) {
        // Use the slug directly from the route for cleaner breadcrumbs
        const param = (this.$route.params.slug || this.$route.params.id || "")
          .toString()
          .trim();

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
    }
  }
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
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
}
</style>
