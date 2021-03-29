<template>
  <div id="project" class="">
    <HeroProject eyebrow="Eyebrow" title="Project Template" class="eightyvh" />
    <ThumbLarge id="heroimg" title="" filename="template.svg" />
    <DetailCard id="detail1" class="" header="Process" />

    <div class="container">
      <ThumbLarge />
    </div>
    <DetailCard id="detail2" class="" header="My Role" />
  </div>
</template>

<script>
import HeroProject from "@/components/HeroProject.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import DetailCard from "@/components/card/DetailCard.vue";

export default {
  name: "Project",
  components: {
    HeroProject,
    ThumbLarge,
    DetailCard,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#project > .container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
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
