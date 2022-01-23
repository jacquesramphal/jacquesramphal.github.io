<template>
  <div>this is an asset #{{ id }}</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "NONE",
    },
  },
};
</script>
