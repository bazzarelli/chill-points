/// <reference types="cypress" />

describe("chill points landing page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000", { failOnStatusCode: false });
  });

  it('displays a header with "relaxing game" in the text', () => {
    cy.get("h1").should("be.visible");
    cy.get("h1").contains("relaxing game");
  });

  it('displays a "start" button', () => {
    cy.get("button").contains("start");
  });

  it("displays a game instructions section", () => {
    cy.get("p").should(
      "have.text",
      "The game begins when you press and hold the finger print icon.",
    );
  });

  it("navigates to the game page on click of start button", () => {
    cy.get("button").contains("start").click();
    cy.url().should("include", "/game");
  });
});
