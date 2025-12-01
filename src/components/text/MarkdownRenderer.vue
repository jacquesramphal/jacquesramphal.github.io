<template>
  <GridParent
    tight
    style="row-gap: 0"
    class="markdown"
    v-html="renderedMarkdown"
  />
</template>

<script>
// import GridContainer from "@/components/grid/GridContainer.vue";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import frontMatter from "front-matter";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  // Get all focusable divs
  const divs = document.querySelectorAll('div[tabindex="0"]');

  // Function to change focus
  function changeFocus(currentIndex, direction) {
    let nextIndex = currentIndex + direction;

    // Ensure nextIndex wraps around properly
    if (nextIndex >= divs.length) {
      nextIndex = 0; // Loop back to the first
    } else if (nextIndex < 0) {
      nextIndex = divs.length - 1; // Loop back to the last
    }

    // Check if the element exists before focusing
    if (divs[nextIndex]) {
      divs[nextIndex].focus();
    } else {
      console.error("Element not found for index:", nextIndex);
    }
  }

  // Keydown event listener
  document.addEventListener("keydown", (e) => {
    // Ensure there are divs to focus
    if (divs.length > 0) {
      const currentIndex = Array.from(divs).indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        changeFocus(currentIndex, 1); // Move down
        e.preventDefault(); // Prevent scrolling
      } else if (e.key === "ArrowUp") {
        changeFocus(currentIndex, -1); // Move up
        e.preventDefault(); // Prevent scrolling
      }
    }
  });
});

