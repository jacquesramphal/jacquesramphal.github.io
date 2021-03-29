<template>
  <div id="workplay">
    <TextImage />
    <TextImage />
    <TextImage />
    <div id="grid-parent" class="grid-parent container">
      <!-- Inline components vs nested above -->
      <TextDefault />
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="4000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="blue"
        title=""
        filename="glo.svg"
      />
    </div>
  </div>
</template>

<script>
import ThumbMedium from "@/components/ThumbMedium.vue";
import TextImage from "@/components/card/TextImage.vue";
import TextDefault from "@/components/text/TextDefault.vue";

export default {
  name: "WorkPlay",
  components: {
    TextDefault,
    TextImage,
    ThumbMedium,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 10px;
}
.container {
  /* padding-top: 2.8em !important; */
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
