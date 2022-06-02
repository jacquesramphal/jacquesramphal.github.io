<template>
  <PageWrapper>
    <!--  <RichTextRenderer :document="document" /> -->
    <HeroBanner
      id="hero"
      class="display"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    />
    <!--  <div v-html="homePage.heroRichText" /> -->

    <!-- NOT WORKING
    <div v-for="homePage in contentful" v-bind:key="homePage.sys.id">
      <p v-html="richtextToHTML(homePage.heroRichText)"></p>
    </div>
^ NOT WORKING -->

    <Container id="work">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h3 class="subtle" style="text-align: left">🎨 Work</h3>
        <p class="external justify-end">
          <router-link :to="{ name: 'Work' }">View All</router-link>
        </p>
      </div>
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
          filename="templates/template-mobile.svg"
        />
        <ThumbSmall alt="Giftbook" filename="work/gob.svg" title="Giftbook" />

        <ThumbDetail
          alt="Project Template"
          style="background-color: #35363a"
          title="Project Title"
          route="project"
          cta="cta"
          details="This is a project description that would give a preview into the project..."
        />
        <!-- <ThumbLarge
          title=""
          filename="work/glo.svg"
          class="hidemobile"
          alt="Jacques working at Myplanet"
          route=""
        />
        <ThumbSmall
          alt="Template Project"
          class="showmobile"
          style="background-color: #ffdd9d"
          title="Small Template"
        /> -->
      </div>
    </Container>
    <TextImage class="" filename="about.jpg" header="About Me" route="info" cta="Learn More"/>
    <CardRow />
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
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import TextImage from "@/components/card/TextImage.vue";

import ThumbDetail from "@/components/ThumbDetail.vue";
// import ThumbLarge from "@/components/ThumbLarge.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import CardRow from "@/components/CardRow.vue";

export default {
  name: "Work",
  components: {
    HeroBanner,
    PageWrapper,
    Container,
    ThumbSmall,
    ThumbSmall2,
    ThumbDetail,
    // RichText,
    // RichTextRenderer,
    CardRow,
    TextImage,
  },
  props: {
    // header: {
    //   type: String,
    //   default: "Work",
    // },
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
  padding-top: var(--spacing-sm) !important
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>
