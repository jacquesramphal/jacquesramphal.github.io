<template>
  <Wrapper id="wrapper">
    <div class="">
      <Container
        ><h4>
          If you have questions about XYZ please get in touch. Im working and
          playing at Myplanet.
        </h4></Container
      >
    </div>
    <div class="footer">
      <Container>
        <div id="footer" class="grid-parent">
          <h6 id="copyright">© 2021 Jacques Ramphal</h6>
          <ul id="links" class="">
            <!-- <li>
          <a href="https://www.linkedin.com/in/jacquesramphal/" target="_blank"
            >Linkedin</a
          >
        </li> -->
            <li>
              Wanna learn more?
              <a href="mailto:jacques@ramphal.design" target="_blank"
                >Get in touch</a
              >
            </li>
          </ul>
        </div>
      </Container>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "MainFooter",
  components: {
    Wrapper,
    Container,
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

#copyright
  font-weight: var(--font-medium)
ul
  list-style: none
  margin: 0
  padding: 0
#wrapper
  // background: var(--bg-darker)
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



// @media only screen and (min-width: 1201px)
</style>
