/// <reference types="Cypress" />

describe("Accordions", () => {
  it("can be expanded and collapsed", () => {
    const authorNameField = "#evaluation-author-name";

    cy.visit("/about#author-editor");
    cy.focused()
      .get(authorNameField)
      .should("be.visible")
      .focused()
      .click()
      .get(authorNameField)
      .should("not.be.visible");
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
