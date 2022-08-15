<template>
  <div id="template" :class="classes">
   <!-- Component content -->
  </div>
</template>

<script>
export default {
  name: "MyComponent",

  props: {
    secondary: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "template-align": true,
        "template-align--secondary": this.secondary,
        "template-align--primary": !this.secondary,

        "template--anotherprop": this.anotherprop,
        "template--normal": !this.anotherprop,
      };
    },
  },
};
</script>
<style scoped>
* {
  color: inherit;
}
.template-align--primary {
  text-align: left;
}
.template-align--secondary {
  text-align: center;
}
.textblock--anotherprop {
  background: blue;
}
</style>
