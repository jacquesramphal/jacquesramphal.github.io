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
                title="Jake Ramphal"
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
                  
                    <TextLink
                      :icon="item.icon"
                      iconsize="16"
                      :label="item.text"
                      :link="item.url"
                    />
                  </li>

                  <!-- <li>
                    <TextLink
                      icon="icon/linkedin.svg"
                      iconsize="16"
                      label="LinkedIn"
                      link="https://www.linkedin.com/in/jake-ramphal"
                    />
                  </li>

                  <li>
                    <TextLink
                      icon="icon/github-mark.svg"
                      iconsize="16"
                      label="Github"
                      link="https://github.com/jacquesramphal"
                    />
                  </li>
                  <li>
                    <TextLink
                      icon="j-logo.svg"
                      iconsize="16"
                      label="Email"
                      link="mailto:jacques@ramphal.design"
                    />
                  </li> -->
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

                  <li>
                    <TextLink
                      style="text-decoration: none"
                      label="Theme"
                      @click="toggleTheme"
                    />
                  </li>
                  <li class="font-toggle">
                    <input
                      type="checkbox"
                      id="font"
                      name="font"
                      value="Serif"
                    />
                    <label for="font" class="font-label"><p>Font</p></label>
                  </li>
                  <!-- <NewsletterSubscription style="margin-block-start: var(--size-4);"/> -->
                </ul>
              </div>
            </GridParent>
          </GridParent>
          <p class="footer" style="font-size: var(--font-400)">
            All rights reserved © Jake Ramphal 2025 🇨🇦
            <!-- © 2023 Jake Ramphal — Built with
            <a target="blank" href="https://v3.vuejs.org/">Vue3</a>.
        
            Deployed on
            <a target="blank" href="https://www.netlify.com/">Netlify</a>. -->
          </p>
        </GridParent>
      </GridContainer>
      <!-- <GridContainer>
          <p style="font-size: var(--font-2xs)">
            All rights reserved © Jake Ramphal 2024
            
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
  },
  props: {
    title: {
      type: String,
      default: "Jake Ramphal",
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
        { text: "FAQs", route: "/doc/30" },
      ],
      menuItems2: [
        { text: "LinkedIn", url: "https://linkedin.com/in/ramphal-design", icon: "icon/linkedin.svg"  },
        { text: "Github", url: "https://github.com/jacquesramphal", icon: "icon/github-mark.svg" },
        { text: "Email", url: "hmailto:jake@ramphal.design", icon: "icon/j-logo.svg" },
      ],

      userTheme: "light-theme",
    };
  },
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
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
  padding-block-end: $spacing-lg;
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
.footer {
  margin-block-start: var(--spacing-md);

  @media only screen and (min-width: 768px) {
    margin-block-start: var(--spacing-lg);
  }
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

// .font-toggle {
//   display: flex;
//   align-items: center;
//   gap: var(--spacing-xs);
// }

.font-label {
  margin-right: var(--spacing-xs);
}

.font-aa {
  margin-left: var(--spacing-xxs);
}
</style>
