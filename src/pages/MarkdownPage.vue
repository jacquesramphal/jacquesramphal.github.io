<template>
  <PageWrapper
    id="doc"
    :class="['markdown-page-wrapper', { 'presenter-mode': presenterMode }]"
    :overflow-visible="true"
  >
    <!-- v-if="shouldShowHero" -->
    <!-- :tag="heroTag" -->

    <HeroBanner
      v-if="hasHeaderTag"
      style="scroll-snap-align: start"
      :title="heroTitle || 'Document'"
      :subtitle="heroSubtitle || 'No description available'"
      :background="false"
      :center="false"
      :breadcrumb="''"
    />
    <!-- Legacy: hero image after <header> block, tight container -->
    <GridContainer
      v-if="hasHeaderTag && heroImageSrc && heroImage"
      style="scroll-snap-align: start"
    >
      <div class="hero-fullscreen-image">
        <img
          :src="heroImageSrc"
          :alt="heroTitle || 'Hero image'"
          draggable="false"
          class="hero-fullscreen-image__img"
        />
      </div>
    </GridContainer>

    <!-- New format: pre-title lead image, full viewport width, above TOC and content -->
    <GridContainer
      tight
      v-if="!hasHeaderTag && hasLeadImage && heroImageSrc && heroImage"
      class="lead-image-container"
      style="scroll-snap-align: start; margin-block-end: 0; padding-block-end: 0"
    >
      <div class="hero-fullscreen-image hero-fullscreen-image--lead">
        <img
          :src="heroImageSrc"
          :alt="heroTitle || 'Hero image'"
          draggable="false"
          class="hero-fullscreen-image__img"
        />
      </div>
    </GridContainer>
    <!-- :full="isFullWidth" -->
    <GridContainer :style="!hasHeaderTag && hasLeadImage ? 'padding-block-start: 0' : ''"
      ><GridParent
        :class="[
          'markdown-layout',
          {
            'markdown-layout--no-hero': !hasHeaderTag && !hasLeadImage,
            'markdown-layout--no-hero-lead': !hasHeaderTag && hasLeadImage,
            'markdown-layout--full-width': isFullWidth,
          },
        ]"
      >
        <main id="markdown-content-end" class="markdown-main">
          <MarkdownRenderer
            class="content"
            :markdown="processedMarkdown"
            @headings="updateHeadings"
            @image-click="
              (src) => {
                lightboxSrc = src;
                lightboxOpen = true;
              }
            "
          />
          <Teleport to="body">
            <FullscreenImage
              v-if="lightboxOpen"
              :isOpen="lightboxOpen"
              :imageSrc="lightboxSrc"
              @close="lightboxOpen = false"
            />
          </Teleport>
          <div class="markdown-share">
            <button
              @click="togglePresenter"
              class="print-button"
              :aria-label="presenterMode ? 'Exit presenter mode' : 'Enter presenter mode'"
            >
              <span class="print-button__label">{{ presenterMode ? 'Exit' : 'Present' }}</span>
            </button>
            <button @click="handlePrint" class="print-button" aria-label="Print page">
              <span class="print-button__icon">
                <MyIcon name="icon/print.svg" :is-svg="true" :size="16" />
              </span>
              <span class="print-button__label">Print</span>
            </button>
            <ShareWidget :title="shareTitle" />
          </div>
        </main>

        <div v-if="hasH2Headings" ref="tocSidebarWrap" class="toc-sidebar-wrap">
          <aside ref="tocSidebar" class="toc-sidebar">
            <MarkdownTOC :headings="headings" :active-heading="activeHeading" />
          </aside>
        </div> </GridParent
    ></GridContainer>
    <div
      v-if="currentSlug !== 'cv'"
      id="related-writing-section"
      style="background: transparent !important"
    >
      <CardRow2
        :title="relatedTitle"
        kind="writing"
        :viewAllTo="{ name: 'Library' }"
        :filterByType="currentDocType"
      />
    </div>

    <Teleport v-if="bylineReady" to="#article-byline-slot">
      <ArticleByline :readTime="articleReadTime" :date="articleDate" />
    </Teleport>

    <Teleport to="body">
      <PresenterBar
        v-if="presenterMode"
        :current-index="currentSectionIndex"
        :total="sectionEls.length"
        @navigate="navigateToSection"
        @exit="togglePresenter"
      />
    </Teleport>
  </PageWrapper>
</template>

<script>
import { ref, onMounted, onUnmounted, inject, watch, nextTick, computed } from 'vue';
import { useHead } from '@vueuse/head';
import router from '@/router';
import frontMatter from 'front-matter';
import MarkdownTOC from '@/components/MarkdownTOC.vue';
import HeroBanner from '@/components/HeroBanner/HeroBanner.vue';
import ShareWidget from '@/components/blog/ShareWidget.vue';
import MyIcon from '@/components/Icon.vue';
import PresenterBar from '@/components/PresenterBar/PresenterBar.vue';
import { getDocRecordById, getDocRecordBySlug, isNumericRouteParam } from '@/utils/docRegistry';
// import TextStats from "@/components/card/TextStats.vue";
import GridContainer from '@/components/grid/GridContainer.vue';
import FullscreenImage from '@/components/FullscreenImage.vue';
import fallbackImage from '@/assets/images/placeholder.png';
import libraryData from '@/assets/data/library.json';
import ArticleByline from '@/components/ArticleByline.vue';
import { getReadTime } from '@/utils/readTime';
// import ImageCard from "@/components/card/ImageCard/ImageCard.vue";

