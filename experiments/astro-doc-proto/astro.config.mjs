import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// Static output — mirrors how the current site ships prerendered HTML to
// GitHub Pages. The Vue integration is here to prove existing .vue components
// can be reused as islands during an incremental migration.
export default defineConfig({
  output: 'static',
  integrations: [vue()],
  site: 'https://jacquesramphal.com',
});
