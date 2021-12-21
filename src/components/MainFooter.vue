<template>
  <Wrapper id="wrapper" class="">
    <Container>
      <div class="grid-parent">
        <TextBlock id="maindetails" />
        <div id="links1">
          <h6 class="subtle">About</h6>
          <ol>
            <li>
              <router-link :to="{ name: '' }">About this site</router-link>
            </li>
            <li><router-link :to="{ name: '' }">Resume</router-link></li>
            <li><router-link :to="{ name: '' }">Ramphal Blog</router-link></li>
            <li><router-link :to="{ name: '' }">Site Map</router-link></li>
            <li>
              <router-link :to="{ name: '' }">About this site</router-link>
            </li>
            <li><router-link :to="{ name: '' }">Resume</router-link></li>
            <li><router-link :to="{ name: '' }">Ramphal Blog</router-link></li>
            <li><router-link :to="{ name: '' }">Site Map</router-link></li>
          </ol>
        </div>
        <div id="links2">
          <h6 class="subtle">Contact</h6>
          <ol>
            <li>
              <router-link :to="{ name: '' }">About this site</router-link>
            </li>
            <li><router-link :to="{ name: '' }">Resume</router-link></li>
            <li><router-link :to="{ name: '' }">Ramphal Blog</router-link></li>
            <li><router-link :to="{ name: '' }">Site Map</router-link></li>
          </ol>
        </div>
        <div id="links3">
          <h6 class="subtle">Contact</h6>
          <ol>
            <li>
              <router-link :to="{ name: '' }">About this site</router-link>
            </li>
            <li><router-link :to="{ name: '' }">Resume</router-link></li>
            <li><router-link :to="{ name: '' }">Ramphal Blog</router-link></li>
            <li><router-link :to="{ name: '' }">Site Map</router-link></li>
          </ol>
        </div>
      </div>
    </Container>

    <div class="footer">
      <!-- <Container
        style="
          padding-top: var(--spacing-sm) !important;
          padding-bottom: var(--spacing-sm) !important;
        "
      > -->
      <Container>
        <img
          class="justify-end"
          draggable="false"
          src="@/assets/images/j-logo.svg"
          alt="logo.svg"
          style="width: 40px"
        />
      </Container>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
import TextBlock from "@/stories/TextBlock.vue";

export default {
  name: "MainFooter",
  components: {
    Wrapper,
    Container,
    TextBlock,
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
.grid-parent
  grid-template-columns: repeat(2, 1fr)
  @media only screen and (min-width: 740px)
    grid-template-columns: repeat(3, 1fr)
  @media only screen and (min-width: 1201px)
    grid-template-columns: repeat(6, 1fr)
    grid-gap: var(--spacing-xl)


#maindetails
  grid-column: 1 / 4
  @media only screen and (min-width: 740px)
    grid-column: 1 / 4
  @media only screen and (min-width: 1201px)
    grid-column: 1 / 4

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
#wrapper
  background: var(--bg-darker)
  // height: 100vh
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
  margin: 0
  float: left
  list-style-type: none
  text-decoration: none
  padding-right: 1em
li:last-child
  padding-right: 0
</style>
