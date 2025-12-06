<template>
  <PageWrapper id="doc" class="markdown-page-wrapper" :overflow-visible="true">
    <!-- v-if="shouldShowHero" -->
    <!-- :tag="heroTag" -->

    <HeroBanner
      style="scroll-snap-align: start"
      :title="heroTitle || 'Document'"
      :subtitle="heroSubtitle || 'No description available'"
      :filename="heroImage"
      :background="false"
      :center="false"
      :breadcrumb="''"
    />
    <div 
      v-if="heroImageSrc"
      class="hero-fullscreen-image"
      style="scroll-snap-align: start"
    >
      <img
        :src="heroImageSrc"
        :alt="heroTitle || 'Hero image'"
        draggable="false"
        class="hero-fullscreen-image__img"
      />
    </div>
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
import { ref, onMounted, inject, watch, nextTick, computed } from "vue";
import router from "@/router";
import frontMatter from "front-matter";
import MarkdownTOC from "@/components/MarkdownTOC.vue";
import HeroBanner from "@/components/HeroBanner/HeroBanner.vue";
import TextStats from "@/components/card/TextStats.vue";
import GridContainer from "@/components/grid/GridContainer.vue";
import fallbackImage from "@/assets/images/placeholder.png";

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
console.log("MarkdownPage: Pre-loaded images map. Total images:", Object.keys(imageMap).length);
console.log("MarkdownPage: Sample image keys:", Object.keys(imageMap).slice(0, 30));
console.log("MarkdownPage: Looking for 'article/without-tokens.png':", !!imageMap['article/without-tokens.png']);
console.log("MarkdownPage: Looking for 'casestudy/genie/genie.png':", !!imageMap['casestudy/genie/genie.png']);

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
    const heroSubtitle = ref("");
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

      if (!markdown || typeof markdown !== "string") {
        console.warn("extractHeroData: Invalid markdown input");
        return { title, tag, image };
      }

      // First, try to extract from header block (old format)
      // Format: <header>\n\n# Title\n\nTag text\n\n</header>
      // Note: markdown-loader may convert to HTML, so check for both markdown and HTML
      const headerMatch = markdown.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
      console.log("extractHeroData: Header match result:", headerMatch ? "FOUND" : "NOT FOUND");
      console.log("extractHeroData: Markdown length:", markdown.length);
      console.log("extractHeroData: Markdown has <header>:", markdown.includes('<header>'));
      if (headerMatch && headerMatch[1]) {
        const headerContent = headerMatch[1];
        console.log("extractHeroData: Header content length:", headerContent.length);
        console.log("extractHeroData: Header content found:", JSON.stringify(headerContent.substring(0, 200)));
        
        // Check if content is HTML (from markdown-loader) or raw markdown
        // Also check for HTML entities and processed markdown patterns
        const isHTML = headerContent.includes('<h1>') || 
                      headerContent.includes('<h4>') || 
                      headerContent.includes('<p>') ||
                      headerContent.includes('&nbsp;') ||
                      (headerContent.includes('#') && !headerContent.match(/^#\s+/m)); // Has # but not at start of line (might be in HTML)
        console.log("Header content is HTML:", isHTML);
        console.log("Header content sample:", JSON.stringify(headerContent.substring(0, 150)));
        
        // Extract h1 title - handle both markdown (# Title) and HTML (<h1>Title</h1>)
        try {
          let h1Match = null;
          if (isHTML) {
            // Extract from HTML
            console.log("extractHeroData: Extracting from HTML content");
            // Try multiple HTML patterns
            h1Match = headerContent.match(/<h1[^>]*>(.*?)<\/h1>/i) ||
                     headerContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
            console.log("extractHeroData: H1 HTML match:", h1Match);
            
            if (h1Match && h1Match[1]) {
              title = h1Match[1].trim();
              // Strip any nested HTML tags
              title = title.replace(/<[^>]+>/g, '');
              // Decode HTML entities (including numeric entities like &#39;)
              const tempDivTitle = document.createElement('div');
              tempDivTitle.innerHTML = title;
              title = tempDivTitle.textContent || tempDivTitle.innerText || title;
              // Clean up newlines and extra whitespace
              title = title.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
              console.log("Title extracted from HTML:", title);
            } else {
              console.warn("extractHeroData: No <h1> tag found in HTML content");
              // Fallback: try to find any text that looks like a title
              const textMatch = headerContent.match(/>([^<]+)</);
              if (textMatch && textMatch[1]) {
                title = textMatch[1].trim();
                title = title.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
                console.log("Title extracted from HTML (fallback):", title);
              }
            }
          } else {
            // Extract from markdown
            // Match h1 - must be # followed by space, then text (not another #)
            // Pattern: # followed by space, then one or more non-# characters
            h1Match = headerContent.match(/^#\s+([^#\n][^\n]*?)(?:\n|$)/m);
            console.log("extractHeroData: H1 match (markdown, pattern 1):", h1Match);
            
            // Fallback: try without requiring it to be at start of line, but still exclude "# #"
            if (!h1Match || !h1Match[1]) {
              // Match # space, but the next character must not be # or space
              h1Match = headerContent.match(/#\s+([^#\s\n][^\n]*?)(?:\n|$)/);
              console.log("extractHeroData: H1 match (markdown, pattern 2):", h1Match);
            }
            
            if (h1Match && h1Match[1]) {
              title = h1Match[1].trim();
              // Don't include the hash in the title - if it starts with #, remove it
              if (title.startsWith('#')) {
                title = title.replace(/^#+\s*/, '').trim();
              }
              // Clean up newlines and extra whitespace (in case markdown has them)
              title = title.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
              console.log("Title extracted from markdown:", title);
            } else {
              console.warn("extractHeroData: No h1 match found in markdown header content");
            }
          }
          
          if (!title) {
            console.warn("No H1 title found in header content:", headerContent.substring(0, 100));
            // Fallback: try to find any h1 in the header content (markdown or HTML)
            const fallbackMatch = headerContent.match(/#\s+(.+)/) || headerContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
            if (fallbackMatch && fallbackMatch[1]) {
              title = fallbackMatch[1].trim().replace(/<[^>]+>/g, '');
              // Clean up newlines and extra whitespace
              title = title.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
              console.log("Title extracted (fallback):", title);
            }
          }
          
          // Always clean up title to remove any HTML entities or special characters
          if (title) {
            // Decode HTML entities (including numeric entities like &#39;)
            const tempDivTitle = document.createElement('div');
            tempDivTitle.innerHTML = title;
            title = tempDivTitle.textContent || tempDivTitle.innerText || title;
            title = title.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
          }
        } catch (error) {
          console.error("Error extracting title:", error);
          title = "";
        }
        // Extract tag (text after h1, before closing header)
        // Handle both HTML and markdown formats
        try {
          if (isHTML) {
            // Extract from HTML - look for h4 or h5 tags (the #### tag line)
            // Try h4 first, then h5, then any heading after h1
            // Use multiline flag and handle whitespace/newlines
            const h4Match = headerContent.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i) || 
                           headerContent.match(/<h5[^>]*>([\s\S]*?)<\/h5>/i) ||
                           headerContent.match(/<h[23456][^>]*>([\s\S]*?)<\/h[23456]>/i);
            if (h4Match && h4Match[1]) {
              tag = h4Match[1].trim();
              // Strip any nested HTML tags
              tag = tag.replace(/<[^>]+>/g, '');
              // Decode HTML entities (including numeric entities like &#39;)
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = tag;
              tag = tempDiv.textContent || tempDiv.innerText || tag;
              // Clean up newlines and extra whitespace
              tag = tag.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
              console.log("Tag extracted from HTML:", tag);
            } else {
              // Fallback: get text between h1 and closing header, strip HTML
              const afterH1 = headerContent.replace(/<h1[^>]*>.*?<\/h1>/i, '');
              tag = afterH1.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
              // Decode HTML entities (including numeric entities like &#39;)
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = tag;
              tag = tempDiv.textContent || tempDiv.innerText || tag;
              tag = tag.replace(/\s+/g, ' ').trim();
              console.log("Tag extracted from HTML (fallback):", tag);
            }
          } else {
            // Extract from markdown - look for #### or ##### lines (h4/h5)
            console.log("extractHeroData: Looking for h4/h5 in header content");
            const lines = headerContent.split('\n');
            console.log("extractHeroData: Header content lines:", lines.slice(0, 10).map((l, i) => `${i}: ${JSON.stringify(l)}`));
            
            // Strategy: Find h1 first, then look for h4/h5 after it
            let h1LineIndex = -1;
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].match(/^#\s+/)) {
                h1LineIndex = i;
                console.log(`extractHeroData: H1 found at line ${i}: ${JSON.stringify(lines[i])}`);
                break;
              }
            }
            
            // Now look for h4/h5 after the h1
            let h4MarkdownMatch = null;
            if (h1LineIndex >= 0) {
              // Look at lines after h1 (skip empty lines)
              for (let i = h1LineIndex + 1; i < lines.length; i++) {
                const line = lines[i];
                // Check both trimmed and untrimmed versions
                const trimmedLine = line.trim();
                if (trimmedLine) {
                  // Check if this line is h4 or h5 (with or without leading whitespace)
                  const h4Match = trimmedLine.match(/^####\s+(.+)$/) || 
                                  trimmedLine.match(/^#####\s+(.+)$/) ||
                                  line.match(/^\s*####\s+(.+)$/) ||
                                  line.match(/^\s*#####\s+(.+)$/);
                  if (h4Match && h4Match[1]) {
                    h4MarkdownMatch = h4Match;
                    console.log(`extractHeroData: H4 found at line ${i} after H1: ${JSON.stringify(line)}`);
                    break;
                  }
                }
              }
            }
            
            // Fallback: Try regex patterns if line-by-line didn't work
            if (!h4MarkdownMatch) {
              // Pattern 1: Exact 4 hashes at start of line (with optional leading whitespace)
              h4MarkdownMatch = headerContent.match(/^\s*####\s+(.+?)(?:\n|$)/m);
              console.log("extractHeroData: Pattern 1 (^####):", h4MarkdownMatch);
              
              // Pattern 2: Exact 5 hashes at start of line (with optional leading whitespace)
              if (!h4MarkdownMatch) {
                h4MarkdownMatch = headerContent.match(/^\s*#####\s+(.+?)(?:\n|$)/m);
                console.log("extractHeroData: Pattern 2 (^#####):", h4MarkdownMatch);
              }
              
              // Pattern 3: #### anywhere (not just start of line, but must be followed by space and text)
              if (!h4MarkdownMatch) {
                h4MarkdownMatch = headerContent.match(/####\s+([^\n]+)/);
                console.log("extractHeroData: Pattern 3 (#### anywhere):", h4MarkdownMatch);
              }
              
              // Pattern 4: ##### anywhere
              if (!h4MarkdownMatch) {
                h4MarkdownMatch = headerContent.match(/#####\s+([^\n]+)/);
                console.log("extractHeroData: Pattern 4 (##### anywhere):", h4MarkdownMatch);
              }
            }
            
            if (h4MarkdownMatch && h4MarkdownMatch[1]) {
              tag = h4MarkdownMatch[1].trim();
              // Clean up newlines and extra whitespace
              tag = tag.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
              console.log("Tag extracted from markdown (direct h4/h5 match):", tag);
            } else {
              // Fallback: get lines after h1
              const lines = headerContent.split('\n');
              console.log("extractHeroData: All lines in header:", lines.map((l, i) => `${i}: ${JSON.stringify(l)}`));
              
              let h1Found = false;
              const afterH1Lines = [];
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (h1Found) {
                  afterH1Lines.push(line);
                } else if (line.match(/^#\s+/)) {
                  h1Found = true;
                  console.log(`extractHeroData: H1 found at line ${i}: ${JSON.stringify(line)}`);
                  // Also check if the next non-empty line is h4 (keep searching, don't stop at first non-empty line)
                  for (let j = i + 1; j < lines.length; j++) {
                    const nextLine = lines[j].trim();
                    if (nextLine) {
                      console.log(`extractHeroData: Next non-empty line ${j}: ${JSON.stringify(nextLine)}`);
                      // Check for h4 or h5 (with or without leading whitespace)
                      const h4Match = nextLine.match(/^\s*####\s+(.+)$/) || nextLine.match(/^\s*#####\s+(.+)$/);
                      if (h4Match && h4Match[1]) {
                        // Found h4 right after h1
                        tag = h4Match[1].trim();
                        tag = tag.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
                        console.log("Tag extracted from markdown (h4 right after h1):", tag);
                        break;
                      }
                      // Don't break here - continue searching for h4/h5 even if this line isn't one
                      // Only break if we've checked several lines and found nothing
                      if (j > i + 5) {
                        break; // Stop after checking a few lines
                      }
                    }
                  }
                }
              }
              
              // Only use afterH1Lines if we didn't already extract tag
              if (!tag) {
                // Remove empty lines and get the tag text, stripping markdown heading syntax
                tag = afterH1Lines
                  .filter(line => line.trim())
                  .map(line => line.replace(/^#+\s+/, '').trim()) // Strip markdown heading syntax
                  .join(' ')
                  .replace(/\s+/g, ' ') // Clean up multiple spaces
                  .trim();
                console.log("Tag extracted from markdown (after h1 lines):", tag);
              }
            }
          }
          
          // Final fallback: if still no tag, try to find any #### line in header (anywhere, not just start of line)
          // Try both HTML and markdown patterns as a last resort
          if (!tag) {
            // First try markdown pattern (even if we thought it was HTML)
            const anyH4Match = headerContent.match(/####\s+([^\n]+)/) || 
                              headerContent.match(/#####\s+([^\n]+)/) ||
                              // Also try to find any line with 4+ hashes that's not h1 (h2-h6)
                              headerContent.match(/^\s*#{2,6}\s+([^\n]+)$/m);
            if (anyH4Match && anyH4Match[1]) {
              tag = anyH4Match[1].trim();
              // Clean up newlines and extra whitespace
              tag = tag.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
              console.log("Tag extracted (final fallback - markdown pattern):", tag);
            } else {
              // Try HTML pattern as well (even if we thought it was markdown)
              const htmlH4Match = headerContent.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i) || 
                                 headerContent.match(/<h5[^>]*>([\s\S]*?)<\/h5>/i);
              if (htmlH4Match && htmlH4Match[1]) {
                tag = htmlH4Match[1].trim();
                // Strip any nested HTML tags
                tag = tag.replace(/<[^>]+>/g, '');
                // Decode HTML entities
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = tag;
                tag = tempDiv.textContent || tempDiv.innerText || tag;
                tag = tag.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
                console.log("Tag extracted (final fallback - HTML pattern):", tag);
              }
            }
          }
          
          // Debug: log what we found
          console.log("extractHeroData: Final tag value:", tag);
          console.log("extractHeroData: Tag length:", tag.length);
          
          // Always clean up the tag to remove newlines and normalize whitespace
          if (tag) {
            tag = tag.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
          }
        } catch (error) {
          console.warn("Error extracting tag:", error);
          tag = "";
        }
      } else {
        // New format: # Title at the very start (doc_32 format) or after front matter (doc_34 format)
        // Remove front matter (--- blocks) and HTML comments first
        let cleanStart = markdown
          .replace(/^---[\s\S]*?---\s*\n?/m, '') // Remove front matter
          .replace(/^<!--[\s\S]*?-->\s*\n?/gm, '') // Remove HTML comments
          .trim();
        
        console.log("No header tag found, trying to extract from content. Clean start:", cleanStart.substring(0, 200));
        
        // Match h1 at start of line (with optional whitespace before)
        const h1Match = cleanStart.match(/^#\s+(.+)$/m);
        if (h1Match) {
          title = h1Match[1].trim();
          console.log("Title extracted from content (no header tag):", title);
          // Look for tag/subtitle after title (next non-empty line before image or next heading)
          const afterTitle = cleanStart.substring(cleanStart.indexOf(h1Match[0]) + h1Match[0].length);
          const beforeImage = afterTitle.split(/!\[/)[0];
          const beforeNextHeading = beforeImage.split(/^##/m)[0]; // Stop at next h2
          const tagLines = beforeNextHeading.split('\n')
            .map(line => line.trim())
            .filter(line => {
              return line && 
                     !line.startsWith('<!--') && 
                     !line.startsWith('#') && 
                     !line.startsWith('![') &&
                     !line.startsWith('---');
            });
          if (tagLines.length > 0) {
            tag = tagLines[0].trim(); // Take first non-empty line as tag/subtitle
            console.log("Tag/subtitle extracted from content:", tag);
          }
        } else {
          // Fallback: try to find any h1 in the document
          const anyH1Match = markdown.match(/^#\s+(.+?)(?:\n|$)/m);
          if (anyH1Match) {
            title = anyH1Match[1].trim();
            console.log("Title extracted (fallback):", title);
          }
        }
      }

      // Extract first image (skip images in HTML comments)
      // Priority: images inside header tags first, then first image after header
      let headerImage = "";
      let fallbackImage = "";
      let headerClosedAtLine = -1;
      
      console.log("extractHeroData: ========== STARTING IMAGE EXTRACTION ==========");
      const lines = markdown.split('\n');
      let insideHeader = false;
      
      console.log("extractHeroData: Total lines to process:", lines.length);
      console.log("extractHeroData: First 10 lines:", lines.slice(0, 10).map((l, i) => `${i}: ${JSON.stringify(l)}`));
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Track if we're inside header tags (case-insensitive)
        if (line.toLowerCase().includes('<header')) {
          insideHeader = true;
          console.log(`extractHeroData: Entered header at line ${i}:`, JSON.stringify(line));
        }
        if (line.toLowerCase().includes('</header>')) {
          console.log(`extractHeroData: Exited header at line ${i}:`, JSON.stringify(line));
          headerClosedAtLine = i;
          insideHeader = false;
        }
        
        const imageMatch = line.match(/!\[[^\]]*\]\(([^)]+)\)/);
        if (imageMatch) {
          console.log(`extractHeroData: Found image match at line ${i} (0-indexed):`, imageMatch[1]);
          console.log(`extractHeroData: Line content:`, JSON.stringify(line));
          console.log(`extractHeroData: Currently insideHeader:`, insideHeader);
          console.log(`extractHeroData: Header closed at line (0-indexed):`, headerClosedAtLine);
          
          // Check if this line is in a comment
          let inComment = false;
          for (let j = i - 1; j >= 0; j--) {
            if (lines[j].includes('-->')) break;
            if (lines[j].includes('<!--')) {
              inComment = true;
              break;
            }
          }
          
          if (inComment) {
            console.log(`extractHeroData: Image at line ${i} is in a comment, skipping`);
            continue;
          }
          
          const imagePath = imageMatch[1];
          console.log(`extractHeroData: Processing image path:`, imagePath);
          
          // Convert relative path to asset path
          let processedPath = imagePath;
          if (processedPath.startsWith('../images/')) {
            processedPath = processedPath.replace('../images/', '');
            console.log(`extractHeroData: Removed ../images/ prefix, result:`, processedPath);
          } else if (processedPath.startsWith('/images/')) {
            processedPath = processedPath.replace('/images/', '');
            console.log(`extractHeroData: Removed /images/ prefix, result:`, processedPath);
          } else if (processedPath.startsWith('./images/')) {
            processedPath = processedPath.replace('./images/', '');
            console.log(`extractHeroData: Removed ./images/ prefix, result:`, processedPath);
          }
          
          // Check if image is inside header OR right after header closes (within 5 lines)
          const isRightAfterHeader = headerClosedAtLine >= 0 && i > headerClosedAtLine && i <= headerClosedAtLine + 5;
          console.log(`extractHeroData: isRightAfterHeader calculation:`, {
            headerClosedAtLine,
            currentLine: i,
            condition1: headerClosedAtLine >= 0,
            condition2: i > headerClosedAtLine,
            condition3: i <= headerClosedAtLine + 5,
            result: isRightAfterHeader
          });
          
          // Priority: header image > image right after header > first image anywhere
          if (insideHeader && !headerImage) {
            headerImage = processedPath;
            console.log("extractHeroData: ✓✓✓ IMAGE FOUND IN HEADER ✓✓✓");
            console.log("extractHeroData: Original path:", imagePath);
            console.log("extractHeroData: Processed path:", processedPath);
            console.log("extractHeroData: Header image set to:", headerImage);
            // Stop searching once we find image in header
            break;
          } else if (isRightAfterHeader && !headerImage) {
            headerImage = processedPath;
            console.log("extractHeroData: ✓✓✓ IMAGE FOUND RIGHT AFTER HEADER ✓✓✓");
            console.log("extractHeroData: Line number:", i, "Header closed at:", headerClosedAtLine);
            console.log("extractHeroData: Original path:", imagePath);
            console.log("extractHeroData: Processed path:", processedPath);
            console.log("extractHeroData: Header image set to:", headerImage);
            // Stop searching once we find image right after header
            break;
          } else if (!fallbackImage) {
            // Store first image as fallback (will be used if no header image found)
            fallbackImage = processedPath;
            console.log("extractHeroData: Image found (stored as fallback):", fallbackImage);
            console.log("extractHeroData: Will continue searching for header image...");
            // Don't break here - continue looking for header image
          }
        }
      }
      
      console.log("extractHeroData: ========== IMAGE EXTRACTION COMPLETE ==========");
      
      // Use header image if found, otherwise use first fallback image
      // This ensures we always use the first image for the hero if available
      image = headerImage || fallbackImage;
      console.log("extractHeroData: Final extracted image path:", image);
      console.log("extractHeroData: Header image was:", headerImage);
      console.log("extractHeroData: Fallback image was:", fallbackImage);
      console.log("extractHeroData: Using image:", image);
      console.log("extractHeroData: Image type:", typeof image);
      console.log("extractHeroData: Image length:", image ? image.length : 0);
      
      if (image) {
        console.log("extractHeroData: ✓✓✓ Image will be used for hero:", image);
      } else {
        console.log("extractHeroData: ✗✗✗ No image found for hero");
      }

      return { title, tag, image };
    };

    const removeHeaderAndFirstImage = (markdown) => {
      if (!markdown || typeof markdown !== 'string') {
        return '';
      }
      
      let processed = markdown;
      
      // Check if content is HTML (from markdown-loader) or raw markdown
      const isHTML = processed.includes('<h1>') || processed.includes('<p>') || processed.includes('<div>');
      
      if (isHTML) {
        // Handle HTML content
        // First, extract and remember which image was in the header (if any)
        let headerImageSrc = null;
        const headerBlockMatch = processed.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
        if (headerBlockMatch && headerBlockMatch[1]) {
          const headerContent = headerBlockMatch[1];
          // Try to find image in header content (both markdown and HTML formats)
          const headerImageMatch = headerContent.match(/!\[[^\]]*\]\(([^)]+)\)/) ||
                                  headerContent.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i) ||
                                  headerContent.match(/<img[^>]+src=([^\s>]+)/i);
          if (headerImageMatch) {
            headerImageSrc = headerImageMatch[1].replace(/["']/g, '');
            console.log("removeHeaderAndFirstImage: Found image in header (HTML):", headerImageSrc);
          }
        }
        
        // Remove <header> block if it exists
        // This already removes any images inside the header
        processed = processed.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
        
        // Remove first <h1> if it's at the start (from header extraction)
        // But be careful - only remove if it's likely from the header, not article content
        // Check if there's a <header> tag first - if we removed it, the h1 after is likely from header
        if (!markdown.includes('<header>') || markdown.match(/<header[^>]*>[\s\S]*?<h1/i)) {
          // Remove first h1 and any h4/h5 immediately after (the tag line)
          processed = processed.replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '');
          processed = processed.replace(/^\s*<h[45][^>]*>.*?<\/h[45]>\s*/i, '');
        }
        
        // Only remove the first image if it matches the one that was in the header
        // This prevents removing images that should be in the content
        if (headerImageSrc) {
          // Try to match the header image and remove it
          const imageRegex = new RegExp(`<img[^>]+src=["']?${headerImageSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?[^>]*>`, 'i');
          processed = processed.replace(imageRegex, '');
          // Also try wrapped in <p> tags
          processed = processed.replace(new RegExp(`<p>\\s*<img[^>]+src=["']?${headerImageSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?[^>]*>\\s*</p>`, 'i'), '');
          console.log("removeHeaderAndFirstImage: Removed header image from content (HTML)");
        }
        // If no header image was found, don't remove any images - they should all stay in content
      } else {
        // Handle raw markdown
        // First, extract and remember which image was in the header (if any)
        // so we can remove it specifically, not just any first image
        let headerImagePath = null;
        const headerBlockMatch = processed.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
        if (headerBlockMatch && headerBlockMatch[1]) {
          const headerContent = headerBlockMatch[1];
          // Try to find image in header content
          const headerImageMatch = headerContent.match(/!\[[^\]]*\]\(([^)]+)\)/);
          if (headerImageMatch) {
            headerImagePath = headerImageMatch[1];
            console.log("removeHeaderAndFirstImage: Found image in header:", headerImagePath);
          }
        }
        
        // Remove header block (including h1 and tag) - old format
        // This already removes any images inside the header
        processed = processed.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
        
        // Remove leading HTML comments
        processed = processed.replace(/^<!--[\s\S]*?-->\s*\n?/gm, '');
        
        // Remove first h1 title (new format - doc_32 style)
        // Only if it's at the very start (after comments removed)
        processed = processed.replace(/^#\s+.+?\n+/m, '');
        
        // Remove the first image if it matches the one that was in the header
        // OR if there was no header image, remove the first image right after header (within 5 lines)
        const lines = processed.split('\n');
        
        if (headerImagePath) {
          // Remove the specific header image
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const imageMatch = line.match(/!\[[^\]]*\]\(([^)]+)\)/);
            if (imageMatch && imageMatch[1] === headerImagePath) {
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
                // Remove this specific image line (the one from header)
                lines.splice(i, 1);
                console.log("removeHeaderAndFirstImage: Removed header image from content");
                break;
              }
            }
          }
        } else {
          // No image in header - check if first image is right after header (within 5 lines)
          // Find where header would have been (look for empty lines or h1 that was removed)
          let headerEndIndex = -1;
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Header was already removed, so look for first non-empty line or h2 as marker
            if (line && !line.startsWith('<!--') && !line.startsWith('#')) {
              headerEndIndex = i;
              break;
            }
          }
          
          // Remove first image if it's within 5 lines of where header ended
          if (headerEndIndex >= 0) {
            for (let i = headerEndIndex; i < Math.min(headerEndIndex + 5, lines.length); i++) {
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
                  // Remove this image (it's the hero image)
                  lines.splice(i, 1);
                  console.log("removeHeaderAndFirstImage: Removed first image after header (hero image)");
                  break;
                }
              }
            }
          }
        }
        
        processed = lines.join('\n');
      }
      
      // Remove any leading empty lines
      processed = processed.replace(/^\s*\n+/m, '');
      
      return processed;
    };

    const loadMarkdownContent = async (docId) => {
      try {
        // Reset values at start
        heroTitle.value = "";
        heroTag.value = "";
        heroSubtitle.value = "";
        heroImage.value = "";
        
        // Import markdown - webpack markdown-loader converts to HTML
        // We need to fetch the raw file for extraction, but use processed for rendering
        let rawMarkdown = '';
        let processedMarkdownForRender = '';
        
        try {
          // Try to get raw markdown first (for extraction)
          try {
            const rawModule = await import(`../assets/content/doc_${docId}.md?raw`);
            rawMarkdown = typeof rawModule.default === 'string' ? rawModule.default : (rawModule.default?.default || '');
          } catch (e) {
            console.log("MarkdownPage: ?raw import not available, using regular import");
          }
          
          // Always get the processed version for rendering
          const module = await import(`../assets/content/doc_${docId}.md`);
          processedMarkdownForRender = typeof module.default === 'string' ? module.default : (module.default?.default || '');
          
          // If we don't have raw, try to use processed (might be HTML or markdown)
          if (!rawMarkdown && processedMarkdownForRender) {
            // Check if it's HTML (from markdown-loader) or raw markdown
            if (processedMarkdownForRender.includes('<h1>') || processedMarkdownForRender.includes('<p>')) {
              console.warn("MarkdownPage: Content is HTML. Extraction may not work correctly.");
              // For HTML, we can still try to extract, but we'll use it for rendering too
              rawMarkdown = processedMarkdownForRender;
            } else {
              // It's raw markdown, use it for both
              rawMarkdown = processedMarkdownForRender;
            }
          }
        } catch (error) {
          console.error("MarkdownPage: Error importing markdown:", error);
          rawMarkdown = '';
          processedMarkdownForRender = '';
        }
        
        const { attributes } = frontMatter(rawMarkdown);
        console.log("MarkdownPage: Doc ID:", docId);
        console.log("MarkdownPage: Raw markdown type:", typeof rawMarkdown);
        console.log("MarkdownPage: Raw markdown length:", rawMarkdown.length);
        console.log("MarkdownPage: Processed markdown length:", processedMarkdownForRender.length);
        console.log("MarkdownPage: Has <header> tag:", rawMarkdown.includes('<header>'));
        console.log("MarkdownPage: Has # markdown:", rawMarkdown.includes('# '));
        console.log("MarkdownPage: Is HTML:", processedMarkdownForRender.includes('<h1>') || processedMarkdownForRender.includes('<p>'));
        console.log("MarkdownPage: Attributes:", attributes);
        console.log("MarkdownPage: Raw markdown preview:", rawMarkdown.substring(0, 200));
        console.log("MarkdownPage: Processed markdown preview:", processedMarkdownForRender.substring(0, 200));
        pageData.value = attributes;
        markdownContent.value = rawMarkdown;
        
        // Store processed markdown for rendering (use raw if processed isn't available)
        const markdownForProcessing = processedMarkdownForRender || rawMarkdown;
        
        // Extract hero data - try raw markdown first, then processed if needed
        let heroData;
        try {
          console.log("MarkdownPage: About to extract hero data");
          console.log("MarkdownPage: rawMarkdown length:", rawMarkdown.length);
          console.log("MarkdownPage: rawMarkdown has header:", rawMarkdown.includes('<header>'));
          console.log("MarkdownPage: processedMarkdownForRender length:", processedMarkdownForRender.length);
          console.log("MarkdownPage: processedMarkdownForRender has header:", processedMarkdownForRender.includes('<header>'));
          
          // Try raw markdown first
          let markdownToExtract = rawMarkdown;
          if (!markdownToExtract || markdownToExtract.length === 0) {
            console.log("MarkdownPage: rawMarkdown is empty, using processedMarkdownForRender");
            markdownToExtract = processedMarkdownForRender;
          }
          
          heroData = extractHeroData(markdownToExtract);
          console.log("MarkdownPage: Extracted hero data:", heroData);
          console.log("MarkdownPage: Hero data title:", heroData?.title);
          console.log("MarkdownPage: Hero data tag:", heroData?.tag);
          console.log("MarkdownPage: Hero data image:", heroData?.image);
          console.log("MarkdownPage: Hero data tag length:", heroData?.tag?.length || 0);
          console.log("MarkdownPage: Hero data image length:", heroData?.image?.length || 0);
          console.log("MarkdownPage: Hero data title type:", typeof heroData?.title);
          console.log("MarkdownPage: Hero data title truthy:", !!heroData?.title);
          console.log("MarkdownPage: Hero data title length:", heroData?.title?.length || 0);
        } catch (error) {
          console.error("MarkdownPage: Error extracting hero data:", error);
          console.error("MarkdownPage: Error stack:", error.stack);
          heroData = { title: "", tag: "", image: "" };
        }
        
        // Extract values from header tag (ignore front matter since it's rendered on page)
        // Clean up title - remove HTML tags, newlines, and normalize whitespace
        let newTitle = (heroData?.title || "").toString().trim();
        newTitle = newTitle.replace(/<[^>]+>/g, ''); // Remove HTML tags
        // Decode HTML entities (including numeric entities like &#39;)
        const tempDivTitle = document.createElement('div');
        tempDivTitle.innerHTML = newTitle;
        newTitle = tempDivTitle.textContent || tempDivTitle.innerText || newTitle;
        newTitle = newTitle.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
        
        // Clean up tag/subtitle - remove HTML tags, newlines, and normalize whitespace
        let newTag = (heroData?.tag || "").toString().trim();
        newTag = newTag.replace(/<[^>]+>/g, ''); // Remove HTML tags
        // Decode HTML entities (including numeric entities like &#39;)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newTag;
        newTag = tempDiv.textContent || tempDiv.innerText || newTag;
        newTag = newTag.replace(/\n+/g, ' ').replace(/\r+/g, ' ').replace(/\s+/g, ' ').trim();
        
        const newSubtitle = newTag; // Map tag to subtitle for the banner
        const newImage = (heroData?.image || "").toString().trim();
        
        console.log("MarkdownPage: Before setting values:", {
          newTitle,
          newTag,
          newSubtitle,
          newImage,
          newImageLength: newImage.length,
          newTagLength: newTag.length,
          newSubtitleLength: newSubtitle.length
        });
        
        // Set hero values from extracted header data
        heroTitle.value = newTitle;
        heroTag.value = newTag;
        heroSubtitle.value = newSubtitle;
        heroImage.value = newImage;
        
        console.log("MarkdownPage: ========== IMAGE EXTRACTION SUMMARY ==========");
        console.log("MarkdownPage: heroImage.value set to:", JSON.stringify(heroImage.value));
        console.log("MarkdownPage: heroImage.value type:", typeof heroImage.value);
        console.log("MarkdownPage: heroImage.value truthy:", !!heroImage.value);
        console.log("MarkdownPage: heroImage.value length:", heroImage.value.length);
        console.log("MarkdownPage: heroImage.value trimmed:", JSON.stringify(heroImage.value.trim()));
        console.log("MarkdownPage: Expected path format: article/without-tokens.png or casestudy/genie/genie.png");
        console.log("MarkdownPage: Will this path be in imageMap?", {
          direct: !!imageMap[heroImage.value.trim()],
          withDot: !!imageMap[`./${heroImage.value.trim()}`],
          sampleKeys: Object.keys(imageMap).filter(k => k.includes('article') || k.includes('genie')).slice(0, 5)
        });
        console.log("MarkdownPage: ==============================================");
        
        console.log("MarkdownPage: Hero values set:", {
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
          shouldShow: !!(heroTitle.value || heroImage.value)
        });
        
        // Force reactivity update
        await nextTick();
        console.log("MarkdownPage: After nextTick - heroTitle:", heroTitle.value, "heroImage:", heroImage.value);
        
        // Extract stats from front matter if available
        statsLabel1.value = attributes.statsLabel1 || "";
        statsValue1.value = attributes.statsValue1 || "";
        statsLabel2.value = attributes.statsLabel2 || "";
        statsValue2.value = attributes.statsValue2 || "";
        statsLabel3.value = attributes.statsLabel3 || "";
        statsValue3.value = attributes.statsValue3 || "";
        
        // Remove header and first image from markdown
        // Use the markdown that will be rendered (might be HTML or markdown)
        processedMarkdown.value = removeHeaderAndFirstImage(markdownForProcessing);
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
        // Reset hero values before loading new content
        heroTitle.value = "";
        heroTag.value = "";
        heroSubtitle.value = "";
        heroImage.value = "";
        headings.value = [];
        activeHeading.value = null;
        const docId = parseInt(newId);
        loadMarkdownContent(docId);
        window.scrollTo(0, 0);
      }
    });

    // Computed to ensure reactivity for hero banner display
    const shouldShowHero = computed(() => {
      const hasTitle = heroTitle.value && heroTitle.value.trim().length > 0;
      const hasImage = heroImage.value && heroImage.value.trim().length > 0;
      const result = hasTitle || hasImage;
      console.log("shouldShowHero computed:", { hasTitle, hasImage, result, heroTitle: heroTitle.value, heroImage: heroImage.value });
      return result;
    });

    // Computed property for hero image source
    const heroImageSrc = computed(() => {
      if (!heroImage.value) {
        console.log("heroImageSrc: No heroImage value");
        return null;
      }
      
      const imagePath = heroImage.value.trim();
      console.log("heroImageSrc: Original image path from extraction:", imagePath);
      
      // Clean up the path - remove any leading/trailing slashes and normalize
      // The extraction already removes ../images/ prefix, so we should have clean path like "casestudy/genie/genie.png"
      let cleanPath = imagePath;
      
      // Remove any remaining image path prefixes (in case extraction didn't catch them)
      cleanPath = cleanPath.replace(/^(images\/|\.\/images\/|\/images\/|\.\.\/images\/|assets\/images\/)/, '');
      // Remove any leading/trailing slashes
      cleanPath = cleanPath.replace(/^\/+|\/+$/g, '');
      
      console.log("heroImageSrc: Cleaned path:", cleanPath);
      console.log("heroImageSrc: Looking up in imageMap...");
      console.log("heroImageSrc: Total images in map:", Object.keys(imageMap).length);
      
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
      
      console.log("heroImageSrc: Trying lookup keys:", lookupKeys);
      
      for (const lookupKey of lookupKeys) {
        const normalized = lookupKey.replace(/^\.\//, '').replace(/^\/+|\/+$/g, '');
        console.log(`heroImageSrc: Checking key: "${normalized}"`, imageMap[normalized] ? '✓ FOUND' : '✗ not found');
        if (imageMap[normalized]) {
          console.log("heroImageSrc: ✓✓✓ SUCCESS! Found image with key:", normalized);
          return imageMap[normalized];
        }
      }
      
      // Debug: show some actual keys from the map for comparison
      const sampleKeys = Object.keys(imageMap).filter(k => 
        k.includes('without-tokens') || 
        k.includes('genie.png') || 
        k.includes('article') || 
        k.includes('casestudy')
      );
      console.log("heroImageSrc: Relevant keys in map:", sampleKeys);
      
      // Fallback: try require() as last resort (might work for some cases)
      try {
        const imageSrc = require(`../assets/images/${cleanPath}`);
        console.log("heroImageSrc: ✓ Found image with require():", cleanPath);
        return imageSrc;
      } catch (error) {
        console.warn("heroImageSrc: require() also failed:", error.message);
      }
      
      console.error("heroImageSrc: ✗ All lookup attempts failed for:", imagePath);
      console.error("heroImageSrc: Cleaned path was:", cleanPath);
      console.error("heroImageSrc: Tried lookup keys:", lookupKeys);
      console.error("heroImageSrc: Returning fallback image");
      
      // Return fallback image if main image fails to load
      return fallbackImage;
    });

    // Fallback image source (always available)
    const fallbackImageSrc = computed(() => {
      return fallbackImage;
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
      heroSubtitle,
      heroImage,
      heroImageSrc,
      fallbackImageSrc,
      shouldShowHero,
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
          
          // Get accurate positions using getBoundingClientRect
          const wrapRect = wrapElement.getBoundingClientRect();
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
          
          // Calculate stop point: when sidebar bottom would align with content bottom
          // The sidebar should stop scrolling when its bottom reaches the content bottom
          const stopPoint = contentBottom - sidebarHeight - 20; // 20px for top padding
          
          // Get the wrapper's position to maintain right column alignment
          const wrapLeft = wrapRect.left;
          const wrapWidth = wrapElement.offsetWidth;

          if (scrollTop + 20 < sidebarTop) {
            // Before reaching the wrapper top - normal position at top
            sidebarElement.style.position = 'absolute';
            sidebarElement.style.top = '0';
            sidebarElement.style.left = '0';
            sidebarElement.style.width = '100%';
          } else if (scrollTop < stopPoint) {
            // Between wrapper top and stop point - stick to top of viewport
            sidebarElement.style.position = 'fixed';
            sidebarElement.style.top = '20px';
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

.hero-fullscreen-image {
  width: 100%;
  display: block;
  overflow: hidden;
  margin: 0;
  padding: 0;
  
  &__img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 0;
    max-height: 25vh;
    
    @media only screen and (min-width: 768px) {
      max-height: 50vh;
      object-fit: cover;
    }
  }
}
</style>