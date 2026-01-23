# GridContainer Component

### Overview
`GridContainer` is a versatile Vue component designed to enhance layout management. It offers flexible options to control the width, padding, and alignment properties of the container. The component uses grid display properties, making it suitable for responsive designs.

### Features
- **Customizable Padding**: Default padding that adjusts based on the viewport width, with tighter padding options.
- **Full Viewport Width**: Allows the container to expand fully across the viewport’s width.
- **Full Viewport Height**: Adjusts the container to fill the entire viewport height, centered aligning its content.
- **Maximum Viewport Width**: Constrains the container’s maximum width while keeping it centered.

``` 
<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "GridContainer",
  props: {
    tight: {
      type: Boolean,
      default: false,
    },
    fullvw: {
      type: Boolean,
      default: false,
    },
    fullvh: {
      type: Boolean,
      default: false,
    },
    maxvw: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "container-spacing": true,
        "container-spacing--tight": this.tight,
        "container-spacing--fullvw": this.fullvw,
        "container-spacing--maxvw": this.maxvw,
        "container-spacing--fullvh": this.fullvh,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container-spacing {
  inline-size: 100%;
  inline-size: -moz-available;
  inline-size: -webkit-fill-available;
  inline-size: stretch;
  position: relative;
  padding: var(--spacing-sm) !important;
  display: grid;
  grid-template-columns: 1;
  block-size: auto;
  margin-inline-start: auto;
  margin-inline-end: auto;
  // max-width: 1680px;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    padding: var(--spacing-lg) !important;
  }
  @media only screen and (min-width: 1201px) {
    padding: var(--spacing-lg) var(--spacing-xl) !important;
  }
  &--tight {
    @media only screen and (min-width: 768px) {
      padding: var(--spacing-md) !important;
    }
    @media only screen and (min-width: 1201px) {
      padding: var(--spacing-md) !important;
    }
  }
  &--fullvw {
    padding: 0 !important;
  }
  &--fullvh {
    min-block-size: 468px;
    block-size: 100vh !important;
    align-items: center !important;
  }
  &--maxvw {
    max-width: 86.4rem !important;
    float: none;
    margin-inline-start: auto;
    margin-inline-end: auto;
  }
}
</style>

```

### Props
- `tight`: Boolean, makes the container’s padding tighter.
- `fullvw`: Boolean, expands the container to the full width of the viewport.
- `fullvh`: Boolean, expands the container to the full height of the viewport and centers the content vertically.
- `maxvw`: Boolean, sets a maximum width to the container.

### Usage

#### Vue Example
Here is how you can use the `GridContainer` component in a Vue application:

```
<template>
  <GridContainer :tight="true" :fullvw="false" :fullvh="true" :maxvw="true">
    <div>Your content here</div>
  </GridContainer>
</template>
<script>
import GridContainer from './GridContainer.vue';

export default {
  components: {
    GridContainer
  }
};
</script>
```

### Styling
The component uses SCSS for styling, leveraging media queries to adapt the container’s padding based on the screen size. Here are the relevant styles:

