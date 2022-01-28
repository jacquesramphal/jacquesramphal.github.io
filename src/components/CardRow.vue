<template>
  <div class="">
    <Container id="cards" style="overflow: visible">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h3 style="text-align: left">{{ header }}</h3>
        <p class="external justify-end">
          <router-link :to="{ name: 'Blog' }">View All</router-link>
        </p>
      </div>
      <div class="grid-parent">
        <DefaultCard
          v-for="blogPost in contentful"
          v-bind:key="blogPost.sys.id"
          :image="blogPost.image"
          :category="blogPost.category"
          :imgurl="blogPost.imgurl"
          :title="blogPost.title"
          :description="blogPost.description"
        />
      </div>
    </Container>
  </div>
</template>

<script>
import DefaultCard from "@/components/card/DefaultCard.vue";
import Container from "@/components/grid/Container.vue";

export default {
  name: "CardRow",
  components: {
    Container,
    DefaultCard,
  },
  props: {
    header: {
      type: String,
      default: "Ramblings",
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
           category
           title
           description
           imgurl
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
