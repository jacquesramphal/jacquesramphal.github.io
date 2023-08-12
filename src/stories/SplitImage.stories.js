import SplitImage from "../components/card/SplitImage.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Card/SplitImage",
  component: SplitImage,
  decorators: [withDesign],
  argTypes: {
    header: { control: 'text' },
    details: { control: 'text' },
    eyebrow: { control: 'text' },
    filename: { control: 'text' },
    cta: { control: 'text' },
    route: { control: 'text' },
    flipped: { control: 'boolean' },
    red: { control: 'boolean' },
  },
};

const Template = (args) => ({
  components: { SplitImage },
  setup() {
    return { args };
  },
  template: '<SplitImage v-bind="args" />',
});


export const Default = Template.bind({});
Default.args = {
  header: 'Detail Card',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eyebrow: 'Eyebrow',
  filename: 'jacques.jpg',
  cta: 'Read More',
  route: '',
  flipped: false,
  red: false,
};

export const Flipped = Template.bind({});
Flipped.args = {
  header: 'Detail Card',
  details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  eyebrow: 'Eyebrow',
  filename: 'jacques.jpg',
  cta: 'Read More',
  route: '',
  flipped: true,
  red: false,
};


