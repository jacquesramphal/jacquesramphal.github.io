<template>
  <div id="TextValue">
    <p tabIndex="0" class="subtle">{{ label }}</p>
    <p tabIndex="0">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "TextValue",
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

<style lang="scss" scoped>
* {
  color: inherit;
}

#TextValue {
  border-radius: 0 !important;
  grid-column: 1 / 4;
  text-align: left;
  padding: 0;
  @media only screen and (min-width: 768px) {
    grid-column: auto;
  }

  h6 {
    margin-block-end: 1em;
  }

  h5 {
    margin: 0;
  }
}
</style>
