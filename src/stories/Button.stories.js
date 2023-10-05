import MyButton from "../components/Button.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Forms/Button",
  component: MyButton,
  decorators: [withDesign],
  argTypes: {
    onClick: {},
    type: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
  },
};

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<my-button v-bind="args" />',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  primary: true,
  label: "Button",
  type: "solid",
};
Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/c2JuJnN4XUPnBd44IZn3xg/Ramphal-Design-Library?type=design&node-id=0-180&mode=design&t=M4PTdiwkrAK9Pn4A-4",
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button Secondary",
  type: "outline",
};
Secondary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/c2JuJnN4XUPnBd44IZn3xg/Ramphal-Design-Library?type=design&node-id=0-176&mode=design&t=M4PTdiwkrAK9Pn4A-4",
  },
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
