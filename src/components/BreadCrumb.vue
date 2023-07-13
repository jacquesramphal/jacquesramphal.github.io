<template>
  <nav class="breadcrumb">
    <ul>
      <li v-for="(route, index) in routes" :key="index">
        <router-link :to="route.to">{{ route.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BreadCrumb",
  computed: {
    routes() {
      const routes = [];
      const matchedRoutes = this.$route.matched;

      for (let i = 0; i < matchedRoutes.length; i++) {
        const route = matchedRoutes[i];
        if (route.meta && route.meta.breadcrumb) {
          routes.push({
            to: route.path,
            label: route.meta.breadcrumb,
          });
        } else {
          if (route.name) {
            routes.push({
              to: route.path,
              label: route.name,
            });
          }
        }
      }

      return routes;
    },
  },
};
</script>

<style scoped>
/* Add your custom breadcrumb styling here */
</style>
