module.exports = {
	chainWebpack: config => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
				.loader("vue-svg-inline-loader")
				.options({});
	},
	devServer: {
		port: 8080,
		public: 'https://localhost:5001'
	  },
};