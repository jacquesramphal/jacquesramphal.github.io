module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader", "style-loader", "css-loader")
      .loader("vue-svg-inline-loader")
      .options({});
  },
};
