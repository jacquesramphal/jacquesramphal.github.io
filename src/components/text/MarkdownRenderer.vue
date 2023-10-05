<template>
  <GridContainer
    maxvw
    class="markdown"
    v-html="renderedMarkdown"
  ></GridContainer>
</template>

<script>
import GridContainer from "@/components/grid/GridContainer.vue";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import frontMatter from "front-matter";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

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
        const options = {
          mangle: false,
          headerIds: false,
          tables: true,
        };

        this.renderedMarkdown = marked(body, options);
      } else {
        // Handle the case where 'body' is not a string (e.g., it's an object)
        console.error("Invalid 'body' content:", body);
        this.renderedMarkdown = ""; // Set an empty string or handle it appropriately
      }
    },
  },
  components: { GridContainer },
};
</script>

<style lang="scss">
/* ---- MARKDOWN STYLING ---- */
.markdown {
  margin: var(--spacing-xl) 0;
  h1 {
    padding-bottom: 2.4rem;
    @media only screen and (min-width: 740px) {
      padding-bottom: 3.6rem;
    }
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 1.6rem 0;
    @media only screen and (min-width: 740px) {
      padding: 2.4rem 0;
    }
  }
  p {
    padding-bottom: 1.6rem;
    @media only screen and (min-width: 740px) {
      padding-bottom: 2.4rem;
    }
  }
  blockquote {
    margin-top: 0;
    p {
      padding-bottom: 0;
    }
  }
  ul,
  ol {
    padding-bottom: 1.6rem;
    @media only screen and (min-width: 740px) {
      padding-bottom: 2.4rem;
    }
  }

  ol > li {
    list-style: inherit !important;
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-left: 4rem;
    padding-bottom: 0.8rem;
    list-style-position: outside;
  }
  ul > li {
    list-style: disc !important;
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-left: 4rem;
    padding-bottom: 0.8rem;
  }
  hr {
    margin: 2.4rem 0 1.6rem;
    @media only screen and (min-width: 740px) {
      margin: 3.6rem 0 2.4rem;
    }
  }
  img {
    margin: 4rem 0 1rem 0;
    // max-width: 98rem !important;
    // float: none;
    // margin-left: auto;
    // margin-right: auto;
  }

  /* SCSS for Code Block Styling */

  pre {
    /* Set background color and padding for code block */
    background-color: var(--background-darker);
    padding: var(--spacing-sm);
    border-radius: var(--spacing-xxxs);
    overflow-x: auto;
    margin-bottom: var(--spacing-sm);
  }

  code {
    /* Set font family and size for inline code */
    font-family: monospace;
    font-size: var(--font-xxs);
  }

  /* Set styles for different code languages */
  code[class*="language-"] {
    /* Set font family and size for code blocks */
    font-family: monospace;
    font-size: var(--font-xxs);
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
    left: -2.5em;
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
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 3rem; /* Adjust the spacing between tables */
  font-size: var(--font-xxs);
  line-height: 1.5;
font-weight: var(--font-normal);
  border: var(--border); /* Add a border to all table rows */
  @media only screen and (max-width: 740px) {
    display: block; /* Display as a block element to allow for horizontal scrolling */
    overflow-x: scroll; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent table cells from wrapping */
    width: 100%; /* Ensure the table spans the full width of the viewport */
  }
}

/* Table Header */
th {
  color: var(--text-subtle) !important;
  // opacity: var(--text-subtle) !important;
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
  border-bottom: var(--border); /* Add a border to all table rows */
}
/* RM border on last row */
tr:last-of-type {
  border-bottom: none !important;
}

/* Vertical Borders */
th,
td {
  border-right: var(--border); /* Add a border to all table rows */
}
th:last-of-type,
td:last-of-type {
  border-right: none; /* Add a border to all table rows */
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
//     top: -9999px;
//     left: -9999px;
//   }

//   tr {
//     margin: 0 0 1rem 0;
//   }

//   td {
//     /* Behave like a "row" */
//     border: none;
//     border-bottom: var(--border); /* Border color for table cells */
//     position: relative;
//     padding-left: 50%;
//   }

//   td:before {
//     /* Now like a table header */
//     position: absolute;
//     /* Top/left values mimic padding */
//     top: 0;
//     left: 0;
//     width: 45%;
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
</style>