// Pre-load all images using require.context so webpack can bundle them
// This allows dynamic image loading at runtime
const imageContext = require.context('../assets/images', true, /\.(png|jpg|jpeg|gif|svg)$/);
const imageMap = {};
imageContext.keys().forEach((item) => {
  // require.context returns paths like './article/without-tokens.png' or './casestudy/genie/genie.png'
  // Store with original path (with ./)
  imageMap[item] = imageContext(item);

  // Remove './' prefix for cleaner lookup
  const key = item.replace(/^\.\//, '');
  imageMap[key] = imageContext(item);

  // Also store with just the filename for direct lookup (but be careful with duplicates)
  const pathParts = key.split('/');
  const filename = pathParts[pathParts.length - 1];
  if (filename && pathParts.length > 1) {
    // Only store filename if it's unique or matches a specific pattern
    if (!imageMap[filename] || imageMap[filename] === imageContext(item)) {
      imageMap[filename] = imageContext(item);
    }
  }

  // Store nested path (everything after first directory)
  if (pathParts.length > 1) {
    const nestedKey = pathParts.slice(1).join('/');
    imageMap[nestedKey] = imageContext(item);
  }
});
console.log('MarkdownPage: Pre-loaded images map. Total images:', Object.keys(imageMap).length);
console.log('MarkdownPage: Sample image keys:', Object.keys(imageMap).slice(0, 30));
console.log(
  "MarkdownPage: Looking for 'article/without-tokens.png':",
  !!imageMap['article/without-tokens.png']
);
console.log(
  "MarkdownPage: Looking for 'casestudy/genie/genie.png':",
  !!imageMap['casestudy/genie/genie.png']
);

// Pre-load all markdown docs so we can load by arbitrary filename.
const contentContext = require.context('../assets/content', false, /\.md$/);

export default {
  name: 'MarkdownPage',
  setup() {
    const pageData = ref({});
    const markdownContent = ref('');
    const processedMarkdown = ref('');
    const headings = ref([]);
    const activeHeading = ref(null);
    const tocSidebar = ref(null);
    const tocSidebarWrap = ref(null);
    const heroTitle = ref('');
    const heroTag = ref('');
    const heroSubtitle = ref('');
    const heroImage = ref('');
    const hasHeaderTag = ref(false);
    const hasLeadImage = ref(false);
    const statsLabel1 = ref('');
    const statsValue1 = ref('');
    const statsLabel2 = ref('');
    const statsValue2 = ref('');
    const statsLabel3 = ref('');
    const statsValue3 = ref('');
    const currentDocType = ref(null);
    const articleReadTime = ref('');
    const articleDate = ref('');
    const bylineReady = ref(false);
    const isFullWidth = ref(false);
    const lightboxOpen = ref(false);
    const lightboxSrc = ref('');
    const presenterMode = ref(false);
    const currentSectionIndex = ref(0);
    const sectionEls = ref([]);

    const updateMarkdownHeadings = inject('updateMarkdownHeadings', () => {});
    const updateMarkdownActiveHeading = inject('updateMarkdownActiveHeading', () => {});

    // Dynamic meta tags with structured data for SEO/AEO/GEO
    useHead({
      title: computed(() =>
        heroTitle.value ? `${heroTitle.value} | Jacques Ramphal` : 'Jacques Ramphal - Portfolio'
      ),
      meta: computed(() => [
        {
          name: 'description',
          content:
            heroSubtitle.value ||
            'Insights on design systems, agentic AI, and design engineering by Jacques Ramphal',
        },
        {
          property: 'og:title',
          content: heroTitle.value || 'Jacques Ramphal - Portfolio',
        },
        {
          property: 'og:description',
          content:
            heroSubtitle.value || 'Insights on design systems, agentic AI, and design engineering',
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'article:author',
          content: 'Jacques Ramphal',
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:title',
          content: heroTitle.value || 'Jacques Ramphal - Portfolio',
        },
        {
          property: 'twitter:description',
          content:
            heroSubtitle.value || 'Insights on design systems, agentic AI, and design engineering',
        },
      ]),
      script: computed(() =>
        heroTitle.value
          ? [
              // Article Schema
              {
                type: 'application/ld+json',
                children: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  headline: heroTitle.value,
                  description: heroSubtitle.value || '',
                  author: {
                    '@type': 'Person',
                    name: 'Jacques Ramphal',
                    jobTitle: 'Senior Product Designer & Design Lead',
                    worksFor: {
                      '@type': 'Organization',
                      name: 'Orium',
                    },
                  },
                  publisher: {
                    '@type': 'Person',
                    name: 'Jacques Ramphal',
                  },
                  datePublished: new Date().toISOString(),
                  keywords: heroTag.value || 'design systems, agentic AI, UX design',
                }),
              },
              // BreadcrumbList Schema for SEO
              {
                type: 'application/ld+json',
                children: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://ramphal.design/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Library',
                      item: 'https://ramphal.design/library',
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: heroTitle.value,
                      item:
                        typeof window !== 'undefined'
                          ? window.location.href
                          : `https://ramphal.design${router.currentRoute.value.fullPath}`,
                    },
                  ],
                }),
              },
            ]
          : []
      ),
    });

    // -------------------------------------------------------------
    // NEW extractHeroData — clean, predictable, and robust
    // -------------------------------------------------------------
    const extractHeroData = (markdown) => {
      if (!markdown || typeof markdown !== 'string') {
        return { title: '', tag: '', image: '' };
      }

      let title = '';
      let tag = '';
      let image = '';

      // ---------------------------
      // 1. Extract <header> block
      // ---------------------------
      const headerMatch = markdown.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
      let headerContent = headerMatch ? headerMatch[1] : '';

      if (headerContent) {
        // TITLE
        const h1 =
          headerContent.match(/<h1[^>]*>(.*?)<\/h1>/i) || headerContent.match(/^#\s+(.+)$/m);

        if (h1) {
          title = h1[1].replace(/<[^>]+>/g, '').trim();
        }

        // SUBTITLE
        const h4 =
          headerContent.match(/<h4[^>]*>(.*?)<\/h4>/i) || headerContent.match(/^####\s+(.+)$/m);

        if (h4) {
          tag = h4[1].replace(/<[^>]+>/g, '').trim();
        }
      }

      // ---------------------------
      // 2. Extract image — BEFORE first heading (new format) or AFTER header (legacy)
      // ---------------------------
      const lines = markdown.split('\n');
      let headerClosedLine = -1;

      lines.forEach((l, i) => {
        if (l.toLowerCase().includes('</header>')) {
          headerClosedLine = i;
        }
      });

      if (headerClosedLine >= 0) {
        // Legacy: scan after </header>
        for (let i = headerClosedLine + 1; i < lines.length; i++) {
          const match = lines[i].match(/!\[[^\]]*\]\(([^)]+)\)/);
          if (match) {
            image = match[1];
            break;
          }
        }
      } else {
        const isHtml = markdown.trim().startsWith('<');
        if (isHtml) {
          // HTML format: extract src from first <img> before <h1>
          const h1Idx = markdown.search(/<h1[\s>]/i);
          const searchIn = h1Idx !== -1 ? markdown.slice(0, h1Idx) : markdown;
          const imgSrcMatch = searchIn.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (imgSrcMatch) image = imgSrcMatch[1];
        } else {
          // Raw markdown: image before first # heading
          for (let i = 0; i < lines.length; i++) {
            if (/^#\s/.test(lines[i])) break;
            const match = lines[i].match(/!\[[^\]]*\]\(([^)]+)\)/);
            if (match) {
              image = match[1];
              break;
            }
          }
        }
      }

      // ---------------------------
      // 3. Clean image path
      // ---------------------------
      if (image) {
        image = image
          .replace('../images/', '')
          .replace('./images/', '')
          .replace('/images/', '')
          .trim();
      }

      return { title, tag, image };
    };

    const removeHeaderAndFirstImage = (markdown) => {
      if (!markdown || typeof markdown !== 'string') {
        return '';
      }

      const headerRegex = /<header[^>]*>[\s\S]*?<\/header>/i;
      const hasHeader = headerRegex.test(markdown);

      // No <header> block — check for lead image before first heading (new format)
      if (!hasHeader) {
        const isHtml = markdown.trim().startsWith('<');

        if (isHtml) {
          // HTML format: remove first paragraph-wrapped or bare img tag before h1.
          // Regex built from parts to avoid false-positive linter warnings on the img literal.
          const imgTag = '<' + 'img[^>]+>';
          const leadImgPattern = new RegExp(
            '^\\s*(<p[^>]*>\\s*)?' + imgTag + '(\\s*<\\/p>)?\\s*',
            'i'
          );
          return markdown.replace(leadImgPattern, '');
        }

        // Markdown format: remove first image line before the first # heading
        const lines = markdown.split('\n');
        const result = [];
        let imageStripped = false;
        for (const line of lines) {
          const isImage = /!\[[^\]]*\]\([^)]+\)/.test(line);
          if (!imageStripped && isImage) {
            imageStripped = true;
            continue; // skip this line
          }
          result.push(line);
        }
        return imageStripped ? result.join('\n') : markdown;
      }

      let output = markdown;

      // 1. Remove the entire <header>...</header> block
      output = output.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '').trim();

      const lines = output.split('\n');

      // 2. Remove the first image (markdown OR HTML)
      let removedImage = false;
      const cleaned = [];

      for (let line of lines) {
        if (!removedImage) {
          // Markdown image
          let md = line.match(/!\[[^\]]*\]\(([^)]+)\)/);

          // HTML <img>
          let html = line.match(/<img[^>]+src=["']([^"']+)["']/i);

          if (md || html) {
            removedImage = true;
            continue; // Skip this line
          }
        }

        cleaned.push(line);
      }

      return cleaned.join('\n').trim();
    };

    const loadMarkdownContent = async (routeParam) => {
      try {
        // Reset values at start
        heroTitle.value = '';
        heroTag.value = '';
        heroSubtitle.value = '';
        heroImage.value = '';
        hasHeaderTag.value = false;
        hasLeadImage.value = false;
        isFullWidth.value = false;

        // Resolve route param -> content file.
        const param = (routeParam || '').toString().trim();
        const isNumeric = isNumericRouteParam(param);
        const docId = isNumeric ? parseInt(param, 10) : null;
        const record = isNumeric ? getDocRecordById(docId) : getDocRecordBySlug(param);

        const contentFile = record?.contentFile || (isNumeric ? `doc_${docId}.md` : null);
        if (!contentFile) {
          router.push({ name: 'NotFound' });
          return;
        }

        // Find current doc type from library data
        const libraryEntry = libraryData.entries.find(
          (entry) => entry.docId === record?.docId || entry.slug === record?.slug
        );
        currentDocType.value = libraryEntry?.type || null;
        articleDate.value = libraryEntry?.date || '';
        articleReadTime.value = getReadTime(contentFile);

        // Import markdown - markdown-loader may convert to HTML.
        // We need to fetch the raw file for extraction, but use processed for rendering
        let rawMarkdown = '';
        let processedMarkdownForRender = '';

        try {
          // Try to get raw markdown first (for extraction)
          try {
            const rawModule = await import(`../assets/content/${contentFile}?raw`);
            rawMarkdown =
              typeof rawModule.default === 'string'
                ? rawModule.default
                : rawModule.default?.default || '';
          } catch (e) {
            console.log('MarkdownPage: ?raw import not available, using regular import');
          }

          // Always get the processed version for rendering.
          // Prefer require.context so arbitrary filenames work reliably in webpack.
          let module;
          try {
            module = contentContext(`./${contentFile}`);
          } catch (e) {
            module = await import(`../assets/content/${contentFile}`);
          }
          processedMarkdownForRender =
            typeof module.default === 'string' ? module.default : module.default?.default || '';

          // If we don't have raw, try to use processed (might be HTML or markdown)
          if (!rawMarkdown && processedMarkdownForRender) {
            // Check if it's HTML (from markdown-loader) or raw markdown
            if (
              processedMarkdownForRender.includes('<h1>') ||
              processedMarkdownForRender.includes('<p>')
            ) {
              console.warn('MarkdownPage: Content is HTML. Extraction may not work correctly.');
              // For HTML, we can still try to extract, but we'll use it for rendering too
              rawMarkdown = processedMarkdownForRender;
            } else {
              // It's raw markdown, use it for both
              rawMarkdown = processedMarkdownForRender;
            }
          }
        } catch (error) {
          console.error('MarkdownPage: Error importing markdown:', error);
          rawMarkdown = '';
          processedMarkdownForRender = '';
        }

        const { attributes } = frontMatter(rawMarkdown);
        console.log('MarkdownPage: Doc param:', param);
        console.log('MarkdownPage: Doc ID:', docId);
        console.log('MarkdownPage: Content file:', contentFile);
        console.log('MarkdownPage: Raw markdown type:', typeof rawMarkdown);
        console.log('MarkdownPage: Raw markdown length:', rawMarkdown.length);
        console.log('MarkdownPage: Processed markdown length:', processedMarkdownForRender.length);
        console.log('MarkdownPage: Has <header> tag:', rawMarkdown.includes('<header>'));
        console.log('MarkdownPage: Has # markdown:', rawMarkdown.includes('# '));
        console.log(
          'MarkdownPage: Is HTML:',
          processedMarkdownForRender.includes('<h1>') || processedMarkdownForRender.includes('<p>')
        );
        console.log('MarkdownPage: Attributes:', attributes);
        console.log('MarkdownPage: Raw markdown preview:', rawMarkdown.substring(0, 200));
        console.log(
          'MarkdownPage: Processed markdown preview:',
          processedMarkdownForRender.substring(0, 200)
        );
        pageData.value = attributes;
        markdownContent.value = rawMarkdown;

        // Store processed markdown for rendering (use raw if processed isn't available)
        const markdownForProcessing = processedMarkdownForRender || rawMarkdown;

        // Extract hero data - try raw markdown first, then processed if needed
        let heroData;
        try {
          console.log('MarkdownPage: About to extract hero data');
          console.log('MarkdownPage: rawMarkdown length:', rawMarkdown.length);
          console.log('MarkdownPage: rawMarkdown has header:', rawMarkdown.includes('<header>'));
          console.log(
            'MarkdownPage: processedMarkdownForRender length:',
            processedMarkdownForRender.length
          );
          console.log(
            'MarkdownPage: processedMarkdownForRender has header:',
            processedMarkdownForRender.includes('<header>')
          );

          // Try raw markdown first
          let markdownToExtract = rawMarkdown;
          if (!markdownToExtract || markdownToExtract.length === 0) {
            console.log('MarkdownPage: rawMarkdown is empty, using processedMarkdownForRender');
            markdownToExtract = processedMarkdownForRender;
          }

          // Legacy: header block detection
          hasHeaderTag.value = /<header[^>]*>/i.test(markdownToExtract || '');

          // New format: image before first heading (handles both raw markdown and HTML)
          hasLeadImage.value = (() => {
            const src = (markdownToExtract || '').trim();
            const isHtml = src.startsWith('<');
            if (isHtml) {
              // In HTML: image appears before <h1>
              const h1Idx = src.search(/<h1[\s>]/i);
              const imgIdx = src.search(/<img[\s>]/i);
              return imgIdx !== -1 && (h1Idx === -1 || imgIdx < h1Idx);
            }
            // Raw markdown: image line before first # heading
            for (const line of src.split('\n')) {
              if (/^#\s/.test(line)) return false;
              if (/!\[[^\]]*\]\([^)]+\)/.test(line)) return true;
            }
            return false;
          })();
          isFullWidth.value = /<!--\s*full-width\s*-->/i.test(markdownToExtract || '');

          heroData = extractHeroData(markdownToExtract);
          console.log('MarkdownPage: Extracted hero data:', heroData);
          console.log('MarkdownPage: Hero data title:', heroData?.title);
          console.log('MarkdownPage: Hero data tag:', heroData?.tag);
          console.log('MarkdownPage: Hero data image:', heroData?.image);
          console.log('MarkdownPage: Hero data tag length:', heroData?.tag?.length || 0);
          console.log('MarkdownPage: Hero data image length:', heroData?.image?.length || 0);
          console.log('MarkdownPage: Hero data title type:', typeof heroData?.title);
          console.log('MarkdownPage: Hero data title truthy:', !!heroData?.title);
          console.log('MarkdownPage: Hero data title length:', heroData?.title?.length || 0);
        } catch (error) {
          console.error('MarkdownPage: Error extracting hero data:', error);
          console.error('MarkdownPage: Error stack:', error.stack);
          heroData = { title: '', tag: '', image: '' };
        }

        // Extract values from header tag (ignore front matter since it's rendered on page)
        // Clean up title - remove HTML tags, newlines, and normalize whitespace
        let newTitle = (heroData?.title || '').toString().trim();
        newTitle = newTitle.replace(/<[^>]+>/g, ''); // Remove HTML tags
        // Decode HTML entities (including numeric entities like &#39;)
        const tempDivTitle = document.createElement('div');
        tempDivTitle.innerHTML = newTitle;
        newTitle = tempDivTitle.textContent || tempDivTitle.innerText || newTitle;
        newTitle = newTitle.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();

        // Clean up tag/subtitle - remove HTML tags, newlines, and normalize whitespace
        let newTag = (heroData?.tag || '').toString().trim();
        newTag = newTag.replace(/<[^>]+>/g, ''); // Remove HTML tags
        // Decode HTML entities (including numeric entities like &#39;)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newTag;
        newTag = tempDiv.textContent || tempDiv.innerText || newTag;
        newTag = newTag.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();

        const newSubtitle = newTag; // Map tag to subtitle for the banner
        const newImage = (heroData?.image || '').toString().trim();

        console.log('MarkdownPage: Before setting values:', {
          newTitle,
          newTag,
          newSubtitle,
          newImage,
          newImageLength: newImage.length,
          newTagLength: newTag.length,
          newSubtitleLength: newSubtitle.length,
        });

        // Set hero values from extracted header data
        heroTitle.value = newTitle;
        heroTag.value = newTag;
        heroSubtitle.value = newSubtitle;
        heroImage.value = newImage;

        console.log('MarkdownPage: ========== IMAGE EXTRACTION SUMMARY ==========');
        console.log('MarkdownPage: heroImage.value set to:', JSON.stringify(heroImage.value));
        console.log('MarkdownPage: heroImage.value type:', typeof heroImage.value);
        console.log('MarkdownPage: heroImage.value truthy:', !!heroImage.value);
        console.log('MarkdownPage: heroImage.value length:', heroImage.value.length);
        console.log(
          'MarkdownPage: heroImage.value trimmed:',
          JSON.stringify(heroImage.value.trim())
        );
        console.log(
          'MarkdownPage: Expected path format: article/without-tokens.png or casestudy/genie/genie.png'
        );
        console.log('MarkdownPage: Will this path be in imageMap?', {
          direct: !!imageMap[heroImage.value.trim()],
          withDot: !!imageMap[`./${heroImage.value.trim()}`],
          sampleKeys: Object.keys(imageMap)
            .filter((k) => k.includes('article') || k.includes('genie'))
            .slice(0, 5),
        });
        console.log('MarkdownPage: ==============================================');

        console.log('MarkdownPage: Hero values set:', {
          title: heroTitle.value,
          tag: heroTag.value,
          subtitle: heroSubtitle.value,
          image: heroImage.value,
          titleType: typeof heroTitle.value,
          titleLength: heroTitle.value.length,
          subtitleLength: heroSubtitle.value.length,
          titleTruthy: !!heroTitle.value,
          subtitleTruthy: !!heroSubtitle.value,
          imageTruthy: !!heroImage.value,
          shouldShow: !!(heroTitle.value || heroImage.value),
        });

        // Force reactivity update
        await nextTick();
        console.log(
          'MarkdownPage: After nextTick - heroTitle:',
          heroTitle.value,
          'heroImage:',
          heroImage.value
        );

        // Extract stats from front matter if available
        statsLabel1.value = attributes.statsLabel1 || '';
        statsValue1.value = attributes.statsValue1 || '';
        statsLabel2.value = attributes.statsLabel2 || '';
        statsValue2.value = attributes.statsValue2 || '';
        statsLabel3.value = attributes.statsLabel3 || '';
        statsValue3.value = attributes.statsValue3 || '';

        // Remove header and first image from markdown
        // Use the markdown that will be rendered (might be HTML or markdown)
        let cleaned = removeHeaderAndFirstImage(markdownForProcessing);

        // Inject byline placeholder after the first h1 so ArticleByline
        // can be teleported into it after render.
        const bylinePlaceholder = '<div id="article-byline-slot"></div>';
        const h1CloseIdx = cleaned.indexOf('</h1>');
        if (h1CloseIdx !== -1) {
          const insertAt = h1CloseIdx + '</h1>'.length;
          cleaned = cleaned.slice(0, insertAt) + bylinePlaceholder + cleaned.slice(insertAt);
        } else {
          // Fallback: look for markdown h1 line and insert after it
          cleaned = cleaned.replace(/^(#\s+.+)$/m, `$1\n${bylinePlaceholder}`);
        }

        processedMarkdown.value = cleaned;
        // Wait for DOM to render, then activate the byline teleport
        bylineReady.value = false;
        nextTick(() => {
          bylineReady.value = !!document.getElementById('article-byline-slot');
        });
        console.log(
          'MarkdownPage: Processed markdown preview:',
          processedMarkdown.value.substring(0, 300)
        );
      } catch (error) {
        console.error('Error loading Markdown content:', error);
        router.push({ name: 'NotFound' });
      }
    };

    const handlePresenterShortcut = (e) => {
      const tag = document.activeElement?.tagName;
      const isEditable =
        tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;
      if (!isEditable && e.key === 'p' && !e.metaKey && !e.ctrlKey) {
        togglePresenter();
      }
    };

    onMounted(() => {
      const param = router.currentRoute.value.params.slug ?? router.currentRoute.value.params.id;
      loadMarkdownContent(param);
      window.addEventListener('keydown', handlePresenterShortcut);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handlePresenterShortcut);
    });

    watch(
      () => router.currentRoute.value.params.slug ?? router.currentRoute.value.params.id,
      (newParam) => {
        if (newParam) {
          // Reset hero values before loading new content
          heroTitle.value = '';
          heroTag.value = '';
          heroSubtitle.value = '';
          heroImage.value = '';
          headings.value = [];
          activeHeading.value = null;
          loadMarkdownContent(newParam);
          window.scrollTo(0, 0);
        }
      }
    );

    // Computed to ensure reactivity for hero banner display
    const shouldShowHero = computed(() => {
      const hasTitle = heroTitle.value && heroTitle.value.trim().length > 0;
      const hasImage = heroImage.value && heroImage.value.trim().length > 0;
      const result = hasTitle || hasImage;
      console.log('shouldShowHero computed:', {
        hasTitle,
        hasImage,
        result,
        heroTitle: heroTitle.value,
        heroImage: heroImage.value,
      });
      return result;
    });

    const shareTitle = computed(() => {
      const t = (heroTitle.value || '').toString().trim();
      if (t) return t;
      const h1 = (headings.value || []).find((h) => h && h.level === 1 && h.title);
      return h1?.title || '';
    });

    const hasH2Headings = computed(() => {
      if (!headings.value) return false;
      const h2Count = headings.value.filter((h) => h.level === 2).length;
      return h2Count > 1;
    });

    // Computed property for hero image source
    const heroImageSrc = computed(() => {
      if (!heroImage.value) {
        console.log('heroImageSrc: No heroImage value');
        return null;
      }

      const imagePath = heroImage.value.trim();
      console.log('heroImageSrc: Original image path from extraction:', imagePath);

      // If the path is already a resolved URL (webpack output, data URI, or absolute),
      // return it directly — no imageMap lookup needed.
      if (
        imagePath.startsWith('/') ||
        imagePath.startsWith('http') ||
        imagePath.startsWith('data:')
      ) {
        return imagePath;
      }

      // Clean up the path - remove any leading/trailing slashes and normalize
      // The extraction already removes ../images/ prefix, so we should have clean path like "casestudy/genie/genie.png"
      let cleanPath = imagePath;

      // Remove any remaining image path prefixes (in case extraction didn't catch them)
      cleanPath = cleanPath.replace(
        /^(images\/|\.\/images\/|\/images\/|\.\.\/images\/|assets\/images\/)/,
        ''
      );
      // Remove any leading/trailing slashes
      cleanPath = cleanPath.replace(/^\/+|\/+$/g, '');

      console.log('heroImageSrc: Cleaned path:', cleanPath);
      console.log('heroImageSrc: Looking up in imageMap...');
      console.log('heroImageSrc: Total images in map:', Object.keys(imageMap).length);

      // Try multiple lookup strategies
      const lookupKeys = [
        cleanPath, // Direct match: "article/without-tokens.png"
        `./${cleanPath}`, // With ./ prefix: "./article/without-tokens.png"
        imagePath, // Original extracted path
        imagePath.replace(/^(\.\.\/images\/|images\/|\.\/images\/|\/images\/)/, ''), // Remove any image prefix
      ];

      // Also try filename only if path has subdirectories
      if (cleanPath.includes('/')) {
        const filename = cleanPath.split('/').pop();
        lookupKeys.push(filename);
      }

      console.log('heroImageSrc: Trying lookup keys:', lookupKeys);

      for (const lookupKey of lookupKeys) {
        const normalized = lookupKey.replace(/^\.\//, '').replace(/^\/+|\/+$/g, '');
        console.log(
          `heroImageSrc: Checking key: "${normalized}"`,
          imageMap[normalized] ? '✓ FOUND' : '✗ not found'
        );
        if (imageMap[normalized]) {
          console.log('heroImageSrc: ✓✓✓ SUCCESS! Found image with key:', normalized);
          return imageMap[normalized];
        }
      }

      // Debug: show some actual keys from the map for comparison
      const sampleKeys = Object.keys(imageMap).filter(
        (k) =>
          k.includes('without-tokens') ||
          k.includes('genie.png') ||
          k.includes('article') ||
          k.includes('casestudy')
      );
      console.log('heroImageSrc: Relevant keys in map:', sampleKeys);

      // Fallback: try require() as last resort (might work for some cases)
      try {
        const imageSrc = require(`../assets/images/${cleanPath}`);
        console.log('heroImageSrc: ✓ Found image with require():', cleanPath);
        return imageSrc;
      } catch (error) {
        console.warn('heroImageSrc: require() also failed:', error.message);
      }

      console.error('heroImageSrc: ✗ All lookup attempts failed for:', imagePath);
      console.error('heroImageSrc: Cleaned path was:', cleanPath);
      console.error('heroImageSrc: Tried lookup keys:', lookupKeys);
      console.error('heroImageSrc: Returning fallback image');

      // Return fallback image if main image fails to load
      return fallbackImage;
    });

    // Fallback image source (always available)
    const fallbackImageSrc = computed(() => {
      return fallbackImage;
    });

    // Print handler
    const handlePrint = () => {
      window.print();
    };

    // Presenter mode
    const navigateToSection = (index) => {
      const sections = sectionEls.value;
      if (!sections.length) return;
      const clamped = Math.max(0, Math.min(index, sections.length - 1));
      currentSectionIndex.value = clamped;
      sections[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handlePresenterKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToSection(currentSectionIndex.value + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToSection(currentSectionIndex.value - 1);
      } else if (e.key === 'Escape') {
        togglePresenter();
      }
    };

    const togglePresenter = () => {
      presenterMode.value = !presenterMode.value;
      currentSectionIndex.value = 0;
      document.body.classList.toggle('presenter-mode-body', presenterMode.value);
      if (presenterMode.value) {
        nextTick(() => {
          sectionEls.value = Array.from(document.querySelectorAll('.markdown-section'));
          navigateToSection(0);
          window.addEventListener('keydown', handlePresenterKey);
        });
      } else {
        window.removeEventListener('keydown', handlePresenterKey);
        sectionEls.value = [];
      }
    };

    // Computed properties for related content
    const relatedTitle = computed(() => {
      const typeMap = {
        article: 'Related',
        'case-study': 'Related',
        tool: 'Related Tools',
      };
      return typeMap[currentDocType.value] || 'Related';
    });

    return {
      handlePrint,
      pageData,
      markdownContent,
      processedMarkdown,
      headings,
      activeHeading,
      tocSidebar,
      tocSidebarWrap,
      heroTitle,
      heroTag,
      heroSubtitle,
      heroImage,
      hasHeaderTag,
      hasLeadImage,
      heroImageSrc,
      fallbackImageSrc,
      shouldShowHero,
      shareTitle,
      hasH2Headings,
      statsLabel1,
      statsValue1,
      statsLabel2,
      statsValue2,
      statsLabel3,
      statsValue3,
      currentDocType,
      articleReadTime,
      articleDate,
      bylineReady,
      relatedTitle,
      isFullWidth,
      currentSlug: computed(
        () => router.currentRoute.value.params.slug ?? router.currentRoute.value.params.id
      ),
      lightboxOpen,
      lightboxSrc,
      presenterMode,
      currentSectionIndex,
      sectionEls,
      togglePresenter,
      navigateToSection,
      updateMarkdownHeadings,
      updateMarkdownActiveHeading,
    };
  },
  components: {
    // ImageCard,
    MarkdownTOC,
    HeroBanner,
    ShareWidget,
    MyIcon,
    PresenterBar,
    // TextStats,
    GridContainer,
    FullscreenImage,
    ArticleByline,
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
      resizeHandler: null,
      isDesktop: false,
    };
  },
  mounted() {
    // Setup will be called when headings are available
    this.checkDesktopSize();
    this.resizeHandler = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeHandler, { passive: true });

    // Initial check to ensure sidebar is properly positioned
    this.$nextTick(() => {
      if (this.isDesktop && this.headings && this.headings.length > 0) {
        this.setupTOCSticky();
      }
    });
  },
  beforeUnmount() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.headingScrollHandler) {
      window.removeEventListener('scroll', this.headingScrollHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    document.body.classList.remove('presenter-mode-body');
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
    $route() {
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
      console.log('MarkdownPage received headings:', headings);
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
        const h2Headings = this.headings.filter((h) => h.level === 2);
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
                const contentEndTop =
                  contentEndElement.getBoundingClientRect().bottom + window.scrollY;
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
    checkDesktopSize() {
      this.isDesktop = window.innerWidth >= 1201;
    },
    handleResize() {
      const wasDesktop = this.isDesktop;
      this.checkDesktopSize();

      // Reset sidebar styles when switching breakpoints
      if (this.$refs.tocSidebar) {
        const sidebarElement = this.$refs.tocSidebar;

        if (!this.isDesktop) {
          // On mobile - reset all inline styles that could cause issues
          sidebarElement.style.position = '';
          sidebarElement.style.top = '';
          sidebarElement.style.left = '';
          sidebarElement.style.width = '';

          // Remove scroll handler if switching from desktop to mobile
          if (wasDesktop && this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
            this.scrollHandler = null;
          }
        } else {
          // On desktop - recalculate position
          // Only setup if we just switched to desktop or if handler doesn't exist
          if (!wasDesktop || !this.scrollHandler) {
            this.$nextTick(() => {
              this.setupTOCSticky();
            });
          }
        }
      }
    },
    setupTOCSticky() {
      // Only setup on desktop
      if (!this.isDesktop) {
        return;
      }

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

        // Reset styles first to ensure clean state
        sidebarElement.style.position = 'absolute';
        sidebarElement.style.top = '0';
        sidebarElement.style.left = '0';
        sidebarElement.style.width = '100%';

        const handleScroll = () => {
          // Double-check we're still on desktop
          if (!this.isDesktop || !sidebarElement || !wrapElement) {
            return;
          }

          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

          // Get accurate positions using getBoundingClientRect
          const wrapRect = wrapElement.getBoundingClientRect();

          // If wrapper is not visible (display: none), don't calculate
          if (wrapRect.width === 0 || wrapRect.height === 0) {
            return;
          }

          const sidebarHeight = sidebarElement.offsetHeight;

          // Calculate the actual top position of the wrapper relative to document
          const sidebarTop = wrapRect.top + scrollTop;

          // Get the markdown content element to calculate the actual end point
          const markdownMain = document.querySelector('.markdown-main');
          let contentBottom = sidebarTop + wrapElement.offsetHeight;

          if (markdownMain) {
            const mainRect = markdownMain.getBoundingClientRect();
            contentBottom = mainRect.bottom + scrollTop;
          }

          // Top spacing when sticky (using CSS variable for consistency)
          const stickyTopOffset = 80; // Space above TOC when sticky
          const stickyTriggerOffset = 100; // How much before wrapper top to start sticking

          // Calculate stop point: when sidebar bottom would align with content bottom
          // The sidebar should stop scrolling when its bottom reaches the content bottom
          const stopPoint = contentBottom - sidebarHeight - stickyTopOffset;

          // Get the wrapper's position to maintain right column alignment
          const wrapLeft = wrapRect.left;
          const wrapWidth = wrapElement.offsetWidth;

          // Make it sticky sooner - trigger when we're still above the wrapper
          if (scrollTop + stickyTriggerOffset < sidebarTop) {
            // Before reaching the sticky trigger point - normal position at top
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = '0';
            sidebarElement.style.left = '0';
            sidebarElement.style.width = '100%';
          } else if (scrollTop < stopPoint) {
            // Between sticky trigger and stop point - stick to top of viewport with spacing
            sidebarElement.style.position = 'fixed';
            sidebarElement.style.top = `${stickyTopOffset}px`;
            sidebarElement.style.left = `${wrapLeft}px`;
            sidebarElement.style.width = `${wrapWidth}px`;
          } else {
            // Past stop point - stick to bottom of wrapper (content has ended)
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = `${wrapElement.offsetHeight - sidebarHeight}px`;
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
    grid-gap: var(--spacing-md);
  }
}

.markdown-layout--no-hero {
  margin-block-start: var(--spacing-xl);
}

.lead-image-container {
  margin-block-start: calc(var(--spacing-md) + var(--spacing-xs));

  @media only screen and (min-width: 768px) {
    margin-block-start: calc(var(--spacing-md) + var(--spacing-xxs));
  }
}

.markdown-layout--no-hero-lead {
  margin-block-start: 0;
}

.markdown-layout--full-width {
  .markdown-main {
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / -1;
    }
  }
}

.markdown-share {
  margin-block-start: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-xs);
  justify-content: flex-end;
  align-items: center;
}

.print-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xxs);
  padding: 0.85rem 1.15rem;

  color: var(--foreground);
  background: var(--background);
  border: var(--border);
  border-radius: 999px;

  box-shadow: var(--shadow-light);
  cursor: pointer;
  user-select: none;
  transition:
    background 0.12s ease,
    border-color 0.12s ease,
    box-shadow 0.12s ease,
    transform 0.06s ease;

  &:hover {
    background: var(--background-darker);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--link) 35%, transparent),
      var(--shadow-light);
  }
}

