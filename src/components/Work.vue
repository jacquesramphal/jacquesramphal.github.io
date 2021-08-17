<template>
  <div>
    <ThemeButton />

    <HeroLanding />
    <div id="recentwork" class="grid-parent container">
      <ThumbSmall
        alt="J Monogram"
        data-aos-anchor-placement="top"
        data-aos-delay="0"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        filename="j.svg"
        id="top"
        title="Monogram"
      />
      <ThumbSmall
        alt="Giftbook"
        data-aos-anchor-placement="top"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        filename="gob.svg"
        title="Giftbook"
      />
      <ThumbSmall2
        alt="Avatar"
        class="hidemobile"
        data-aos-anchor-placement="top"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        filename="avatar.svg"
        route="Project"
        title="Avatar"
      />
      <ThumbSmall
        alt="Avatar"
        class="showmobile"
        data-aos-anchor-placement="top"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        filename="avatar.svg"
        title="Avatar"
      />
      <ThumbSmall
        alt="Template Project"
        style="background-color: var(--color-xxlight);"
        data-aos-anchor-placement="top"
        data-aos-delay="300"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        title="Small Template"
      />
      <ThumbDetail
        alt="Project Template"
        style="background-color: #35363a;"
        data-aos-anchor-placement="top"
        data-aos-delay="400"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        title="Project Template"
      />
      <ThumbLarge
        alt="Template Project"
        class="hidemobile"
        style="background-color: #ffdd9d;"
        data-aos-anchor-placement="top"
        data-aos-delay="500"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        route="Project"
        title="Project Template"
      />
      <ThumbSmall
        alt="Template Project"
        class="showmobile"
        style="background-color: #ffdd9d;"
        data-aos-anchor-placement="top"
        data-aos-delay="300"
        data-aos-duration="1000"
        data-aos-once="true"
        data-aos="fade"
        title="Small Template"
      />
    </div>
  </div>
</template>

<script>
import HeroLanding from "@/components/HeroLanding.vue";
import ThemeButton from "@/components/ThemeButton.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "Work",
  components: {
    HeroLanding,
    ThumbSmall,
    ThemeButton,
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
