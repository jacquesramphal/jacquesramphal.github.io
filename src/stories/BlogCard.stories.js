import CourseCard from "../components/card/CourseCard.vue";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Card/CourseCard",
  component: CourseCard,
  decorators: [withDesign],
  argTypes: {},
};

const Template = (args) => ({
  components: { CourseCard },
  setup() {
    return { args };
  },
  template: `
    <div>
      <CourseCard v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: "Hello World",
  description:
    "This is a short description taken from the article. Maybe a little longer ...",
  route: "/example",
};
