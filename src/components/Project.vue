<template>
  <div id="project" class="">
    <HeroProject eyebrow="" title="Project Template" class="" />
   <!-- <ThumbLarge
      id="heroimg"
      data-aos="fade"
      data-aos-duration="1000"
      data-aos-delay="500"
      data-aos-once="true"
      data-aos-anchor-placement="top"
      title="Project Template"
      filename="template.svg"
      alt="Template Project Hero Image"
    /> -->
    <DetailCard id="detail1" class="reversed" header="Process" />

    <div class="container tight reversed">
      <ThumbLarge
        id="heroimg2"
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        title="Project Template"
        filename="template.svg"
        alt="Template Project Hero Image"
      />
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

/* add to global styles layout.css */
.tight {
 padding-top: 0 !important;
  /* padding-bottom: 0 !important; */
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
