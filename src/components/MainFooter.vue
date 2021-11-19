<template>
  <footer class="">
    <div id="footer" class="container grid-parent">
      <h6 id="copyright">© 2021 Jacques Ramphal</h6>
      <ul id="links" class="">
      <!-- <li>
          <a href="https://www.linkedin.com/in/jacquesramphal/" target="_blank"
            >Linkedin</a
          >
        </li> -->
        <li>
          Wanna learn more? <a href="mailto:jacques@ramphal.design" target="_blank">Get in touch</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
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
  font-weight: var(--font-normal)
ul
  list-style: none
  margin: 0
  padding: 0

footer
  // background: var(--bg-darker)
  // height: 50vh

#footer
  display:grid
  grid-template-columns: repeat(1, 1fr)
  @media only screen and (min-width: 740px)
    grid-template-columns: repeat(2, 1fr)
.container  
  padding-top: 0 !important

#links
  grid-column: 1 / 1
  @media only screen and (min-width: 740px)
    grid-column: auto
    justify-self: end

li
  font-size: 2em
  line-height: 1.5
  font-weight: var(--font-normal)
  margin: 0
  float: left
  list-style-type: none
  text-decoration: none
  padding-right: 1em
li:last-child
  padding-right: 0



// @media only screen and (min-width: 1201px) 

</style>
