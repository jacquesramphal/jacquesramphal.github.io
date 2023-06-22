<template>
  <div id="input" class="">
    <label :for="`${name}`">{{ label }}</label
    ><br />
    <select :id="`${id}`" :name="`${name}`" required>
      <option value="" disabled selected>Select your option</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  components: {
    /* MyButton, */
  },
  props: {
    id: {
      type: String,
      default: "id",
    },
    name: {
      type: String,
      default: "name",
    },
    label: {
      type: String,
      default: "This is label",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
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
