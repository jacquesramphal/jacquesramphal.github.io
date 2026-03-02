import CourseCard from '../components/card/CourseCard.vue';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Cards/CourseCard',
  component: CourseCard,
  decorators: [withDesign],
  argTypes: {
    id: { control: 'text', description: 'Unique identifier for read tracking' },
    tag: { control: 'text', description: 'Category or date tag' },
    title: { control: 'text', description: 'Title of the post or resource' },
    description: { control: 'text', description: 'Short summary' },
    route: { control: 'text', description: 'Internal route to navigate to' },
    read: { control: 'boolean', description: 'Marks the item as read with a checkmark' },
  },
};

const Template = (args) => ({
  components: { CourseCard },
  setup() { return { args }; },
  template: '<div><CourseCard v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  id: 'post-1',
  tag: 'Design Systems',
  title: 'Token-based design at scale',
  description: 'How a well-structured token architecture eliminates guesswork in design-to-code workflows.',
  route: '/',
  read: false,
};

export const Read = Template.bind({});
Read.args = {
  id: 'post-2',
  tag: 'AI / UX',
  title: 'Designing for AI uncertainty',
  description: 'A framework for communicating model confidence without sacrificing usability.',
  route: '/',
  read: true,
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  id: 'post-3',
  tag: 'Process',
  title: 'The designer who codes: twelve years at the intersection of design and engineering',
  description: 'Reflections on building at the boundary between craft and systems.',
  route: '/',
  read: false,
};
LongTitle.storyName = 'Long Title';
