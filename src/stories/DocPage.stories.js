import DocPage from "../pages/DocPage.vue";
import docData from "../assets/data/docs.json";

import { withDesign } from "storybook-addon-designs";

export default {
  title: "Pages/DocPage",
  component: DocPage,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { DocPage },
  setup() {
    return { args };
  },
  template: '<DocPage v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  sections: docData.entries,
};
