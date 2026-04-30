const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mocha-junit-reporter",
  videosFolder: "cypress/results",
  screenshotsFolder: "cypress/results/screenshots",
  e2e: {
    baseUrl: "http://localhost:10001",
    specPattern: "cypress/integration/**/*.js",
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporterOptions: {
    mochaFile: "cypress/results/junit.[hash].xml",
    toConsole: false,
  },
  video: true,
});
