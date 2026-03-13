import ImageCard from "./ImageCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: 'Components/Cards/ImageCard',
  component: ImageCard,
  tags: ['autodocs'],
  decorators: [withDesign],
  parameters: {
    docs: {
      description: {
        component:
          'An image-led card for work thumbnails, case studies, or media content. ' +
          'Three sizes: `small` (compact), `large` (tall), and `split` (wide aspect). ' +
          'Includes title, description, and an optional caption.',
      },
    },
  },
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
  filename1: "jacques.jpg",
  alt: "Portrait photo",
};
export const Large = Template.bind({});
Large.args = {
  title: "Title",
  description: "Description",
  caption: "Caption",
  filename1: "jacques.jpg",
  alt: "Portrait photo",
  size: "large",
};
export const Split = Template.bind({});
Split.args = {
  title: "Title",
  description: "Description",
  caption: "Caption",
  filename1: "jacques.jpg",
  alt: "Portrait photo",
  size: "split",
};