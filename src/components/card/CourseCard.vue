<template>
  <span class="wrapper" @click="markAsRead">
    <router-link :to="`${route}`">
      <div class="grid-parent blog-card">
        <span id="dates">
          <ul>
            <li  class="label subtle">
              <p>{{ tag }}</p>
            </li>
          </ul>
        </span>
        <span id="info">
          <h4 tabIndex="0">
            {{ title }}
          </h4>
          <p class="subtle" v-html="description" />
        </span>
        <span v-if="read" class="checkmark">✓</span>
      </div>
    </router-link>
  </span>
</template>

<script>
export default {
  name: "CourseCard",
  components: {},
  props: {
    id: { // Add the id prop
      type: String,
      required: true,
    },
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
    read: Boolean,
  },
  methods: {
    markAsRead() {
      if (!this.read) {
        this.$emit("markAsRead", this.id);
        localStorage.setItem(`readStatus_${this.id}`, "true");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  color: inherit !important;
  text-decoration: none !important;
}


.checkmark {
  color: var(--color-success) !important;
  font-size: var(--font-lg);
}
.grid-parent {
  grid-gap: var(--spacing-xxs);
  grid-template-columns: repeat(9, 1fr);
  display: grid;
}

#dates {
  grid-column: 1 / 4;

  @media only screen and (min-width: 768px) {
    grid-column: 1 / 2;
  }

  @media only screen and (min-width: 1201px) {
    grid-column: 1 / 2;
  }
}

#info {
  grid-column: 1 / 10;

  @media only screen and (min-width: 768px) {
    grid-column: 2 / 8;
  }

  @media only screen and (min-width: 1201px) {
    grid-column: 2 / 8;
  }
}

.blog-card {
  padding: var(--spacing-md) 0 var(--spacing-md) 0;
  overflow: visible !important;
}

.wrapper:hover {
  // background: var(--background-darker);

  #info {
    h5 {
      color: var(--foreground-lighter);
      text-decoration: none;
    }

    p.subtle {
      color: var(--foreground-lighter);
      text-decoration: none;
    }
  }
}

.wrapper {
  border-block-end: var(--border);

  &:last-child {
    border-block-end: none;
  }
}

.router-link-exact-active {
  text-decoration: none !important;
}
</style>


