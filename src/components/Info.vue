<template>
  <div id="info" class="">
    <div id="grid-parent" class="grid-parent container">
      <TextDefault
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
      />
      <ThumbMedium
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
    </div>
    <DetailCard header="Skills" class="reversed" />
    <DetailCard header="Experience" />
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
