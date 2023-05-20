<template>
  <div
    class=""
    style="overflow: visible !important; background-color: var(--bg-darker)"
  >
    <GridContainer
      class="hidemobile"
      id="cards"
      style="overflow: visible !important"
    >
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h3 class="" style="text-align: left">{{ header }}</h3>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>

      <div class="grid-parent">
        <DefaultCard
          v-for="blogPost in contentful"
          v-bind:key="blogPost.sys.id"
          :image="blogPost.image"
          :tag="blogPost.tag"
          :imgurl="blogPost.imgurl"
          :title="blogPost.title"
          :description="blogPost.description"
          :route="blogPost.route"
          :label="blogPost.label"
        />
      </div>
    </GridContainer>
    <GridContainer
      class="showmobile"
      style="padding-bottom: 0 !important; overflow: visible !important"
    >
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h3 class="" style="text-align: left">{{ header }}</h3>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>
    </GridContainer>

    <div class="showmobile scrolling-wrapper">
      <div class="cardmobile" v-for="entry in docs.entries"
          :key="entry.id">
      <DefaultCard
        class="post cardmobile"
        v-for="blogPost in contentful"
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
    </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "CardRow",
  components: {
  },
  props: {
    header: {
      type: String,
      default: "Docs",
    },
  },
  data() {
    return {
      contentful: [],
    };
  },
  async created() {
    this.contentful = await this.getContentful();
  },
  methods: {
    getContentful: async () => {
      const query = `{
       blogPostCollection(limit: 3) {
         items {
           sys {
             id
           }
           tag
           title
           description
           imgurl
           label
           route
           image {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
         }
       }
     }`;
      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions).then((response) =>
          response.json()
        );
        return response.data.blogPostCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
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
  // display: flex;
  flex-direction: row;
  .cardmobile {
    margin: 0 0 var(--spacing-sm) var(--spacing-sm);
    display: inline-flex;
    width: 25vw;
  }
  /* ------------ BREAKPOINT MD ------------ */
  @media only screen and (max-width: 740px) {
    .cardmobile {
      margin: 0 0 var(--spacing-sm) var(--spacing-sm);
      width: 85vw;
    }
  }
  .cardmobile:last-child {
    margin-right: var(--spacing-sm);
  }
}
</style>
