<template>
  <PageWrapper id="work" class="">
    <HeroBanner
      center
      background
      fullvh
      style="scroll-snap-align: start"
      title="Jacques’s Product"
      subtitle="A simple description telling the user the benefits of the product and why they should buy it."
      label="View Product"
      route="/"
      filename="about.jpg"
    />

    <GridContainer tight class="animate glow delay-1">
      <ImageCard alt="alt" size="large" filename1="splash.svg" />
    </GridContainer>

    <!-- <GridWrapper style="background: var(--color-lightyellow)">
      <GridContainer>
        <GridParent rows>
          <TextBlock
          center
            as="h2"
            title="Jacques's Product"
            subtitle="A simple description telling the user the benefits of the product and why they should buy it."
          />

          <GridParent>
            <TextBlock center as="h4" title="Title 1" />
            <TextBlock center as="h4" title="Title 2" />
            <TextBlock center as="h4" title="Title 3" />
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper> -->

    <TextGrid title="Key Features" />
    <!-- <TextGrid2/> -->

    <GridWrapper>
      <GridContainer>
        <GridParent rows>
          <TextBlock
          center
            as="h2"
            title="Key Benefits"
            subtitle="A simple description telling the user the benefits of the product and why they should buy it."
          />

          <GridParent tight>
            <ArticleCard
              icon="j-logo.svg"
              iconsize="40"
              title="Feature 1"
              description="A simple description telling the user the benefits of the product and why they should buy it."
            />
            <ArticleCard
              icon="j-logo.svg"
              iconsize="40"
              title="Feature 2"
              description="A simple description telling the user the benefits of the product and why they should buy it."
            />
            <ArticleCard
              icon="j-logo.svg"
              iconsize="40"
              title="Feature 3"
              description="A simple description telling the user the benefits of the product and why they should buy it."
            />
          </GridParent>
          <GridParent>
            <ArticleCard
              borderless
              icon="j-logo.svg"
              iconsize="40"
              title="Feature 1"
              description="A simple description telling the user the benefits of the product and why they should buy it."
            />
            <ArticleCard
              borderless
              icon="j-logo.svg"
              iconsize="40"
              title="Feature 2"
              description="A simple description telling the user the benefits of the product and why they should buy it."
            />
            <ArticleCard
              borderless
              icon="j-logo.svg"
              iconsize="40"
              title="Feature 3"
              description="A simple description telling the user the benefits of the product and why they should buy it."
            />
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper>
    <div class="section">
      <TextImage
        style="background: var(--background-darker)"
        eyebrow="Feature"
        title="Feature2"
        class="fadeInUp"
        filename="article/cover2.png"
      />
      <TextImage
        flipped
        eyebrow="Feature"
        title="Feature1"
        class="fadeInUp"
        filename="article/cover3.png"
      />
      <TextImage
        style="background: var(--background-darker)"
        eyebrow="Feature"
        title="Feature3"
        class="fadeInUp"
        filename="article/cover4.png"
      />
    </div>

    <CardRow2 title="Read the Docs" kind="writing" :viewAllTo="{ name: 'WritingIndex' }" />

    <HeroBanner
      center
      as="h2"
      title="Ready to get started?"
      label="Request a Trial"
      route="/"
    />
  </PageWrapper>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  // Get all focusable divs
  const divs = document.querySelectorAll('div[tabindex="0"]');

  // Function to change focus
  function changeFocus(currentIndex, direction) {
    let nextIndex = currentIndex + direction;

    // Ensure nextIndex wraps around properly
    if (nextIndex >= divs.length) {
      nextIndex = 0; // Loop back to the first
    } else if (nextIndex < 0) {
      nextIndex = divs.length - 1; // Loop back to the last
    }

    // Check if the element exists before focusing
    if (divs[nextIndex]) {
      divs[nextIndex].focus();
    } else {
      console.error("Element not found for index:", nextIndex);
    }
  }

  // Keydown event listener
  document.addEventListener("keydown", (e) => {
    // Ensure there are divs to focus
    if (divs.length > 0) {
      const currentIndex = Array.from(divs).indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        changeFocus(currentIndex, 1); // Move down
        e.preventDefault(); // Prevent scrolling
      } else if (e.key === "ArrowUp") {
        changeFocus(currentIndex, -1); // Move up
        e.preventDefault(); // Prevent scrolling
      }
    }
  });
});

export default {
  name: "ProductPage",
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

<style scoped>
html,
body {
  overflow: hidden;
}
</style>
