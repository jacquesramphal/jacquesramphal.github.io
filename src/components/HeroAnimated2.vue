<template>
  <div id="bg" class="fullvh" v-if="!hide" :class="{ disabled: disable }">
    <div
      v-for="n in 24"
      :key="n"
      class="animate"
      :class="['shape', getRandomShape(), getRandomDelay()]"
    ></div>
  </div>
</template>

<style scoped>
.fullvh {
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 0.4;
  z-index: 10000;
  overflow: visible !important;
}

.shape {
  position: absolute;
  width: 120px;
  height: 120px;
  /* mix-blend-mode: luminosity; */
}

.circle {
  border-radius: 50%;
}

.square {
  /* No additional styles needed for square */
}

/*
.triangle {
  width: 120px;
  height: 120px;
  border-left: 60px solid transparent; 
  border-right: 60px solid transparent; 
  border-bottom: 104px solid red; 
} */
.delay-1 {
  animation-delay: 0.5s;
}

.delay-2 {
  animation-delay: 0.6s;
}

.delay-3 {
  animation-delay: 0.7s;
}

.delay-4 {
  animation-delay: 0.8s;
}
</style>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Define a custom Bezier curve for smoother easing
CustomEase.create("smoothEase", "M0,0 C0.42,0 0.58,1 1,1");

export default {
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.animateShapes();
    window.addEventListener("resize", this.positionShapes);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.positionShapes);
  },
  methods: {
    animateShapes() {
      const shapes = document.querySelectorAll(".shape");

      this.positionShapes();

      shapes.forEach((shape) => {
        this.createBrownianMotion(shape);
      });

      // ScrollTrigger.create({
      //   trigger: "#bg",
      //   start: "top top",
      //   end: "bottom bottom",
      //   onUpdate: (self) => {
      //     gsap.to(shapes, {
      //       x: `+=${self.getVelocity() * 0.1}`,
      //       y: `+=${self.getVelocity() * 0.1}`,
      //       duration: 1,
      //       ease: "smoothEase",
      //     });
      //   },
      // });
    },
    positionShapes() {
      const shapes = document.querySelectorAll(".shape");
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const colors = ["red", "blue", "goldenrod", "green", "purple"];

      shapes.forEach((shape) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        gsap.set(shape, {
          x: Math.random() * vw,
          y: Math.random() * vh - vh,
          backgroundColor: color,
          // zIndex: Math.floor(Math.random() * 1000) // Random z-index between 0 and 999
        });

        // Adjust triangle color separately
        if (shape.classList.contains("triangle")) {
          gsap.set(shape, {
            borderBottomColor: color,
          });
        }
      });
    },
    createBrownianMotion(shape) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(shape, {
        x: () => `+=${Math.random() * 200 - 100}`,
        y: () => `+=${Math.random() * 200 - 100}`,
        rotation: () => `+=${Math.random() * 720 - 180}`,
        duration: () => Math.random() * 3 + 2,
        ease: "smoothEase",
      });
    },
    getRandomShape() {
      const shapes = ["circle", "square", "triangle"];
      return shapes[Math.floor(Math.random() * shapes.length)];
    },
    getRandomDelay() {
      // Return a random delay class between delay-1 and delay-4
      const delays = ["delay-1", "delay-2", "delay-3", "delay-4"];
      return delays[Math.floor(Math.random() * delays.length)];
    },
  },
};
</script>
<style scoped>
.disabled {
  /* Add styles to stop the animation, e.g., stop animation frames */
  animation: none;
}
</style>
