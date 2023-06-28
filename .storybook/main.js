module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@storybook/preset-scss",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          // Require your Sass preprocessor here
          implementation: require("sass"),
        },
      },
    },

    "@storybook/addon-docs",
    "storybook-addon-designs",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [
              /* any remark plugins you need */
            ],
          },
        },
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        {
          loader: "sass-loader",
        },
      ],
    });

    return config;
  },
};
