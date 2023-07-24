<template>
  <PageWrapper>
    <HeroBanner
      id="hero"
      :eyebrow="works.eyebrow"
      :title="works.title"
      :subtitle="works.subtitle"
    />
    <GridContainer>
      <input type="radio" id="All" name="categories" value="All" checked />
      <input type="radio" id="Tag1" name="categories" value="Tag1" />
      <input type="radio" id="typography" name="categories" value="typography" />
      <input type="radio" id="Tag3" name="categories" value="Tag3" />
      <input type="radio" id="Tag4" name="categories" value="Tag4" />
      <input type="radio" id="Tag5" name="categories" value="Tag5" />
      <input type="radio" id="Tag6" name="categories" value="Tag6" />

      <ol class="filters">
        <li>
          <label for="All">All</label>
        </li>
        <li>
          <label for="Tag1">Tag1</label>
        </li>
        <li>
          <label for="typography">typography</label>
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
      <div id="recentwork" class="posts grid-parent">
        <ImageCard
          v-for="entry in works.entries"
          :key="entry.id"
          class="post"
          :eyebrow="entry.tag"
          :title="entry.title"
          :details="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :filename="entry.thumbnail"
          :style="entry.bgcolor"
        />
      </div>
    </GridContainer>
    <SplitImage
      flipped
      style="background: var(--bg-darker)"
      filename="work/glo.svg"
      header="Featured Project"
      details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="work"
      cta="Read More"
    />

    <!-- <CardRow /> -->
  </PageWrapper>
</template>

<script>
import works from "@/assets/data/work.json";
import info from "@/assets/data/info.json";

export default {
  name: "MoreWork",
  components: {},
  props: {},
  data() {
    return {
      works,
      info,
    };
  },
};
</script>

<style lang="sass" scoped>
#hero
  border-bottom: none !important
#work
  // padding-top: var(--spacing-sm) !important
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>

<style scoped>
input[type="radio"] {
  position: absolute;
  left: -9999px;
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.filters {
  text-align: right;
  margin-bottom: 2rem;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
}

.filters label:hover {
  background: green;
  color: var(--white);
}

/* FILTERED ELEMENTS (POSTS)
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/* FILTERING RULES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
[value="All"]:checked ~ .filters [for="All"],
[value="Tag1"]:checked ~ .filters [for="Tag1"],
[value="typography"]:checked ~ .filters [for="typography"],
[value="Tag3"]:checked ~ .filters [for="Tag3"],
[value="Tag4"]:checked ~ .filters [for="Tag4"],
[value="Tag5"]:checked ~ .filters [for="Tag5"],
[value="Tag6"]:checked ~ .filters [for="Tag6"] {
  background: var(--green);
  color: var(--white);
}

[value="All"]:checked ~ .posts [data-category] {
  display: block;
}

[value="Tag1"]:checked ~ .posts .post:not([data-category~="Tag1"]),
[value="typography"]:checked ~ .posts .post:not([data-category~="typography"]),
[value="Tag3"]:checked ~ .posts .post:not([data-category~="Tag3"]),
[value="Tag4"]:checked ~ .posts .post:not([data-category~="Tag4"]),
[value="Tag5"]:checked ~ .posts .post:not([data-category~="Tag5"]),
[value="Tag6"]:checked ~ .posts .post:not([data-category~="Tag6"]) {
  display: none;
}
</style>
