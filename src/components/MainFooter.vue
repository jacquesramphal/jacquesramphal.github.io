<template>
  <Wrapper id="wrapper" class="">
    <Container>
      <div class="">
        <img
          class="justify-end"
          draggable="false"
          src="@/assets/images/j-logo.svg"
          alt="logo.svg"
          style="width: 40px"
        />
      </div>
      <div class="grid-parent">
        <div id="maindetails">
          <TextBlock
            eyebrow=""
            header="What else?"
            details="If you have questions about design, development, or anything in between, let's connect!"
          />
        </div>
        <AnimatedComponent>
          <div id="links1" class="animate glow delay-1">
            <p class="subtle">Useful Links</p>
            <ol>
              <li>
                <router-link :to="{ name: 'Info' }"
                  >About this site</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Resume' }">Resume</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Blog' }">Ramphal Blog</router-link>
              </li>
              <li><router-link :to="{ name: '' }">Storybook</router-link></li>
              <li>
                <router-link :to="{ name: 'Work' }">Recent Work</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Work' }">Fire Links</router-link>
              </li>
            </ol>
          </div>
        </AnimatedComponent>

        <div id="links2">
          <p class="subtle">Let's Connect</p>
          <ol>
            <li class="external">
              <a href="mailto:jacques@ramphal.design">Email Me</a>
            </li>
            <li class="external">
              <a
                target="blank"
                href="https://www.linkedin.com/in/jacquesramphal"
                >Connect on LinkedIn</a
              >
            </li>
            <li class="external">
              <a
                target="blank"
                href="https://github.com/jacquesramphal/jacquesramphal.github.io/issues"
                >Submit an issue</a
              >
            </li>
          </ol>
        </div>
        <!-- <div id="links3">
          <p class="subtle">More</p>
          <ol>
            <li class="">
              <a>Privacy Policy</a>
            </li>
          </ol>
        </div> -->
      </div>
    </Container>
    <Container>
      <div class="">
        <p style="font-size: var(--font-xxs)">
          © 2022 Jake Ramphal. Built with
          <a target="blank" href="https://v3.vuejs.org/">Vue3</a>,
          <a target="blank" href="https://www.typescriptlang.org/"
            >Typescript</a
          >
          & <a target="blank" href="https://sass-lang.com/">Sass</a>. Deployed
          on <a target="blank" href="https://www.netlify.com/">Netlify</a>.
        </p>
      </div>
    </Container>
  </Wrapper>
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
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import TextBlock from "@/stories/TextBlock.vue";
// import TextArea from "@/components/form/TextArea.vue";
// import MyButton from "@/stories/Button.vue";
import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "MainFooter",
  components: {
    Wrapper,
    Container,
    TextBlock,
    AnimatedComponent,
    // TextArea,
    // MyButton,
  },
  props: {
    title: {
      type: String,
      default: "Jacques Ramphal",
    },
  },
};
</script>
<style lang="sass" scoped>
#wrapper
  // border-top: var(--border)
  background: var(--bg-darker)
  // background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, var(--bg-darker)), color-stop(100%, transparent))
  // background-image: -moz-linear-gradient(bottom, var(--bg-darker) 0%, transparent 100%)
  padding-bottom: var(--spacing-lg)
  @media only screen and (min-width: 1201px)
    padding-bottom: inherit

.grid-parent
  grid-template-columns: repeat(2, 1fr)
  @media only screen and (min-width: 740px)
    grid-template-columns: repeat(3, 1fr)
  @media only screen and (min-width: 1201px)
    grid-template-columns: repeat(6, 1fr)
    grid-gap: 0


#maindetails
  grid-column: 1 / 4
  @media only screen and (min-width: 740px)
    grid-column: 1 / 4
  @media only screen and (min-width: 1201px)
    grid-column: 1 / 4
    margin-right: 120px

#links1
  grid-column: 1
  @media only screen and (min-width: 740px)
    grid-column: auto
  @media only screen and (min-width: 1201px)

#links2
  grid-column: 2
  @media only screen and (min-width: 740px)
    grid-column: auto
  @media only screen and (min-width: 1201px)

#links3
  grid-column: 1
  @media only screen and (min-width: 740px)
    grid-column: auto
  @media only screen and (min-width: 1201px)

h3
  @media only screen and (min-width: 740px)
    // text-align: center
#copyright
  font-weight: var(--font-medium)
ul
  list-style: none
  margin: 0
  padding: 0

#footer
  display: grid
  grid-template-columns: repeat(1, 1fr)
  @media only screen and (min-width: 740px)
    grid-template-columns: repeat(2, 1fr)

.footer
  // padding-top: var(--spacing-sm) !important
#links
  grid-column: 1 / 1
  @media only screen and (min-width: 740px)
    grid-column: auto
    justify-self: end

li
  width: 100%
  font-size: 2em
  line-height: 1.5
  font-weight: var(--font-medium)
  margin-top: var(--spacing-xxs)
  float: left
  list-style-type: none
  text-decoration: none
  padding-right: 1em
li:last-child
  padding-right: 0
li.external::after
  content: " ↗"
  color: var(--link)
</style>
