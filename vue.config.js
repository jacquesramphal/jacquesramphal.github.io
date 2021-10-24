module.exports = {
  publicPath: '',
  configureWebpack: {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'vue-loader',
                options: {
                    esModule: false,

                },
            },
        ],
    }

}
}   