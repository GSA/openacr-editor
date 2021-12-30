/// <reference types="Cypress" />

describe("Import", () => {
  it("should import drupal-9.yaml example", () => {
    const drupalYAMLExample = "drupal-9.yaml";
    const fileType = "application/x-yaml";
    cy.fixture(drupalYAMLExample).as("drupalExampleFixture");

    cy.visit("/");

    cy.get('input[type="file"]').then(function ($input) {
      const blob = Cypress.Blob.binaryStringToBlob(
        this.drupalExampleFixture,
        fileType
      );
      const file = new File([blob], drupalYAMLExample, { type: fileType });
      const list = new DataTransfer();

      list.items.add(file);
      const myFileList = list.files;

      $input[0].files = myFileList;
      $input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.on("window:alert", (txt) => {
      expect(txt).to.contain('OpenACR "Drupal" loaded');
    });

    cy.get("h2.your-report__heading").should("contain", "Report for Drupal");

    cy.get(".your-report__description").should(
      "contain",
      "Reported on\n  183\n  of\n  339\n  Total Criteria."
    );

    cy.get(
      ".progress__principle a[href$='/chapter/success_criteria_level_a'] + .progress__part"
    ).should("contain", "100 of 100");
    cy.get(
      ".progress__principle a[href$='/chapter/success_criteria_level_aa'] + .progress__part"
    ).should("contain", "48 of 52");
    cy.get(
      ".progress__principle a[href$='/chapter/success_criteria_level_aaa'] + .progress__part"
    ).should("contain", "22 of 92");
    cy.get(
      ".progress__principle a[href$='/chapter/functional_performance_criteria'] + .progress__part"
    ).should("contain", "9 of 9");
    cy.get(
      ".progress__principle a[href$='/chapter/hardware'] + .progress__part"
    ).should("contain", "0 of 55");
    cy.get(
      ".progress__principle a[href$='/chapter/software'] + .progress__part"
    ).should("contain", "0 of 26");
    cy.get(
      ".progress__principle a[href$='/chapter/support_documentation_and_services'] + .progress__part"
    ).should("contain", "4 of 5");
  });
});
