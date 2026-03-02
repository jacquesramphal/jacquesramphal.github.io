import ResumeEntry from "./ResumeEntry.vue";

export default {
  title: "Components/Resume/Entry",
  component: ResumeEntry,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    position: { control: "text" },
    location: { control: "text" },
    from: { control: "text" },
    to: { control: "text" },
  },
};

const Template = (args) => ({
  components: { ResumeEntry },
  setup() {
    return { args };
  },
  template: '<ul><ResumeEntry v-bind="args" /></ul>',
});

export const Default = Template.bind({});
Default.args = {
  title: "Senior Product Designer",
  position: "Design Lead",
  location: "Remote",
  from: "2022",
  to: "Present",
  description:
    "Led design for enterprise product experiences and design systems across multiple product lines.",
};

export const WithoutDates = Template.bind({});
WithoutDates.args = {
  title: "UX Designer",
  description: "Designed user interfaces for web and mobile applications.",
};
