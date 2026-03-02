import SimpleFooter from "./SimpleFooter.vue";
import GridContainer from "./grid/GridContainer.vue";
import GridWrapper from "./grid/GridWrapper.vue";
import GridParent from "./grid/GridParent.vue";
import AnimatedComponent from "./AnimatedComponent.vue";

export default {
  title: "Components/Navigation/SimpleFooter",
  component: SimpleFooter,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: { control: "text" },
  },
};

const Template = (args) => ({
  components: { SimpleFooter, GridContainer, GridWrapper, GridParent, AnimatedComponent },
  setup() {
    return { args };
  },
  template: '<SimpleFooter v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: "Jacques Ramphal",
};
