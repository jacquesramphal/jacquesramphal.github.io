<template>
  <PageWrapper id="project" class="">
    
    <!-- Testing Route Params -->
    <h2>{{ $route.params.id }}</h2>

    <HeroBanner
      :key="entry.id"
      :title="`${entry.title}`"
      :subtitle="`${entry.description}`"
    />
    <GridContainer tight>
      <ThumbLarge
        title=""
        :filename="`${entry.filename}`"
        :alt="`${entry.alt}`"
        route=""
      />
    </GridContainer>

    <DetailCard2 id="detail1" class="" />

    <GridContainer style="padding-top: 0 !important">
      <ThumbLarge
        title=""
        filename="work/glo.svg"
        alt="Jacques working at Myplanet"
        route=""
        caption="This is an image caption"
      />
    </GridContainer>

    <TextImage filename="work/glo.svg" flipped class="" />
    <TextImage filename="work/glo.svg" class="" />

    <!-- <CardRow header="Related Work" /> -->
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import TextImage from "@/components/card/TextImage.vue";
import projectData from "@/assets/data/projects.json";

export default {
  name: "ProjectPage",
  components: {
    PageWrapper,
    TextImage,
    ThumbLarge,
    DetailCard2,
    HeroBanner,
  },
  // computed: {
  //   destinationId() {
  //     return parseInt(this.$route.params.id)
  //     // return parseInt(this.$route.replace("/Project/"+this.id))
  //   },
  //   destination(){
  //     return sourceData.destinations.find(destination => destination.Id == this.destinationId)
  //   }
  // }

  computed: {
    projectId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return projectData.entries.find((entry) => entry.Id == this.entryId);
    },
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