export default {
  name: "MarkdownRenderer",
  props: {
    markdown: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pageData: {},
      renderedMarkdown: "",
      enableScrollTrigger: false, // Disable ScrollTrigger on markdown pages
    };
  },
  watch: {
    markdown: {
      immediate: true,
      handler(newMarkdown) {
        console.log("Markdown prop:", newMarkdown); // Add this line
        this.parseMarkdown(newMarkdown);
      },
    },
    renderedMarkdown() {
      // Re-setup animations when content changes
      this.$nextTick(() => {
        this.setupAnimations();
      });
    },
  },
  methods: {
    parseMarkdown(markdown) {
      if (!markdown || typeof markdown !== "string") {
        console.warn("MarkdownRenderer: Invalid markdown input", markdown);
        this.renderedMarkdown = "";
        this.$emit("headings", []);
        return;
      }

      // Check if markdown is already HTML
      const isAlreadyHTML = markdown.trim().startsWith("<");

      let html = "";
      let toc = [];

      if (isAlreadyHTML) {
        // If already HTML, use it directly and extract headings
        html = markdown;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        
        // Extract headings from HTML
        const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headings.forEach((heading) => {
          let id = heading.id || heading.getAttribute("id");
          // If no ID, try to get it from the anchor link inside
          if (!id) {
            const anchor = heading.querySelector("a.anchor");
            if (anchor) {
              id = anchor.getAttribute("href")?.replace("#", "");
            }
          }
          // If still no ID, generate one from text
          if (!id) {
            id = heading.textContent.trim().toLowerCase().replace(/[^\w]+/g, "-");
            heading.id = id;
          }
          const level = parseInt(heading.tagName.charAt(1));
          const title = heading.textContent.trim();
          if (id && title) {
            // Commented out slug: designing-genie-agentic-ai
            if (id === "designing-genie-agentic-ai") {
              return; // Skip this heading
            }
            toc.push({ level, slug: id, title });
          }
        });
        
        // Group content into sections between h2 headings (same logic as markdown parsing)
        const allElements = Array.from(tempDiv.children);
        const sections = [];
        let currentSection = [];
        
        allElements.forEach((el) => {
          if (el.tagName === 'H2') {
            // Save previous section if it has content
            if (currentSection.length > 0) {
              sections.push([...currentSection]);
              currentSection = [];
            }
            // Start new section with the h2
            currentSection.push(el);
          } else {
            // Add element to current section
            currentSection.push(el);
          }
        });
        
        // Don't forget the last section
        if (currentSection.length > 0) {
          sections.push([...currentSection]);
        }
        
        // Clear tempDiv and rebuild with wrapped sections
        tempDiv.innerHTML = '';
        
        sections.forEach((sectionElements) => {
          if (sectionElements.length === 0) return;
          
          const sectionWrapper = document.createElement("div");
          sectionWrapper.className = "markdown-section fadeInUp";
          
          // Process elements in order, grouping by h3 but keeping images separate
          const h3Sections = [];
          let currentH3Section = [];
          
          sectionElements.forEach((el) => {
            // Check if element contains an image
            const hasImage = el.tagName === 'P' && el.querySelector('img') !== null;
            
            if (hasImage) {
              // Save current h3 section before adding image
              if (currentH3Section.length > 0) {
                h3Sections.push({ type: 'h3', elements: [...currentH3Section] });
                currentH3Section = [];
              }
              // Add image as standalone element
              h3Sections.push({ type: 'image', element: el });
            } else if (el.tagName === 'H3') {
              // Save previous h3 section if it has content
              if (currentH3Section.length > 0) {
                h3Sections.push({ type: 'h3', elements: [...currentH3Section] });
                currentH3Section = [];
              }
              // Start new h3 section
              currentH3Section.push(el);
            } else {
              // Add element to current h3 section
              currentH3Section.push(el);
            }
          });
          
          // Don't forget the last h3 section
          if (currentH3Section.length > 0) {
            h3Sections.push({ type: 'h3', elements: [...currentH3Section] });
          }
          
          // Render sections and images in order
          h3Sections.forEach((item) => {
            if (item.type === 'image') {
              // Add animation class directly to image element
              item.element.classList.add("fadeInUp");
              sectionWrapper.appendChild(item.element);
            } else if (item.type === 'h3' && item.elements.length > 0) {
              const h3SectionWrapper = document.createElement("div");
              h3SectionWrapper.className = "markdown-subsection fadeInUp";
              
              item.elements.forEach((el) => {
                h3SectionWrapper.appendChild(el);
              });
              
              sectionWrapper.appendChild(h3SectionWrapper);
            }
          });
          
          tempDiv.appendChild(sectionWrapper);
        });
        
        this.renderedMarkdown = tempDiv.innerHTML;
      } else {
        // Parse markdown normally
        const { attributes, body } = frontMatter(markdown);
        this.pageData = attributes;

        if (typeof body === "string" && body.trim().length > 0) {
          const renderer = new marked.Renderer();
          renderer.heading = function (text, level) {
            const slug = text.toLowerCase().replace(/[^\w]+/g, "-");
            // Commented out slug: designing-genie-agentic-ai
            if (slug === "designing-genie-agentic-ai") {
              return `<h${level} id="${slug}"><a href="#${slug}" class="anchor"></a>${text}</h${level}>`;
            }
            toc.push({ level, slug, title: text });
            return `<h${level} id="${slug}"><a href="#${slug}" class="anchor"></a>${text}</h${level}>`;
          };

          const options = {
            mangle: false,
            headerIds: false,
            tables: true,
            renderer: renderer,
          };

          html = marked(body, options);
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          
          // Group content into sections between h2 headings
          const allElements = Array.from(tempDiv.children);
          const sections = [];
          let currentSection = [];
          
          allElements.forEach((el) => {
            if (el.tagName === 'H2') {
              // Save previous section if it has content
              if (currentSection.length > 0) {
                sections.push([...currentSection]);
                currentSection = [];
              }
              // Start new section with the h2
              currentSection.push(el);
            } else {
              // Add element to current section
              currentSection.push(el);
            }
          });
          
          // Don't forget the last section
          if (currentSection.length > 0) {
            sections.push([...currentSection]);
          }
          
          // Clear tempDiv and rebuild with wrapped sections
          tempDiv.innerHTML = '';
          
          sections.forEach((sectionElements) => {
            if (sectionElements.length === 0) return;
            
            const sectionWrapper = document.createElement("div");
            sectionWrapper.className = "markdown-section fadeInUp";
            
            // Separate images from other content
            const imageElements = [];
            const nonImageElements = [];
            
            sectionElements.forEach((el) => {
              // Check if element contains an image
              const hasImage = el.tagName === 'P' && el.querySelector('img') !== null;
              if (hasImage) {
                imageElements.push(el);
                // Add animation class directly to image elements
                el.classList.add("fadeInUp");
              } else {
                nonImageElements.push(el);
              }
            });
            
            // Group non-image content within this section by h3 headings
            const h3Sections = [];
            let currentH3Section = [];
            
            nonImageElements.forEach((el) => {
              if (el.tagName === 'H3') {
                // Save previous h3 section if it has content
                if (currentH3Section.length > 0) {
                  h3Sections.push([...currentH3Section]);
                  currentH3Section = [];
                }
                // Start new h3 section
                currentH3Section.push(el);
              } else {
                // Add element to current h3 section
                currentH3Section.push(el);
              }
            });
            
            // Don't forget the last h3 section
            if (currentH3Section.length > 0) {
              h3Sections.push([...currentH3Section]);
            }
            
            // Add h3 sections and images in order
            let imageIndex = 0;
            let h3Index = 0;
            
            sectionElements.forEach((el) => {
              const hasImage = el.tagName === 'P' && el.querySelector('img') !== null;
              
              if (hasImage) {
                // Add image directly (already has fadeInUp class)
                sectionWrapper.appendChild(imageElements[imageIndex]);
                imageIndex++;
              } else if (el.tagName === 'H3' || (h3Sections[h3Index] && h3Sections[h3Index].includes(el))) {
                // Check if this is the start of a new h3 section
                if (el.tagName === 'H3' && h3Sections[h3Index] && h3Sections[h3Index][0] === el) {
                  const h3SectionWrapper = document.createElement("div");
                  h3SectionWrapper.className = "markdown-subsection fadeInUp";
                  
                  h3Sections[h3Index].forEach((h3El) => {
                    h3SectionWrapper.appendChild(h3El);
                  });
                  
                  sectionWrapper.appendChild(h3SectionWrapper);
                  h3Index++;
                }
              }
            });
            
            tempDiv.appendChild(sectionWrapper);
          });
          
          this.renderedMarkdown = tempDiv.innerHTML;
        } else {
          console.warn("MarkdownRenderer: Empty or invalid body content", body);
          this.renderedMarkdown = "";
          this.$emit("headings", []);
          return;
        }
      }

      console.log("MarkdownRenderer: Emitting headings:", toc);
      this.$emit("headings", toc);
    },
    extractHeadings(markdown) {
      const headingRegex = /^(#{1,6})\s+(.*)$/gm;
      const headings = [];
      let match;

      while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
        headings.push({ level, text, id });
      }

      this.$emit("headings", headings);
    },
    setupAnimations() {
      // Disable ScrollTrigger on markdown pages - implementation retained but disabled
      if (!this.enableScrollTrigger) {
        return;
      }

      // Kill existing ScrollTriggers to avoid duplicates
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger && 
            this.$el && this.$el.contains(trigger.vars.trigger)) {
          trigger.kill();
        }
      });

      // Wait for DOM to be ready
      this.$nextTick(() => {
        const fadeInUp = gsap.utils.toArray(".fadeInUp", this.$el);
        const fadeInDown = gsap.utils.toArray(".fadeInDown", this.$el);
        const fadeInRight = gsap.utils.toArray(".fadeInRight", this.$el);
        const fadeInLeft = gsap.utils.toArray(".fadeInLeft", this.$el);
        const parallaxBack = gsap.utils.toArray(".parallaxBack", this.$el);
        const parallaxFront = gsap.utils.toArray(".parallaxFront", this.$el);

        fadeInUp.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "top 50%",
              scrub: 1,
              toggleActions: "restart pause reverse pause",
            },
            autoAlpha: 0,
            y: 100,
            duration: 3,
            ease: "none",
          });
        });
        fadeInDown.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "top 50%",
              scrub: 1,
              toggleActions: "restart pause reverse pause",
            },
            autoAlpha: 0,
            y: -100,
            duration: 3,
            ease: "none",
          });
        });
        fadeInRight.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "top 50%",
              scrub: 1,
              toggleActions: "restart pause reverse pause",
            },
            autoAlpha: 0,
            x: 100,
            duration: 3,
            ease: "none",
          });
        });
        fadeInLeft.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "top 50%",
              scrub: 1,
              toggleActions: "restart pause reverse pause",
            },
            autoAlpha: 0,
            x: -100,
            duration: 3,
            ease: "none",
          });
        });
        parallaxBack.forEach((element) => {
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              scrub: true,
            },
            yPercent: 10,
            duration: 3,
            ease: "none",
          });
        });
        parallaxFront.forEach((element) => {
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              scrub: true,
            },
            yPercent: -10,
            duration: 3,
            ease: "none",
          });
        });
      });
    },
  },
  mounted() {
    this.setupAnimations();
    
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isImageOpen) {
        this.closeImage();
      }
    });
  },
  beforeUnmount() {
    // Clean up ScrollTriggers (only if ScrollTrigger was enabled)
    if (this.enableScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger && 
            this.$el && this.$el.contains(trigger.vars.trigger)) {
          trigger.kill();
        }
      });
    }
  },
  // components: { GridContainer },
};
</script>

