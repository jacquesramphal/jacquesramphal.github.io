<template>
  <div id="textarea" class="">
    <label :for="`${name}`">{{ label }}</label
    ><br />
    <textarea
      cols="1"
      rows="3"
      :id="`${id}`"
      type="textarea"
      :name="`${name}`"
      :placeholder="`${placeholder}`"
      required
    />
  </div>
</template>

<script>
// import MyButton from "@/components/MyButton.vue";

export default {
  name: "TextArea",
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
    placeholder: {
      type: String,
      default: "This is an placeholder",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
#textarea {
  /*  background: var(--color-xlight); */
  grid-column: 1 / 4;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #textarea {
  grid-column: 1 / 3;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #textarea {
      grid-column: 2 / 4;
    }
  }
}
</style>
