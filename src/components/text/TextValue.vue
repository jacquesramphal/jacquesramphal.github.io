<template>
  <div id="TextValue">
    <h6 tabIndex="0" class="subtle">{{ label }}</h6>
    <h4 tabIndex="0">{{ value }}</h4>
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
  @media only screen and (min-width: 740px) {
    grid-column: auto;
  }

  h6 {
    margin-bottom: 1em;
  }

  h4 {
    margin: 0;
  }
}
</style>