<style lang="scss">
/* ---- MARKDOWN STYLING ---- */
.markdown {
  margin: var(--spacing-xl) 0;
  * {
    grid-column: 1 / 4;
    @media only screen and (min-width: 768px) {
      grid-column: 1 / 3;
    }
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / 4; // Span all 3 columns of GridParent to fill content area (columns 2-3 of outer grid)
    }
  }

  hr {
    margin: 2.4rem 0 1.6rem;
    @media only screen and (min-width: 768px) {
      margin: var(--size-9) 0 var(--size-6);
    }
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / 4; // Span all 3 columns to match content width
      margin: var(--size-15) 0 var(--size-15);
    }
  }

  p:has(> img) {
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / 4;
    }
  }

  img {
    margin-block: var(--spacing-xs) var(--spacing-xxxs);

    @media only screen and (min-width: 1201px) {
      margin-block: var(--spacing-lg) var(--spacing-md);
    }

    // aspect-ratio: 16 / 8;
    // max-width: 98rem !important;
    // float: none;
    // margin-inline-start: auto;
    // margin-inline-end: auto;
  }

  // First image (hero image) - 4:3 aspect ratio
  p:has(> img):first-of-type img,
  img:first-of-type {
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  header {
    padding-block-end: var(--spacing-sm);
    @media only screen and (min-width: 1201px) {
      // padding-block-start: 4rem;
      padding-block-end: var(--spacing-lg);

      grid-column: 1 / 4;
      margin-block: var(--spacing-xl) var(--spacing-md);
    }
    h4 {
      font-size: var(--font-sm);
      padding: 0;
      margin-block-start: 2rem;
      inline-size: 100%;

      @media only screen and (min-width: 768px) {
        max-width: 75vw;
        margin-block-start: 3.2rem;
      }
    }
  }
  // main {
  //   display: grid;
  // }
  h1 {
    margin-block-start: 0;
    margin-block-end: 1.6rem;
    @media only screen and (min-width: 768px) {
      margin-block-end: 2rem;
    }
    @media only screen and (min-width: 1201px) {
      margin-block-end: 2.4rem;
    }
  }
  h2 {
    margin-block-start: 2.4rem;
    margin-block-end: 1.2rem;
    @media only screen and (min-width: 768px) {
      margin-block-start: 3.2rem;
      margin-block-end: 1.6rem;
    }
    @media only screen and (min-width: 1201px) {
      margin-block-start: 4rem;
      margin-block-end: 2rem;
    }
  }

  h3 {
    margin-block-start: 2rem;
    margin-block-end: 1rem;
    @media only screen and (min-width: 768px) {
      margin-block-start: 2.4rem;
      margin-block-end: 1.2rem;
    }
    @media only screen and (min-width: 1201px) {
      margin-block-start: 3.2rem;
      margin-block-end: 1.6rem;
    }
  }

  h4,
  h5,
  h6 {
    margin-block-start: 1.6rem;
    margin-block-end: 0.8rem;
    @media only screen and (min-width: 768px) {
      margin-block-start: 2rem;
      margin-block-end: 1rem;
    }
    @media only screen and (min-width: 1201px) {
      margin-block-start: 2.4rem;
      margin-block-end: 1.2rem;
    }
  }

  p {
    margin-block-start: 0;
    margin-block-end: 1.2rem;
    @media only screen and (min-width: 768px) {
      margin-block-end: 1.6rem;
    }
    @media only screen and (min-width: 1201px) {
      margin-block-end: 1.8rem;
    }
  }

  summary {
    margin-block-start: 1.2rem;
    margin-block-end: 0.8rem;
    @media only screen and (min-width: 768px) {
      margin-block-start: 1.6rem;
      margin-block-end: 1rem;
    }
  }
  // p {
  //   padding-block-end: 1.6rem;
  //   @media only screen and (min-width: 768px) {
  //     padding-block-end: 2.4rem;
  //   }
  // align-content: center;
  // }
  blockquote {
    margin-block-start: 1.6rem;
    margin-block-end: 1.6rem;
    p {
      margin-block-end: 1.2rem;
      &:last-child {
        margin-block-end: 0;
      }
    }
  }
  ul,
  ol {
    margin-block-start: 1.2rem;
    margin-block-end: 1.2rem;
    @media only screen and (min-width: 768px) {
      margin-block-start: 1.6rem;
      margin-block-end: 1.6rem;
    }
  }

  ol > li {
    list-style: inherit !important;
    font-size: var(--font-xs);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-inline-start: 4rem;
    margin-block-end: 0.6rem;
    list-style-position: outside;
  }
  ul > li {
    list-style: disc !important;
    font-size: var(--font-xs);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-inline-start: 4rem;
    margin-block-end: 0.6rem;
  }

  /* SCSS for Code Block Styling */

  pre {
    /* Set background color and padding for code block */
    background-color: var(--background-reversed);
    padding: var(--spacing-sm);
    border-radius: var(--spacing-xxxs);
    overflow-x: auto;
    margin-block-end: var(--spacing-sm);
    color: var(--foreground-reversed);
  }

  code {
    /* Set font family and size for inline code */
    font-family: monospace;
    font-size: var(--font-xs);
  }

  /* Set styles for different code languages */
  code[class*="language-"] {
    /* Set font family and size for code blocks */
    font-family: monospace;
    font-size: var(--font-xs);
  }

  /* Custom syntax highlighting styles for specific languages */
  /* Replace 'language-python' with the appropriate language class */
  // code.language-python {
  //   color: var(--color-text);
  // }

  // code.language-javascript {
  //   color: var(--color-text);
  // }

  // code.language-html {
  //   color: var(--color-text);
  // }

  /* Add more code language styles as needed */

  /* Line numbers (optional) */
  /* Uncomment the following styles if you want line numbers in code blocks */
  .line-numbers {
    counter-reset: linenumber;
  }

  code[class*="language-"].line-numbers {
    position: relative;
  }

  code[class*="language-"].line-numbers::before {
    content: counter(linenumber);
    position: absolute;
    inset-inline-start: -2.5em;
    text-align: right;
    user-select: none;
    pointer-events: none;
    color: #aaa; // Line number color
  }
  /* Code in text */
  p > code,
  li > code,
  dd > code,
  td > code {
    background: var(--background-darker);
    word-wrap: break-word;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem 0.2rem;
    border-radius: 0.2rem;
  }
}
/* Custom syntax highlighting styles for specific languages */

