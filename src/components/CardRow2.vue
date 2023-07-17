<template>
  <div
    class=""
    style="overflow: visible !important; background-color: var(--bg-darker)"
  >
    <!-- <GridContainer
      class="hidemobile"
      id="cards"
      style="overflow: visible !important"
    > -->
    <GridContainer
      id="cards"
      style="overflow: visible !important"
    >
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h2 class="" style="text-align: left">{{ header }}</h2>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>

      <div class="grid-parent">
        <DefaultCard
          v-for="entry in docs.entries"
          :key="entry.id"
          :image="entry.image"
          :tag="entry.tag"
          :filename="entry.thumbnail"
          :alt="entry.alt"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        />
      </div>
    </GridContainer>
    <!-- <GridContainer
      class="showmobile"
      style="padding-bottom: 0 !important; overflow: visible !important"
    >
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h2 class="" style="text-align: left">{{ header }}</h2>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>
    </GridContainer> -->

    <!-- <div class="showmobile scrolling-wrapper">
      <div class="cardmobile" v-for="entry in docs.entries"
          :key="entry.id">
        <DefaultCard
          :image="entry.image"
          :tag="entry.tag"
          :filename="entry.thumbnail"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
import docs from "../assets/data/docs.json";

export default {
  name: "CardRow2",
  components: {
  },
  props: {
    header: {
      type: String,
      default: "Docs",
    },
  },
  data() {
    return {
      docs,
    };
  },
};
</script>
<style scoped lang="scss">
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  // display: flex;
  flex-direction: row;
  .cardmobile {
    margin: 0 0 var(--spacing-sm) var(--spacing-sm);
    display: inline-flex;
    width: 25vw;
  }
  /* ------------ BREAKPOINT MD ------------ */
  @media only screen and (max-width: 740px) {
    .cardmobile {
      margin: 0 0 var(--spacing-sm) var(--spacing-sm);
      width: 85vw;
    }
  }
  .cardmobile:last-child {
    margin-right: var(--spacing-sm);
  }
}
</style>
