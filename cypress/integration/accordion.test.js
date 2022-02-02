/// <reference types="Cypress" />

describe("Accordions", () => {
  it("clicking anchor link, opens accordion, collapse all is still enabled", () => {
    cy.visit("/chapter/success_criteria_level_a");
    cy.get(
      '.chapter-help-text a[href="#1.1.1-electronic-docs-editor"]'
    ).click();
    cy.get('[id="1.1.1-electronic-docs-editor"]').should("be.visible");
    cy.get("button.collapse").should("not.be.disabled");
  });

  it("visiting URL with anchor, accordion is open, collapse all is still enabled", () => {
    cy.visit("/chapter/success_criteria_level_a#1.1.1-web-editor");
    cy.get('[id="1.1.1-web-editor"]').should("be.visible");
    cy.get("button.collapse").should("not.be.disabled");
  });

  it("visiting URL with anchor, collapse accordion, expand all is still enabled", () => {
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
    cy.get("button.expand").should("not.be.disabled");
  });

  it("can all be collapsed and expanded", () => {
    cy.visit("/about");
    cy.get("button.collapse")
      .click()
      .get("details")
      .should("not.have.attr", "open");
    cy.get("button.collapse").should("be.disabled");
    cy.get("button.expand").click().get("details").should("have.attr", "open");
    cy.get("button.expand").should("be.disabled");
  });
});
