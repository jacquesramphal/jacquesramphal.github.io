<template>
  <div id="input" class="">
    <label :for="`${name}`">{{ label }}</label
    ><br />
    <input
      :id="`${id}`"
      :type="`${type}`"
      :name="`${name}`"
      :placeholder="`${placeholder}`"
      required
    />
  </div>
</template>

<script>

export default {
  name: "Input",
  components: {
    /* MyButton, */
  },
  props: {
    id: {
      type: String,
      default: "id",
    },
    type: {
      type: String,
      default: "type",
    },
    name: {
      type: String,
      default: "name",
    },
    label: {
      type: String,
      default: "This is label",
    },
    placeholder: {
      type: String,
      default: "This is an placeholder",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit !important;
}
#input {
  /*  background: var(--color-xlight); */
  grid-column: 1 / 4;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #input {
    grid-column: auto;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #input {
      grid-column: auto;
    }
  }
}
</style>
