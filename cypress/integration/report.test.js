/// <reference types="Cypress" />

describe("Report", () => {
  before(() => {
    cy.visit("/report", {
      onBeforeLoad(win) {
        cy.stub(win.console, "error").as("consoleError");
      },
    });
    cy.get("@consoleError").should("not.be.called");
  });

  it("should have default filename", () => {
    cy.get("a")
      .contains("Download Report (YAML)")
      .invoke("attr", "download")
      .should("contain", "report.yaml");

    cy.get("a")
      .contains("Download Report (HTML)")
      .invoke("attr", "download")
      .should("contain", "report.html");
  });

  it("should show entered name and version", () => {
    cy.visit("/about");
    cy.get("#evaluation-product-name").type("Drupal");
    cy.get("#evaluation-product-version").type("9.1");

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should("contain", "Drupal 9.1");

    cy.get("a")
      .contains("Download Report (YAML)")
      .invoke("attr", "download")
      .should("contain", "drupal-9.1.yaml");

    cy.get("a")
      .contains("Download Report (YAML)")
      .invoke("attr", "href")
      .should("include", "data:application/yaml");

    cy.get("a")
      .contains("Download Report (HTML)")
      .invoke("attr", "download")
      .should("contain", "drupal-9.1.html");

    cy.get("a")
      .contains("Download Report (HTML)")
      .invoke("attr", "href")
      .should("include", "blob:");
  });

  it("should show entered report date", () => {
    cy.visit("/about");
    cy.get("#evaluation-report-date").clear().type("12/31/2021");

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should("contain", "12/31/2021");
  });

  it("should show selected license", () => {
    cy.visit("/about");
    cy.get("#evaluation-license")
      .type("creative commons")
      .get(".listContainer")
      .contains(
        "Creative Commons Attribution Share Alike 4.0 International (CC-BY-SA-4.0)"
      )
      .click();

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should(
      "contain",
      "This content is licensed under a Creative Commons Attribution Share Alike 4.0 International."
    );
  });

  it("should not show license header when license is cleared", () => {
    cy.visit("/about");
    cy.get(".clearSelect").click();

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should("not.contain", "License");
  });

  it("should show entered related OpenACR", () => {
    cy.visit("/about");

    cy.get("button")
      .contains("Add related OpenACR")
      .click()
      .get("#evaluation-related-openacrs-1-url")
      .type(
        "https://ckeditor.com/docs/ckeditor4/latest/guide/dev_section508.html"
      )
      .get("#evaluation-related-openacrs-1-type")
      .select("Secondary");

    cy.get("button").contains("View Report").click();

    cy.get(".validation").should("contain", "Valid!");

    cy.get("#content").should(
      "contain",
      "https://ckeditor.com/docs/ckeditor4/latest/guide/dev_section508.html (secondary)"
    );
  });

  it("should show entered level and notes for a criteria", () => {
    cy.visit("/chapter/success_criteria_level_a");
    cy.get("button").contains("+ Expand All Sections").click();

    cy.get("select[name='evaluation-1.1.1-web-level']").select("Supports");

    cy.get("textarea[id='evaluation-1.1.1-web-notes']").type(
      "Does support non-text content."
    );

    cy.get("a[href='/report#text-equiv-all-editor']").click();

    cy.get("#success_criteria_level_a-editor + table tbody tr")
      .should("be.focused")
      .should("contain", "Web: Supports")
      .should("contain", "Web: Does support non-text content.");
  });

  it("should render markdown in notes columns for a criteria", () => {
    cy.visit("/chapter/success_criteria_level_a");
    cy.get("button").contains("+ Expand All Sections").click();

    cy.get("textarea[id='evaluation-1.1.1-web-notes']").clear();

    cy.get("textarea[id='evaluation-1.1.1-web-notes']").type(
      "[Drupal 8](https://www.drupal.org/) requires alt text for images by default."
    );

    cy.get("a[href='/report#text-equiv-all-editor']").click();

    cy.get(
      "#success_criteria_level_a-editor + table tbody tr td:nth-child(3) a"
    )
      .should("have.attr", "href")
      .and("contains", "https://www.drupal.org/");
  });
});
