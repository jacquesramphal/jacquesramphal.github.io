<template>
  <div id="project" class="">
    <PageNav />
    <Hero header="Project Template" class="halfvh" />
    <ThumbLarge title="" />
    <DetailCard class="offblack reversed" header="Details" />
    <TextImage />
    <ThumbLarge title="" />
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import TextImage from "@/components/card/TextImage.vue";
import PageNav from "@/components/PageNav.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import DetailCard from "@/components/card/DetailCard.vue";

export default {
  name: "Project",
  components: {
    Hero,
    PageNav,
    TextImage,
    ThumbLarge,
    DetailCard,
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
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>

<style scoped></style>
