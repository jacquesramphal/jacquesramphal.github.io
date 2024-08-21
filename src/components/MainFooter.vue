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

            <!-- Unicorn SVG -->
            <!-- <img
          class="justify-end"
          draggable="false"
          src="@/assets/images/j-logo.svg"
          alt=""
          style="width: 40px"
                      /> -->
            <!-- <svg width="52px" viewBox="0 0 35 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>J Unicorn - UX Generalist</title>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Group" transform="translate(1.000000, 1.000000)">
                          <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="33" height="40"></rect>
                          <g id="monogram" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                              <line x1="7.87671568" y1="32.2940555" x2="13.3684216" y2="26.8023105" id="Path" stroke="#FFC972"></line>
                              <line x1="28.2714969" y1="36.7954314" x2="29.3954283" y2="35.6715" id="Path" stroke="#FFBCCD"></line>
                              <path d="M30.8347073,0 C31.6940468,0.859339425 31.7038862,2.26257319 30.8347073,3.11197581 L30.8258421,3.12093842 L22.7435118,11.2032688" id="Path" stroke="#00D2C5"></path>
                              <path d="M5.31616476,22.4065375 L3.76007944,23.9626229 L3.76017686,23.9626229 C2.88320446,24.8040371 1.50754048,24.8219623 0.648201053,23.9626229 C-0.21114032,23.1032834 -0.220979713,21.7000497 0.648201053,20.8506471 L0.648103633,20.8505496 L1.27051828,20.228135" id="Path" stroke="#00D2C5"></path>
                              <path d="M19.631536,4.97926845 C20.4908754,5.83860787 21.8665394,5.82068264 22.7435118,4.97926845 L26.3223229,1.40035989" id="Path" stroke="#F85CA5"></path>
                              <line x1="20.4961361" y1="1.19534007" x2="21.6203597" y2="0.0711164018" id="Path" stroke="#FFBCCD"></line>
                              <path d="M26.4779022,26.140928 L29.24774,23.3710903 L29.239849,23.3632967 C30.1167239,22.5218825 31.4924853,22.5039573 32.3517273,23.3632967 C33.2111642,24.2226361 33.2210036,25.6258699 32.3517273,26.4752725 L32.0795366,26.7633426" id="Path" stroke="#FFC972"></path>
                              <path d="M19.9426946,14.004086 C19.0735158,14.8534886 19.0833552,16.2567223 19.9426946,17.1160618 C20.802034,17.9754012 22.177698,17.957476 23.0546704,17.1160618 L26.1667436,14.0039885 L29.239849,10.9308832 C30.1167239,10.089469 31.4924853,10.0715438 32.3517273,10.9308832" id="Path" stroke="#FFC972"></path>
                              <path d="M25.8554876,39.2114407 C24.9786126,40.0528549 23.6028512,40.0707801 22.7435118,39.2114407 C21.8841724,38.3521013 21.874333,36.9488675 22.7435118,36.0994649 L29.5899755,29.2529038" id="Path" stroke="#00D2C5"></path>
                              <path d="M32.0795366,14.3152446 L9.98425511,36.4106235 C9.1150763,37.2600261 9.12491569,38.6632599 9.98425511,39.5225993 C10.8435945,40.3819387 12.2192585,40.3640135 13.0962309,39.5225993 L13.7186456,38.9001847 L23.3497548,29.2690755" id="Path" stroke="#80CCEB"></path>
                              <path d="M5.31616476,34.8546356 C4.43919237,35.6960498 3.06352838,35.713975 2.20418896,34.8546356 C1.34484953,33.9952962 1.33501014,32.5920624 2.20418896,31.7426598 L10.917731,23.0289522 C11.7869098,22.1795496 11.7770704,20.7763158 10.917731,19.9169764 C10.0583915,19.057637 8.68269832,19.0755622 7.80572592,19.9169764" id="Path" stroke="#F85CA5"></path>
                          </g>
                      </g>
                  </g>
              </svg> -->
          </div>
          <GridParent tight class="outer">
            <div id="maindetails">
              <TextBlock
                title="Jake Ramphal"
                description="My work explores the intersection between design and development and seeks to embrace emerging technologies for a more efficient and inclusive future.

"
              />
            </div>
            <GridParent tight id="content">
              <div id="links1">
                <p class="subtle">Useful Links</p>
                <ul>
                  <!-- <li>
                    <router-link to="/info" class="hover-2"
                      >About this site</router-link
                    >
                  </li> -->
                  <li>
                    <router-link to="/library">Library</router-link>
                  </li>
                  <li>
                    <router-link to="/designsystem">Design System</router-link>
                  </li>
                  <li>
                    <router-link to="/resume">Resume</router-link>
                  </li>
                  <!-- <li>
                    <router-link to="/docs"
                      >Ramphal Docs</router-link
                    >
                  </li> -->
                  <!-- <li>
                    <router-link to="/">Storybook</router-link>
                  </li> -->

                  <!-- <li>
                    <router-link to="/links"
                      >Useful Links</router-link
                    >
                  </li> -->
                </ul>
              </div>

              <div id="links2">
                <p class="subtle">Let's Connect</p>
                <ul>
                  <li>
                    <TextLink
                      label="LinkedIn"
                      link="https://www.linkedin.com/in/jake-ramphal"
                    />
                  </li>

                  <li>
                    <TextLink
                      label="Github"
                      link="https://github.com/jacquesramphal"
                    />
                  </li>
                  <li>
                    <TextLink
                      label="Email"
                      link="mailto:jacques@ramphal.design"
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
                  <li class="">
                    <a>Privacy Policy</a>
                  </li>
                  <li>
                    <TextLink label="Offerings" route="/doc/28" />
                  </li>
                  <!-- <NewsletterSubscription style="margin-block-start: var(--size-4);"/> -->
                </ul>
              </div>
            </GridParent>
          </GridParent>
          <p class="footer" style="font-size: var(--font-400)">
            All rights reserved © Jake Ramphal 2024
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
};
</script>
<style lang="scss" scoped>
$border: var(--border);
$shadow-inner: var(--shadow-inner);
$background-darker: var(--background-darker);
$spacing-lg: var(--spacing-lg);
$spacing-sm: var(--spacing-sm);

#wrapper {
  border-block-start: var(--border);
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
</style>
