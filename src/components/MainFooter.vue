<template>
  <footer class="halfvh">
    <div id="footer" class="container">
      <h6 id="copyright" class="hidemobile">© 2021 Jacques Ramphal</h6>
      <ul class="justify-end">
        <li>
          <a href="https://www.linkedin.com/in/jacquesramphal/" target="_blank"
            >Linkedin</a
          >
        </li>
        <li>
          <a href="mailto:jacquesramphal@gmail.com" target="_blank">Email</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
/**
 * @component
 */
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
<style scoped>
footer {
  background: var(--color-dark);
}

.container {
  /* margin: 2.8em 0 0  0; */
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(2, 1fr);
}
#copyright {
}
footer h6,
li {
  font-size: 2em;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  nav {
    /* padding: 2.8em !important; */
  }
}
</style>
