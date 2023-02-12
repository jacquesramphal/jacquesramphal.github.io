<template>
  <div class="">
    <GridContainer class="grid-parent">
      <h3 id="section-header" tabIndex="0">
        {{ header }}
      </h3>
      <TextBlock :header5="`${eyebrow1}`" eyebrow="" :details="`${detail1}`" />
      <TextBlock :header5="`${eyebrow2}`" eyebrow="" :details="`${detail2}`" />
      <TextBlock :header5="`${eyebrow3}`" eyebrow="" :details="`${detail3}`" />
      <TextBlock :header5="`${eyebrow4}`" eyebrow="" :details="`${detail4}`" />
    </GridContainer>
  </div>
</template>

<script>



export default {
  name: "DetailCard",
  components: {
    
    
  },
  props: {
    contentful: {
      type: Array,
      required: true,
    },
    header: {
      type: String,
      default: "Detail Card",
    },
    eyebrow1: {
      type: String,
      default: "Eyebrow1",
    },
    eyebrow2: {
      type: String,
      default: "Eyebrow2",
    },
    eyebrow3: {
      type: String,
      default: "Eyebrow3",
    },
    eyebrow4: {
      type: String,
      default: "Eyebrow4",
    },
    detail1: {
      type: String,
      default: "Detail 1. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
    detail2: {
      type: String,
      default: "Detail 2. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
    detail3: {
      type: String,
      default: "Detail 3. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
    detail4: {
      type: String,
      default: "Detail 4. Lorem ipsum doler optima sit amet doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet.",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
/* .container {
 padding-top: 4rem !important;
  padding-bottom: 9.6rem !important; 
} */
/* #details {
height: 100vh;
} */
#section-header {
  grid-column: 1 / 4;
}
#textblock {
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}
/* #textblock:first-child {
  background: yellow; 
} */
/* h3 {
  margin-top: -10px;
} */
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #section-header {
    grid-column: 1 / 1;
  }
  #textblock {
    grid-column: auto;
    padding: 0 2.8em 2.8em 0;
  }
  h4 {
    margin-top: -1rem;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #section-header {
      grid-row: 1 / 3;
    }
  }
}
</style>
