import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "rtfmqz",
  e2e: {
    specPattern: "cypress/e2e/game/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
