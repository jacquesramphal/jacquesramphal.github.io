<template>
  <PageWrapper>
    <!--  <RichTextRenderer :document="document" /> -->
    <Container class="hidemobile" tight
      ><HeroBanner
        id="hero"
        class="display"
        v-for="homePage in contentful"
        v-bind:key="homePage.sys.id"
        :title="homePage.heroText"
        eyebrow=""
      />
    </Container>

    <HeroBanner
      id="hero"
      class="display showmobile"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    />

    <!--  <div v-html="homePage.heroRichText" /> -->

    <!-- NOT WORKING -->
    <div v-for="homePage in contentful" v-bind:key="homePage.sys.id">
      <p v-html="richtextToHTML(homePage.heroRichText)"></p>
    </div>
    <!-- ^ NOT WORKING -->

    <Container tight id="work">
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          alt="J Monogram"
          filename="work/j.svg"
          id="top"
          title="Monogram"
        />

        <ThumbSmall2
          alt="Avatar"
          class="hidemobile"
          filename="avatar/avatar.svg"
          route="Project"
          title="Avatar"
        />
        <ThumbSmall
          alt="Avatar"
          class="showmobile"
          filename="avatar/avatar.svg"
          title="Avatar"
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          title="Small Template"
        />
        <ThumbSmall alt="Giftbook" filename="work/gob.svg" title="Giftbook" />

        <ThumbDetail
          alt="Project Template"
          style="background-color: #35363a"
          title="Project Template"
          route="project"
          cta="cta"
          details="This is a project description that would give a preview into the project..."
          eyebrow="he"
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
    <CardRow />
    <!--   <HeroLanding
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :heroText="homePage.heroText"
    /> -->

    <!--    <TextImage flipped route="blog" class="reversed" /> -->
  </PageWrapper>
</template>

<script>
// import RichTextRenderer from "contentful-rich-text-vue-renderer";
// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
// import RichText from "@/components/RichText.vue";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Container from "@/components/grid/Container.vue";
// import HeroLanding from "@/components/HeroLanding.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import CardRow from "@/components/CardRow.vue";

export default {
  name: "Work",
  components: {
    HeroBanner,
    PageWrapper,
    Container,
    // HeroLanding,
    ThumbSmall,
    ThumbSmall2,
    ThumbDetail,
    ThumbLarge,
    // RichText,
    // RichTextRenderer,
    // TextImage,
    CardRow,
  },
  data() {
    return {
      contentful: [],
    };
  },
  async created() {
    this.contentful = await this.getContentful();
  },

  methods: {
    richtextToHTML(content) {
      return documentToHtmlString(content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.title}" />`;
          },
        },
      });
    },

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
  },
};
</script>

<style lang="sass" scoped>
#hero
  border-bottom: none !important
#work
  padding-top: 0 !important
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>
