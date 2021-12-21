<template>
  <PageWrapper>
    <HeroBanner background eyebrow="About Me" title="About this site" />
    <DetailCard2 />
    <Container tight>
      <ThumbLarge
        title=""
        filename="about.jpg"
        alt="Jacques working at Myplanet"
        route=""
      />
    </Container>
    <DetailCard
      header="This is a Header"
      eyebrow1="Eyebrow 1"
      eyebrow2="Eyebrow 2"
      eyebrow3="Eyebrow 3"
      eyebrow4="Eyebrow 4"
    />
    <TextImage route="blog" class="reversed" filename="about.jpg" />
    <TextImage flipped route="blog" class="" />

    <DetailCard
      class="reversed"
      header="This is a Header"
      eyebrow1="Eyebrow 1"
      eyebrow2="Eyebrow 2"
      eyebrow3="Eyebrow 3"
      eyebrow4="Eyebrow 4"
    />
    <Container tight>
      <ThumbLarge
        title=""
        filename="about.jpg"
        alt="Jacques working at Myplanet"
        route=""
      />
    </Container>
    <FormCentered />
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Container from "@/components/grid/Container.vue";
import TextImage from "@/components/card/TextImage.vue";

import HeroBanner from "@/components/HeroBanner.vue";
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
    PageWrapper,
    Container,
    HeroBanner,
    TextImage,
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
