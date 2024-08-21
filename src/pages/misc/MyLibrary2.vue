<template>
  <PageWrapper id="library" class="library">
    <aside class="sidebar">
      <nav>
        <ul>
          <li><a href="#headings">Headings</a></li>
          <li><a href="#paragraphs">Paragraphs</a></li>
          <li><a href="#buttons">Buttons</a></li>
          <!-- Add more navigation links as needed -->
        </ul>
      </nav>
    </aside>
    <main class="content">
      <GridContainer id="headings" class="grid-parent">
        <div class="grid-card">
          <h1>Heading 1</h1>
          <h1>Heading 2</h1>
          <h2>Heading 3</h2>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
        <div class="grid-card">
          <p style="max-width: 560px">
            Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
          <p>
            Additional Inline Tags: <b>Bold</b>, <strong>Strong</strong>,
            <i>Italics</i>, <em>Emphasis</em>
          </p>
        </div>
      </GridContainer>
      <GridContainer id="buttons" class="grid-parent reversed">
        <h4>Buttons</h4>
        <div class="grid-parent">
          <div id="" class="">
            <MyButton
              text="This is Button Text"
              class="btn-toggle btn-primary"
            />
          </div>
          <div id="" class="">
            <MyButton
              text="This is Button Text"
              class="btn-toggle btn-secondary"
            />
          </div>
          <div id="" class="">
            <MyButton
              text="This is Button Text"
              class="btn-toggle btn-outline"
            />
          </div>
        </div>
      </GridContainer>

      <Hero header="Reversed" class="reversed" />

      <Hero header="Default" />

      <HeroBg />
      <HeroAnimated />

      <TextGrid header="Reversed" class="reversed" />

      <MyForm />
      <FormCentered />
      <TextImage header="Default" />
    </main>
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";

// import HeroBanner from "@/components/HeroBanner.vue";
import HeroBg from "@/components/HeroBg.vue";
import HeroAnimated from "@/components/HeroAnimated.vue";
import TextGrid from "@/components/card/TextGrid.vue";
import TextImage from "@/components/card/TextImage.vue";
import MyForm from "@/components/card/MyForm.vue";
import FormCentered from "@/components/card/FormCentered.vue";

export default {
  name: "MyLibrary",
  components: {
    PageWrapper,
    // HeroBanner,
    HeroBg,
    HeroAnimated,
    TextGrid,
    TextImage,
    MyForm,
    FormCentered,
  },
  mounted() {
    let uiScript = document.createElement("script");
    uiScript.setAttribute("src", "./scripts/ui.js");
    document.head.appendChild(uiScript);
  },
};
</script>

<style lang="scss" scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#buttons {
  grid-template-columns: 1fr;
}
.library {
  display: grid;
  grid-gap: var(--spacing-lg);
  color: var(--foreground);
  font-size: var(--font-2xs);
  grid-template-areas: "sidebar" "content";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  min-block-size: auto;

  @media only screen and (min-width: 768px) {
    grid-template-areas: "sidebar content";
    grid-template-columns: 30% 1fr;
    grid-template-rows: auto 1fr auto;
    padding-block-start: var(--spacing-xl) !important;
  }
}

.sidebar {
  grid-area: sidebar;
  z-index: 1;
  overflow-x: hidden;
  position: relative;
  inline-size: auto;
  justify-content: start;
  flex-direction: column;
  display: flex;
  flex: 1;

  @media only screen and (min-width: 768px) {
    inline-size: 25vw;
    padding-block-start: var(--spacing-xl);
    inset-block-start: 0;
    inset-block-end: 0;
    position: fixed;
    padding-block-end: var(--spacing-md) !important;
  }
  .content {
    grid-area: content;
  }

  /* override styles when printing */
}
</style>
