<template>
  <div id="library" class="">
    <PageNav tag="Component Examples" />

    <div id="headings" class="container grid-parent">
      <div class="grid-card">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </div>
      <div class="grid-card">
        <p style="max-width: 560px;">
          Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <p>
          Additional Inline Tags: <b>Bold</b>, <strong>Strong</strong>,
          <i>Italics</i>, <em>Emphasis</em>
        </p>
      </div>
    </div>
    <!-- <div id="buttons" class="container grid-parent reversed">
      <h4>Buttons</h4>
      <div class="grid-parent">
        <div id="" class="">
          <MyButton text="This is Button Text" class="btn-toggle btn-primary" />
        </div>
        <div id="" class="">
          <MyButton
            text="This is Button Text"
            class="btn-toggle btn-secondary"
          />
        </div>
        <div id="" class="">
          <MyButton text="This is Button Text" class="btn-toggle btn-outline" />
        </div>
      </div>
    </div> -->
    <Hero header="Reversed" class="reversed" />

    <Hero header="Default" />

    <HeroBg />
    <HeroProject class="eightyvh" header="Lorem Ipsum Doler Optima Sit Amet" />

    <DetailCard header="Reversed" class="reversed" />

    <Form />
    <TextImage header="Default" />

    <div class="grid-parent container">
      <TextDefault />
      <ThumbMedium />
    </div>
  </div>
</template>

<script>
import PageNav from "@/components/PageNav.vue";
import Hero from "@/components/Hero.vue";
import HeroBg from "@/components/HeroBg.vue";
import HeroProject from "@/components/HeroProject.vue";
import TextDefault from "@/components/text/TextDefault.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import DetailCard from "@/components/card/DetailCard.vue";
import TextImage from "@/components/card/TextImage.vue";
import Form from "@/components/card/Form.vue";

export default {
  name: "Info",
  components: {
    PageNav,
    Hero,
    HeroBg,
    HeroProject,
    TextDefault,
    ThumbMedium,
    DetailCard,
    TextImage,
    Form,
  },
  mounted() {
    let uiScript = document.createElement("script");
    uiScript.setAttribute("src", "./scripts/ui.js");
    document.head.appendChild(uiScript);
  },
};
</script>

<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#buttons {
  grid-template-columns: 1fr;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #buttons {
  }
}
/* ------------ BREAKPOINT LG ------------ */
@media only screen and (min-width: 1201px) {
}
</style>
