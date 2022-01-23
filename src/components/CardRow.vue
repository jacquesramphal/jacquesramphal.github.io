<template>
  <!-- <div style="background: var(--bg-darker);" class=""> -->
  <div class="">
    <Container id="cards" style="overflow: visible;">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h3 style="text-align: left">{{ header }}</h3>
        <p class="external justify-end">
          <router-link  :to="{ name: 'Blog' }"
            >View All</router-link
          >
        </p>
      </div>
      <div class="grid-parent">
        <DefaultCard imgurl="https://wallpaperaccess.com/full/399952.jpg" />
        <DefaultCard imgurl="https://wallpaperaccess.com/full/141254.jpg" />
        <DefaultCard imgurl="https://wallpaperaccess.com/full/533108.jpg" />
      </div>
    </Container>
  </div>
</template>

<script>
import DefaultCard from "@/components/card/DefaultCard.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "CardRow",
  components: {
    Container,
    DefaultCard,
  },
  props: {
    header: {
      type: String,
      default: "Ramblings",
    },
  },
};
</script>
