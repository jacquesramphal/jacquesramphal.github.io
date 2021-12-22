<template>
  <div>
    <component :blok="story.content" :is="story.content.component"></component>
  </div>
</template>
 
<script>
// 1. Require the Storyblok client
import StoryblokClient from 'storyblok-js-client'
 
// 2. Set your token
const token = 'T4MKBP0WQOarLN7Vags5swtt';
 
// 3. Initialize the client with the preview token so we can access our API easily
// from your space dashboard at https://app.storyblok.com
let storyapi = new StoryblokClient({
  accessToken: token
})  
 
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      story: {
        content: {
          body: []
        }
      }
    }
  },
  created () {
    // 4. Initialize the Storyblok Client Bridge to allow us to subscribe to events
    // from the editor itself.
    window.storyblok.init({
      accessToken: token
    })
    window.storyblok.on('change', () => {
      this.getStory('home', 'draft')
    })
    window.storyblok.pingEditor(() => {
      if (window.storyblok.isInEditor()) {
        // draft will be loaded if embeded in app.storyblok.com
        this.getStory('home', 'draft')
      } else {
        // published versions will be loaded outside of app.storyblok.com
        // so make sure to published your entries - otherwise this will be a 404
        this.getStory('home', 'published')
      }
    })
  },
  methods: {
    getStory(slug, version) {
      storyapi.get('cdn/stories/' + slug, {
        version: version
      })
      .then((response) => {
        this.story = response.data.story
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>