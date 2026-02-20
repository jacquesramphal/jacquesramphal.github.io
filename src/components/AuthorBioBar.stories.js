import AuthorBioBar from "./AuthorBioBar.vue";
import GridParent from "./grid/GridParent.vue";
import DynamicText from "./text/DynamicText.vue";

export default {
  title: "Components/AuthorBioBar",
  component: AuthorBioBar,
  argTypes: {
    name: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
};

const Template = (args) => ({
  components: { AuthorBioBar, GridParent, DynamicText },
  setup() {
    return { args };
  },
  template: '<AuthorBioBar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  name: "Jacques Ramphal",
  title: "Staff Product Designer, Design Lead",
  description: "",
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  name: "Jacques Ramphal",
  title: "Staff Product Designer, Design Lead",
  description:
    "Writing about design systems, front-end development, and product design.",
};
