<template>
  <div id="info" class="">
    <div id="grid-parent" class="grid-parent container">
      <TextDefault
      />
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="4000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class=""  
        title=""
        filename="about.jpg"
      />
    </div>
    <DetailCard 
      header="Experience"
    />
    <DetailCard 
      header="Skills"

    />

  </div>
</template>

<script>
import TextDefault from "@/components/text/TextDefault.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import DetailCard from "@/components/card/DetailCard.vue";

export default {
  name: "Info",
  components: {
    TextDefault,
    ThumbMedium,
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
