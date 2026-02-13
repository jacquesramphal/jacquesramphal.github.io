const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader", "style-loader", "css-loader")
      .loader("vue-svg-inline-loader")
      .options({});

    // Markdown loader configuration
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: [
              '/',
              '/library',
              '/writing',
              '/work',
              '/play',
              '/resume',
              '/info',
              '/doc/building-genie-changed-me',
            ],
            renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
              renderAfterTime: 5000,
              headless: true,
              maxConcurrentRoutes: 4,
            }),
          }),
        ],
      };
    }
  },
};
