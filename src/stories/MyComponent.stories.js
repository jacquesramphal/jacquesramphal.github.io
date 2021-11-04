import MyComponent from '../components/MyComponent.vue';

export default {
    title: 'Template/MyComponent',
    component: MyComponent,
    argTypes: {
        variant: {
          options: ['base', 'variant'],
          control: { type: 'select' }
        }
      }
};

export const Base = () => ({
    components: { MyComponent },
    template: '<MyComponent></MyComponent>',
});

export const Variant = () => ({
    components: { MyComponent },
    template: '<MyComponent myprop="variant"></MyComponent>',
});


