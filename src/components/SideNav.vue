<template>
  <div class="layout">
    <nav class="sidenav">
      <ul>
        <li v-for="(section, index) in sections" :key="index">
          <a :href="'#section-' + index">{{ section.title }}</a>
        </li>
      </ul>
    </nav>
    <main class="content">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
:root {
  --space: 16px;
}

.layout {
  display: flex;
}

.sidenav {
  --offset: var(--space);
  padding: 10px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  position: sticky;
  top: var(--offset);
  align-self: start;
  max-height: calc(100vh - var(--offset) * 2);
  overflow-y: auto;
}

.sidenav ul {
  list-style-type: none;
  padding: 0;
}

.sidenav li {
  margin: 10px 0;
}

.sidenav a {
  text-decoration: none;
  color: #007bff;
}

.sidenav a:hover {
  text-decoration: underline;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>