<template>
  <AnimatedComponent>
    <GridWrapper id="wrapper" class="">
      <GridContainer>
        <GridParent
          tight
          style="
            grid-template-columns: none !important;
            grid-template-rows: repeat(2, auto);
          "
        >
          <div class="">
            <!-- Profile Picture -->
            <router-link to="/resume"
              ><img
                id="avatar"
                class="justify-end"
                src="../assets/images/portrait.jpg"
                draggable="false"
                alt="logo.svg"
                style="width: 120px; aspect-ratio: 1 / 1"
            /></router-link>
          </div>
          <GridParent tight class="outer">
            <div id="maindetails">
              <TextBlock
                as="h4"
                title="Jacques Ramphal"
                description="I lead design work where systems, code, and AI meet—building the practices and platforms that let cross-functional teams deliver meaningful products efficiently and sustainably."
              />
            </div>
            <GridParent tight id="content">
              <div id="links1">
                <p class="subtle">Useful Links</p>

                <ul>
                  <li v-for="(item, index) in menuItems1" :key="index">
                    <router-link :to="item.route">
                      <DynamicText
                        as="p"
                        tabIndex="0"
                        :attrs="{ class: '' }"
                        :text="item.text"
                      />
                    </router-link>
                  </li>
                </ul>
              </div>

              <div id="links2">
                <p class="subtle">Let's Connect</p>
                <ul>
                  <li v-for="(item, index) in menuItems2" :key="index">
                  
                    <!-- :icon="item.icon"
                      iconsize="16" -->

                    <TextLink
                      :label="item.text"
                      :link="item.url"
                    />
                  </li>

               
                </ul>
              </div>
              <div id="links3">
                <p class="subtle">More</p>
                <ul>
                  <!-- <li class="">
                    <a>Privacy Policy</a>
                  </li> -->
                  <!-- <li>
                    <TextLink label="Offerings" route="/doc/28" />
                  </li> -->
                  <!-- <NewsletterSubscription style="margin-block-start: var(--size-4);"/> -->
                </ul>
              </div>
            </GridParent>
          </GridParent>
          <div class="footer-utility">
            <p class="footer" style="font-size: var(--font-400)">
              <span class="footer-copy footer-copy--full">
                All rights reserved © Jacques Ramphal 2025 🇨🇦
              </span>
              <span class="footer-copy footer-copy--short">© 2025 Jacques Ramphal</span>
              <!-- © 2023 Jacques Ramphal — Built with
              <a target="blank" href="https://v3.vuejs.org/">Vue3</a>.
          
              Deployed on
              <a target="blank" href="https://www.netlify.com/">Netlify</a>. -->
            </p>
            <div class="utility-controls">
              <SelectorCta
                v-model="showThemeMenu"
                class="theme-selector"
                :label="currentThemeLabel"
                align="end"
                placement="top-end"
              >
                <template #icon>
                  <span class="theme-icon" v-html="themeIconSvg"></span>
                </template>
                <template #menu="{ close }">
                  <button
                    v-for="option in themeOptions"
                    :key="option.value"
                    class="selector-item theme-option"
                    :class="{ active: currentTheme === option.value }"
                    @click.stop="
                      selectTheme(option.value);
                      close();
                    "
                  >
                    <span
                      class="theme-dot"
                      :class="{ active: currentTheme === option.value }"
                      aria-hidden="true"
                    />
                    {{ option.label }}
                  </button>
                </template>
              </SelectorCta>
              <div class="font-selector" @click.stop>
                <button
                  class="font-button"
                  @click.stop="toggleFont"
                  :aria-pressed="isSerifFont"
                  aria-label="Toggle font"
                >
                  <span class="font-icon"><strong>Aa</strong></span>
                  <span class="font-label">Font</span>
                </button>
              </div>
            </div>
          </div>
        </GridParent>
      </GridContainer>
      <!-- <GridContainer>
          <p style="font-size: var(--font-2xs)">
            All rights reserved © Jacques Ramphal 2024
            
          </p>
      </GridContainer> -->
    </GridWrapper>
  </AnimatedComponent>
</template>
<!-- <form
            @submit.prevent="sendEmail"
            onsubmit="alert('submit!');return false"
          >
            <div id="form-row">
              <TextArea
                label=""
                id="name"
                type="name"
                name="user_name"
                placeholder="Send me a message"
              />
              <MyButton
                class="btn"
                label="Send Message"
                name="submit"
                primary
                size="large"
                type="submit"
              />
            </div>
          </form> -->

