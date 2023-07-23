import TextBlock from '../components/TextBlock';

export default {
  title: 'Components/TextBlock',
  component: TextBlock,
  argTypes: {
    alt: { control: 'text' },
    eyebrow: { control: 'text' },
    header: { control: 'text' },
    header3: { control: 'text' },
    header4: { control: 'text' },
    details: { control: 'text' },
    center: { control: 'boolean' },
    clamped: { control: 'boolean' },
    cta: { control: 'text' },
    route: { control: 'text' },
    btnroute: { control: 'text' },
    link: { control: 'text' },
    label: { control: 'text' },
    icon: { control: 'text' },
  },
};

const Template = (args) => ({
  components: { TextBlock },
  setup() {
    return { args };
  },
  template: `
    <TextBlock
      v-bind="args"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: 'j-logo',
  alt: 'Logo',
  eyebrow: 'Eyebrow',
  header: 'Header Text',
  header3: '',
  header4: '',
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  center: false,
  clamped: false,
  cta: 'Call to Action',
  btnroute: 'your-route-here', // Provide a valid route value
  link: '',
  label: 'Home',
};