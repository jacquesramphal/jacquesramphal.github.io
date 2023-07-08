import ImageCard from "../components/ImageCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: 'Components/Card/ImageCard',
  decorators: [withDesign],
  component: ImageCard,
  argTypes: {
    title: { control: "text" },
    details: { control: "text" },
    caption: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
  },
};

const Template = (args) => ({
  components: { ImageCard },
  setup() {
    return { args };
  },
  template: `
    <div>
      <ImageCard v-bind="args" />
    </div>
  `,
});

export const Small = Template.bind({});
Small.args = {
  title: "Title",
  details: "Details",
  caption: "Caption",
};
export const Large = Template.bind({});
Large.args = {
  title: "Title",
  details: "Details",
  caption: "Caption",
  size: "large",
};
export const Split = Template.bind({});
Split.args = {
  title: "Title",
  details: "Details",
  caption: "Caption",
  size: "split",
};