<template>
  <PageWrapper>
    <GridWrapper motif1>
      <!-- ^ motif not working -->
      <HeroBanner
        id="hero"
        class="display"
        title="Jake is a Full-stack Designer"
      />
    </GridWrapper>
    <!-- CONTENTFUL HEADER EXAMPLE -->
    <!-- <HeroBanner
      id="hero"
      class="display"
      v-for="homePage in contentful"
      v-bind:key="homePage.sys.id"
      :title="homePage.heroText"
      eyebrow=""
    /> -->

    <!-- <GridContainer id="work" class="">
      <div
        class="grid-parent"
        style="
          padding-block-end: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Library</h4>
        <MyButton
          type="outline"
          style="margin-block-start: var(--spacing-sm)"
          class="justify-end"
          label="View More"
          route="work2"
        />
      </div>
    </GridContainer> -->

    <!-- HEADER COMPONENT START -->
    <!-- <GridContainer>
      <div
        class="grid-parent"
        style="
          padding-block-end: 0;
          align-items: center;
          grid-template-columns: repeat(3, 1fr);
        "
      >
        <TextBlock
          style="grid-column: 1 / 3"
          title="Library"
          description=""
        />
        <p class="external justify-end" style="align-self: middle">
          <router-link :to="{ name: 'Library' }">View All</router-link>
        </p>
      </div>
    </GridContainer> -->
    <!-- HEADER COMPONENT END -->

    <GridContainer
      tight
      style="padding-block-start: 0"
      id="work"
      class="animate glow delay-1"
    >
      <GridParent id="recentwork ">
        <ImageCard
          class="post"
          :eyebrow="work.featEyebrow"
          :title="work.featTitle"
          :description="work.featDescription"
          :cta="work.label"
          :route="work.route"
          :btnroute="work.btnroute"
          :filename1="work.featImage"
          size="large"
        />

        <!-- <ImageCard   alt="J Monogram" filename1="work/j.svg" id="top" />
        <ImageCard2 
          alt="Avatar"
          class="hidemobile"
          filename1="avatar/avatar.svg"
          title="Avatar"
        />
        <ImageCard 
          alt="Avatar"
          class="showmobile"
          filename1="avatar/avatar.svg"
          title="Avatar"
        />
        <ImageCard
          v-for="entry in work.entries"
          :key="entry.id"
          class="post"
          :eyebrow="entry.tag"
          :title="entry.title"
          :description="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :filename1="entry.filename1"
          :filename2="entry.filename2"
          :filename3="entry.filename3"
          :alt="entry.alt"
          :style="entry.bgcolor"
          :size="entry.size"
          :buttons="entry.buttonsData"
        /> -->
        <!-- <DefaultCard
          cover
          v-for="entry in work.entries"
          :key="entry.id"
          :tag="entry.tag"
          :filename="entry.filename1"
          :alt="entry.alt"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        /> -->
      </GridParent>
    </GridContainer>
    <!-- <TextGrid
      title="What I Do"
      eyebrow1="Full-stack Product Design"
      detail1="From defining comprehensive design systems to ensuring the highest quality in execution, I specialize in full stack design that brings ideas to life with precision and creativity."
      eyebrow2="Coaching"
      detail2="Passionate about nurturing talent, I provide coaching and professional development to help individuals cross-skill, develop competitive abilities, and support junior designers in expanding their expertise into development."
      eyebrow3="Design Critiques"
      detail3="I offer constructive design critiques aimed at enhancing design quality and effectiveness, providing valuable feedback that helps refine and perfect visual and functional elements."
      eyebrow4="Thought Leadership and Musing"
      detail4="Sharing insights and exploring trends in design and technology, I engage in thought leadership and musing to inspire and influence the next generation of designers and developers."
    /> -->
    <TextImage filename="work/glo.svg" />

    <!-- <HeroBanner eyebrow="01" filename="work/glo.svg" background overlap/> -->

    <CardRow2 />
    <!-- <TestimonialCarousel /> -->

    <!-- 
    Get in touch banner -->
    <!-- <HeroBanner
        
        
        eyebrow=""
        route="/"
        title="Have a question? Get in touch."
        label="Get in touch"
        labeltwo="Get in touch"
    /> -->
  </PageWrapper>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import work from "@/assets/data/work.json";
// import TestimonialCarousel from "@/components/TestimonialCarousel.vue";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "HomePage",
  props: {
    // work: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      work,
      // contentful: [],
    };
  },
  components: {},
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
          end: "top 50%",
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
          end: "top 50%",
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
          end: "top 50%",
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
          end: "top 50%",
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

<style lang="scss">
@media only screen and (min-width: 1201px) {
  .banner-container {
    // background-color: red !important;
    padding: 0 !important;
  }
}
</style>
