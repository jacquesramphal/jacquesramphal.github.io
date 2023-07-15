const path = require('path');
const webpack = require('webpack'); // Add the webpack import

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.sass$/,
      use: [
        require.resolve('vue-style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('sass-loader'),
          options: {
            sassOptions: {
              indentedSyntax: true
            }
          }
        }
      ],
    },
    {
      test: /\.md$/,
      use: [
        require.resolve('html-loader'),
        require.resolve('markdown-loader'),
      ],
    }
  );

  // Add the plugins to the configuration
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  );

  return config;
};
