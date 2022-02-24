module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
      .loader("vue-svg-inline-loader")
      .options({});
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8085, // CHANGE YOUR PORT HERE!
    https: true,
	hot: true,
  },
};
