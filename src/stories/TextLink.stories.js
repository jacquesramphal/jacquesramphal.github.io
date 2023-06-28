import TextLink from '../components/text/TextLink.vue';

export default {
  title: 'Components/TextLink',
  component: TextLink,
  argTypes: {
    label: { control: 'text' },
    route: { control: 'text' },
    link: { control: 'text' },
    large: { control: 'boolean' },
    left: { control: 'boolean' },
    right: { control: 'boolean' },
  },
};

const Template = (args) => ({
  components: { TextLink },
  setup() {
    return { args };
  },
  template: `
    <TextLink
      v-bind="args"
    />
  `,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Text Link Label',
  route: '/some-route',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  label: 'Text Link Label',
  link: 'https://example.com',
};