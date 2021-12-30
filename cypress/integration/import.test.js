/// <reference types="Cypress" />

describe("Import", () => {
  const yamlExamples = [
    {
      filename: "drupal-9.yaml",
      reportname: "Drupal",
      total: 183,
      success_criteria_level_a: 100,
      success_criteria_level_aa: 48,
      success_criteria_level_aaa: 22,
      functional_performance_criteria: 9,
      hardware: 0,
      software: 0,
      support_documentation_and_services: 4,
    },
    {
      filename: "govready-0.9.yaml",
      reportname: "GovReady",
      total: 160,
      success_criteria_level_a: 100,
      success_criteria_level_aa: 47,
      success_criteria_level_aaa: 0,
      functional_performance_criteria: 9,
      hardware: 0,
      software: 0,
      support_documentation_and_services: 4,
    },
  ];

  yamlExamples.forEach((yamlExample) => {
    it(`should import ${yamlExample.filename} example`, () => {
      const fileType = "application/x-yaml";
      cy.fixture(yamlExample.filename).as("yamlFixture");

      cy.visit("/");

      cy.get('input[type="file"]').then(function ($input) {
        const blob = Cypress.Blob.binaryStringToBlob(
          this.yamlFixture,
          fileType
        );
        const file = new File([blob], yamlExample.filename, { type: fileType });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        $input[0].files = myFileList;
        $input[0].dispatchEvent(new Event("change", { bubbles: true }));
      });

      cy.on("window:alert", (txt) => {
        expect(txt).to.contain(`OpenACR "${yamlExample.reportname}" loaded`);
      });

      cy.get("h2.your-report__heading").should(
        "contain",
        `Report for ${yamlExample.reportname}`
      );

      cy.get(".your-report__description").should(
        "contain",
        `Reported on\n  ${yamlExample.total}\n  of\n  339\n  Total Criteria.`
      );

      cy.get(
        ".progress__principle a[href$='/chapter/success_criteria_level_a'] + .progress__part"
      ).should("contain", `${yamlExample.success_criteria_level_a} of 100`);
      cy.get(
        ".progress__principle a[href$='/chapter/success_criteria_level_aa'] + .progress__part"
      ).should("contain", `${yamlExample.success_criteria_level_aa} of 52`);
      cy.get(
        ".progress__principle a[href$='/chapter/success_criteria_level_aaa'] + .progress__part"
      ).should("contain", `${yamlExample.success_criteria_level_aaa} of 92`);
      cy.get(
        ".progress__principle a[href$='/chapter/functional_performance_criteria'] + .progress__part"
      ).should(
        "contain",
        `${yamlExample.functional_performance_criteria} of 9`
      );
      cy.get(
        ".progress__principle a[href$='/chapter/hardware'] + .progress__part"
      ).should("contain", `${yamlExample.hardware} of 55`);
      cy.get(
        ".progress__principle a[href$='/chapter/software'] + .progress__part"
      ).should("contain", `${yamlExample.software} of 26`);
      cy.get(
        ".progress__principle a[href$='/chapter/support_documentation_and_services'] + .progress__part"
      ).should(
        "contain",
        `${yamlExample.support_documentation_and_services} of 5`
      );
    });
  });
});
