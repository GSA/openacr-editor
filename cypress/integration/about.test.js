/// <reference types="Cypress" />

describe("About", () => {
  before(() => {
    cy.visit("/about", {
      onBeforeLoad(win) {
        cy.stub(win.console, "error").as("consoleError");
      },
    });
    cy.get("@consoleError").should("not.be.called");
  });

  it("enter product name and see it reflected in the sidebar", () => {
    cy.get("#evaluation-product-name").type("Drupal");

    cy.get("h2.your-report__heading").should("contain", "Report for Drupal");
  });

  it("default report date is today and in local format", () => {
    const today = new Date().toLocaleDateString();

    cy.get("#evaluation-report-date").should("have.value", today);
  });

  it("license dropdown is searchaeble", () => {
    cy.get("#evaluation-license")
      .type("creative commons")
      .get(".listContainer")
      .contains(
        "Creative Commons Attribution Share Alike 4.0 International (CC-BY-SA-4.0)"
      )
      .click()
      .get(".selectedItem")
      .should("contain", "CC-BY-SA-4.0");
  });

  it("license dropdown is clearable", () => {
    cy.get(".clearSelect").click().get(".selectedItem").should("not.exist");
  });

  it("add and remove related OpenACRs", () => {
    cy.get("button")
      .contains("Add related OpenACR")
      .as("addRelatedOpenACR")
      .focus();

    [1, 2].forEach((number) => {
      cy.get("@addRelatedOpenACR")
        .click()
        .get(".Related__Contents")
        .should("contain", `Related OpenACR ${number}`)
        .get(`#evaluation-related-openacrs-${number}-url`)
        .type(
          "https://ckeditor.com/docs/ckeditor4/latest/guide/dev_section508.html"
        )
        .get(`#evaluation-related-openacrs-${number}-type`)
        .select("Secondary");
    });

    cy.get(".Related__Control--delete")
      .first()
      .click()
      .get(".Related__Contents")
      .should("not.contain", "Related OpenACR 2");
  });

  it("disabling a chapter should remove the progress bar, update the total count", () => {
    cy.get("#evaluation-disabled-chapter-hardware").check();

    cy.get("#evaluation-disabled-chapter-software").check();

    cy.get(
      ".progress__principle a[href$='/chapter/hardware'] + .progress__part"
    ).should("not.exist");

    cy.get(
      ".progress__principle a[href$='/chapter/software'] + .progress__part"
    ).should("not.exist");

    cy.get(".your-report__description").should(
      "contain",
      `Reported on\n  0\n  of\n  326\n  Total Criteria.`
    );
  });
});
