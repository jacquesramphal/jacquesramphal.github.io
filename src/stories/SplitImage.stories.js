import TextImage from "../components/card/TextImage.vue";

export default {
  title: "Components/Layout/TextImage",
  component: TextImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
    docs: {
      description: {
        component:
          'A two-column split layout with a text block on one side and an image on the other. ' +
          'The `flipped` prop swaps the image to the left. ' +
          'Columns activate at 1201px viewport width — use the viewport toolbar or expand the canvas to see the split layout.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Heading text' },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4'],
      description: 'HTML heading level',
    },
    eyebrow: { control: 'text', description: 'Small label above the heading' },
    description: { control: 'text', description: 'Body copy' },
    filename: { control: 'text', description: 'Image filename from assets/images/' },
    alt: { control: 'text', description: 'Image alt text' },
    label: { control: 'text', description: 'CTA button label' },
    route: { control: 'text', description: 'Internal route for the CTA' },
    btnroute: { control: 'text', description: 'Alternative button route' },
    flipped: { control: 'boolean', description: 'Move image to left, text to right' },
    red: { control: 'boolean', description: 'Apply red background (accent variant)' },
  },
};

const Template = (args) => ({
  components: { TextImage },
  setup() {
    return { args };
  },
  template: '<TextImage v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Detail Card',
  as: 'h2',
  eyebrow: 'Eyebrow',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  filename: 'jacques.jpg',
  alt: 'Portrait photo',
  label: 'Read More',
  route: '',
  flipped: false,
  red: false,
};

export const Flipped = Template.bind({});
Flipped.args = {
  ...Default.args,
  flipped: true,
};
Flipped.parameters = {
  docs: {
    description: {
      story: 'Image on the left, text on the right. Applied via the `flipped` boolean prop.',
    },
  },
};
