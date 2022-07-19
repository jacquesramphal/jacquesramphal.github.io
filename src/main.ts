import { createApp } from "vue";
import App from "./App.vue";
import { init, track, parameters } from "insights-js";

// Global Components
import HeroBanner from "@/components/HeroBanner.vue";
import Container from "@/components/grid/Container.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import PageWrapper from "@/components/grid/PageWrapper.vue";
import TextLink from "@/components/text/TextLink.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";

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
  .component("Container", Container)
  .component("HeroBanner", HeroBanner)
  .component("PageWrapper", PageWrapper)
  .component("Wrapper", Wrapper)
  .component("TextLink", TextLink)
  .component("ThumbSmall", ThumbSmall)
  .component("ThumbMedium", ThumbMedium)
  .component("ThumbLarge", ThumbLarge)
