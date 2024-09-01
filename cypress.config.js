const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports' 
  },
  
  e2e: {

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl:"https://opensource-demo.orangehrmlive.com//",
    watchForFileChanges:false,
    autoRefresh:false,
    // testIsolation:false,
    // defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      // require('cypress-mochawesome-reporter/plugin')(on);
      config.specPattern = [
        'cypress/e2e/orangehrm_e2e.cy.js', 
      ]
      return config;
    },
  },
  "hideXHR": true
});