import FilterBar from "./FilterBar.vue";

export default {
  title: "Components/FilterBar",
  component: FilterBar,
  argTypes: {
    groupName: { control: "text" },
    selectedCategory: { control: "text" },
  },
};

const Template = (args) => ({
  components: { FilterBar },
  setup() {
    return { args };
  },
  template: '<FilterBar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  groupName: "filter-group",
  selectedCategory: "All",
  categories: [
    { value: "All", label: "All" },
    { value: "Design", label: "Design" },
    { value: "Engineering", label: "Engineering" },
    { value: "Strategy", label: "Strategy" },
  ],
};
