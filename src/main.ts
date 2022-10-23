import { createApp } from "vue";
import App from "./App.vue";
import { init, track, parameters } from "insights-js";

// Global Components
import HeroBanner from "@/components/HeroBanner.vue";
import CardRow from "@/components/CardRow.vue";
import GridContainer from "@/components/grid/GridContainer.vue";
import GridWrapper from "@/components/grid/GridWrapper.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import TextLink from "@/components/text/TextLink.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
import AnimatedComponent from "@/components/AnimatedComponent.vue";
import TextBlock from "@/components/TextBlock.vue";
import MyButton from "@/components/Button.vue";
import TextImage from "@/components/card/TextImage.vue";
import DetailCard from "@/components/card/DetailCard.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";
import TextHeader from "@/components/text/TextHeader.vue";
import FilterBar from "@/components/FilterBar.vue";
import StatsBar from "@/components/card/StatsBar.vue";

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
  .use(router, init, track, parameters)
  .directive("appear", appear)
  .mount("#app");

// Global Components
app
  .component("GridContainer", GridContainer)
  .component("HeroBanner", HeroBanner)
  .component("PageWrapper", PageWrapper)
  .component("GridWrapper", GridWrapper)
  .component("TextLink", TextLink)
  .component("ThumbSmall", ThumbSmall)
  .component("ThumbMedium", ThumbMedium)
  .component("ThumbLarge", ThumbLarge)
  .component("CardRow", CardRow)
  .component("AnimatedComponent", AnimatedComponent)
  .component("TextBlock", TextBlock)
  .component("MyButton", MyButton)
  .component("TextImage", TextImage)
  .component("DetailCard", DetailCard)
  .component("DetailCard2", DetailCard2)
  .component("TextHeader", TextHeader)
  .component("FilterBar", FilterBar)
  .component("StatsBar", StatsBar)
  