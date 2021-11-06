<template>
  <div class="">
    <div class="grid-parent container">
      <span id="values">
        <ul tabIndex="0">
          <li class="label subtle"><p>Role</p></li>
          <li class="value"><p>UI Designer/Developer</p></li>
        </ul>
        <ul tabIndex="0">
          <li class="label subtle"><p>Type</p></li>
          <li class="value"><p>Proof of Concept</p></li>
        </ul>
        <ul tabIndex="0">
          <li class="label subtle"><p>Year</p></li>
          <li class="value"><p>2020-2021</p></li>
        </ul>
      </span>
      <span id="info">
        <h5 tabIndex="0">
          {{ description }}
        </h5></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCard2",

  props: {
    description: {
      type: String,
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
.container {
  /*  padding-top: 4rem !important;
  padding-bottom: 9.6rem !important; */
}
#details {
  /* height: 100vh; */
}
#values {
  grid-column: 1 / 4;
}
#info {
  grid-column: 1 / 4;
  padding: 0;
}

#info > h4 {
  margin-bottom: 0.8em !important;
}
ul {
  margin-bottom: 2rem;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #values {
    grid-column: 1 / 1;
  }
  #info {
    grid-column: 1 / 4;
  }
  h4 {
    margin-top: -1rem;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #values {
      grid-row: 1 / 3;
    }
    #info {
      grid-column: 2 / 4;
    }
    .container {
    }
  }
}
</style>
