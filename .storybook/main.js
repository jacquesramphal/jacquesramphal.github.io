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
    // 'tag' mode: only generate a Docs page for stories that explicitly
    // opt in with tags: ['autodocs']. Introduction stays docs-free.
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    const path = require("path");

    // Add @ alias support
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

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
