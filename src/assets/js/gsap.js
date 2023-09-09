console.log("GSAP is loaded");

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const fadeInUp = gsap.utils.toArray(".fadeInUp");
const fadeInDown = gsap.utils.toArray(".fadeInDown");
const fadeInRight = gsap.utils.toArray(".fadeInRight");
const fadeInLeft = gsap.utils.toArray(".fadeInLeft");
const parallaxBack = gsap.utils.toArray(".parallaxBack");
const parallaxFront = gsap.utils.toArray(".parallaxFront");

window.onload = function () {
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
};
