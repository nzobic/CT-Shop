const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "longDate",
      overwrite: true,
      reportDir: "cypress/results"
   }
  },
});
