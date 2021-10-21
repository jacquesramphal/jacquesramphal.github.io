<template>
  <div>
    
<div class="grid-parent container">
      <TextDefault eyebrow="About Me" header="Multidisciplinary designer of things"/>
      <ThumbMedium filename="about.jpg"/>
    </div>
    <HeroAbout
      title="Multidisciplinary designer of things"
      eyebrow="About Me"
    /> 
        <Stats />


    <DetailCard />

    <div id="" class="">
      <div id="grid-parent" class="container">
        <ThumbLarge
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="400"
          data-aos-once="true"
          data-aos-anchor-placement="top"
          class=""
          title=""
          filename="about.jpg"
          alt="Jacques working at Myplanet"
        />
        <TextDefault
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-once="true"
          eyebrow=" "
          header=" "
          details="Designer/Developer working and playing at Myplanet."
        />
      </div>
    </div>

    <FormCentered />
  </div>
</template>

<script>
import HeroAbout from "@/components/HeroAbout.vue";

import TextDefault from "@/components/text/TextDefault.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import DetailCard from "@/components/card/DetailCard.vue";
import TextImage from "@/components/card/TextImage.vue";
import Stats from "@/components/card/Stats.vue";
// import Form from "@/components/card/Form.vue";
import FormCentered from "@/components/card/FormCentered.vue";

export default {
  name: "Info",
  components: {
    HeroAbout,
    ThumbLarge,
    ThumbMedium,
    TextDefault,
    TextImage,
    DetailCard,
    Stats,
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
