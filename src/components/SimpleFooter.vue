<template>
  <AnimatedComponent>
    <GridWrapper id="wrapper" class="">
      <GridContainer class="footer-container">
        <GridParent
          tight
          style="
            grid-template-columns: none !important;
            grid-template-rows: repeat(2, auto);
          "
        >
          <!-- <div class="">
            <router-link to="/resume"
              ><img
                id="avatar"
                class="justify-end"
                src="../assets/images/portrait.jpg"
                draggable="false"
                alt="logo.svg"
                style="width: 40px; aspect-ratio: 1 / 1"
            /></router-link>

          </div> -->
          <GridParent tight class="outer">
            <p class="footer">All rights reserved © Jake Ramphal 2024</p>
            <ul>
              <li>
                <router-link to="/library">Library</router-link>
              </li>
              <li>
                <router-link to="/designsystem">Design System</router-link>
              </li>
              <li>
                <router-link to="/resume">Resume</router-link>
              </li>
            </ul>

            <!-- <div id="links2">
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
                </ul>
              </div> -->
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper>
  </AnimatedComponent>
</template>

<script>
import GridContainer from "./grid/GridContainer.vue";
import GridWrapper from "./grid/GridWrapper.vue";
import AnimatedComponent from "./AnimatedComponent.vue";
import GridParent from "./grid/GridParent.vue";

export default {
  name: "SimpleFooter",
  components: {
    GridContainer,
    GridWrapper,
    AnimatedComponent,
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
  @media only screen and (min-width: 1201px) {
  }
}
.footer-container {
  padding-block: var(--spacing-sm) !important;
}
.outer {
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
  }
  // background: blue;
}

ul {
  @media only screen and (max-width: 768px) {
    gap: var(--spacing-xxs);
    flex-direction: column;
  }
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
}
li {
  display: inline;
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
// .footer {
//   margin-block-start: var(--spacing-md);

//   @media only screen and (min-width: 768px) {
//     margin-block-start: var(--spacing-lg);
//   }
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
  stroke-dasharray: 100;
  animation: dash infinite 10s ease-in-out;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
</style>
