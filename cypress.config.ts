import { defineConfig } from 'cypress';
const { afterRunHook } = require('cypress-mochawesome-reporter/lib');
const reportDir = 'cypress/reports/local';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      require('cypress-localstorage-commands/plugin')(on, config);
      on('after:run', async () => {
        await afterRunHook();
      });
      return config;
    },
    //al smoke /sanity tests lta + dd
    specPattern: ['cypress/e2e/**/**/**/**.cy.ts'],
    baseUrl: 'https://www.airbnb.com',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
      mochaJunitReporterReporterOptions: {
        mochaFile: `${reportDir}/junit/results-[hash].xml`
      },
      cypressMochawesomeReporterReporterOptions: {
        reportDir: `${reportDir}`,
        charts: true,
        reportPageTitle: 'Local-HTML-Report',
        reportTitle: 'Local-Results',
        embeddedScreenshots: true,
        inlineAssets: true,
        overwrite: true,
        html: true
      }
    },
    video: true,
    videosFolder: `${reportDir}/videos`,
    screenshotsFolder: `${reportDir}/screenshots`,
    experimentalOriginDependencies: true,
    experimentalWebKitSupport: true,
    defaultCommandTimeout: 8000,
    viewportHeight: 1200,
    viewportWidth: 1920,
    watchForFileChanges: true,
    requestTimeout: 8000,
    responseTimeout: 8000,
    numTestsKeptInMemory: 3,
    experimentalMemoryManagement: true,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      WEB_URL: 'https://www.airbnb.com'
    }
  }
});
