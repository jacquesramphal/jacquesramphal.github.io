<template>
  <GridContainer>
    <input type="radio" id="All" name="categories" value="All" checked />
      <input type="radio" id="Tag1" name="categories" :value="`${tag1}`" />
      <input type="radio" id="typography" name="categories" :value="`${typography}`" />
      <input type="radio" id="Tag3" name="categories" value="Tag3" />
      <input type="radio" id="Tag4" name="categories" value="Tag4" />
      <input type="radio" id="Tag5" name="categories" value="Tag5" />
      <input type="radio" id="Tag6" name="categories" value="Tag6" />

      <ol class="filters">
        <li>
          <label for="All">All</label>
        </li>
        <li>
          <label for="Tag1">{{ tag1 }}</label>
        </li>
        <li>
          <label for="typography">{{ typography }}</label>
        </li>
        <li>
          <label for="Tag3">Tag3</label>
        </li>
        <li>
          <label for="Tag4">Tag4</label>
        </li>
        <li>
          <label for="Tag5">Tag5</label>
        </li>
        <li>
          <label for="Tag6">Tag6</label>
        </li>
      </ol>
  </GridContainer>
</template>

<script>

export default {
  name: "FilterBar",
  components: {
  },
  props: {
    tag1: {
      type: String,
      default: "TAG 1 DEFAULT",
    },
    typography: {
      type: String,
      default: "TAG 2 DEFAULT",
    },
  },
};
</script>
<style scoped>

</style>
