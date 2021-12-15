<template>
  <div ref="target">
    <transition :name="animationType">
      <div v-appear="animate" class="animated-component">
        <slot />
      </div>
    </transition>
  </div>
</template>


<script lang="js">
import { onMounted, ref } from 'vue';export default {
  name: 'AnimatedComponent',
  props: {
    animationType: {
      type: String,
      required: false,
      default: 'fade'
    }
  },
  setup() {
    const target = ref();
    const animate = ref(false);    const observer = new IntersectionObserver(
      ([entry]) => {
        animate.value = entry.isIntersecting;
      },
      {
        threshold: 0.3
      }
    );    onMounted(() => {
      observer.observe(target.value);
    });    return {
      animate,
      target
    };
  }
};
</script>

<style lang="sass" scoped>
// see motion.css for transition styles
</style>