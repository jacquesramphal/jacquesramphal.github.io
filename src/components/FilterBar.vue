<template>
  <div>
    <input
      v-for="category in categories"
      :key="category.value"
      type="radio"
      :id="category.value"
      :name="groupName"
      :value="category.value"
      :checked="selectedCategory === category.value"
      @change="$emit('update:selectedCategory', category.value)"
    />
    <ol class="filters">
      <li v-for="category in categories" :key="category.value">
        <label :for="category.value">{{ category.label }}</label>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    groupName: String,
    selectedCategory: String,
  },
};
</script>

<style lang="scss" >
input[type="radio"] {
  position: absolute;
  inset-inline-start:  -9999px;
}
li {
  list-style: none !important;
}
.filters {
  text-align: right;
  margin-block-end: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem ;
  border-radius: 0.25rem;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
  background: var(--background-darker);
  color: var(--link);
}

/* Style for active filter */
.filters label[for]:checked {
  background: red !important; /* Change to your desired active filter background color */
  color: white; /* Change to your desired active filter text color */
}

/* Apply dynamic filter styles using classes -- doesnt work */
.filters .active-filter-label {
  background: var(--green);
  color: var(--white);
}

.filters label:hover {
  background: var(--link);
  color: var(--text-reversed);
}

/* Hide the radio buttons */
input[type="radio"] {
  display: none;
}
[value="All"]:checked ~ .filters [for="All"],
[value="Tag1"]:checked ~ .filters [for="Tag1"],
[value="Tag2"]:checked ~ .filters [for="Tag2"],
[value="Tag3"]:checked ~ .filters [for="Tag3"],
[value="Product-Design"]:checked ~ .filters [for="Product-Design"],
[value="Tag5"]:checked ~ .filters [for="Tag5"],
[value="Tag6"]:checked ~ .filters [for="Tag6"] {
  background: var(--green);
  color: var(--white);
}

[value="All"]:checked ~ .posts [data-category] {
  display: block;
}

[value="Tag1"]:checked ~ .posts .post:not([data-category~="Tag1"]),
[value="Tag2"]:checked ~ .posts .post:not([data-category~="Tag2"]),
[value="Tag3"]:checked ~ .posts .post:not([data-category~="Tag3"]),
[value="Product-Design"]:checked ~ .posts .post:not([data-category~="Product-Design"]),
[value="Tag5"]:checked ~ .posts .post:not([data-category~="Tag5"]),
[value="Tag6"]:checked ~ .posts .post:not([data-category~="Tag6"]) {
  display: none;
}
</style>
