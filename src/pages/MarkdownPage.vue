<template>
  <PageWrapper id="doc" class="markdown-page-wrapper" :overflow-visible="true">
    <HeroBanner
      v-if="heroTitle || heroImage"
      style="scroll-snap-align: start"
      :title="heroTitle || 'Document'"
      :tag="heroTag"
      :filename="heroImage"
      :background="true"
      :center="false"
      :breadcrumb="''"
    />
    <GridContainer 
      v-if="showStats"
      style="padding-block-start: var(--spacing-sm) !important"
    >
      <TextStats
        :label1="statsLabel1"
        :value1="statsValue1"
        :label2="statsLabel2"
        :value2="statsValue2"
        :label3="statsLabel3"
        :value3="statsValue3"
      />
    </GridContainer>
    <GridContainer class="markdown-layout">
      <main id="markdown-content-end" class="markdown-main">
        <MarkdownRenderer
          class="content"
          :markdown="processedMarkdown"
          @headings="updateHeadings"
        />
      </main>
      <div 
        v-if="headings && headings.length > 0"
        ref="tocSidebarWrap"
        class="toc-sidebar-wrap"
      >
        <aside 
          ref="tocSidebar"
          class="toc-sidebar"
        >
          <MarkdownTOC
            :headings="headings"
            :active-heading="activeHeading"
          />
        </aside>
      </div>
    </GridContainer>
    <div id="related-writing-section" style="background: transparent !important;">
      <CardRow2 title="Related Writing"/>
    </div>
  </PageWrapper>
</template>

<script>
import { ref, onMounted, inject, watch } from "vue";
import router from "@/router";
import frontMatter from "front-matter";
import MarkdownTOC from "@/components/MarkdownTOC.vue";
import HeroBanner from "@/components/HeroBanner/HeroBanner.vue";
import TextStats from "@/components/card/TextStats.vue";
import GridContainer from "@/components/grid/GridContainer.vue";

