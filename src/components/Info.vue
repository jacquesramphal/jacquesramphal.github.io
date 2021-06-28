<template>
  <div id="info" class="">
    <div id="grid-parent" class="container ">
      <TextDefault
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        eyebrow=""
        header="Information"
        details="Designer/Developer working and playing at Myplanet"
      />
    </div>

    <ThumbMedium
      data-aos="fade"
      data-aos-duration="1000"
      data-aos-delay="400"
      data-aos-once="true"
      data-aos-anchor-placement="top"
      class=""
      title=""
      filename="about-cropped.png"
      alt="Jacques working at Myplanet"
    />

    <DetailCard header="Section" class="" />
  
<div id="" class="reversed">
    <div id="grid-parent" class="container ">
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="400"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class=""
        title=""
      filename="about-cropped.png"
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
    <DetailCard header="Contact Info" class="" />
    <!-- <Form header="Email me" class="" /> -->
  </div>
</template>

<script>
// import HeroAbout from "@/components/HeroAbout.vue";

import TextDefault from "@/components/text/TextDefault.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import DetailCard from "@/components/card/DetailCard.vue";
// import Form from "@/components/card/Form.vue";

export default {
  name: "Info",
  components: {
    // HeroAbout,

    TextDefault,
    ThumbMedium,
    DetailCard,
    // Form,
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
  }
}
</style>

<style scoped></style>
