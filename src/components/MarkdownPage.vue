<template>
  <div>
    <aside class="toc">
      <ul>
        <li v-for="heading in headings" :key="heading.id">
          <a :href="'#' + heading.id">{{ heading.text }}</a>
        </li>
      </ul>
    </aside>
    <MarkdownRenderer :markdown="markdownContent" @headings="handleHeadings" />
  </div>
</template>

<script>
import MarkdownRenderer from "@/components/text/MarkdownRenderer.vue";

export default {
  components: { MarkdownRenderer },
  data() {
    return {
      markdownContent: "# Sample Markdown\n## Heading 1\n### Heading 2",
      headings: [],
    };
  },
  methods: {
    handleHeadings(headings) {
  console.log("Received headings in parent:", headings); // Debugging
  this.headings = headings;
}
  },
};
</script>

<style>
/* Add some basic styling for the TOC */
.toc {
  margin-bottom: 1rem;
}

.toc ul {
  list-style-type: none;
  padding: 0;
}

.toc li {
  margin-bottom: 0.5rem;
}

.toc a {
  text-decoration: none;
  color: #007bff;
}

.toc a:hover {
  text-decoration: underline;
}
</style>