.print-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 16px;
  block-size: 16px;
  flex: 0 0 16px;
}

.print-button__label {
  font-size: var(--font-400);
  line-height: 1;
  white-space: nowrap;
}

.markdown-main {
  width: 100%;
  grid-column: 1 / -1;

  @media only screen and (min-width: 1201px) {
    grid-column: 2 / 4;
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
    padding-block-start: 0;
    box-sizing: border-box;
  }
}

.content {
  @media only screen and (min-width: 768px) {
    // padding-top: var(--spacing-lg);
  }
}

.section {
  padding-block-end: var(--spacing-lg);
}

#related-writing-section {
  background: transparent !important;
}

.hero-fullscreen-image {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 16 / 9;

  &--lead {
    aspect-ratio: 4 / 3;
    max-height: 50vh;

    @media only screen and (min-width: 768px) {
      aspect-ratio: 21 / 9;
    }
  }
  position: relative;

  :deep(.image-card) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img,
    .filename1,
    .filename2,
    .filename3,
    .bg,
    .bg2 {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: 50% 50%;
    position: absolute;
    top: 0;
    left: 0;

    @media only screen and (min-width: 768px) {
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
}
</style>

<style lang="scss">
// ---- PRESENTER MODE ----
.presenter-mode-body {
  scroll-snap-type: y proximity;

  nav,
  header.site-header,
  footer,
  #wrapper,
  .custom-chat-ui {
    display: none !important;
  }
}

.presenter-mode {
  .toc-sidebar-wrap,
  .markdown-share,
  #related-writing-section,
  #hero-banner {
    display: none !important;
  }

  .markdown-section {
    min-height: 100vh;
    padding-block: var(--spacing-xl);
    scroll-snap-align: start;
  }

  // Desktop only — mobile retains full-width normal layout
  @media only screen and (min-width: 768px) {
    .markdown-layout {
      grid-template-columns: 1fr 9fr 1fr !important;
    }

    .markdown-main {
      zoom: 1.2;
      grid-column: 2 / 3 !important;
    }
  }
}
</style>
