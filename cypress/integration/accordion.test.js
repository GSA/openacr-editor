/// <reference types="Cypress" />

describe("Accordions", () => {
  it("clicking anchor link, opens accordion", () => {
    cy.visit("/chapter/success_criteria_level_a");
    cy.get(
      '.chapter-help-text a[href="#1.1.1-electronic-docs-editor"]'
    ).click();
    cy.get('[id="1.1.1-electronic-docs-editor"]').should("be.visible");
  });

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
