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
          description="I architect token-based systems and governance models so teams move faster with fewer regressions, and designs arrive in code the way they were intended."
        />
        <TextBlock
          as="h4"
          title="AI/AX patterns with Genie"
          icon="j-logo.svg"
          alt="AI/AX icon"
          description="I built <a href='/doc/building-genie-changed-me'>Genie</a>, an agentic orchestration platform the team works with on real, multi-step delivery, not just chatting with an assistant. The point is giving people hours back for the work that needs judgment."
        />
        <TextBlock
          as="h4"
          title="Design-dev bridge & mentorship"
          icon="j-logo.svg"
          alt="Mentorship icon"
          description="I write production code, mentor designers toward systems and code, and care about team health: mindfulness, thoughtful critique, and work that stays sustainable."
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
      detail2="I build token-based systems, semantic naming, and governance that reduce design-to-development friction by approximately 60% and keep teams consistent."
      eyebrow3="AI/AX Design (Genie)"
      detail3="I design the craft and patterns for agentic experiences through <a href='/doc/building-genie-changed-me'>Genie</a>: how people work with agents, build trust, and understand what agents can do."
      eyebrow4="Design-Dev Integration & Mentorship"
      detail4="I code my own designs, mentor designers toward systems and code, and bring mindfulness and emotional intelligence into teams so good work doesn't require burnout."
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
