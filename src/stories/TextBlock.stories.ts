// TextBlock.stories.js

import TextBlock from './TextBlock.vue';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Path/To/TextBlock',
  component: TextBlock,
};

export const Left = () => ({
  components: { TextBlock },
  template: '<TextBlock />',
});

export const Center = () => ({
  components: { TextBlock },
    template: '<TextBlock prop="value"/>',
});