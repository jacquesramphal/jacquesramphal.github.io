<template>
  <PageWrapper>
    <HeroBanner
      style="background: var(--link-reversed)"
      v-for="about in contentful"
      v-bind:key="about.sys.id"
      :eyebrow="about.eyebrow"
      :title="about.pageTitle"
    />
    <DetailCard
      style="border-top: var(--border)"
      v-for="about in contentful"
      v-bind:key="about.sys.id"
      :header="about.detailHeader"
      :eyebrow1="about.detailEyebrow1"
      :detail1="about.detailDetails1"
      :eyebrow2="about.detailEyebrow1"
      :detail2="about.detailDetails1"
      :eyebrow3="about.detailEyebrow1"
      :detail3="about.detailDetails1"
      :eyebrow4="about.detailEyebrow1"
      :detail4="about.detailDetails1"
    />

    <!--   <Stats
      v-for="about in contentful"
      v-bind:key="about.sys.id"
      :value1="about.statValue1"
      :label1="about.statLabel1"
      :value2="about.statValue2"
      :label2="about.statLabel2"
      :value3="about.statValue3"
      :label3="about.statLabel3"
    /> -->
    <Container>
      <ThumbLarge
        title=""
        filename="about.jpg"
        alt="Jacques working at Myplanet"
        route=""
        caption="This is an image caption"
      />
    </Container>
  </PageWrapper>
</template>

<script>
// import TextImage from "@/components/card/TextImage.vue";

import PageWrapper from "@/components/grid/PageWrapper.vue";
import Container from "@/components/grid/Container.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import DetailCard from "@/components/card/DetailCard.vue";
// import Stats from "@/components/card/Stats.vue";
// import TextImage from "@/components/card/TextImage.vue";
// import AnimatedComponent from "@/components/AnimatedComponent.vue";
// import HeroProject from "@/components/HeroProject.vue";
// import TextBlock from "@/stories/TextBlock.vue";
// import MyResume from "@/components/MyResume.vue";
// import DetailCard2 from "@/components/card/DetailCard2.vue";
// import FormCentered from "@/components/card/FormCentered.vue";

export default {
  name: "Info",
  components: {
    // TextImage,
    PageWrapper,
    Container,
    HeroBanner,
    ThumbLarge,
    DetailCard,
    // Stats,
    // TextImage,
    // AnimatedComponent,
    // HeroProject,
    // TextBlock,
    // DetailCard2,
    // MyResume,
    // Form,
    // FormCentered,
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
    getContentful: async () => {
      const query = `{
       aboutCollection {
         items {
           sys {
             id
           }
           eyebrow
           pageTitle
           detailHeader
           detailEyebrow1
           detailDetails1
           statValue1
           statLabel1
           statValue2
           statLabel2
           statValue3
           statLabel3
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
        return response.data.aboutCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
    },
  },
};
</script>

<style scoped>
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #image-highlight {
    height: 60vh;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #info {
      margin: var(--spacing-lg);
    }
  }
}
</style>

<style scoped></style>