export default {
  name: "MarkdownPage",
  setup() {
    const pageData = ref({});
    const markdownContent = ref("");
    const processedMarkdown = ref("");
    const headings = ref([]);
    const activeHeading = ref(null);
    const tocSidebar = ref(null);
    const tocSidebarWrap = ref(null);
    const heroTitle = ref("");
    const heroTag = ref("");
    const heroImage = ref("");
    const statsLabel1 = ref("");
    const statsValue1 = ref("");
    const statsLabel2 = ref("");
    const statsValue2 = ref("");
    const statsLabel3 = ref("");
    const statsValue3 = ref("");

    const updateMarkdownHeadings = inject('updateMarkdownHeadings', () => {});
    const updateMarkdownActiveHeading = inject('updateMarkdownActiveHeading', () => {});

    const extractHeroData = (markdown) => {
      let title = "";
      let tag = "";
      let image = "";

      // First, try to extract from header block (old format)
      // Format: <header>\n\n# Title\n\nTag text\n\n</header>
      const headerMatch = markdown.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
      if (headerMatch) {
        const headerContent = headerMatch[1];
        // Extract h1 title
        const h1Match = headerContent.match(/#\s+(.+?)(?:\n|$)/);
        if (h1Match) {
          title = h1Match[1].trim();
        }
        // Extract tag (text after h1, before closing header)
        const afterH1 = headerContent.replace(/#\s+.*?(\n|$)/, '').trim();
        // Remove empty lines and get the tag text
        tag = afterH1.split('\n').filter(line => line.trim()).join(' ').trim();
      } else {
        // New format: # Title at the very start (doc_32 format)
        // Look for # Title at the beginning, before any comments
        const cleanStart = markdown.replace(/^<!--[\s\S]*?-->\s*\n?/gm, '').trim();
        // Match h1 at start of line (with optional whitespace before)
        const h1Match = cleanStart.match(/^#\s+(.+)$/m);
        if (h1Match) {
          title = h1Match[1].trim();
          // Look for tag after title (next non-empty line before image)
          const afterTitle = cleanStart.substring(cleanStart.indexOf(h1Match[0]) + h1Match[0].length);
          const beforeImage = afterTitle.split(/!\[/)[0];
          const tagLines = beforeImage.split('\n')
            .map(line => line.trim())
            .filter(line => {
              return line && !line.startsWith('<!--') && !line.startsWith('#') && !line.startsWith('![');
            });
          if (tagLines.length > 0) {
            tag = tagLines[0].trim(); // Take first non-empty line as tag
          }
        } else {
          // Fallback: try to find any h1 in the document
          const anyH1Match = markdown.match(/^#\s+(.+?)(?:\n|$)/m);
          if (anyH1Match) {
            title = anyH1Match[1].trim();
          }
        }
      }

      // Extract first image (skip images in HTML comments)
      const lines = markdown.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const imageMatch = line.match(/!\[[^\]]*\]\(([^)]+)\)/);
        if (imageMatch) {
          // Check if this line is in a comment
          let inComment = false;
          for (let j = i - 1; j >= 0; j--) {
            if (lines[j].includes('-->')) break;
            if (lines[j].includes('<!--')) {
              inComment = true;
              break;
            }
          }
          if (!inComment) {
            image = imageMatch[1];
            // Convert relative path to asset path
            if (image.startsWith('../images/')) {
              image = image.replace('../images/', '');
            } else if (image.startsWith('/images/')) {
              image = image.replace('/images/', '');
            }
            break;
          }
        }
      }

      return { title, tag, image };
    };

    const removeHeaderAndFirstImage = (markdown) => {
      let processed = markdown;
      
      // Remove header block (including h1 and tag) - old format
      processed = processed.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
      
      // Remove leading HTML comments
      processed = processed.replace(/^<!--[\s\S]*?-->\s*\n?/gm, '');
      
      // Remove first h1 title (new format - doc_32 style)
      // Only if it's at the very start (after comments removed)
      processed = processed.replace(/^#\s+.+?\n+/m, '');
      
      // Remove first image (if it's right after title/header, not in comments)
      const lines = processed.split('\n');
      let imageRemoved = false;
      for (let i = 0; i < lines.length && !imageRemoved; i++) {
        const line = lines[i];
        const imageMatch = line.match(/!\[[^\]]*\]\([^)]+\)/);
        if (imageMatch) {
          // Check if this line is in a comment
          let inComment = false;
          for (let j = i - 1; j >= 0; j--) {
            if (lines[j].includes('-->')) break;
            if (lines[j].includes('<!--')) {
              inComment = true;
              break;
            }
          }
          if (!inComment) {
            // Remove this image line
            lines.splice(i, 1);
            imageRemoved = true;
          }
        }
      }
      processed = lines.join('\n');
      
      // Remove any leading empty lines
      processed = processed.replace(/^\s*\n+/m, '');
      
      return processed;
    };

    const loadMarkdownContent = async (docId) => {
      try {
        const module = await import(`../assets/content/doc_${docId}.md`);
        const { attributes } = frontMatter(module.default);
        console.log("MarkdownPage: Attributes:", attributes);
        console.log("MarkdownPage: Full markdown preview:", module.default.substring(0, 500));
        pageData.value = attributes;
        markdownContent.value = module.default;
        
        // Extract hero data from the full markdown (before front matter processing)
        const heroData = extractHeroData(module.default);
        console.log("MarkdownPage: Extracted hero data:", heroData);
        heroTitle.value = heroData.title || attributes.title || "";
        heroTag.value = heroData.tag || attributes.tag || "";
        heroImage.value = heroData.image || attributes.image || "";
        
        console.log("MarkdownPage: Hero values set:", {
          title: heroTitle.value,
          tag: heroTag.value,
          image: heroImage.value
        });
        
        // Extract stats from front matter if available
        statsLabel1.value = attributes.statsLabel1 || "";
        statsValue1.value = attributes.statsValue1 || "";
        statsLabel2.value = attributes.statsLabel2 || "";
        statsValue2.value = attributes.statsValue2 || "";
        statsLabel3.value = attributes.statsLabel3 || "";
        statsValue3.value = attributes.statsValue3 || "";
        
        // Remove header and first image from markdown
        processedMarkdown.value = removeHeaderAndFirstImage(module.default);
        console.log("MarkdownPage: Processed markdown preview:", processedMarkdown.value.substring(0, 300));
      } catch (error) {
        console.error("Error loading Markdown content:", error);
        router.push({ name: "NotFound" });
      }
    };

    onMounted(() => {
      const docId = parseInt(router.currentRoute.value.params.id);
      loadMarkdownContent(docId);
    });

    watch(() => router.currentRoute.value.params.id, (newId) => {
      if (newId) {
        const docId = parseInt(newId);
        loadMarkdownContent(docId);
        headings.value = [];
        activeHeading.value = null;
        window.scrollTo(0, 0);
      }
    });

    return {
      pageData,
      markdownContent,
      processedMarkdown,
      headings,
      activeHeading,
      tocSidebar,
      tocSidebarWrap,
      heroTitle,
      heroTag,
      heroImage,
      statsLabel1,
      statsValue1,
      statsLabel2,
      statsValue2,
      statsLabel3,
      statsValue3,
      updateMarkdownHeadings,
      updateMarkdownActiveHeading,
    };
  },
  components: {
    MarkdownTOC,
    HeroBanner,
    TextStats,
    GridContainer,
  },
  computed: {
    showStats() {
      return this.statsLabel1 || this.statsLabel2 || this.statsLabel3;
    },
  },
  data() {
    return {
      scrollHandler: null,
      headingScrollHandler: null,
    };
  },
  mounted() {
    // Setup will be called when headings are available
  },
  beforeUnmount() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.headingScrollHandler) {
      window.removeEventListener('scroll', this.headingScrollHandler);
    }
  },
  watch: {
    headings(newHeadings) {
      if (this.updateMarkdownHeadings) {
        this.updateMarkdownHeadings(newHeadings);
      }
      // Re-setup sticky when headings change
      if (newHeadings && newHeadings.length > 0) {
        this.$nextTick(() => {
          this.setupTOCSticky();
        });
      }
    },
    activeHeading(newActive) {
      if (this.updateMarkdownActiveHeading) {
        this.updateMarkdownActiveHeading(newActive);
      }
    },
    '$route'() {
      // Re-setup sticky on route change
      this.$nextTick(() => {
        if (this.headings && this.headings.length > 0) {
          this.setupTOCSticky();
        }
      });
    },
  },
  methods: {
    updateHeadings(headings) {
      console.log("MarkdownPage received headings:", headings);
      this.headings = headings;
      if (this.updateMarkdownHeadings) {
        this.updateMarkdownHeadings(headings);
      }
      this.observeHeadings();
    },
    observeHeadings() {
      // Clean up existing handler
      if (this.headingScrollHandler) {
        window.removeEventListener('scroll', this.headingScrollHandler);
        this.headingScrollHandler = null;
      }

      // Use scroll-based detection instead of intersection observer
      // This ensures headings stay active until the next one is reached
      const updateActiveHeading = () => {
        if (!this.headings || this.headings.length === 0) return;

        // Filter to only h2 headings (matching TOC display)
        const h2Headings = this.headings.filter(h => h.level === 2);
        if (h2Headings.length === 0) return;

        const scrollPosition = window.scrollY + 100; // Offset for better UX
        let activeHeadingSlug = null;

        // Find the last h2 heading that has been scrolled past
        // This heading stays active until the next one is reached
        for (let i = h2Headings.length - 1; i >= 0; i--) {
          const heading = h2Headings[i];
          const element = document.getElementById(heading.slug);
          
          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            
            // If we've scrolled past this heading, it's active
            if (scrollPosition >= elementTop) {
              activeHeadingSlug = heading.slug;
              break;
            }
          }
        }

        // If no heading found (at very top), use the first h2
        if (!activeHeadingSlug && h2Headings.length > 0) {
          const firstHeading = h2Headings[0];
          const firstElement = document.getElementById(firstHeading.slug);
          if (firstElement) {
            activeHeadingSlug = firstHeading.slug;
          }
        }

        // If we've scrolled past the last h2, keep it active
        // Check if we're past the last h2 heading
        if (h2Headings.length > 0) {
          const lastHeading = h2Headings[h2Headings.length - 1];
          const lastElement = document.getElementById(lastHeading.slug);
          
          if (lastElement) {
            const lastElementTop = lastElement.getBoundingClientRect().top + window.scrollY;
            const contentEndElement = document.getElementById('markdown-content-end');
            
            // If we've scrolled past the last h2, keep it active
            if (scrollPosition >= lastElementTop) {
              // Check if we're still within the markdown content area
              if (contentEndElement) {
                const contentEndTop = contentEndElement.getBoundingClientRect().bottom + window.scrollY;
                // If we're past the last h2 but still before the end of content, keep last h2 active
                if (scrollPosition < contentEndTop) {
                  activeHeadingSlug = lastHeading.slug;
                }
              } else {
                // If no content end element, just keep last h2 active when scrolled past it
                activeHeadingSlug = lastHeading.slug;
              }
            }
          }
        }

        if (activeHeadingSlug && this.activeHeading !== activeHeadingSlug) {
          this.activeHeading = activeHeadingSlug;
        }
      };

      // Wait for DOM to be ready
      this.$nextTick(() => {
        // Initial check
        updateActiveHeading();

        // Update on scroll with throttling
        let ticking = false;
        const scrollHandler = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              updateActiveHeading();
              ticking = false;
            });
            ticking = true;
          }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });

        // Store handler for cleanup
        this.headingScrollHandler = scrollHandler;
      });

      // Setup sticky positioning when headings are available
      this.setupTOCSticky();
    },
    setupTOCSticky() {
      // Clean up existing handler
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
        this.scrollHandler = null;
      }

      this.$nextTick(() => {
        if (!this.$refs.tocSidebar || !this.$refs.tocSidebarWrap) {
          setTimeout(() => this.setupTOCSticky(), 300);
          return;
        }

        const sidebarElement = this.$refs.tocSidebar;
        const wrapElement = this.$refs.tocSidebarWrap;

        const handleScroll = () => {
          if (!sidebarElement || !wrapElement) return;

          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const sidebarTop = wrapElement.offsetTop;
          const sidebarHeight = sidebarElement.offsetHeight;
          const wrapHeight = wrapElement.offsetHeight;
          const stopPoint = sidebarTop + wrapHeight - sidebarHeight;
          
          // Get the wrapper's position to maintain right column alignment
          const wrapRect = wrapElement.getBoundingClientRect();
          const wrapLeft = wrapRect.left;

          if (scrollTop > sidebarTop && scrollTop < stopPoint) {
            // Stick to top of viewport, maintain right column position
            sidebarElement.style.position = 'fixed';
            sidebarElement.style.top = '20px';
            sidebarElement.style.left = `${wrapLeft}px`;
            sidebarElement.style.width = `${wrapElement.offsetWidth}px`;
          } else if (scrollTop >= stopPoint) {
            // Stick to bottom of wrapper
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = `${wrapHeight - sidebarHeight}px`;
            sidebarElement.style.left = '0';
            sidebarElement.style.width = '100%';
          } else {
            // Normal position at top
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = '0';
            sidebarElement.style.left = '0';
            sidebarElement.style.width = '100%';
          }
        };

        // Initial position
        handleScroll();

        // Add scroll listener
        this.scrollHandler = handleScroll;
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-layout {
  align-items: start;
  overflow: visible !important; // Critical for sticky to work

  @media only screen and (min-width: 1201px) {
    grid-template-columns: 1fr 2fr;
    grid-gap: var(--spacing-lg);
  }
}

.markdown-main {
  width: 100%;
  grid-column: 1 / -1;

  @media only screen and (min-width: 1201px) {
    grid-column: 2 / 3;
  }
}

// TOC sidebar wrapper - matches the v0 pattern
.toc-sidebar-wrap {
  display: none;

  @media only screen and (min-width: 1201px) {
    display: block;
    grid-column: 1 / 2;
    grid-row: 1;
    height: auto;
    width: 100%;
    position: relative;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 0;
    // This creates the height context for the sidebar
    min-height: 100%;
  }
}

// TOC sidebar - starts as absolute, changes to fixed/absolute via JS
.toc-sidebar {
  display: none;

  @media only screen and (min-width: 1201px) {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: fit-content;
    max-height: calc(100vh - 40px);
    overflow: visible;
    padding-block-start: var(--spacing-lg);
    box-sizing: border-box;
  }
}

.content {
  @media only screen and (min-width: 768px) {
    padding-top: var(--spacing-lg);
  }
}

.section {
  padding-block-end: var(--spacing-lg);
}

#related-writing-section {
  background: transparent !important;
}
</style>