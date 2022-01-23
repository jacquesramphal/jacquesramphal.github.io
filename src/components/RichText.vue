<template>
  <div>
    e
    <RichTextRenderer
      :document="richTextJson"
      :node-renderers="renderNodes()"
    />
  </div>
</template>



<script>
import Asset from "../components/Asset.vue";
import RichTextRenderer from "contentful-rich-text-vue-renderer";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export default {
  components: {
    RichTextRenderer,
  },
  data() {
    return {
      richTextJson: {
        nodeType: "document",
        data: {},
        content: [
          {
            nodeType: "paragraph",
            content: [
              {
                nodeType: "text",
                value:
                  "Our model is built around a series of key objects allowing for simple representations of complex buying structures and customer relationship.\nIt all start from the end. The model is centred around delivery points called ",
                marks: [],
                data: {},
              },
              {
                nodeType: "hyperlink",
                content: [
                  {
                    nodeType: "text",
                    value: "",
                    marks: [],
                    data: {},
                  },
                ],
                data: {
                  uri:
                    "https://developer.rechargepayments.com/2021-11/addresses",
                },
              },
              {
                nodeType: "text",
                value: "",
                marks: [],
                data: {},
              },
              {
                nodeType: "embedded-entry-inline",
                content: [],
                data: {
                  target: {
                    sys: {
                      id: "6V2vsJ1CZNaCpMY9cbGDz8",
                      type: "Link",
                      linkType: "Entry",
                    },
                  },
                },
              },
              {
                nodeType: "text",
                value:
                  ". Addresses represent either the physical point of delivery of a set of products or the invoicing centre for non-physical goods. All addresses are uniquely associated to a ",
                marks: [],
                data: {},
              },
              {
                nodeType: "hyperlink",
                content: [
                  {
                    nodeType: "text",
                    value: "",
                    marks: [],
                    data: {},
                  },
                ],
                data: {
                  uri:
                    "https://developer.rechargepayments.com/2021-11/customers/customers_object",
                },
              },
              {
                nodeType: "text",
                value: "",
                marks: [],
                data: {},
              },
              {
                nodeType: "embedded-entry-inline",
                content: [],
                data: {
                  target: {
                    sys: {
                      id: "34TKHFFIDIpu4ZbGyUZHaj",
                      type: "Link",
                      linkType: "Entry",
                    },
                  },
                },
              },
              {
                nodeType: "text",
                value:
                  "who can himself have several addresses.\nCustomers have one or more ",
                marks: [],
                data: {},
              },
              {
                nodeType: "embedded-entry-inline",
                content: [],
                data: {
                  target: {
                    sys: {
                      id: "2tVku96mh9bY8VgjJKSovO",
                      type: "Link",
                      linkType: "Entry",
                    },
                  },
                },
              },
              {
                nodeType: "text",
                value:
                  "which they use to pay for goods and services on the website, for recurring orders or as one-off purchases using replenishment SMS, upsell or adding on to their recurring order as a one off.",
                marks: [],
                data: {},
              },
            ],
            data: {},
          },
          {
            nodeType: "embedded-asset-block",
            content: [],
            data: {
              target: {
                sys: {
                  id: "4YYJ5nQKoHZwW9DEE4dJLl",
                  type: "Link",
                  linkType: "Asset",
                },
              },
            },
          },
          {
            nodeType: "paragraph",
            content: [
              {
                nodeType: "text",
                value: "",
                marks: [],
                data: {},
              },
            ],
            data: {},
          },
        ],
      },
    };
  },
  methods: {
    renderNodes() {
      return {
        [BLOCKS.EMBEDDED_ASSET]: (node, key, h) =>
          h("p", { key: key }, [
            h("h1", { key: "h1" }, "Render our asset component here"),
            h(Asset, {
              key: "asset",
              props: { id: node?.data?.target?.sys?.id },
            }),
          ]),
      };
    },
    renderRichText() {
      const options = {
        renderNode: {
          // ISSUE: We want to render our asset component
          [BLOCKS.EMBEDDED_ASSET]: (node) =>
            `<p>
                <h1>Render our asset component here<h1>
                <Asset :sys-id="${node?.data?.target?.sys?.id}" />
             </p>
             `,
        },
      };
      return documentToHtmlString(this.richTextJson, options);
    },
  },
};
</script>