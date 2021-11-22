<template>
  <div>
    <HeroAbout
      title="Multidisciplinary designer of things"
      eyebrow="About Me"
    />
    <DetailCard />
    <Container>
      <ThumbLarge
        title=""
        filename="about.jpg"
        alt="Jacques working at Myplanet"
        route=""
      />
    </Container>
    <DetailCard2 />
    <FormCentered />
    Test
  </div>
</template>

<script>
import HeroAbout from "@/components/HeroAbout.vue";
import Container from "@/components/Container.vue";
// import AnimatedComponent from "@/components/AnimatedComponent.vue";
// import HeroProject from "@/components/HeroProject.vue";

// import TextBlock from "@/stories/TextBlock.vue";

import ThumbLarge from "@/components/ThumbLarge.vue";
// import MyResume from "@/components/MyResume.vue";
import DetailCard from "@/components/card/DetailCard.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";
// import Stats from "@/components/card/Stats.vue";
import FormCentered from "@/components/card/FormCentered.vue";

export default {
  name: "Info",
  components: {
    Container,
    HeroAbout,
    // AnimatedComponent,
    // HeroProject,
    ThumbLarge,
    // TextBlock,
    DetailCard,
    DetailCard2,
    // MyResume,
    // Stats,
    // Form,
    FormCentered,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info > .container {
  /* padding-top: 0 !important; */
}
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
