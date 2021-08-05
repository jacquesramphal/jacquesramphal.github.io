<template>
  <div id="info" class="tight">
    <div id="grid-parent" class="">
     <!-- <TextDefault
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        header="Information"
      /> 
    <h3 class="" >(He/Him) Jacques Ramphal</h3>-->
    </div>

    <DetailCard2
      header="Section"
      class=""
      description="I'm a Designer/Developer at Myplanet where process and values are grounded in the principle of empathy-for-all and emphasize collaboration, flexibility, and humanity. As an early hire, I've seen the culture adapt and grow in an ever-changing tech landscape of the unknown. Self-awareness and empathy are at the core of both my journey, and Myplanet's."
    />    

</div>
   
</template>

<script>
// import HeroAbout from "@/components/HeroAbout.vue";

// import TextDefault from "@/components/text/TextDefault.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";
// import Form from "@/components/card/Form.vue";

export default {
  name: "Info",
  components: {
    // HeroAbout,

    // TextDefault,
    DetailCard2,
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