/* HTML */
code.language-html {
  color: #e34c26; /* HTML tags */
}

code.language-html .hljs-attr {
  color: #f50; /* HTML attributes */
}

code.language-html .hljs-meta {
  color: #999; /* HTML meta tags like <!DOCTYPE> */
}

code.language-html .hljs-string {
  color: #090; /* HTML strings */
}

code.language-html .hljs-tag .hljs-name {
  color: #e34c26; /* HTML tag names */
}

/* JavaScript */
code.language-javascript {
  color: #f1e05a; /* JavaScript code */
}

code.language-javascript .hljs-meta {
  color: #75715e; /* JavaScript meta keywords like 'import', 'export', etc. */
}

code.language-javascript .hljs-keyword {
  color: #c678dd; /* JavaScript keywords like 'function', 'if', 'else', etc. */
}

code.language-javascript .hljs-string {
  color: #98c379; /* JavaScript strings */
}

code.language-javascript .hljs-number {
  color: #d19a66; /* JavaScript numbers */
}

code.language-javascript .hljs-function {
  color: #61aeee; /* JavaScript functions */
}

/* -------- TABLES -------- */
/* Basic Container Styles */
table {
  inline-size: 100%;
  border-collapse: collapse;
  margin-block-end: 3rem; /* Adjust the spacing between tables */
  font-size: var(--font-xs);
  line-height: 1.5;
  font-weight: var(--font-normal);
  border: var(--border); /* Add a border to all table rows */
  @media only screen and (max-width: 768px) {
    display: block; /* Display as a block element to allow for horizontal scrolling */
    overflow-x: scroll; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent table cells from wrapping */
    inline-size: 100%; /* Ensure the table spans the full width of the viewport */
  }
}

