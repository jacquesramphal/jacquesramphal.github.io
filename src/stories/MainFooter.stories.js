import MainFooter from "../components/MainFooter.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/MainFooter",
  component: MainFooter,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { MainFooter },
  setup() {
    return { args };
  },
  template: '<MainFooter v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
