<template>
  <button :style="styles" :to="Work" type="button">
    <p>{{ text }}</p>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    text: {
      type: String,
      default: "Button Text",
    },
    /**
     * Sets the button font color
     */
    color: {
      type: String,
      default: "black",
    },
    /** Sets background color of the button
     * @since 1.2.0
     */
    background: {
      type: String,
      default: "white",
    },
    /** @deprecated Use color instead */
    oldColor: String,
  },
  computed: {
    styles() {
      return {
        "font-size": this.size,
        color: this.color,
        background: this.background,
      };
    },
  },
  methods: {
    handleClick(e) {
      /** Triggered when button is clicked
       * @event click
       * @type {Event}
       */
      this.$emit("click", e);

      /** Event for Alligator's example
       * @event gator
       * @type {Event}
       */
      this.$emit("gator", e);
    },
  },
};
</script>
<style scoped>
/* -------- LINKS -------- */
button > a {
  text-decoration: none;
}
a:hover {
  opacity: 0.7;
}
a:visited {
  color: blue;
}

/* -------- BUTTONS -------- */
button {
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  transition: box-shadow 0.15s ease-in-out;
  -webkit-transition: box-shadow 0.15s ease-in-out;
}
button,
p {
  color: inherit;
}
.btn-md {
  padding: 1rem 2rem 1rem 2rem;
}
.btn-lg {
  padding: 1.5rem 2.5rem 1.5rem 2.5rem;
}
.btn-primary {
  background-color: var(--color-action) !important;
  color: #fff !important;
  font-weight: 500 !important;
}
.btn-secondary {
  background-color: var(--color-xxlight) !important;
  color: #24292e !important;
  font-weight: 500 !important;
}
.btn-outline {
  background-color: transparent !important;
  color: var(--color-action) !important;
  border: 1px solid var(--color-action) !important;
}
button:first-child {
  margin: 0 0 0 0;
}

button:hover {
  box-shadow: var(--shadow-z1);
}
button:active {
  opacity: 0.8;
  box-shadow: var(--shadow-z2);
}
/*Targeting Attributes*/
[href="index.html"] {
  color: red;
}
</style>
