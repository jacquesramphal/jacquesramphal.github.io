<template>
  <GridContainer class="wrapper">
    <router-link :to="`${route}`">
      <div class="grid-parent blog-card">
        <span id="dates">
          <ul>
            <li class="label subtle">
              <p>{{ tag }}</p>
            </li>
          </ul>
        </span>
        <span id="info">
          <h4 tabIndex="0">
            {{ title }}
          </h4>
          <p class="subtle">{{ description }}</p></span
        >
      </div>
    </router-link>
  </GridContainer>
</template>

<script>
import GridContainer from "../grid/GridContainer.vue";

export default {
  name: "BlogCard",
  components: {
    GridContainer,
  },
  props: {
    tag: {
      type: String,
      default: "00-00",
    },
    title: {
      type: String,
      default: "Post Title",
    },
    description: {
      type: String,
      default: "Post Description",
    },
    route: {
      type: String,
      default: "post",
    },
  },
};
</script>

<style scoped>
* {
  color: inherit !important;
  text-decoration: none !important;
}
.grid-parent {
  grid-gap: var(--spacing-xxs);
  grid-template-columns: repeat(9, 1fr);
}
#details {
  /* height: 100vh; */
}
#dates {
  grid-column: 1 / 3;
}
#info {
  grid-column: 3 / 10;
}
.blog-card {
  padding: var(--spacing-md) 0 var(--spacing-md) 0;
  overflow: visible !important;
}

/* .blog-card:hover {
  background: var(--bg-darker);
} */

.wrapper {
  border-bottom: var(--border);
}
.wrapper:last-child {
  border-bottom: none;
}

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  #dates {
    grid-column: 1 / 2;
  }
  #info {
    grid-column: 2 / 8;
  }
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    #dates {
      grid-column: 1 / 2;
    }
    #info {
      grid-column: 2 / 8;
    }
    .container {
    }
  }
}
</style>
