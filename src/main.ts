import { createApp } from "vue";
import App from "./App.vue";
import hljs from "highlight.js";
import store from "./store";
import { createHead } from "@vueuse/head";
// import { init, track, parameters } from "insights-js";
import "./assets/js/gsap.js"; // Import your GSAP file

// Global Components
import AnimatedComponent from "@/components/AnimatedComponent.vue";
import CourseCard from "@/components/card/CourseCard.vue";
import BlogFeed from "@/components/blog/BlogFeed.vue";
// import CardRow from "@/components/CardRow.vue";
import CardRow2 from "@/components/CardRow2.vue";
import ArticleCard from "@/components/card/ArticleCard/ArticleCard.vue";
import TextGrid from "@/components/card/TextGrid.vue";
import TextGrid2 from "@/components/card/TextGrid2.vue";
import TextGrid3 from "@/components/card/TextGrid3.vue";
import FilterBar from "@/components/FilterBar.vue";
import GridParent from "@/components/grid/GridParent.vue";
import GridContainer from "@/components/grid/GridContainer.vue";
import GridWrapper from "@/components/grid/GridWrapper.vue";
import HeroBanner from "@/components/HeroBanner/HeroBanner.vue";
import HeroAnimated from "./components/HeroAnimated.vue";
import HeroAnimatedCopy from "./components/HeroAnimated copy.vue";
import HeroAnimated2 from "./components/HeroAnimated2.vue";
import ImageCard from "@/components/card/ImageCard/ImageCard.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import ImageCard2 from "@/components/card/ImageCard2.vue";
import MyButton from "@/components/Button/Button.vue";
import ButtonRow from "@/components/ButtonRow.vue";
import SidebarNav from "./components/SidebarNav.vue";
import SideNav from "./components/SideNav.vue";
// import ButtonRow2 from "@/components/ButtonRow2.vue";
import MyLogo from "@/components/MyLogo.vue";
import Icon from "@/components/Icon.vue";
import TestimonialCarousel from "@/components/TestimonialCarousel.vue";
import MarkdownRenderer from "@/components/text/MarkdownRenderer.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
import TextStats from "@/components/card/TextStats.vue";
import TextBlock from "@/components/text/TextBlock/TextBlock.vue";
import TextHeader from "@/components/text/TextHeader.vue";
import DynamicText from "@/components/text/DynamicText.vue";
import TextImage from "@/components/card/TextImage.vue";
import TextLink from "@/components/text/TextLink.vue";
import ThumbDetail from "@/components/ThumbDetail/ThumbDetail.vue";
import MyInput from "./components/form/MyInput.vue";
import FormCentered from "./components/card/FormCentered.vue";
import MyForm from "./components/card/MyForm.vue";
import NewsletterSubscription from "./components/form/NewsletterSubscription.vue";

import router from "./router";
import { Directive, DirectiveBinding, VNode } from "vue";
import { preloadFont } from "@/utils/fontLoader";

// Define the custom directive
const highlightjsDirective = {
  deep: true,
  beforeMount: function (el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll("code");
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  updated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll("code");
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  },
};

export const appear: Directive = {
  beforeMount(element: HTMLElement) {
    element.style.visibility = "hidden";
  },
  updated(
    element: HTMLElement,
    binding: DirectiveBinding<boolean>,
    node: VNode
  ) {
    if (!binding.value === !binding.oldValue || null === node.transition) {
      return;
    }
    if (!binding.value) {
      node.transition.leave(element, () => {
        element.style.visibility = "hidden";
      });
      return;
    }
    node.transition.beforeEnter(element);
    element.style.visibility = "";
    node.transition.enter(element);
  },
};

// Create the Vue app instance
const app = createApp(App);
const head = createHead();

// Use the custom directives
app.directive("appear", appear);
app.directive("highlightjs", highlightjsDirective);

// Use plugins, components, and mount the app as before
app.use(router); // Use Vue Router plugin
app.use(store); // Use Vuex store plugin
app.use(head); // Use VueUse Head for dynamic meta tags

// Global Components
app
  .component("AnimatedComponent", AnimatedComponent)
  .component("TestimonialCarousel", TestimonialCarousel)
  .component("CourseCard", CourseCard)
  .component("BlogFeed", BlogFeed)
  .component("CardRow2", CardRow2)
  .component("ArticleCard", ArticleCard)
  .component("TextGrid", TextGrid)
  .component("TextGrid2", TextGrid2)
  .component("TextGrid3", TextGrid3)
  .component("FilterBar", FilterBar)
  .component("GridContainer", GridContainer)
  .component("GridParent", GridParent)
  .component("GridWrapper", GridWrapper)
  .component("HeroBanner", HeroBanner)
  .component("ImageCard", ImageCard)
  .component("ImageCard2", ImageCard2)
  .component("BreadCrumb", BreadCrumb)
  .component("MyButton", MyButton)
  .component("ButtonRow", ButtonRow)
  .component("MyLogo", MyLogo)
  .component("Icon", Icon)
  .component("PageWrapper", PageWrapper)
  .component("ProjectPreview", ProjectPreview)
  .component("TextStats", TextStats)
  .component("TextBlock", TextBlock)
  .component("TextHeader", TextHeader)
  .component("TextImage", TextImage)
  .component("TextLink", TextLink)
  .component("ThumbDetail", ThumbDetail)
  .component("MarkdownRenderer", MarkdownRenderer)
  .component("DynamicText", DynamicText)
  .component("HeroAnimated", HeroAnimated)
  .component("HeroAnimatedCopy", HeroAnimatedCopy)
  .component("HeroAnimated2", HeroAnimated2)
.component("MyInput", MyInput)
.component("NewsletterSubscription", NewsletterSubscription)
.component("FormCentered", FormCentered)
.component("MyForm", MyForm)
.component("SidebarNav", SidebarNav)
.component("SideNav", SideNav);

// Preload Epilogue font for CounterText component
// This ensures the font is cached before the component mounts
preloadFont('assets/type/epilogue/epilogue-regular.ttf');

// Mount the app
app.mount("#app");
