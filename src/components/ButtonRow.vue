<template>
  <div class="button-row">
    <MyButton
      class="btn"
      v-for="(button, index) in buttons"
      :key="index"
      :label="button.label"
      :route="button.route"
      :type="button.type"
      :size="button.size"
    ></MyButton>
  </div>
</template>

<script>
import MyButton from "./Button.vue";

export default {
  components: {
    MyButton,
  },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
  // data() {
  //   return {
  //     buttons: [
  //       {
  //         label: "Button 1",
  //         route: "/button1",
  //         type: "primary",
  //         size: "large",
  //       },
  //       {
  //         label: "Button 2",
  //         route: "/button2",
  //         type: "secondary",
  //         size: "small",
  //       },
  //       // Add more buttons as needed
  //     ],
  //   };
  // },
};
</script>

<style lang="scss" scoped>
.button-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  // background-color: red;
  flex-wrap: wrap;
  @media only screen and (min-width: 740px) {
    // background-color: blue;
    // flex-direction: row;

  }
  @media only screen and (min-width: 1201px) {
    // background-color: yellow;
  }
}
// .btn {
// }
</style>
