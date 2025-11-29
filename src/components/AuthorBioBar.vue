<template>
  <div class="author-bio-bar">
    <GridParent tight class="author-content">
      <div class="author-image">
        <router-link to="/resume">
          <img
            src="@/assets/images/portrait.jpg"
            alt="Jake Ramphal"
            draggable="false"
          />
        </router-link>
      </div>
      <div class="author-info">
        <DynamicText
          as="h4"
          :text="name"
          :attrs="{ class: 'author-name' }"
        />
        <DynamicText
          v-if="title"
          :text="title"
          :attrs="{ class: 'subtle author-title' }"
        />
        <DynamicText
          v-if="description"
          :text="description"
          :attrs="{ class: 'author-description' }"
        />
      </div>
    </GridParent>
  </div>
</template>

<script>
import GridParent from "./grid/GridParent.vue";
import DynamicText from "./text/DynamicText.vue";

export default {
  name: "AuthorBioBar",
  components: {
    GridParent,
    DynamicText,
  },
  props: {
    name: {
      type: String,
      default: "Jake Ramphal",
    },
    title: {
      type: String,
      default: "Staff Product Designer, Design Lead for Genie | Orium",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.author-bio-bar {
  grid-column: 1 / 4;
  margin-block: var(--spacing-lg) var(--spacing-md);
  padding-block: var(--spacing-md);
  border-block-start: var(--border);
  border-block-end: var(--border);

  @media only screen and (min-width: 768px) {
    grid-column: 1 / 3;
    margin-block: var(--spacing-xl) var(--spacing-lg);
    padding-block: var(--spacing-lg);
  }

  @media only screen and (min-width: 1201px) {
    grid-column: 2 / 4;
  }
}

.author-content {
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--spacing-sm);

  @media only screen and (min-width: 768px) {
    gap: var(--spacing-md);
  }
}

.author-image {
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    transition: transform 0.2s ease;

    @media only screen and (min-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }

  a {
    display: block;
    text-decoration: none;
  }

  a:hover img {
    transform: scale(1.05);
  }
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}

.author-name {
  margin: 0;
  padding: 0;
}

.author-title {
  margin: 0;
  padding: 0;
  font-style: italic;
  margin-block-start: var(--spacing-xxs);
}

.author-description {
  margin: 0;
  padding: 0;
  margin-block-start: var(--spacing-xs);
}
</style>

