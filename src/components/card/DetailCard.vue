<template>
  <div class="">
    <Container class="grid-parent">
      <h4 id="section-header" tabIndex="0">
        {{ header }}
      </h4>
      <TextBlock
        eyebrow="Subsection Title"
        header=""
      />
      <TextBlock
        eyebrow="Subsection Title"
        header=""
      />
      <TextBlock
        eyebrow="Subsection Title"
        header=""
      />
      <TextBlock
        eyebrow="Subsection Title"
        header=""
      />
    </Container>
  </div>
</template>

<script>
import TextBlock from "@/stories/TextBlock.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "DetailCard",
  components: {
    Container,
    TextBlock,
  },
  props: {
    header: {
      type: String,
      default: "Detail Card",
    },
    eyebrow: {
      type: String,
      default: "Eyebrow",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
}
.container {
  /*  padding-top: 4rem !important;
  padding-bottom: 9.6rem !important; */
}
#details {
  /* height: 100vh; */
}
#section-header {
  grid-column: 1 / 4;
}
#textblock {
  grid-column: 1 / 4;
  padding: 1em 0 0 0;
}
#textblock:first-child {
  /*  background: yellow; */
}
h3 {
  /* margin-top: -10px; */
}
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
