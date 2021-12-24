<template id="app">
  <router-view v-slot="{ Component }">
  <ul class="container red">
      <li v-for="blogPost in posts" v-bind:key="blogPost.sys.id">
        <h4>{{ blogPost.title }}</h4>
        <p>{{ blogPost.description }}</p>
        <p>{{ blogPost.category }}</p>
      </li>
    </ul>
    <ThemeButton v-if="!$route.meta.hideNav" />
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
    <StickyNav v-if="!$route.meta.hideNav" />
    <MainFooter v-if="!$route.meta.hideFooter" />
  </router-view>
</template>

<script lang="js">
import StickyNav from "./components/StickyNav.vue";
import MainFooter from "@/components/MainFooter.vue";
import ThemeButton from "@/components/ThemeButton.vue";

// Register Global Component TBD
// import AnimatedComponent from "@/components/AnimatedComponent.vue";

export default {
  name: "App",
  components: {
    StickyNav,
    MainFooter,
    ThemeButton,
    // AnimatedComponent
  },
  data() {
   return {
     posts: []
   };
 },
 async created() {
   this.posts = await this.getPosts();
 },
  methods: {
    getPosts: async () => {
      const query = `{
       blogPostCollection {
         items {
           sys {
             id
           }
           category
           title
           description
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
         "Content-Type": "application/json"
       },
       body: JSON.stringify({ query })
     };

     try {
       const response = await fetch(fetchUrl, fetchOptions).then(response =>
         response.json()
       );
       return response.data.blogPostCollection.items;
     } catch (error) {
       throw new Error("Could not receive the data from Contentful!");
     }
   }
 }
};
</script>

<style lang="sass">
@import "./assets/styles/css/all.css"

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.15s ease-in-out

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
