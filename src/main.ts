import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import store from './store';
import { createHead } from '@vueuse/head';
// import { init, track, parameters } from "insights-js";
import './assets/js/gsap.js'; // Import your GSAP file

// Global Components
import AnimatedComponent from '@/components/AnimatedComponent.vue';
import BlogFeed from '@/components/blog/BlogFeed.vue';
// import CardRow from "@/components/CardRow.vue";
import CardRow2 from '@/components/CardRow2.vue';
import ArticleCard from '@/components/card/ArticleCard/ArticleCard.vue';
import TextGrid from '@/components/card/TextGrid.vue';
import TextGrid2 from '@/components/card/TextGrid2.vue';
import TextGrid3 from '@/components/card/TextGrid3.vue';
import FilterBar from '@/components/FilterBar.vue';
import GridParent from '@/components/grid/GridParent.vue';
import GridContainer from '@/components/grid/GridContainer.vue';
import GridWrapper from '@/components/grid/GridWrapper.vue';
import HeroBanner from '@/components/HeroBanner/HeroBanner.vue';
import ImageCard from '@/components/card/ImageCard/ImageCard.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import ImageCard2 from '@/components/card/ImageCard2.vue';
import MyButton from '@/components/Button/Button.vue';
import ButtonRow from '@/components/ButtonRow.vue';
import SidebarNav from './components/SidebarNav.vue';
import SideNav from './components/SideNav.vue';
// import ButtonRow2 from "@/components/ButtonRow2.vue";
import MyLogo from '@/components/MyLogo.vue';
import Icon from '@/components/Icon.vue';
import PageWrapper from '@/components/grid/PageWrapper.vue';
import TextStats from '@/components/card/TextStats.vue';
import TextBlock from '@/components/text/TextBlock/TextBlock.vue';
import TextHeader from '@/components/text/TextHeader.vue';
import TextImage from '@/components/card/TextImage.vue';
import TextLink from '@/components/text/TextLink.vue';

// Heavy or rarely-rendered components are loaded on demand: each becomes its own
// webpack chunk that only downloads when the component first renders, keeping it
// out of the initial entry bundle. None of these sit in the always-mounted app
// shell or above the fold, so splitting them costs no first-paint work — the
// subscribe components render at the very bottom of the home page.
const HeroAnimated = defineAsyncComponent(() => import('./components/HeroAnimated.vue'));
const HeroAnimatedCopy = defineAsyncComponent(() => import('./components/HeroAnimated copy.vue'));
const HeroAnimated2 = defineAsyncComponent(() => import('./components/HeroAnimated2.vue'));
const TestimonialCarousel = defineAsyncComponent(
  () => import('@/components/TestimonialCarousel.vue')
);
const MarkdownRenderer = defineAsyncComponent(
  () => import('@/components/text/MarkdownRenderer.vue')
);
const ProjectPreview = defineAsyncComponent(() => import('@/components/ProjectPreview.vue'));
const DynamicText = defineAsyncComponent(() => import('@/components/text/DynamicText.vue'));
const ThumbDetail = defineAsyncComponent(() => import('@/components/ThumbDetail/ThumbDetail.vue'));
const MyInput = defineAsyncComponent(() => import('./components/form/MyInput.vue'));
const FormCentered = defineAsyncComponent(() => import('./components/card/FormCentered.vue'));
const MyForm = defineAsyncComponent(() => import('./components/card/MyForm.vue'));
const NewsletterSubscription = defineAsyncComponent(
  () => import('./components/form/NewsletterSubscription.vue')
);
const NewsletterBanner = defineAsyncComponent(
  () => import('./components/blog/NewsletterBanner.vue')
);

import router from './router';
import { Directive, DirectiveBinding, VNode } from 'vue';
import { triggerHaptic } from 'tactus';

const isTouchDevice = () => navigator.maxTouchPoints > 0;

// Global haptic feedback — mobile only, respects user toggle
document.addEventListener('click', (e) => {
  if (!isTouchDevice()) return;
  if (localStorage.getItem('user-haptic') === 'off') return;
  const target = (e.target as HTMLElement).closest('a, button');
  if (
    target &&
    !target.hasAttribute('disabled') &&
    target.getAttribute('aria-disabled') !== 'true'
  ) {
    triggerHaptic();
  }
});

// Global sound feedback — respects user toggle
const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;