/* Table Header */
th {
  color: var(--foreground-subtle) !important;
  // opacity: var(--foreground-subtle) !important;
  font-weight: var(--font-bold);
  background-color: var(
    --background-darker
  ); /* Background color for table headers */
}

/* Table Padding */
th,
td {
  padding: var(--spacing-xs);
  text-align: left;
  vertical-align: text-top;
}

/* Horizontal Borders */
th,
tr {
  border-block-end: var(--border); /* Add a border to all table rows */
}
/* RM border on last row */
tr:last-of-type {
  border-block-end: none !important;
}

/* Vertical Borders */
th,
td {
  border-inline-end: var(--border); /* Add a border to all table rows */
}
th:last-of-type,
td:last-of-type {
  border-inline-end: none; /* Add a border to all table rows */
}

/* Optional: Add hover effect on rows */
// tr:hover {
//   background-color: #ddd;
// }

/* Zebra Striping (Commented Out) */

// tr:nth-of-type(even) td {
//   background-color: var(--background-darker);
// }

/* Responsive Table Styles */
// @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
//   /* Force table into rows */
//   table, thead, tbody, th, td, tr {
//     display: block;
//   }

//   /* Hide table headers (but not display: none;, for accessibility) */
//   thead tr {
//     position: absolute;
//     inset-block-start:  -9999px;
//     inset-inline-start:  -9999px;
//   }

