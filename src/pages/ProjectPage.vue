<template>
  <PageWrapper id="work" class="">
    <HeroBanner
      overlap
      eyebrow=""
      :filename="`${entry.thumbnail}`"
      :key="entry.id"
      :title="`${entry.title}`"
    />

    <TextGrid2
      id="detail1"
      class=""
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
      :subtitle="`${entry.subtitle}`"
      :description="`${entry.description}`"
    />
    <SplitImage class="fadeInLeft" />
    <div v-html="htmlContent"></div>

    <!-- <TextStats
      label1="Role"
      :value1="`${entry.role}`"
      label2="Type"
      :value2="`${entry.type}`"
      label3="Year"
      :value3="`${entry.year}`"
    /> -->
    <!-- <ProjectPreview
      screenshotUrl="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/091abd59-87bb-46c8-92d2-14d6faf629d1/d2hr6ab-356b2e45-5725-4994-9851-a754ea9fd5bc.jpg/v1/fill/w_1600,h_1000,q_75,strp/desktop_screenshot_by_juggleboy711.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wOTFhYmQ1OS04N2JiLTQ2YzgtOTJkMi0xNGQ2ZmFmNjI5ZDEvZDJocjZhYi0zNTZiMmU0NS01NzI1LTQ5OTQtOTg1MS1hNzU0ZWE5ZmQ1YmMuanBnIiwid2lkdGgiOiI8PTE2MDAiLCJoZWlnaHQiOiI8PTEwMDAifV1dfQ.6FQZz6R88KV-NlQ73JUgAEXGSOEMK6oDdhQbXB0pxaw"
    /> -->
    <GridContainer class="fadeInLeft">
      <ImageCard
        size="large"
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
        caption="This is a caption."
      />
    </GridContainer>
    <GridContainer class="fadeInRight">
      <ImageCard
        size="large"
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
        caption="This is a caption."
      />
    </GridContainer>
    <GridContainer class="fadeInDown">
      <ImageCard
        size="large"
        title=""
        :filename="`${entry.images.filename1}`"
        :alt="`${entry.alt}`"
        route=""
        caption="This is a caption."
      />
    </GridContainer>
    <SplitImage class="" flipped />
    <SplitImage class="" />
    <SplitImage class="" flipped />
    <SplitImage class="" />
    <SplitImage class="fadeInLeft" flipped />
    <SplitImage class="fadeInRight" />
    <SplitImage class="fadeInLeft" flipped />
    <SplitImage class="fadeInRight" />
  </PageWrapper>
</template>

<script>
// External js for gsap not working
import "@/assets/js/gsap.js";

import workData from "@/assets/data/work.json";
// import content from "@/assets/content/content.md";
// import marked from 'marked';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "ProjectPage",
  components: {},

  // data() {
  //   return {
  //     htmlContent: "",
  //   };
  // },

  computed: {
    workId() {
      return parseInt(this.$route.params.id);
    },
    entry() {
      return workData.entries.find((entry) => entry.id == this.workId);
    },
  },
  mounted() {
    // this.htmlContent = marked(content);
    const fadeInUp = gsap.utils.toArray(".fadeInUp");
    const fadeInDown = gsap.utils.toArray(".fadeInDown");
    const fadeInRight = gsap.utils.toArray(".fadeInRight");
    const fadeInLeft = gsap.utils.toArray(".fadeInLeft");
    const parallaxBack = gsap.utils.toArray(".parallaxBack");
    const parallaxFront = gsap.utils.toArray(".parallaxFront");

    fadeInUp.forEach((fadeInUp) => {
      gsap.from(fadeInUp, {
        scrollTrigger: {
          trigger: fadeInUp,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        y: 100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInDown.forEach((fadeInDown) => {
      gsap.from(fadeInDown, {
        scrollTrigger: {
          trigger: fadeInDown,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        y: -100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInRight.forEach((fadeInRight) => {
      gsap.from(fadeInRight, {
        scrollTrigger: {
          trigger: fadeInRight,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        x: 100,
        duration: 3,
        ease: "none",
      });
    });
    fadeInLeft.forEach((fadeInLeft) => {
      gsap.from(fadeInLeft, {
        scrollTrigger: {
          trigger: fadeInLeft,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "restart pause reverse pause",
        },
        autoAlpha: 0,
        x: -100,
        duration: 3,
        ease: "none",
      });
    });
    parallaxBack.forEach((parallaxBack) => {
      gsap.to(parallaxBack, {
        scrollTrigger: {
          trigger: parallaxBack,
          scrub: true,
        },
        yPercent: 10,
        duration: 3,
        ease: "none",
      });
    });
    parallaxFront.forEach((parallaxFront) => {
      gsap.to(parallaxFront, {
        scrollTrigger: {
          trigger: parallaxFront,
          scrub: true,
        },
        yPercent: -10,
        duration: 3,
        ease: "none",
      });
    });
  },
};
</script>

<style scoped></style>
