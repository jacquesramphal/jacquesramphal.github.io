import ImageCard from "../components/card/ImageCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: 'Components/Card/card/ImageCard',
  decorators: [withDesign],
  component: ImageCard,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
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
  description: "Description",
  caption: "Caption",
};
export const Large = Template.bind({});
Large.args = {
  title: "Title",
  description: "Description",
  caption: "Caption",
  size: "large",
};
export const Split = Template.bind({});
Split.args = {
  title: "Title",
  description: "Description",
  caption: "Caption",
  size: "split",
};