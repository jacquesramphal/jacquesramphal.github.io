import HeroAnimated from "../components/HeroAnimated.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Misc./HeroAnimated",
  component: HeroAnimated,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { HeroAnimated },
  setup() {
    return { args };
  },
  template: '<HeroAnimated v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
