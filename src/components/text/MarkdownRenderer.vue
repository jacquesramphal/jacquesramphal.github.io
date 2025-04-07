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
  },
  methods: {
    parseMarkdown(markdown) {
      const { attributes, body } = frontMatter(markdown);

      // Use 'attributes' as your metadata
      this.pageData = attributes;

      // Ensure 'body' is a string before passing it to 'marked'
      if (typeof body === "string") {
        const toc = [];
        const renderer = new marked.Renderer();
        renderer.heading = function (text, level) {
          const slug = text.toLowerCase().replace(/[^\w]+/g, "-");
          toc.push({ level, slug, title: text });
          return `<h${level} id="${slug}"><a href="#${slug}" class="anchor"></a>${text}</h${level}>`;
        };

        const options = {
          mangle: false,
          headerIds: false,
          tables: true,
          renderer: renderer,
        };

        // Add fadeInUp class to specific elements
        const html = marked(body, options);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const elementsToAnimate = [" p:has(> img)"]; // Add more elements as needed
        elementsToAnimate.forEach((tag) => {
          tempDiv.querySelectorAll(tag).forEach((el) => {
            el.classList.add("fadeInUp");
          });
        });
        this.renderedMarkdown = tempDiv.innerHTML;

        this.$emit("headings", toc);
      } else {
        // Handle the case where 'body' is not a string (e.g., it's an object)
        console.error("Invalid 'body' content:", body);
        this.renderedMarkdown = ""; // Set an empty string or handle it appropriately
      }
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
  },
  mounted() {
    // this.htmlContent = marked(content);
    const fadeInUp = gsap.utils.toArray(".fadeInUp");
    const fadeInDown = gsap.utils.toArray(".fadeInDown");
    const fadeInRight = gsap.utils.toArray(".fadeInRight");
    const fadeInLeft = gsap.utils.toArray(".fadeInLeft");
    const parallaxBack = gsap.utils.toArray(".parallaxBack");
    const parallaxFront = gsap.utils.toArray(".parallaxFront");

    fadeInUp.forEach((fadeInUp) => {
      gsap.from(fadeInUp, {
        scrollTrigger: {
          trigger: fadeInUp,
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
    fadeInDown.forEach((fadeInDown) => {
      gsap.from(fadeInDown, {
        scrollTrigger: {
          trigger: fadeInDown,
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
    fadeInRight.forEach((fadeInRight) => {
      gsap.from(fadeInRight, {
        scrollTrigger: {
          trigger: fadeInRight,
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
    fadeInLeft.forEach((fadeInLeft) => {
      gsap.from(fadeInLeft, {
        scrollTrigger: {
          trigger: fadeInLeft,
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
    parallaxBack.forEach((parallaxBack) => {
      gsap.to(parallaxBack, {
        scrollTrigger: {
          trigger: parallaxBack,
          scrub: true,
        },
        yPercent: 10,
        duration: 3,
        ease: "none",
      });
    });
    parallaxFront.forEach((parallaxFront) => {
      gsap.to(parallaxFront, {
        scrollTrigger: {
          trigger: parallaxFront,
          scrub: true,
        },
        yPercent: -10,
        duration: 3,
        ease: "none",
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isImageOpen) {
        this.closeImage();
      }
    });
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
      grid-column: 2 / 4;
    }
  }

  hr {
    margin: 2.4rem 0 1.6rem;
    @media only screen and (min-width: 768px) {
      margin: var(--size-9) 0 var(--size-6);
    }
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / 4;
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
    // padding-block-end: 2.4rem;
    // @media only screen and (min-width: 768px) {
    //   padding-block-end: 3.6rem;
    // }
    // @media only screen and (min-width: 1201px) {
    //   grid-column: 1 / 4;
    // }
  }
  h2 {
    padding: 1.6rem 0;
    @media only screen and (min-width: 768px) {
      padding: var(--size-6) 0;
    }
    @media only screen and (min-width: 1201px) {
      grid-column: 1 / 2;
      grid-row: span 6;
      padding: var(--size-3) 0;
    }
  }

  h3,
  h4,
  h5,
  h6,
  p,
  summary {
    padding: 1.6rem 0;
    @media only screen and (min-width: 768px) {
      padding: 2.4rem 0;
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
    margin-block-start: 0;
    p {
      padding-block-end: 0;
    }
  }
  ul,
  ol {
    padding-block-end: 1.6rem;
    @media only screen and (min-width: 768px) {
      padding-block-end: 2.4rem;
    }
  }

  ol > li {
    list-style: inherit !important;
    font-size: var(--font-xs);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-inline-start: 4rem;
    padding-block-end: 0.8rem;
    list-style-position: outside;
  }
  ul > li {
    list-style: disc !important;
    font-size: var(--font-xs);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-inline-start: 4rem;
    padding-block-end: 0.8rem;
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
