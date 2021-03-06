<template>
  <div id="workplay">
    <div id="grid-parent" class="grid-parent container">
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="yellow"
        title="Monogram"
        filename="j.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="grey"
        title="Giftbook"
        filename="gob.svg"
      />
      <ThumbSmall2
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="pink hidemobile"
        title=""
        filename="avatar.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="pink showmobile"
        title="Avatar"
        filename="avatar.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="300"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="grey"
        title="Small Template"
        filename="template-m.svg"
      />
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="400"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="rose"
        title="DevopsDays"
        filename="dod.svg"
      />
      <ThumbLarge
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="blue"
        title="Project Template"
        filename="glo.svg"
      />
    </div>
  </div>
</template>

<script>
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "WorkPlay",
  components: {
    ThumbSmall,
    ThumbSmall2,
    ThumbMedium,
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
  padding-top: 2.8em !important;
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
