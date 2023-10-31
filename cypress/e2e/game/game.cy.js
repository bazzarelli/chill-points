/// <reference types="cypress" />

describe("chill points game page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/game", { failOnStatusCode: false });
  });

  it("should display a header with 'chill points' in the text", () => {
    cy.get("h1").should("be.visible");
    cy.get("h1").contains("Chill Points");
  });

  it("should display the starting state for the game", () => {
    cy.contains("1:00");
    cy.contains("Press & hold to begin");
  });

  it("clicks on the gear icon to open settings", () => {
    cy.get("[data-testid=settingsButton]").click();
    cy.contains("Game settings");
  });
});
