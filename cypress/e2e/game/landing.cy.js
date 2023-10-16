/// <reference types="cypress" />

describe('chill points landing page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000', {failOnStatusCode: false});
  });

  it('displays a header with "breath game" in the text', () => {
    cy.get('h1').should('be.visible');
    cy.get('h1').contains('breath game');
  })

  it('displays a "start" button', () => {
    cy.get('button').contains('start');
  })

  it("displays a game instructions section", () => {
    cy.get('h2').should('have.text','Game Instructions');
  })


})