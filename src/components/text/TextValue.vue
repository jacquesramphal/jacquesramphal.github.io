<template>
  <div id="TextValue">
    <p tabIndex="0" class="subtle label">{{ label }}</p>
    <p tabIndex="0" class="value">{{ value }}</p>
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
  display: flex;
  flex-direction: column;
  border-radius: 0 !important;
  text-align: left;
  padding: 0;
  @media only screen and (min-width: 768px) {
    grid-column: auto;
  }
  // .label {
  //   background-color: red;
  // }
  // .value {
  //   background-color: blue;
  // }
}
</style>
