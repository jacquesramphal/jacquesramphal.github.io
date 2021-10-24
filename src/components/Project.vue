<template>
  <div id="project" class="">
    <HeroProject title="Project Title" class="" />
    <!-- <ThumbLarge
      id="heroimg"
      data-aos="fade"
      data-aos-duration="1000"
      data-aos-delay="500"
      data-aos-once="true"
      data-aos-anchor-placement="top"
      title="Project Template"
      filename="template.svg"
      alt="Template Project Hero Image"
    /> -->
    <DetailCard2 id="detail1" class="" />

    <div id="" class="">
      <div id="grid-parent" class="container  ">
        <ThumbLarge
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="400"
          data-aos-once="true"
          data-aos-anchor-placement="top"
          class=""
          style="background-color: var(--color-xxlight);"
          title=""
          filename="glo.svg"
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
      <div id="grid-parent" class="container  ">
        <ThumbLarge
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="400"
          data-aos-once="true"
          data-aos-anchor-placement="top"
          class=""
          style="background-color: var(--color-xxlight);"
          title=""
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
    <!-- <DetailCard id="detail2" class="topborder" header="The Solution" /> -->
    <div class="  ">
      <div class=" container ">
        <!-- <h4 style="margin-bottom: 4rem; text-align: center;">More Projects</h4> -->
        <div class="grid-parent  ">
          <div>
            <h4 style="margin-bottom: 4rem;">More Projects</h4>
            <router-link to="Work" style="margin-top: 4rem;">
              <p>All Recent Work</p></router-link
            >
          </div>
          <ThumbSmall
            alt="Project Template"
            data-aos-anchor-placement="top"
            data-aos-delay="400"
            data-aos-duration="1000"
            data-aos-once="true"
            data-aos="fade"
            title="Project Template"
          />
          <ThumbSmall
            alt="Project Template"
            data-aos-anchor-placement="top"
            data-aos-delay="400"
            data-aos-duration="1000"
            data-aos-once="true"
            data-aos="fade"
            title="Project Template"
          />
        </div>
        <!-- <router-link
          :to="{ path: '/Work' + '#recentwork' }"
          style="margin-top: 4rem;"
          ><p>All Recent Work</p></router-link
        >
-->
        <!-- <router-link to="Work" style="margin-top: 4rem;">
              <p>All Recent Work</p></router-link
            >-->
      </div>
    </div>
  </div>
</template>

<script>
import TextDefault from "@/components/text/TextDefault.vue";
import HeroProject from "@/components/HeroProject.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
// import ThumbMedium from "@/components/ThumbMedium.vue";
// import DetailCard from "@/components/card/DetailCard.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";

export default {
  name: "Project",
  components: {
    HeroProject,
    TextDefault,
    // ThumbMedium,
    ThumbSmall,
    ThumbLarge,
    // DetailCard,
    DetailCard2,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#heroimg {
  border-radius: 0 !important;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>

<style scoped></style>
