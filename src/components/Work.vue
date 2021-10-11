<template>
  <div>


    <HeroBg
      data-aos="fade"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top"
      data-aos-mirror="true"
    />    
    <FormCentered />  
  </div>
</template>

<script>
import HeroBg from "@/components/HeroBg.vue";
import FormCentered from "@/components/card/FormCentered.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "Work",
  components: {
    HeroBg,
    FormCentered,
    ThumbSmall,
    ThumbSmall2,
    ThumbDetail,
    ThumbLarge,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 10px;
}
.container {
  /*  background-color: var(--color-white);
 padding-top: 2.8em !important; */
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>

<style scoped>
@import "../assets/styles/all.css";
</style>
