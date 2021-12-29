/// <reference types="Cypress" />

describe("Home", () => {
  it("should load with header", () => {
    cy.visit("/");
    cy.contains("Overview");
  });
});
