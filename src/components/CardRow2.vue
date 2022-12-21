<template>
  <div
    class=""
    style="overflow: visible !important; background-color: var(--bg-darker)"
  >
    <GridContainer
      class="hidemobile"
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
        <h3 class="" style="text-align: left">{{ header }}</h3>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>

      <div class="grid-parent">
        <DefaultCard
          v-for="entry in articles.entries"
          :key="entry.id"
          :image="entry.image"
          :category="entry.category"
          :filename="entry.thumbnail"
          :title="entry.title"
          :description="entry.description"
          :route="entry.btnroute"
          :label="entry.label"
        />
      </div>
    </GridContainer>
    <GridContainer
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
        <h3 class="" style="text-align: left">{{ header }}</h3>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>
    </GridContainer>

    <div class="showmobile scrolling-wrapper">
      <DefaultCard
        class="post cardmobile"
        v-for="entry in articles.entries"
        :key="entry.id"
        :image="entry.image"
        :category="entry.category"
        :filename="entry.thumbnail"
        :title="entry.title"
        :description="entry.description"
        :route="entry.btnroute"
        :label="entry.label"
      />
    </div>
  </div>
</template>

<script>
import DefaultCard from "@/components/card/DefaultCard.vue";
import articles from "@/assets/data/articles.json";

export default {
  name: "CardRow2",
  components: {
    DefaultCard,
  },
  props: {
    header: {
      type: String,
      default: "Docs",
    },
  },
  data() {
    return {
      articles,
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
  .cardmobile {
    margin: 0 0 var(--spacing-sm) var(--spacing-sm);
    display: inline-block;
    width: 85vw;
  }
  .cardmobile:last-child {
    margin-right: var(--spacing-sm);
  }
}
</style>
