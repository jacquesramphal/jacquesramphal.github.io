<template>
  <PageWrapper>
    <HeroBanner id="hero" title="About" />
    <!-- <Stats
      v-for="about in contentful"
      v-bind:key="about.sys.id"
      :value1="about.statValue1"
      :label1="about.statLabel1"
      :value2="about.statValue2"
      :label2="about.statLabel2"
      :value3="about.statValue3"
      :label3="about.statLabel3"
    />  -->
    <GridContainer class="animate delay-2">
      <TextStats/>

      <GridParent>
        <TextBlock
          as="h4"
          title="TextBlock"
          icon="j-logo.svg"
          iconsize="128"
          alt="Image alt"
        />
        <TextBlock as="h4" title="TextBlock" icon="j-logo.svg" alt="Image alt" />
        <TextBlock as="h4" title="TextBlock" icon="j-logo.svg" alt="Image alt" />
      </GridParent>
    </GridContainer>
  
    <TestimonialCarousel />
    <TextImage />
    <TextImage flipped />
    <TextGrid
      v-for="about in contentful"
      v-bind:key="about.sys.id"
      :title="about.detailHeader"
      :eyebrow1="about.detailEyebrow1"
      :detail1="about.detailDetails1"
      eyebrow2="Component Library"
      detail2="UI Regression Testing with Storybook and Chromatic ensures my components are throughly tested and documented"
      eyebrow3="SEO & Accessibility"
      detail3="UI Regression Testing with Storybook and Chromatic ensures my components are throughly tested and documented"
      eyebrow4="Future-Proof Ramstack"
      detail4="Clean design, Javascript, API, Headless CMS. Carefully selected tools and frameworks keep this site alive and flexible to grow as I do."
    />
    <!-- <HeroBanner
      id="hero"
      style="background: var(--background-darker)"
      eyebrow=""
      title="Multi-disciplinary Designer."
    /> -->
    

  </PageWrapper>
</template>

<script>
export default {
  name: "InfoPage",
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
@media only screen and (min-width: 768px) {
  #image-highlight {
    block-size: 60vh;
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
