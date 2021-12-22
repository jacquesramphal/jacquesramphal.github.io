<template v-for="item in blok.body">
  <div v-editable="blok">
    <component :key="item._uid" :blok="item" :is="item.component"></component>
  </div>
</template>

<script>
export default {
  props: ["blok"],
};
</script>
