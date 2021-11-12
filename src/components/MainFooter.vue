<template>
  <footer class="">
    <div id="footer" class="container grid-parent">
      <h6 id="copyright" class="">© 2021 Jacques Ramphal</h6>
      <ul id="links" class="justify-end">
       <li>
          <a href="https://www.linkedin.com/in/jacquesramphal/" target="_blank"
            >Linkedin</a
          >
        </li> 
        <li>
          <a href="mailto:jacques@ramphal.design" target="_blank">Get in touch</a>
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

ul
  list-style: none
  margin: 0
  padding: 0

footer
  background: var(--bg-darker)
  // height: 50vh

#footer
  display:grid
  grid-template-columns: repeat(1, 1fr)
  @media only screen and (min-width: 740px)
    grid-template-columns: repeat(2, 1fr)


#links
  grid-column: 1 / 1
  @media only screen and (min-width: 740px)
    grid-column: auto
li
  font-size: 2em
  line-height: 1.5
  font-weight: 400
  margin: 0
  float: left
  list-style-type: none
  text-decoration: none
  padding-right: 1em
li:last-child
  padding-right: 0



// @media only screen and (min-width: 1201px) 

</style>
