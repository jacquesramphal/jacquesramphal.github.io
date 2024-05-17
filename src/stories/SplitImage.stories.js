import TextImage from "../components/card/TextImage.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Card/TextImage",
  component: TextImage,
  decorators: [withDesign],
  argTypes: {
    header: { control: 'text' },
    description: { control: 'text' },
    eyebrow: { control: 'text' },
    filename: { control: 'text' },
    label: { control: 'text' },
    route: { control: 'text' },
    flipped: { control: 'boolean' },
    red: { control: 'boolean' },
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
  header: 'Detail Card',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eyebrow: 'Eyebrow',
  filename: 'jacques.jpg',
  label: 'Read More',
  route: '',
  flipped: false,
  red: false,
};

export const Flipped = Template.bind({});
Flipped.args = {
  header: 'Detail Card',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eyebrow: 'Eyebrow',
  filename: 'jacques.jpg',
  label: 'Read More',
  route: '',
  flipped: true,
  red: false,
};


