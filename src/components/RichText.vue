<template>
  <div id="richtext">
    <RichTextRenderer :document="document" :node-renderers="renderNodes()" />
  </div>
</template>

<script>
import RichTextRenderer from "contentful-rich-text-vue-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
const document = {
  nodeType: "document",
  content: [
    {
      nodeType: "paragraph",
      content: [
        {
          nodeType: "text",
          value: " Let's break the line HERE\n - it works!",
          marks: [],
        },
      ],
    },
  ],
};

export default {
  name: "RichText",
  components: {
    RichTextRenderer,
  },
  data() {
    return {
      document,
    };
  },
  methods: {
    renderNodes() {
      return {
        break: (_node, key, h) => h("br", key, {}),
        [BLOCKS.PARAGRAPH]: (node, key, h, next) => {
          const nodeContentWithNewlineBr = node.content.map((childNode) => {
            if (childNode.nodeType === "text") {
              const splittedValue = childNode.value.split("\n");
              return splittedValue
                .reduce(
                  (aggregate, v, i) => [
                    ...aggregate,
                    { ...childNode, value: v },
                    { nodeType: "break", key: `${key}-br-${i}` },
                  ],
                  []
                )
                .slice(0, -1);
            }

            return childNode;
          });

          node.content = [].concat.apply([], nodeContentWithNewlineBr);

          return h("p", { key }, next(node.content, key, h, next));
        },
      };
    },
  },
};
</script>

<style scoped >
#richtext {
  height: 300px;
  background: red;
  content: "text";
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
