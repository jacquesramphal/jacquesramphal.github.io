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
      this.renderedMarkdown = marked(markdown);
    },
  },
  components: { GridContainer },
};
</script>

<style lang="scss">
/* ---- MARKDOWN STYLING ---- */

.markdown {
  h1 {
    padding: 2rem 0;
    @media only screen and (min-width: 740px) {
      padding: 3.6rem 0 4.8rem 0;
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
    padding: 2rem 0;
    @media only screen and (min-width: 740px) {
      padding: 2rem 0;
    }
    @media only screen and (min-width: 1201px) {
    }
  }
  p {
    padding-top: 0;
  }
  li {
    list-style: disc;
    font-size: var(--font-xs);
    font-weight: var(--font-medium);
    line-height: 1.8;
    font-variation-settings: "wdth" 102, "opsz" 19;
    margin-left: 1.8rem;
    padding-bottom: 1rem;
  }
  hr 
  {
    margin: 2.8rem 0;
    @media only screen and (min-width: 740px) {
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
}
</style>