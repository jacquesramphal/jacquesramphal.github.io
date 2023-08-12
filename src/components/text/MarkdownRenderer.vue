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

marked.use(
  markedHighlight({
    langPrefix: "hljs language-", // Add this line to specify the langPrefix
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
      renderedMarkdown: "",
    };
  },
  watch: {
    markdown: {
      immediate: true,
      handler(newMarkdown) {
        this.renderMarkdown(newMarkdown);
      },
    },
  },
  methods: {
    renderMarkdown(markdown) {
      this.renderedMarkdown = marked(markdown, {
        mangle: false,
        headerIds: false,
      });
    },
  },
  components: { GridContainer },
};
</script>

<style lang="scss">
/* ---- MARKDOWN STYLING ---- */

.markdown {
  h1 {
    padding-bottom: 2.4rem;
    @media only screen and (min-width: 740px) {
      padding-bottom: 3.6rem;
    }
    @media only screen and (min-width: 1201px) {
    }
  }
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    padding-bottom: 1.6rem;
    @media only screen and (min-width: 740px) {
      padding-bottom: 2.4rem;
    }
    @media only screen and (min-width: 1201px) {
    }
  }
  ul,
  ol {
    padding-bottom: 1.6rem;
    @media only screen and (min-width: 740px) {
      padding-bottom: 2.4rem;
    }
    @media only screen and (min-width: 1201px) {
    }
  }

  ol > li {
    list-style: inherit;
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-left: 4rem;
    padding-bottom: 0.8rem;
    list-style-position: outside;
  }
  ul > li {
    list-style: disc;
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-left: 4rem;
    padding-bottom: 0.8rem;
  }
  hr {
    margin: 1.6rem 0 2.4rem 0;
    @media only screen and (min-width: 740px) {
      margin: 1.6rem 0 3.6rem 0;
    }
    @media only screen and (min-width: 1201px) {
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
    background:var(--background-darker);
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

</style>
