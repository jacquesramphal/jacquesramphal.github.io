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


  return config;
};
