<template>
  <PageWrapper>
    <!--  <RichTextRenderer :document="document" /> -->
    <HeroBanner
      id="hero"
      title="Selected Work"
      subtitle="A collection of recent work and play lorem ipsum doler."
      eyebrow=""
      label="Request Access"
      route="login"
    />

    <Container id="work">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Section Title</h4>
        <!-- <p class="external justify-end">
          <router-link :to="{ name: 'Work' }">View All</router-link>
        </p> -->
      </div>
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          filename="templates/template-v2.svg"
          style="background-color: lightpink"
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
        <ThumbSmall
          style="background-color: var(--color-lightyellow)"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
      </div>
    </Container>
    <TextImage
      class=""
      flipped
      style="background: var(--bg-darker)"
      filename="work/glo.svg"
      header="Featured Project"
      details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="project"
      cta="Read More"
    />
    <Container id="work">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Section Title</h4>
        <!-- <p class="external justify-end">
          <router-link :to="{ name: 'Work' }">View All</router-link>
        </p> -->
      </div>
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          filename="templates/template-v2.svg"
          style="background-color: lightpink"
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
        <ThumbSmall
          style="background-color: var(--color-lightyellow)"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
<ThumbSmall
          alt="Template Project"
          style="background-color: pu"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
        
        <ThumbSmall
          style="background-color: palegoldenrod"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall
          filename="templates/template-mobile-blank.svg"
          style="background-color: lightgreen"
        />
         <!-- Large tile mobile override START -->
        <ThumbSmall
          class="showmobile"
          alt="Template Project"
          filename="work/glo.svg"
          route="project"
          title="Fortune 100"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbLarge
          class="hidemobile"
          filename="work/glo.svg"
          route="project"
          title="Fortune 100"
          details="This is a project description that would give a preview into the project..."
        />
        <!-- Large tile mobile override END -->

        <!-- Medium tile mobile override START -->
        <ThumbSmall
          class="showmobile"
          alt="Template Project"
          filename="work/dod.svg"
          title="DevopsDays Toronto"
        />
        <ThumbMedium
          class="hidemobile"
          alt="DevopsDays Toronto"
          filename="work/dod.svg"
          title="DevopsDays Toronto"
        />
        <!-- Medium tile mobile override END -->

        <ThumbSmall
          style="background-color: var(--bg-darker)"
          alt="Template Project"
          filename="templates/template-desktop-mobile.svg"
                    title="Project Template"

        />
        <ThumbSmall
          alt="Brb Splash"
          details="This is a project description that would give a preview into the project..."
          filename="splash.svg"
          title="BRB Splash"
        />
        <ThumbSmall
                  style="background-color: var(--color-lightyellow)"

          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
      </div>
    </Container>  

    <!-- <CardRow /> -->
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
// import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import TextImage from "@/components/card/TextImage.vue";

// import ThumbDetail from "@/components/ThumbDetail.vue";
// import ThumbLarge from "@/components/ThumbLarge.vue";
import HeroBanner from "@/components/HeroBanner.vue";
// import CardRow from "@/components/CardRow.vue";

export default {
  name: "Work2",
  components: {
    HeroBanner,
    PageWrapper,
    Container,
    ThumbSmall,
    // ThumbSmall2,
    // ThumbDetail,
    // RichText,
    // RichTextRenderer,
    // CardRow,
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
  // padding-top: var(--spacing-sm) !important
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>
