/// <reference types="Cypress" />

describe("Anchor", () => {
  it("visiting an anchor link should show header in focus", () => {
    cy.visit("/about#author-editor");
    cy.focused().should("contain", "Author");
  });
  it("visiting an anchor link inside an accordion should show header in focus and accordion expanded", () => {
    cy.visit("/chapter/success_criteria_level_a#1.1.1-web-editor");
    cy.focused().should("contain", "Web");
  });
});
