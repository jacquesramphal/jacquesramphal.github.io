<template>
  <div>
    <HeroLanding />
    <div id="grid-parent" class="grid-parent container">
      <ThumbSmall
        id="top"
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        title="Monogram"
        filename="j.svg"
        alt="J Monogram"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        title="Giftbook"
        filename="gob.svg"
        alt="Giftbook"
      />
      <ThumbSmall2
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="hidemobile"
        title="Avatar"
        filename="avatar.svg"
        alt="Avatar"
        route="Project"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="showmobile"
        title="Avatar"
        filename="avatar.svg"
        alt="Avatar"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="300"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        title="Small Template"
        filename="template-m.svg"
        alt="Template Project"
      />
      <ThumbDetail
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="400"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        title="Project Template"
        alt="Project Template"
      />
      <ThumbLarge
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        title="Project Template"
        filename="template.svg"
        route="Project"
        alt="Template Project"
      />
    </div>
  </div>
</template>

<script>
import HeroLanding from "@/components/HeroLanding.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "Work",
  components: {
    HeroLanding,
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
