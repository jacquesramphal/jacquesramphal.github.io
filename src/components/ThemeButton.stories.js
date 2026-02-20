import ThemeButton from "./ThemeButton.vue";
import MyButton from "./Button/Button.vue";

export default {
  title: "Components/ThemeButton",
  component: ThemeButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { ThemeButton, MyButton },
  setup() {
    return { args };
  },
  template: '<div style="position: relative; height: 60px;"><ThemeButton v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};
