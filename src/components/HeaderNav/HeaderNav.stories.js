import HeaderNav from './HeaderNav.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {}
    }
  ]
});

export default {
  title: 'Components/HeaderNav',
  component: HeaderNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main navigation header component that handles responsive navigation and menu toggling.'
      }
    }
  },
  decorators: [
    () => ({
      template: '<div style="min-height: 200vh; padding: 20px;"><story /></div>'
    })
  ],
  argTypes: {
    breadcrumb: {
      control: 'boolean',
      description: 'Whether to show the breadcrumb navigation'
    },
    menuOpen: {
      control: 'boolean',
      description: 'Whether the menu is open'
    },
    showNavbar: {
      control: 'boolean',
      description: 'Whether the navbar is visible'
    },
    isDesktopScreen: {
      control: 'boolean',
      description: 'Whether the screen is desktop size',
      defaultValue: true
    }
  }
};

const Template = (args) => ({
  components: { HeaderNav },
  setup() {
    return { args };
  },
  template: `
    <HeaderNav v-bind="args">
      <template #menu-button>
        <button @click="args.menuOpen = !args.menuOpen">
          {{ args.menuOpen ? '✕' : '☰' }}
        </button>
      </template>
      <template #menu-button-mobile>
        <button @click="args.menuOpen = !args.menuOpen">
          {{ args.menuOpen ? '✕' : '☰' }}
        </button>
      </template>
    </HeaderNav>
  `
});

export const Default = Template.bind({});
Default.args = {
  breadcrumb: false,
  menuOpen: false,
  showNavbar: true,
  isDesktopScreen: true
};

export const WithBreadcrumb = Template.bind({});
WithBreadcrumb.args = {
  breadcrumb: true,
  menuOpen: false,
  showNavbar: true,
  isDesktopScreen: true
};

export const MenuOpen = Template.bind({});
MenuOpen.args = {
  breadcrumb: false,
  menuOpen: true,
  showNavbar: true,
  isDesktopScreen: true
};

export const Hidden = Template.bind({});
Hidden.args = {
  breadcrumb: false,
  menuOpen: false,
  showNavbar: false,
  isDesktopScreen: true
};

export const Mobile = Template.bind({});
Mobile.args = {
  breadcrumb: false,
  menuOpen: false,
  showNavbar: true,
  isDesktopScreen: false
}; 