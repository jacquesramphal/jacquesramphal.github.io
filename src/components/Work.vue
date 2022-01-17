<template>
  <PageWrapper>
    <!-- <RichTextRenderer :document="document" /> -->
    <HeroLanding
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :heroText="homePage.heroText"

    />
    <Container tight>
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          alt="J Monogram"
          filename="j.svg"
          id="top"
          title="Monogram"
        />
        <ThumbSmall alt="Giftbook" filename="gob.svg" title="Giftbook" />
        <ThumbSmall2
          alt="Avatar"
          class="hidemobile"
          filename="avatar.svg"
          route="Project"
          title="Avatar"
        />
        <ThumbSmall
          alt="Avatar"
          class="showmobile"
          filename="avatar.svg"
          title="Avatar"
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          filename="template-sm3.svg"
          title="Small Template"
        />
        <ThumbDetail
          alt="Project Template"
          style="background-color: #35363a"
          title="Project Template"
        />
        <ThumbLarge
          alt="Template Project"
          class="hidemobile"
          style="background-color: #ffdd9d"
          route="Blog"
          title="Project Template"
        />
        <ThumbSmall
          alt="Template Project"
          class="showmobile"
          style="background-color: #ffdd9d"
          title="Small Template"
        />
      </div>
    </Container>
    <!--    <TextImage flipped route="blog" class="reversed" /> -->
  </PageWrapper>
</template>

<script>
// import RichTextRenderer from "contentful-rich-text-vue-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

// import RichText from "@/components/RichText.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Container from "@/components/grid/Container.vue";
import HeroLanding from "@/components/HeroLanding.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";



const mock = {

      nodeType: "document",
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "text",
              value: "Hello World 👋🏽 I’m a Front-End Designer deep in a rabbit hole.",
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    };




export default {
  name: "Work",
  components: {
    PageWrapper,
    Container,
    HeroLanding,
    ThumbSmall,
    ThumbSmall2,
    ThumbDetail,
    ThumbLarge,
    // RichText,
    // RichTextRenderer,
    // TextImage,
  },
  data() {
    return {
      contentful: [],
      mock,
    };
  },
  async created() {
    this.contentful = await this.getContentful();
  },
  methods: {
    getContentful: async () => {
      const query = `{
       homePageCollection {
         items {
           sys {
             id
           }
           heroText
           heroRichText {
             json
           }
         }
       }
     }`;
      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions).then((response) =>
          response.json()
        );
        return response.data.homePageCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
    },
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

<style lang="sass" scoped>
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>