<script>
import GridContainer from "./grid/GridContainer.vue";
import GridWrapper from "./grid/GridWrapper.vue";
import TextBlock from "./text/TextBlock/TextBlock.vue";
import AnimatedComponent from "./AnimatedComponent.vue";
import TextLink from "./text/TextLink.vue";
import GridParent from "./grid/GridParent.vue";
import SelectorCta from "./Button/SelectorCta.vue";
// import TextArea from "@/components/form/TextArea.vue";
// import MyButton from "@/components/Button/Button.vue";

export default {
  name: "MainFooter",
  components: {
    GridContainer,
    GridWrapper,
    TextBlock,
    AnimatedComponent,
    TextLink,
    GridParent,
    SelectorCta,
  },
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
  data() {
    return {
      menuItems1: [
        { text: "Home", route: "/" },
        { text: "Library", route: "/library" },
        // { text: "Resume", route: "/resume" },
        // { text: "Design System", route: "/designsystem" },
        // { text: "Useful Links", route: "/links" },
        { text: "FAQs", route: "/doc/ask-me-anything" },
      ],
      menuItems2: [
        { text: "LinkedIn", url: "https://linkedin.com/in/ramphal-design", icon: "icon/linkedin.svg"  },
        { text: "Github", url: "https://github.com/jacquesramphal", icon: "icon/github-mark.svg" },
        { text: "Email", url: "hmailto:jake@ramphal.design", icon: "icon/j-logo.svg" },
      ],

      currentTheme: "system",
      showThemeMenu: false,
      themeOptions: [
        { label: "Light", value: "light-theme" },
        { label: "Dark", value: "dark-theme" },
        { label: "System", value: "system" },
      ],
      isSerifFont: false,
      mediaQuery: null,
      fontCheckbox: null,
    };
  },
  computed: {
    currentThemeLabel() {
      const option = this.themeOptions.find(opt => opt.value === this.currentTheme);
      return option ? option.label : "System";
    },
    themeIconSvg() {
      const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <circle cx="8" cy="8" r="7" stroke="var(--foreground)" stroke-width="1.5" fill="none"/>
</svg>`;
      const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <circle cx="8" cy="8" r="7" stroke="var(--foreground)" stroke-width="1.5" fill="var(--foreground)"/>
</svg>`;
      const systemSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <circle cx="8" cy="8" r="7" stroke="var(--foreground)" stroke-width="1.5" fill="none"/>
  <path d="M 8 1 A 7 7 0 0 1 8 15 Z" fill="var(--foreground)"/>
</svg>`;
      
      if (this.currentTheme === "system") {
        return systemSvg;
      }
      return this.currentTheme === "dark-theme" ? darkSvg : lightSvg;
    },
  },
  mounted() {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("user-theme");
    if (savedTheme && ["light-theme", "dark-theme", "system"].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = "system";
    }
    this.applyTheme();

    // Listen for system theme changes
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.mediaQuery.addEventListener("change", this.handleSystemThemeChange);

    // Initialize font preference
    // Create hidden checkbox for CSS :has() selector compatibility
    this.fontCheckbox = document.createElement("input");
    this.fontCheckbox.type = "checkbox";
    this.fontCheckbox.id = "font";
    this.fontCheckbox.name = "font";
    this.fontCheckbox.value = "Serif";
    this.fontCheckbox.style.position = "absolute";
    this.fontCheckbox.style.opacity = "0";
    this.fontCheckbox.style.pointerEvents = "none";
    document.body.appendChild(this.fontCheckbox);
    
    // Check if serif was previously selected
    const savedFont = localStorage.getItem("user-font");
    if (savedFont === "serif") {
      this.isSerifFont = true;
      this.fontCheckbox.checked = true;
    }
  },
  beforeUnmount() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.handleSystemThemeChange);
    }
    // Clean up font checkbox
    if (this.fontCheckbox && this.fontCheckbox.parentNode) {
      this.fontCheckbox.parentNode.removeChild(this.fontCheckbox);
    }
  },
  methods: {
    selectTheme(theme) {
      this.currentTheme = theme;
      localStorage.setItem("user-theme", theme);
      this.applyTheme();
    },
    applyTheme() {
      if (this.currentTheme === "system") {
        const systemTheme = this.getMediaPreference();
        document.documentElement.className = systemTheme;
      } else {
        document.documentElement.className = this.currentTheme;
      }
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return hasDarkPreference ? "dark-theme" : "light-theme";
    },
    handleSystemThemeChange() {
      if (this.currentTheme === "system") {
        this.applyTheme();
      }
    },
    toggleFont() {
      this.isSerifFont = !this.isSerifFont;
      if (this.fontCheckbox) {
        this.fontCheckbox.checked = this.isSerifFont;
      }
      // Save preference
      localStorage.setItem("user-font", this.isSerifFont ? "serif" : "sans");
    },
  },
};
</script>
<style lang="scss" scoped>
$border: var(--border);
$shadow-inner: var(--shadow-inner);
$background-darker: var(--background-darker);
$spacing-lg: var(--spacing-lg);
$spacing-sm: var(--spacing-sm);

#wrapper {
  // border-block-start: var(--border);
  // padding-block-end: $spacing-lg;
  @media only screen and (min-width: 1201px) {
    padding-block-end: inherit;
  }
}

.outer {
  grid-template-columns: repeat(1, 1fr);
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: var(--spacing-xxs) 0 0 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}
li {
  inline-size: 100%;
  font-size: var(--font-500);
  line-height: var(--lineHeight-tall);
  float: left;
  list-style-type: none;
  text-decoration: none;
}

li.external::after {
  content: " ↗";
  color: var(--link);
}

#maindetails {
  @media only screen and (min-width: 768px) {
    padding-inline-end: var(--spacing-md);
  }
}
#content {
  @media only screen and (min-width: 768px) {
    padding-inline-end: var(--spacing-lg);
  }
  @media only screen and (min-width: 1201px) {
    grid-column: span 2;
  }
}
.footer-utility {
  margin-block-start: var(--spacing-md);
  padding-block-start: var(--spacing-sm);
  border-block-start: var(--border);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--spacing-sm);
  
  @media only screen and (min-width: 768px) {
    margin-block-start: var(--spacing-lg);
    padding-block-start: var(--spacing-sm);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer {
  margin: 0;
  min-inline-size: 0;
}

.footer-copy--short {
  display: none;
}

@media only screen and (max-width: 767px) {
  .footer-copy--full {
    display: none;
  }
  .footer-copy--short {
    display: inline;
  }
}

.utility-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  flex: 0 0 auto;
  margin-inline-start: 0;
  padding-inline-start: 0;
  
  @media only screen and (max-width: 767px) {
    margin-inline-start: 0;
    padding-inline-start: 0;
  }
}

.theme-selector {
  position: relative;
  display: inline-block;
  margin-inline-start: 0;
  padding-inline-start: 0;
  
  @media only screen and (max-width: 767px) {
    margin-inline-start: 0;
    padding-inline-start: 0;
  }
}

.theme-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.theme-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: transparent;
  border: none;
  text-align: start;
  cursor: pointer;
  font-size: var(--font-400);
  color: var(--foreground);
  transition: background 0.1s;
  
  &:hover {
    background: var(--background-darker);
  }
  
  &.active {
    background: var(--background-darker);
  }
}

.theme-dot {
  inline-size: 6px;
  block-size: 6px;
  border-radius: 999px;
  background: var(--link);
  opacity: 0;
  flex: 0 0 6px;
}

.theme-dot.active {
  opacity: 1;
}

// #avatar {
//   inline-size: 120px;
//   block-size: 120px;
//   aspect-ratio: 1 / 1;
//   background: url(@/assets/images/portrait.jpg);
//   background-size: 100%;
// }

#avatar:hover {
  animation: animate-shake 1s;
  background-image: url(../assets/images/luna1.jpg);
  animation-delay: 1s;
}

/* Monogram styling */
#monogram {
  transition: all 0.5s ease-in-out;
}

#monogram:hover {
  // stroke-width: 3px;
  stroke-dasharray: 100;
  animation: dash infinite 10s ease-in-out;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}

.font-selector {
  position: relative;
  display: inline-block;
}

.font-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
  padding: var(--spacing-xxs) var(--spacing-xs);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--font-400);
  color: var(--foreground);
  text-decoration: underline;
  text-underline-offset: 0.625rem;
  text-decoration-thickness: 0.1rem;
  transition: all 0.1s;
  
  &:hover {
    text-decoration-thickness: 0.2rem;
  }
  
  &:active {
    text-decoration: underline dashed;
    text-decoration-thickness: 0.1rem;
  }
}

.font-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: var(--font-400);
  line-height: 1;
  text-decoration: none !important;
  
  strong {
    font-weight: var(--fontWeight-bold);
    color: var(--foreground);
    text-decoration: none !important;
  }
}

.font-label {
  font-size: var(--font-400);
}
</style>
