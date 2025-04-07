<template>
  <div class="breadcrumb-nav">
    <!-- Home Link -->
    <TextLink
      class="nav-item"
      :class="{ 'active': isHome }"
      label="Jake Ramphal"
      route="/"
      :isSvg="false"
      iconsize="20"
    />
    <!-- :unicode="!isHome ? '←' : false" -->

    <!-- <TextLink
            class="wordmark"
            :style="isMobileScreen ? 'text-decoration: none' : ''"
            :label="isMobileScreen ? 'Jake Ramphal' : 'Jake Ramphal'"
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
        
        <TextLink
          class="nav-item"
          :label="pageTitle"
          @click="$emit('toggle-menu')"
          v-show="isDesktopScreen"
        />
      </template>
    </template>
  </div>
</template>

<script>
import workData from '@/assets/data/work.json';
import frontMatter from 'front-matter';

export default {
  name: "BreadCrumb",
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
      return this.$route.path === '/';
    },
    isLibrary() {
      return this.$route.path === '/library';
    },
    isLibraryOrDeeper() {
      return this.$route.path.startsWith('/library');
    },
    isProjectOrDoc() {
      return this.$route.meta?.dynamicTitle;
    }
  },
  async created() {
    await this.updatePageTitle();
  },
  watch: {
    '$route': {
      immediate: true,
      async handler() {
        await this.updatePageTitle();
      }
    }
  },
  methods: {
    async updatePageTitle() {
      if (this.$route.path.startsWith('/work/')) {
        const workId = parseInt(this.$route.params.id);
        const work = workData.entries.find(entry => entry.id === workId);
        this.pageTitle = work ? work.title : 'Work';
      } else if (this.$route.path.startsWith('/doc/')) {
        try {
          const docId = this.$route.params.id;
          const module = await import(`@/assets/content/doc_${docId}.md`);
          const { attributes } = frontMatter(module.default);
          this.pageTitle = attributes.title || 'Document';
        } catch (error) {
          console.error('Error loading document title:', error);
          this.pageTitle = 'Document';
        }
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
}

.nav-item {
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  // &.active {
  //   text-decoration: underline dashed;
  // }
}
</style>
