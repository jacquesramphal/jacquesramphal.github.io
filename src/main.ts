import { createApp } from "vue";
import App from "./App.vue";
// import { init, track, parameters } from "insights-js";


// Global Components
import AnimatedComponent from "@/components/AnimatedComponent.vue";
import BlogCard from "@/components/card/BlogCard.vue";
import BlogFeed from "@/components/blog/BlogFeed.vue";
import CardRow from "@/components/CardRow.vue";
import CardRow2 from "@/components/CardRow2.vue";
import DefaultCard from "@/components/card/DefaultCard.vue";
import TextGrid from "@/components/card/TextGrid.vue";
import TextGrid2 from "@/components/card/TextGrid2.vue";
import FilterBar from "@/components/FilterBar.vue";
import GridContainer from "@/components/grid/GridContainer.vue";
import GridWrapper from "@/components/grid/GridWrapper.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import ImageCard from "@/components/ImageCard.vue";
import ImageCard2 from "@/components/ImageCard2.vue";
import MyButton from "@/components/Button.vue";
import MyLogo from "@/components/MyLogo.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import ProjectPreview from "@/components/ProjectPreview.vue";
import TextStats from "@/components/card/TextStats.vue";
import TextBlock from "@/components/TextBlock.vue";
import TextHeader from "@/components/text/TextHeader.vue";
import SplitImage from "@/components/card/SplitImage.vue";
import TextLink from "@/components/text/TextLink.vue";
import ThumbDetail from "@/components/ThumbDetail.vue";


import router from "./router";
import { Directive, DirectiveBinding, VNode } from "vue";
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
const app = createApp(App);
app
  .use(router)
  .directive("appear", appear)
  .mount("#app");

// Global Components
app
  .component("AnimatedComponent", AnimatedComponent)
  .component("BlogCard", BlogCard)
  .component("BlogFeed", BlogFeed)
  .component("CardRow", CardRow)
  .component("CardRow2", CardRow2)
  .component("DefaultCard", DefaultCard)
  .component("TextGrid", TextGrid)
  .component("TextGrid2", TextGrid2)
  .component("FilterBar", FilterBar)
  .component("GridContainer", GridContainer)
  .component("GridWrapper", GridWrapper)
  .component("HeroBanner", HeroBanner)
  .component("ImageCard", ImageCard)
  .component("ImageCard2", ImageCard2)
  .component("MyButton", MyButton)
  .component("MyLogo", MyLogo)
  .component("PageWrapper", PageWrapper)
  .component("ProjectPreview", ProjectPreview)
  .component("TextStats", TextStats)
  .component("TextBlock", TextBlock)
  .component("TextHeader", TextHeader)
  .component("SplitImage", SplitImage)
  .component("TextLink", TextLink)
  .component("ThumbDetail", ThumbDetail)