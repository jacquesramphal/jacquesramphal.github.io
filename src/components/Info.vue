<template>
  <div>
    <!--    <HeroAbout eyebrow="(He/Him)" /> -->
     <DetailCard3
      header="Section"
      id="info"
      class=""
      description="I'm a Designer/Developer at Myplanet where process and values are grounded in the principle of empathy-for-all and emphasize collaboration, flexibility, and humanity. As an early hire, I've seen the culture adapt and grow in an ever-changing tech landscape of the unknown. Self-awareness and empathy are at the core of both my journey, and Myplanet's."
    />
    
    <div id="" class="">
      <div id="grid-parent" class="container  ">
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
  </div>
</template>

<script>
// import HeroAbout from "@/components/HeroAbout.vue";

import TextDefault from "@/components/text/TextDefault.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import DetailCard3 from "@/components/card/DetailCard3.vue";
// import Form from "@/components/card/Form.vue";

export default {
  name: "Info",
  components: {
    // HeroAbout,
    ThumbLarge,
    TextDefault,
    DetailCard3,
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
    #info {
      margin: 8rem;
    }
  }
}
</style>

<style scoped></style>