//   tr {
//     margin: 0 0 1rem 0;
//   }

//   td {
//     /* Behave like a "row" */
//     border: none;
//     border-block-end: var(--border); /* Border color for table cells */
//     position: relative;
//     padding-inline-start: 50%;
//   }

//   td:before {
//     /* Now like a table header */
//     position: absolute;
//     /* Top/left values mimic padding */
//     inset-block-start:  0;
//     inset-inline-start:  0;
//     inline-size: 45%;
//     padding: 0.5rem 0.75rem 0.5rem 0.75rem;
//     white-space: nowrap;
//   }

//   /* Define header content for each column */
//   td:nth-of-type(1):before {
//     content: "First Name";
//   }
//   td:nth-of-type(2):before {
//     content: "Last Name";
//   }
//   td:nth-of-type(3):before {
//     content: "Job Title";
//   }
//   td:nth-of-type(4):before {
//     content: "Favorite Color";
//   }
//   td:nth-of-type(5):before {
//     content: "Date of Birth";
//   }
// }

/* Accordians */

details {
  // margin-block-end: var(--spacing-xs); /* Spacing between accordion sections */
  padding: 0; /* Padding for each accordion section */
  // border: 1px solid transparent;
  border-block-end: none;
}
details:hover {
  // border: var(--border);
}

details[open] {
  // background-color: var(--background-darker); /* Light hover effect */
  // border-bottom-left-radius: var(--spacing-xxs);
  // border-bottom-right-radius: var(--spacing-xxs);
  border-block-end: var(--border);
}

summary {
  cursor: pointer;
  font-size: var(--font-sm);
  // font-weight: var(--fontWeight-semibold);
  // display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0; /* Spacing around the summary */
  border-radius: 4px; /* Rounded corners */
}

summary:hover {
  // background-color: var(--background-darker); /* Light hover effect */
}

summary::-webkit-details-marker {
  // display: none; /* Hide default marker */
}

details[open] summary {
  color: var(--foreground-subtle);

  // font-weight: 600; /* Bolder font for active state */
  // color: #111827; /* Slightly darker text */
  // background-color: var(--background-darker); /* Light hover effect */
}

details p {
  padding-left: 1rem; /* Indentation for content */
  font-size: var(--font-xs);
  // color: #6b7280; /* Muted color for supporting text */
  line-height: 1.5; /* Comfortable line spacing */
}

// details summary::marker {
//   color: var(--foreground); /* Color for the marker */
//   font-size: var(--font-xs); /* Font size for the marker */
//   content: "+"; /* Custom marker content */
//   display: inline-block; /* Ensure marker is inline-block */
//   width: 1em; /* Fixed width for the marker */
//   text-align: center; /* Center the marker */
// }

// details[open] summary::marker {
//   content: "x"; /* Custom marker content for open state */
//   width: 1em; /* Fixed width for the marker */
//   text-align: center; /* Center the marker */
// }
</style>
