<template>
  <div>
    <HeroLanding />
    <div id="recentwork" class="grid-parent container">
      <ThumbSmall alt="J Monogram" filename="j.svg" id="top" title="Monogram" />
      <ThumbSmall alt="Giftbook" filename="gob.svg" title="Giftbook" />
      <ThumbSmall2
        alt="Avatar"
        class="hidemobile"
        filename="avatar.svg"
        route="Project"
        title="Avatar"
      />
      <ThumbSmall
        alt="Avatar"
        class="showmobile"
        filename="avatar.svg"
        title="Avatar"
      />
      <ThumbSmall
        alt="Template Project"
        style="background-color: lightblue"
        filename="template-sm3.svg"
        title="Small Template"
      />
      <ThumbDetail
        alt="Project Template"
        style="background-color: #35363a"
        title="Project Template"
      />
      <ThumbLarge
        alt="Template Project"
        class="hidemobile"
        style="background-color: #ffdd9d"
        route="Project"
        title="Project Template"
      />
      <ThumbSmall
        alt="Template Project"
        class="showmobile"
        style="background-color: #ffdd9d"
        title="Small Template"
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
