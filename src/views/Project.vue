<template>
  <PageWrapper id="project" class="">
    <!-- <HeroProject title="Project Title" class="" /> -->
    <HeroBanner title="Project Title" subtitle="Short description of the project details and overview."/>

    <Container tight>
      <ThumbLarge
        title=""
        filename="work/glo.svg"
        alt="Jacques working at Myplanet"
        route=""
      />
    </Container>
  
        <DetailCard2 id="detail1" class="" />

     
<Container  style="padding-top: 0 !important;">
      <ThumbLarge
        title=""
        filename="work/glo.svg"
        alt="Jacques working at Myplanet"
        route=""
        caption="This is an image caption"
      />
    </Container>
    <!-- <Stats/> -->

        <TextImage filename="work/glo.svg" flipped class=""/>
        <TextImage filename="work/glo.svg"  class=""/>

 
 



  

    <!-- <CardRow header="Related Work" /> -->
    
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Container from "@/components/grid/Container.vue";
// import TextDefault from "@/components/text/TextDefault.vue";
// import HeroProject from "@/components/HeroProject.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
// import ThumbMedium from "@/components/ThumbMedium.vue";
// import DetailCard from "@/components/card/DetailCard.vue";
// import Stats from "@/components/card/Stats.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";
import HeroBanner from "@/components/HeroBanner.vue";
// import CardRow from "@/components/CardRow.vue";

import TextImage from "@/components/card/TextImage.vue";

export default {
  name: "Project",
  components: {
    PageWrapper,
    Container,
    TextImage,
    // HeroProject,
    // TextDefault,
    // ThumbMedium,
    ThumbLarge,
    // DetailCard,
    DetailCard2,
    HeroBanner,
    // Stats,
    // CardRow,
  },
};
</script>

<style scoped>
#heroimg {
  border-radius: 0 !important;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>

<style scoped></style>
