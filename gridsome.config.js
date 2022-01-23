// gridsome.config.js
module.exports = {
    templates: {
      // Add templates for content types here.
      // Read more: https://gridsome.org/docs/templates/
    },
    plugins: [
      {
        use: '@gridsome/source-contentful',
        options: {
          space: 'qitf7h1ea1eb', // required
          accessToken: 'LUIXtLDIyTmk77wGbaBzI_9kql8tau6dHr-lJ1TRbLI', // required
          host: 'cdn.contentful.com',
          environment: 'master',
          typeName: 'Contentful'
        }
      }
    ]
  }
