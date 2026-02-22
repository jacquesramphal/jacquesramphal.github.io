<template>
  <GridParent tight style="row-gap: 0" class="markdown" v-html="renderedMarkdown" />
</template>

<script>
// import GridContainer from "@/components/grid/GridContainer.vue";
import { marked } from 'marked';
import hljs from 'highlight.js';
import frontMatter from 'front-matter';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LANGUAGE_LABELS = {
  js: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  tsx: 'TSX',
  json: 'JSON',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  md: 'Markdown',
  yaml: 'YAML',
  yml: 'YAML',
  sh: 'Shell',
  bash: 'Bash',
  zsh: 'Zsh',
  pwsh: 'PowerShell',
  powershell: 'PowerShell',
  sql: 'SQL',
  graphql: 'GraphQL',
  vue: 'Vue',
  python: 'Python',
  py: 'Python',
  go: 'Go',
  rust: 'Rust',
  java: 'Java',
  kotlin: 'Kotlin',
  diff: 'Diff',
};

function normalizeLang(lang) {
  if (!lang) return '';
  return String(lang).trim().toLowerCase();
}

function languageLabel(lang) {
  const norm = normalizeLang(lang);
  if (!norm) return 'Text';
  return LANGUAGE_LABELS[norm] || norm.toUpperCase();
}

function renderCodeBlockHtml({ code, lang }) {
  const norm = normalizeLang(lang);
  const language = norm && hljs.getLanguage(norm) ? norm : 'plaintext';
  const highlighted = hljs.highlight(code, { language }).value;
  const label = languageLabel(norm || language);

  return `
<figure class="codeblock" data-lang="${language}">
  <div class="codeblock-header">
    <span class="codeblock-lang">${label}</span>
    <button class="codeblock-copy custom-btn button button--ghost button--small button--none" type="button" aria-label="Copy code">Copy</button>
  </div>
  <pre><code class="hljs language-${language}">${highlighted}</code></pre>
</figure>`.trim();
}

gsap.registerPlugin(ScrollTrigger);
document.addEventListener('DOMContentLoaded', () => {
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
      console.error('Element not found for index:', nextIndex);
    }
  }

  // Keydown event listener
  document.addEventListener('keydown', (e) => {
    // Ensure there are divs to focus
    if (divs.length > 0) {
      const currentIndex = Array.from(divs).indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        changeFocus(currentIndex, 1); // Move down
        e.preventDefault(); // Prevent scrolling
      } else if (e.key === 'ArrowUp') {
        changeFocus(currentIndex, -1); // Move up
        e.preventDefault(); // Prevent scrolling
      }
    }
  });
});

