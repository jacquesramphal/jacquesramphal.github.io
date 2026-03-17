module.exports = {
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
};
