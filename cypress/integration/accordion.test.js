/// <reference types="Cypress" />

describe("Accordions", () => {
  it("can be expanded and collapsed", () => {
    cy.visit("/about#author-editor");
    cy.focused()
      .parent()
      .parent()
      .should("have.attr", "open")
      .focused()
      .click()
      .parent()
      .parent()
      .should("not.have.attr", "open");
  });

  it("can all be collapsed and expanded", () => {
    cy.visit("/about");
    cy.get("button")
      .contains("− Collapse All Sections")
      .click()
      .get("details")
      .should("not.have.attr", "open");
    cy.get("button")
      .contains("+ Expand All Sections")
      .click()
      .get("details")
      .should("have.attr", "open");
  });
});
