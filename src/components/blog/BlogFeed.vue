<template>
  <GridWrapper id="Docs">
    <!-- <div class="showmobile scrolling-wrapper">
      <ArticleCard
        class="post card"
        v-for="DocsPost in contentful"
        v-bind:key="blogPost.sys.id"
        :image="blogPost.image"
        :tag="blogPost.tag"
        :imgurl="blogPost.imgurl"
        :eyebrow="blogPost.tag"
        :title="blogPost.title"
        :description="blogPost.description"
        :route="blogPost.route"
        :label="blogPost.label"
      />
    </div> -->
    <!--  list view -->
    <!-- <GridContainer>
      <blog-post-entry
        v-for="blogPost in contentful"
        v-bind:key="blogPost.sys.id"
        :image="blogPost.image"
        :imgurl="blogPost.imgurl"
        :tag="blogPost.tag"
        :title="blogPost.title"
        :description="blogPost.description"
        :route="blogPost.route"
      />
    </GridContainer> -->

    <!--  card view -->

    <div class="">
      <GridContainer id="cards" style="overflow: visible">
        <input type="radio" id="All" name="categories" value="All" checked />
        <input type="radio" id="CSS" name="categories" value="CSS" />
        <input
          type="radio"
          id="JavaScript"
          name="categories"
          value="JavaScript"
        />
        <input
          type="radio"
          id="Typography"
          name="categories"
          value="Typography"
        />
        <input type="radio" id="Figma" name="categories" value="Figma" />

        <ol class="filters">
          <li>
            <label for="All">All</label>
          </li>
          <li>
            <label for="CSS">CSS</label>
          </li>
          <li>
            <label for="JavaScript">JavaScript</label>
          </li>
          <li>
            <label for="Typography">Typography</label>
          </li>
          <li>
            <label for="Figma">Figma</label>
          </li>

          <!-- 
          <MyButton
            v-on:click="ChangeView"
            label="Change View"
            size="small"
            route="#"
          />

          <p @click="(e) => e.target.classList.toggle('mystyle2')">Test</p> -->
        </ol>
        <div class="hs grid-parent posts" id="testDiv">
          <ArticleCard
            class="post"
            v-for="blogPost in contentful"
            v-bind:key="blogPost.sys.id"
            :image="blogPost.image"
            :alt="blogPost.alt"
            :tag="blogPost.tag"
            :imgurl="blogPost.imgurl"
            :title="blogPost.title"
            :description="blogPost.description"
            :route="blogPost.route"
            :label="blogPost.label"
          />
        </div>
   
      </GridContainer>
    </div>
  </GridWrapper>
</template>

<script>
// import BlogPostEntry from "@/components/blog/BlogPostEntry.vue";
import ArticleCard from "@/components/card/ArticleCard/ArticleCard.vue";

export default {
  name: "BlogFeed",
  components: {
    // BlogPostEntry,
    ArticleCard,
  },

  // Testing Functions/Methods
  methods: {
    ChangeView: function () {
      var e = document.getElementById("testDiv");
      e.classList.toggle("mystyle");
    },
    // const testElements = document.getElementsByClassName('test');
    // const testDivs = Array.prototype.filter.call(
    //   testElements,
    //   (testElement) => testElement.nodeName === 'DIV',
    // );
  },
  props: {
    contentful: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  .card {
    margin: var(--spacing-sm) 0 var(--spacing-sm) var(--spacing-sm);
    display: inline-block;
    inline-size: 85vw;
  }
  .card:last-child{
    margin-inline-end: var(--spacing-sm);
  }
}
</style>
<style scoped lang="sass">
.mystyle
  background: red
.mystyle2
  color: red
  font-size: var(--font-xl)
#blog
  background: var(--background-darker)

.blog
  display: grid
  grid-gap: var(--spacing-xs)
  background: var(--background)
  color: var(--foreground)
  font-size: var(--font-xs)
  font-family: inherit
.blog-post
  // font-size: var(--font-2xs)
  // margin-block-end: var(--spacing-md)
  @media only screen and (min-width: 768px)
    margin-block-end: var(--spacing-lg)
.blog-post-entry:first-child
  padding-block-start: 0
.blog-post-entry:last-child
  @media only screen and (min-width: 768px)
    padding-block-end: 0
  @media only screen and (min-width: 768px)
</style>

<style lang="sass" scoped>
#hero
  border-block-end: none !important
#work
  // padding-block-start: var(--spacing-sm) !important
.container
  // background-color: var(--color-white)
  padding-block-start: 0 !important
</style>

<style scoped>
input[type="radio"] {
  position: absolute;
  inset-inline-start:  -9999px;
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.filters {
  text-align: left;
  margin-block-end: 2rem;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem;
  margin-block-end: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
}

.filters label:hover {
  background: var(--green);
  color: var(--white);
}

/* FILTERED ELEMENTS (POSTS)
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/* FILTERING RULES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
[value="All"]:checked ~ .filters [for="All"],
[value="CSS"]:checked ~ .filters [for="CSS"],
[value="JavaScript"]:checked ~ .filters [for="JavaScript"],
[value="Figma"]:checked ~ .filters [for="Figma"],
[value="All"]:checked ~ .posts [data-category] {
  display: block;
}

[value="CSS"]:checked ~ .posts .post:not([data-category~="CSS"]),
[value="JavaScript"]:checked ~ .posts .post:not([data-category~="JavaScript"]),
[value="Typography"]:checked ~ .posts .post:not([data-category~="Typography"]),
[value="Figma"]:checked ~ .posts .post:not([data-category~="Figma"]) {
  display: none;
}
</style>