export default {
  name: 'MarkdownRenderer',
  props: {
    markdown: {
      type: String,
      required: true,
    },
    // Optional prefix to ensure heading IDs are unique when rendering multiple markdown documents on one page.
    // Example: "library-doc-foo" will produce ids like "library-doc-foo-my-heading".
    headingIdPrefix: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pageData: {},
      renderedMarkdown: '',
      enableScrollTrigger: false, // Disable ScrollTrigger on markdown pages
    };
  },
  watch: {
    markdown: {
      immediate: true,
      handler(newMarkdown) {
        console.log('Markdown prop:', newMarkdown); // Add this line
        this.parseMarkdown(newMarkdown);
      },
    },
    renderedMarkdown() {
      // Re-setup animations when content changes
      this.$nextTick(() => {
        this.setupAnimations();
        this.$el?.querySelectorAll?.('table').forEach((table) => {
          if (table.parentElement?.classList?.contains('table-scroll')) return;
          const wrapper = document.createElement('div');
          wrapper.className = 'table-scroll';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        });
      });
    },
  },
  methods: {
    decorateCodeBlocks(rootEl) {
      if (!rootEl || !(rootEl instanceof HTMLElement)) return;

      const codeEls = rootEl.querySelectorAll('pre > code');
      codeEls.forEach((codeEl) => {
        const preEl = codeEl.parentElement;
        if (!preEl) return;

        // Skip if already wrapped
        if (preEl.closest('.codeblock')) return;

        // Detect language from existing class (if any)
        const className = codeEl.getAttribute('class') || '';
        const match = className.match(/language-([^\s]+)/);
        const lang = match?.[1] || '';

        // Build wrapper
        const fig = document.createElement('figure');
        fig.className = 'codeblock';
        fig.setAttribute('data-lang', normalizeLang(lang) || 'plaintext');

        const header = document.createElement('div');
        header.className = 'codeblock-header';

        const label = document.createElement('span');
        label.className = 'codeblock-lang';
        label.textContent = languageLabel(lang);

        const btn = document.createElement('button');
        btn.className = 'codeblock-copy custom-btn button button--ghost button--small button--none';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Copy code');
        btn.textContent = 'Copy';

        header.appendChild(label);
        header.appendChild(btn);

        // Move the <pre> into figure
        const parent = preEl.parentNode;
        if (!parent) return;
        parent.insertBefore(fig, preEl);
        fig.appendChild(header);
        fig.appendChild(preEl);

        // Ensure highlight if HTML came in un-highlighted
        const hasHljs = (codeEl.getAttribute('class') || '').includes('hljs');
        if (!hasHljs) {
          const norm = normalizeLang(lang);
          const language = norm && hljs.getLanguage(norm) ? norm : 'plaintext';
          const raw = codeEl.textContent || '';
          codeEl.classList.add('hljs', `language-${language}`);
          codeEl.innerHTML = hljs.highlight(raw, { language }).value;
        }
      });
    },
    parseMarkdown(markdown) {
      if (!markdown || typeof markdown !== 'string') {
        console.warn('MarkdownRenderer: Invalid markdown input', markdown);
        this.renderedMarkdown = '';
        this.$emit('headings', []);
        return;
      }

      const normalizeHeadingPrefix = (raw) => {
        if (!raw || typeof raw !== 'string') return '';
        const cleaned = raw
          .trim()
          .toLowerCase()
          .replace(/[^\w-]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
        return cleaned ? `${cleaned}-` : '';
      };
      const headingPrefix = normalizeHeadingPrefix(this.headingIdPrefix);

      // Check if markdown is already HTML
      const isAlreadyHTML = markdown.trim().startsWith('<');

      let html = '';
      let toc = [];

      if (isAlreadyHTML) {
        // If already HTML, use it directly and extract headings
        html = markdown;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        this.decorateCodeBlocks(tempDiv);

        // Extract headings from HTML
        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => {
          let id = heading.id || heading.getAttribute('id');
          // If no ID, try to get it from the anchor link inside
          if (!id) {
            const anchor = heading.querySelector('a.anchor');
            if (anchor) {
              id = anchor.getAttribute('href')?.replace('#', '');
            }
          }
          // If still no ID, generate one from text
          if (!id) {
            id = heading.textContent
              .trim()
              .toLowerCase()
              .replace(/[^\w]+/g, '-');
          }
          // Prefix IDs to avoid duplicates across multiple markdown renders on one page.
          if (headingPrefix) id = `${headingPrefix}${id}`;
          heading.id = id;
          const level = parseInt(heading.tagName.charAt(1));
          const title = heading.textContent.trim();
          if (id && title) {
            // Commented out slug: designing-genie-agentic-ai
            if (
              id === `${headingPrefix}designing-genie-agentic-ai` ||
              id === 'designing-genie-agentic-ai'
            ) {
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

          const sectionWrapper = document.createElement('div');
          sectionWrapper.className = 'markdown-section fadeInUp';

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
              item.element.classList.add('fadeInUp');
              sectionWrapper.appendChild(item.element);
            } else if (item.type === 'h3' && item.elements.length > 0) {
              const h3SectionWrapper = document.createElement('div');
              h3SectionWrapper.className = 'markdown-subsection fadeInUp';

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

        if (typeof body === 'string' && body.trim().length > 0) {
          const renderer = new marked.Renderer();
          renderer.heading = function (text, level) {
            const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
            const id = `${headingPrefix}${slug}`;
            // Commented out slug: designing-genie-agentic-ai
            if (slug === 'designing-genie-agentic-ai') {
              return `<h${level} id="${id}"><a href="#${id}" class="anchor"></a>${text}</h${level}>`;
            }
            toc.push({ level, slug: id, title: text });
            return `<h${level} id="${id}"><a href="#${id}" class="anchor"></a>${text}</h${level}>`;
          };
          renderer.code = function (code, infostring) {
            const lang = (infostring || '').trim().split(/\s+/)[0];
            return renderCodeBlockHtml({ code, lang });
          };

          const options = {
            mangle: false,
            headerIds: false,
            tables: true,
            renderer: renderer,
          };

          html = marked(body, options);
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
          this.decorateCodeBlocks(tempDiv);

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

            const sectionWrapper = document.createElement('div');
            sectionWrapper.className = 'markdown-section fadeInUp';

            // Separate images from other content
            const imageElements = [];
            const nonImageElements = [];

            sectionElements.forEach((el) => {
              // Check if element contains an image
              const hasImage = el.tagName === 'P' && el.querySelector('img') !== null;
              if (hasImage) {
                imageElements.push(el);
                // Add animation class directly to image elements
                el.classList.add('fadeInUp');
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
              } else if (
                el.tagName === 'H3' ||
                (h3Sections[h3Index] && h3Sections[h3Index].includes(el))
              ) {
                // Check if this is the start of a new h3 section
                if (el.tagName === 'H3' && h3Sections[h3Index] && h3Sections[h3Index][0] === el) {
                  const h3SectionWrapper = document.createElement('div');
                  h3SectionWrapper.className = 'markdown-subsection fadeInUp';

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
          console.warn('MarkdownRenderer: Empty or invalid body content', body);
          this.renderedMarkdown = '';
          this.$emit('headings', []);
          return;
        }
      }

      console.log('MarkdownRenderer: Emitting headings:', toc);
      this.$emit('headings', toc);
    },
    extractHeadings(markdown) {
      const headingRegex = /^(#{1,6})\s+(.*)$/gm;
      const headings = [];
      let match;

      while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        headings.push({ level, text, id });
      }

      this.$emit('headings', headings);
    },
    setupAnimations() {
      // Disable ScrollTrigger on markdown pages - implementation retained but disabled
      if (!this.enableScrollTrigger) {
        return;
      }

      // Kill existing ScrollTriggers to avoid duplicates
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars &&
          trigger.vars.trigger &&
          this.$el &&
          this.$el.contains(trigger.vars.trigger)
        ) {
          trigger.kill();
        }
      });

      // Wait for DOM to be ready
      this.$nextTick(() => {
        const fadeInUp = gsap.utils.toArray('.fadeInUp', this.$el);
        const fadeInDown = gsap.utils.toArray('.fadeInDown', this.$el);
        const fadeInRight = gsap.utils.toArray('.fadeInRight', this.$el);
        const fadeInLeft = gsap.utils.toArray('.fadeInLeft', this.$el);
        const parallaxBack = gsap.utils.toArray('.parallaxBack', this.$el);
        const parallaxFront = gsap.utils.toArray('.parallaxFront', this.$el);

        fadeInUp.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'restart pause reverse pause',
            },
            autoAlpha: 0,
            y: 100,
            duration: 3,
            ease: 'none',
          });
        });
        fadeInDown.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'restart pause reverse pause',
            },
            autoAlpha: 0,
            y: -100,
            duration: 3,
            ease: 'none',
          });
        });
        fadeInRight.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'restart pause reverse pause',
            },
            autoAlpha: 0,
            x: 100,
            duration: 3,
            ease: 'none',
          });
        });
        fadeInLeft.forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'restart pause reverse pause',
            },
            autoAlpha: 0,
            x: -100,
            duration: 3,
            ease: 'none',
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
            ease: 'none',
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
            ease: 'none',
          });
        });
      });
    },
  },
  mounted() {
    this.setupAnimations();

    this._onMarkdownClick = async (e) => {
      const btn = e?.target?.closest?.('button.codeblock-copy');
      if (!btn) return;

      const figure = btn.closest('.codeblock');
      const codeEl = figure?.querySelector('pre > code');
      const text = codeEl?.textContent || '';
      if (!text) return;

      const original = btn.textContent;
      btn.textContent = 'Copying…';
      btn.disabled = true;

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text.replace(/\n$/, ''));
        } else {
          const ta = document.createElement('textarea');
          ta.value = text.replace(/\n$/, '');
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        btn.textContent = 'Copied';
      } catch (err) {
        console.warn('Copy failed', err);
        btn.textContent = 'Copy failed';
      } finally {
        window.setTimeout(() => {
          btn.textContent = original || 'Copy';
          btn.disabled = false;
        }, 1200);
      }
    };

    this.$el?.addEventListener?.('click', this._onMarkdownClick);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isImageOpen) {
        this.closeImage();
      }
    });
  },
  beforeUnmount() {
    if (this._onMarkdownClick) {
      this.$el?.removeEventListener?.('click', this._onMarkdownClick);
    }
    // Clean up ScrollTriggers (only if ScrollTrigger was enabled)
    if (this.enableScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars &&
          trigger.vars.trigger &&
          this.$el &&
          this.$el.contains(trigger.vars.trigger)
        ) {
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
  // margin: var(--spacing-xl) 0;
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
    margin-block-end: 0;
    margin-block-start: var(--spacing-md);
    @media only screen and (min-width: 768px) {
      margin-block-start: var(--size-11);
    }
    // margin: 2.4rem 0 1.6rem;
    // @media only screen and (min-width: 768px) {
    //   margin: var(--size-9) 0 var(--size-6);
    // }
    // @media only screen and (min-width: 1201px) {
    //   grid-column: 1 / 4; // Span all 3 columns to match content width
    //   margin: var(--size-15) 0 var(--size-15);
    // }
  }

  p:has(> img) {
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / 4;
    }
  }

  img {
    margin-block: var(--spacing-xs) var(--spacing-xxxs);

    // Override global object-fit: cover to prevent cropping
    object-fit: contain !important;
    object-position: top center; // Pin images to top

    // Scale to grid width with flexible height
    height: auto;
    width: 100%;

    @media only screen and (min-width: 1201px) {
      margin-block: var(--spacing-md) 0;
    }
  }

  // First image (hero image) - Scale to grid width with flexible height
  p:has(> img):first-of-type img,
  img:first-of-type {
    object-fit: contain !important;
    object-position: top center; // Pin hero image to top
    aspect-ratio: auto; // Remove forced aspect ratio
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

  a {
    color: var(--color-action);
    font-weight: var(--fontWeight-medium);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 0.15rem;
    transition:
      color 0.2s ease,
      text-decoration-thickness 0.2s ease;

    &:hover,
    &:focus {
      color: var(--color-action);
      text-decoration-thickness: 0.15rem;
      outline: 2px solid transparent;
      outline-offset: 2px;
    }

    &:visited {
      color: var(--color-action);
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
    list-style: inherit;
    margin-inline-start: 4rem;
    margin-block-end: 0.6rem;
    list-style-position: outside;
  }
  ul > li {
    list-style: disc;
    margin-inline-start: 4rem;
    margin-block-end: 0.6rem;
  }

  /* SCSS for Code Block Styling */

  .codeblock {
    background-color: var(--code-bg);
    border: 1px solid var(--code-border);
    border-radius: var(--spacing-xxxs);
    overflow: hidden;
    margin: 0 0 var(--spacing-sm);
  }

  .codeblock-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xs);
    padding: var(--spacing-xxxs) var(--spacing-xs);
    border-bottom: 1px solid var(--code-border);
    color: var(--code-fg);
  }

  .codeblock-lang {
    font-size: var(--font-3xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  .codeblock pre {
    background: transparent;
    border: 0;
    margin: 0;
    padding: var(--spacing-sm);
    overflow-x: auto;
    color: var(--code-fg);
    line-height: 1.6;
  }

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    font-size: var(--font-xs);
  }

  pre code {
    display: block;
    padding: 0;
    background: transparent;
    color: inherit;
  }

  /* highlight.js tokens (theme-aware via CSS variables) */
  pre code.hljs {
    color: var(--code-fg);
  }
  .hljs-comment,
  .hljs-quote {
    color: var(--code-comment);
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal {
    color: var(--code-keyword);
  }
  .hljs-string,
  .hljs-regexp {
    color: var(--code-string);
  }
  .hljs-number,
  .hljs-built_in,
  .hljs-type {
    color: var(--code-number);
  }
  .hljs-title,
  .hljs-section,
  .hljs-function .hljs-title {
    color: var(--code-title);
  }
  .hljs-attr,
  .hljs-attribute {
    color: var(--code-attr);
  }
  .hljs-meta {
    color: var(--code-meta);
  }
  .hljs-addition {
    color: var(--code-addition);
  }
  .hljs-deletion {
    color: var(--code-deletion);
  }

  /* Line numbers (optional) */
  /* Uncomment the following styles if you want line numbers in code blocks */
  .line-numbers {
    counter-reset: linenumber;
  }

  code[class*='language-'].line-numbers {
    position: relative;
  }

  code[class*='language-'].line-numbers::before {
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
    background: var(--code-inline-bg);
    color: var(--code-inline-fg);
    word-wrap: break-word;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem 0.2rem;
    border-radius: 0.2rem;
  }
}

/* -------- TABLES -------- */
/* Scroll wrapper handles overflow; table stays as display: table */
.table-scroll {
  overflow-x: auto;
  inline-size: 100%;
  @media only screen and (max-width: 768px) {
    overflow-x: scroll;
  }
}

/* Basic Container Styles */
table {
  inline-size: 100%;
  min-inline-size: 100%; /* ensures tr spans full width so row borders extend edge to edge */
  border-collapse: collapse;
  margin-block-end: 3rem; /* Adjust the spacing between tables */
  font-size: var(--font-xs);
  line-height: 1.5;
  border: var(--border); /* Add a border to all table rows */
  @media only screen and (max-width: 768px) {
    white-space: nowrap; /* Prevent table cells from wrapping */
  }
}

/* Table Header */
th {
  color: var(--foreground) !important;
  font-size: var(--font-400);
  font-weight: var(--fontWeight-medium);
  letter-spacing: var(--letterSpacing-loose);
  text-transform: uppercase;
  font-variation-settings:
    'YAXS' 400,
    'wdth' 115,
    'opsz' 48;
  background-color: var(--background-darker);
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

details[open] {
  // background-color: var(--background-darker); /* Light hover effect */
  // border-bottom-left-radius: var(--spacing-xxs);
  // border-bottom-right-radius: var(--spacing-xxs);
  border-block-end: var(--border);
}

summary {
  cursor: pointer;
  font-size: var(--font-xs);
  font-weight: var(--fontWeight-medium);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0; /* Spacing around the summary */
  list-style: none; /* Hide default marker */
  border-bottom: var(--border); /* Border below summary */

  /* Custom plus icon */
  &::after {
    content: '';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 16px;
    block-size: 16px;
    flex-shrink: 0;
    background-color: currentColor;
    mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.5V12.5M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.5V12.5M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
    transition:
      mask-image 0.2s ease,
      -webkit-mask-image 0.2s ease;
  }
}

/* Hide the default disclosure triangle/marker */
summary::-webkit-details-marker,
summary::marker {
  display: none;
}

details[open] summary {
  color: var(--foreground-subtle);

  /* Change to minus icon when open */
  &::after {
    mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 8H12.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  }

  // font-weight: 600; /* Bolder font for active state */
  // color: #111827; /* Slightly darker text */
  // background-color: var(--background-darker); /* Light hover effect */
}

details p {
}
</style>
