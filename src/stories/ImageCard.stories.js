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

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  details: "Details",
  caption: "Caption",
};
export const Large = Template.bind({});
Large.args = {
  title: "Title",
  details: "Details",
  caption: "Caption",
  large: true,
};
export const Detail = Template.bind({});
Detail.args = {
  title: "Title",
  details: "Details",
  caption: "Caption",
  detail: true,
};