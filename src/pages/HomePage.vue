<template>
  <PageWrapper>
    <!-- <HeroAnimated2 /> -->
    <!-- <GridWrapper motif1> -->
    <!-- ^ motif not working -->

    <HeroBanner
      fullvh
      end
      id="hero"
      class="display"
      title="Staff Product Design Engineer with a passion for cross-skill ~ check out my <i><u>work</u></i> and <i><u>writing</u></i>."
    />
    <!-- :title="title" -->

    <!-- HEADER COMPONENT START -->
    <GridContainer style="padding-block-end: var(--spacing-md) !important">
      <div
        class="grid-parent"
        style="align-items: center; grid-template-columns: repeat(3, 1fr)"
      >
        <TextBlock
          style="grid-column: 1 / 3"
          flex="1"
          title="Work & Play"
          as="h2"
          description=""
        />

        <p class="justify-end" style="align-self: center">
          <router-link :to="{ name: 'Library' }">View All</router-link>
        </p>
      </div>
    </GridContainer>
    <!-- HEADER COMPONENT END -->
    <GridContainer style="padding-block-start: 0 !important">
      <GridParent tight id="recentwork ">
        <ImageCard
          class="post"
          :eyebrow="work.featEyebrow"
          :title="work.featTitle"
          :description="work.featDescription"
          :cta="work.label"
          :route="work.route"
          :btnroute="work.btnroute"
          :filename3="work.featImage"
          size="small"
          :style="work.bgcolor"
        />
      

        <ImageCard   alt="J Monogram" filename1="work/j.svg" id="top" />
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
          v-for="entry in work.entries.slice(0, 1)"
          
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
        />
      </GridParent>
    </GridContainer>
    <AnimatedComponent>
      <TextGrid3
        title="About"
        as="h2"
        description=""
        eyebrow1=""
        detail1="I'm a Staff Product Designer & Developer based in Toronto, ON. <br/> <br/>My work explores the intersection between design and development and seeks to embrace emerging technologies for a more efficient and inclusive future.<br/> <br/> From defining comprehensive design systems to ensuring the highest quality in execution, I specialize in full stack design that brings ideas to life with precision and creativity.
      <br/> <br/>
      Passionate about nurturing talent, I provide coaching and professional development to help individuals cross-skill, develop competitive abilities, and support junior designers in expanding their expertise into development.
"
        label="Read More"
        route="doc/30"
      />
    </AnimatedComponent>

    <!-- <TextGrid
      title="About"
      as="h2"
      description=""
      eyebrow1="Full-stack Product Design"
      detail1="From defining comprehensive design systems to ensuring the highest quality in execution, I specialize in full stack design that brings ideas to life with precision and creativity."
      eyebrow2="Coaching"
      detail2="Passionate about nurturing talent, I provide coaching and professional development to help individuals cross-skill, develop competitive abilities, and support junior designers in expanding their expertise into development."
      eyebrow3="Design Critiques"
      detail3="I offer constructive design critiques aimed at enhancing design quality and effectiveness, providing valuable feedback that helps refine and perfect visual and functional elements."
      eyebrow4="Thought Leadership and Musing"
      detail4="Sharing insights and exploring trends in design and technology, I engage in thought leadership and musing to inspire and influence the next generation of designers and developers."
    /> -->
    <AnimatedComponent>
      <CardRow2 />
    </AnimatedComponent>
    <!-- <MyForm/> -->



    <!-- 
    Get in touch banner -->
    <!-- <HeroBanner
        
        
        eyebrow=""
        route="/"
        title="Have a question? Get in touch."
        label="Get in touch"
        labeltwo="Get in touch"
    /> -->
    <!-- </GridWrapper> -->
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
    <!-- <ProductCarousel 
      title="Featured Products" 
      :products="featuredProducts"
    /> -->
  </PageWrapper>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import work from "@/assets/data/work.json";
// import ProductCarousel from '../components/ProductCarousel.vue';
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
      titles: [
        // "Full-stack Designer & Generalist",
        // "Front-end Designer exploring the intersection between design and development",
        // "I&#x2019;m a Sr. Product Design Developer",
        "Staff Product Design Developer with a passion for cross-skill. Check out my work, and tools I use.",
        // "I&#x2019;m a Sr. Design Integration Manager",
        "I'm a Staff Product Design Developer with a passion for cross-skill. Check out my work, and tools I use.",
      ],
      title: "",
      featuredProducts: [
        {
          name: 'Modern Desk Lamp',
          description: 'Sleek LED desk lamp with adjustable brightness',
          image: 'https://source.unsplash.com/400x300/?lamp',
          category: 'Lighting',
          price: '$89.99'
        },
        {
          name: 'Ergonomic Chair',
          description: 'Premium office chair with lumbar support',
          image: 'https://source.unsplash.com/400x300/?chair',
          category: 'Furniture',
          price: '$299.99'
        },
        {
          name: 'Wireless Keyboard',
          description: 'Mechanical keyboard with customizable RGB',
          image: 'https://source.unsplash.com/400x300/?keyboard',
          category: 'Electronics',
          price: '$129.99'
        },
        {
          name: 'Smart Monitor',
          description: '27" 4K display with built-in speakers',
          image: 'https://source.unsplash.com/400x300/?monitor',
          category: 'Electronics',
          price: '$449.99'
        }
      ]
    };
  },
  created() {
    this.title = this.getRandomTitle();
  },
  methods: {
    getRandomTitle() {
      const randomIndex = Math.floor(Math.random() * this.titles.length);
      return this.titles[randomIndex];
    },
  },
  // components: {
  //   ProductCarousel
  // },
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
}
</style>
