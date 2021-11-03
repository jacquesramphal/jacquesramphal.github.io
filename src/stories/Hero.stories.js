import MyComponent from '../components/MyComponent.vue';

export default {
    title: 'MyComponent',
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
    template: '<MyComponent>base</MyComponent>',
});

export const Variant = () => ({
    components: { MyComponent },
    template: '<MyComponent myprop="variant">variant</MyComponent>',
});


