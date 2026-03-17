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
  // NOTE: Pre-rendering disabled due to Webpack 5 incompatibility
  // The prerender-spa-plugin@3.0.0-beta.2 uses deprecated Webpack 4 API
  // Alternative: Consider using @prerenderer/rollup-plugin or SSR/SSG framework
  // For now, relying on dynamic meta tags via @vueuse/head for SEO
};
