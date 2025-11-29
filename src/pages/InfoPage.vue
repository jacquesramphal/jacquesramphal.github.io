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
      <TextStats />

      <GridParent>
        <TextBlock
          as="h4"
          title="Design systems that ship"
          icon="j-logo.svg"
          iconsize="128"
          alt="Design systems icon"
          description="I architect token-based systems and governance models so teams can move faster with fewer regressions—and designs arrive in code the way they were intended."
        />
        <TextBlock
          as="h4"
          title="AI/AX patterns with Genie"
          icon="j-logo.svg"
          alt="AI/AX icon"
          description="At Orium, I'm designing <a href='/doc/32'>Genie</a>—an AI/AX platform for agentic experiences—where the work isn't just chatting with an assistant, it's collaborating with AI on real, multi-step workflows."
        />
        <TextBlock
          as="h4"
          title="Design-dev bridge & mentorship"
          icon="j-logo.svg"
          alt="Mentorship icon"
          description="I still write code, mentor designers into developers, and care a lot about team health—mindfulness, thoughtful critique, and work that feels sustainable."
        />
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
      eyebrow2="Design Systems & Infrastructure"
      detail2="I build token-based systems, semantic naming, and governance that reduce design-to-dev iteration time by 40% and increase cross-team consistency."
      eyebrow3="AI/AX Design (Genie)"
      detail3="I'm pioneering UX patterns for agentic experiences through <a href='/doc/32'>Genie</a>—rethinking how people collaborate with AI, build trust, and understand what agents can do."
      eyebrow4="Design-Dev Integration & Mentorship"
      detail4="I code my own designs, mentor designers into developers, and bring mindfulness and emotional intelligence into teams so great work doesn't require burnout."
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