const playClickSound = () => {
  try {
    if (!AudioCtx) return;
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = 600;
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // ignore AudioContext errors
  }
};

document.addEventListener('click', (e) => {
  if (localStorage.getItem('user-sound') !== 'on') return;
  const target = (e.target as HTMLElement).closest('a, button');
  if (
    target &&
    !target.hasAttribute('disabled') &&
    target.getAttribute('aria-disabled') !== 'true'
  ) {
    playClickSound();
  }
});

// highlight.js is loaded lazily the first time the directive actually runs, so
// its ~35-language "common" build (a big dependency) stays out of the initial
// bundle entirely. Pages without code blocks — the home page included — never
// download it. The import is cached after the first call.
let hljsPromise: Promise<typeof import('highlight.js/lib/common').default> | null = null;
const loadHljs = () => {
  if (!hljsPromise) {
    hljsPromise = import('highlight.js/lib/common').then((m) => m.default);
  }
  return hljsPromise;
};

// Define the custom directive
const highlightjsDirective = {
  deep: true,
  beforeMount: function (el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    if (!targets.length) return;
    loadHljs().then((hljs) => {
      targets.forEach((target) => {
        // if a value is directly assigned to the directive, use this
        // instead of the element content.
        if (binding.value) {
          target.textContent = binding.value;
        }
        hljs.highlightElement(target);
      });
    });
  },
  updated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    if (!targets.length || !binding.value) return;
    loadHljs().then((hljs) => {
      targets.forEach((target) => {
        target.textContent = binding.value;
        hljs.highlightElement(target);
      });
    });
  },
};

export const appear: Directive = {
  beforeMount(element: HTMLElement) {
    element.style.visibility = 'hidden';
  },
  updated(element: HTMLElement, binding: DirectiveBinding<boolean>, node: VNode) {
    if (!binding.value === !binding.oldValue || null === node.transition) {
      return;
    }
    if (!binding.value) {
      node.transition.leave(element, () => {
        element.style.visibility = 'hidden';
      });
      return;
    }
    node.transition.beforeEnter(element);
    element.style.visibility = '';
    node.transition.enter(element);
  },
};

// Create the Vue app instance
const app = createApp(App);
const head = createHead();

// Use the custom directives
app.directive('appear', appear);
app.directive('highlightjs', highlightjsDirective);

// Use plugins, components, and mount the app as before
app.use(router); // Use Vue Router plugin
app.use(store); // Use Vuex store plugin
app.use(head); // Use VueUse Head for dynamic meta tags

// Global Components
app
  .component('AnimatedComponent', AnimatedComponent)
  .component('TestimonialCarousel', TestimonialCarousel)
  .component('BlogFeed', BlogFeed)
  .component('CardRow2', CardRow2)
  .component('ArticleCard', ArticleCard)
  .component('TextGrid', TextGrid)
  .component('TextGrid2', TextGrid2)
  .component('TextGrid3', TextGrid3)
  .component('FilterBar', FilterBar)
  .component('GridContainer', GridContainer)
  .component('GridParent', GridParent)
  .component('GridWrapper', GridWrapper)
  .component('HeroBanner', HeroBanner)
  .component('ImageCard', ImageCard)
  .component('ImageCard2', ImageCard2)
  .component('BreadCrumb', BreadCrumb)
  .component('MyButton', MyButton)
  .component('ButtonRow', ButtonRow)
  .component('MyLogo', MyLogo)
  .component('Icon', Icon)
  .component('PageWrapper', PageWrapper)
  .component('ProjectPreview', ProjectPreview)
  .component('TextStats', TextStats)
  .component('TextBlock', TextBlock)
  .component('TextHeader', TextHeader)
  .component('TextImage', TextImage)
  .component('TextLink', TextLink)
  .component('ThumbDetail', ThumbDetail)
  .component('MarkdownRenderer', MarkdownRenderer)
  .component('DynamicText', DynamicText)
  .component('HeroAnimated', HeroAnimated)
  .component('HeroAnimatedCopy', HeroAnimatedCopy)
  .component('HeroAnimated2', HeroAnimated2)
  .component('MyInput', MyInput)
  .component('NewsletterSubscription', NewsletterSubscription)
  .component('NewsletterBanner', NewsletterBanner)
  .component('FormCentered', FormCentered)
  .component('MyForm', MyForm)
  .component('SidebarNav', SidebarNav)
  .component('SideNav', SideNav);

// Mount the app
app.mount('#app');
