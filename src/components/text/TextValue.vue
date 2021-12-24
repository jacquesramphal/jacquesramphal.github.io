<template>
  <div id="TextValue" class="">
  <!-- add "label for" references? -->
    <h2 tabIndex="0">{{ value }}</h2>
    <h6 tabIndex="0" class="subtle">{{ label }}</h6>
    <!-- <MyButton 
      text="This is Button Text" 
      class="btn-primary"
      /> -->
  </div>
</template>

<script>

export default {
  name: "TextValue",
  components: {
    /* MyButton, */
  },
  props: {
    label: {
      type: String,
      default: "Label",
    },
    value: {
      type: String,
      default: "Value",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
#TextValue {
  /*  background: var(--color-xlight); */
  grid-column: 1 / 4;
  text-align: left;
  padding: 0;
}
h6 {
  margin-bottom: 1em;
}
h2 {
  margin: 0;
  color: var(--link);
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #TextValue {
    grid-column: auto;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #TextValue {
      grid-column: auto;
    }
  }
}
</style>
