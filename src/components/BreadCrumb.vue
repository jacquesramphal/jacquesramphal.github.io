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
import workData from '../assets/data/work.json';
import frontMatter from 'front-matter';
import DynamicText from '../components/text/DynamicText.vue';
import TextLink from '../components/text/TextLink.vue';
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
      return this.$route?.path?.startsWith('/library');
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
        try {
          const docId = this.$route.params.id;
          if (!docId) {
            this.pageTitle = 'Document';
            return;
          }
          // Try both import paths for compatibility
          let module;
          try {
            module = await import(`@/assets/content/doc_${docId}.md`);
          } catch (e) {
            // Fallback to relative path
            module = await import(`../assets/content/doc_${docId}.md`);
          }
          const { attributes } = frontMatter(module.default);
          
          // First try to get title from front matter
          if (attributes?.title) {
            this.pageTitle = attributes.title;
          } else {
            // Extract title using same logic as MarkdownPage
            const markdown = module.default;
            let title = "";
            
            // Try to extract from header block (old format)
            const headerMatch = markdown.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
            if (headerMatch) {
              const headerContent = headerMatch[1];
              const h1Match = headerContent.match(/#\s+(.+?)(?:\n|$)/);
              if (h1Match) {
                title = h1Match[1].trim();
              }
            } else {
              // New format: # Title at the very start (before any comments)
              // Remove leading HTML comments first
              const cleanStart = markdown.replace(/^<!--[\s\S]*?-->\s*\n?/gm, '').trim();
              // Match h1 at start of line - use non-greedy match and allow newline or end
              const h1Match = cleanStart.match(/^#\s+(.+?)(?:\n|$)/m);
              if (h1Match && h1Match[1]) {
                title = h1Match[1].trim();
              } else {
                // Fallback: try to find any h1 in the document (not just at start)
                const anyH1Match = markdown.match(/^#\s+(.+?)(?:\n|$)/m);
                if (anyH1Match && anyH1Match[1]) {
                  title = anyH1Match[1].trim();
                }
              }
            }
            
            if (title) {
              // Remove markdown formatting (bold, italic, etc.)
              this.pageTitle = title
                .replace(/\*\*/g, '') // Remove bold
                .replace(/\*/g, '') // Remove italic
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
                .trim();
            } else {
              // Last resort: try to get first line that starts with #
              const lines = markdown.split('\n');
              for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith('# ')) {
                  this.pageTitle = trimmed.substring(2).trim();
                  break;
                }
              }
              if (!this.pageTitle) {
                this.pageTitle = 'Document';
              }
            }
          }
        } catch (error) {
          console.error('Error loading document title:', error);
          this.pageTitle = 'Document';
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
