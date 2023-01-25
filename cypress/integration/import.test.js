/// <reference types="Cypress" />

describe("Import", () => {
  const today = new Date().toLocaleDateString();
  const yamlExamples = [
    {
      filename: "drupal-9.yaml",
      reportDate: "8/31/2021",
      lastModifiedDate: "11/16/2021",
      version: "drupal-9.1-13",
      reportname: "Drupal",
      total: 184,
      success_criteria_level_a: 100,
      success_criteria_level_aa: 48,
      success_criteria_level_aaa: 23,
      functional_performance_criteria: 9,
      hardware: 0,
      software: 0,
      support_documentation_and_services: 4,
      summary: 25,
      summary_supports: 58,
      summary_partially: 3,
      summary_does_not_supports: 5,
      summary_na: 34,
    },
    {
      filename: "govready-0.9.yaml",
      reportDate: today,
      lastModifiedDate: today,
      version: "govready-0.9.1.36-1",
      reportname: "GovReady",
      total: 160,
      success_criteria_level_a: 100,
      success_criteria_level_aa: 47,
      success_criteria_level_aaa: 0,
      functional_performance_criteria: 9,
      hardware: 0,
      software: 0,
      support_documentation_and_services: 4,
      summary: 25,
      summary_supports: 32,
      summary_partially: 9,
      summary_does_not_supports: 7,
      summary_na: 52,
    },
  ];

  yamlExamples.forEach((yamlExample) => {
    it(`should import ${yamlExample.filename} example`, () => {
      const fileType = "application/x-yaml";
      cy.fixture(yamlExample.filename).as("yamlFixture");

      cy.visit("/");

      cy.on("window:alert", cy.stub().as("alerted"));

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

      cy.get("@alerted")
        .should("have.been.calledOnce")
        .and(
          "have.been.calledWith",
          `OpenACR "${yamlExample.reportname}" loaded`
        );

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

      cy.visit("/report", {
        onBeforeLoad(win) {
          cy.stub(win.console, "error").as("consoleError");
        },
      })
        .get(".usa-alert")
        .should("contain", "Valid Report")
        .get("h1")
        .should(
          "contain",
          `${yamlExample.reportname} Accessibility Conformance Report`
        )
        .get("a[id='download-zip']")
        .invoke("attr", "download")
        .should("contain", `${yamlExample.version}.zip`)
        .get("a[id='download-yaml']")
        .invoke("attr", "download")
        .should("contain", `${yamlExample.version}.yaml`)
        .get('[id="report-date-editor"] + ul')
        .should("contain", `Report Date: ${yamlExample.reportDate}`)
        .should(
          "contain",
          `Last Modified Date: ${yamlExample.lastModifiedDate}`
        )
        .should("contain", `Version: ${yamlExample.version}`)
        .get('[id="success_criteria_level_a-summary"] p')
        .should(
          "contain",
          `Conformance to the ${yamlExample.summary} criteria listed below is distributed as follows:`
        )
        .get('[id="success_criteria_level_a-summary"] li')
        .should("contain", `${yamlExample.summary_supports} supported`)
        .should(
          "contain",
          `${yamlExample.summary_partially} partially supported`
        )
        .should(
          "contain",
          `${yamlExample.summary_does_not_supports} not supported`
        )
        .should("contain", `${yamlExample.summary_na} not applicable`);

      cy.get("@consoleError").should("not.be.called");
    });
  });

  it(`should change last modified date on change`, () => {
    const fileType = "application/x-yaml";
    const yamlExample = yamlExamples[0];
    cy.fixture(yamlExample.filename).as("yamlFixture");

    cy.visit("/");

    cy.on("window:alert", cy.stub().as("alerted"));

    cy.get("input[type='file']").then(function ($input) {
      const blob = Cypress.Blob.binaryStringToBlob(this.yamlFixture, fileType);
      const file = new File([blob], yamlExample.filename, { type: fileType });
      const list = new DataTransfer();

      list.items.add(file);
      const myFileList = list.files;

      $input[0].files = myFileList;
      $input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWith",
        `OpenACR "${yamlExample.reportname}" loaded`
      );

    cy.visit("/about")
      .get("#evaluation-vendor-name")
      .type("CivicActions")
      .get("button")
      .contains("View Report")
      .click()
      .get(".usa-alert")
      .should("contain", "Valid Report")
      .get("#content")
      .should("contain", today);
  });

  it(`can toggle catalog and still be valid`, () => {
    const fileType = "application/x-yaml";
    const yamlExample = yamlExamples[0];
    cy.fixture(yamlExample.filename).as("yamlFixture");

    cy.visit("/");

    cy.on("window:alert", cy.stub().as("alerted"));

    cy.get("input[type='file']").then(function ($input) {
      const blob = Cypress.Blob.binaryStringToBlob(this.yamlFixture, fileType);
      const file = new File([blob], yamlExample.filename, { type: fileType });
      const list = new DataTransfer();

      list.items.add(file);
      const myFileList = list.files;

      $input[0].files = myFileList;
      $input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWith",
        `OpenACR "${yamlExample.reportname}" loaded`
      );

    // Switch to WCAG 2.1 508 catalog.
    cy.visit("/about")
      .get(`input[value="2.4-edition-wcag-2.1-508-en"]`)
      .check();

    cy.get("button").contains("Switch Catalogs").click();

    cy.get("@alerted")
      .should("have.been.calledTwice")
      .and(
        "have.been.calledWith",
        "OpenACR passed validation when switching catalog."
      );

    cy.get("button")
      .contains("View Report")
      .click()
      .get(".usa-alert")
      .should("contain", "Valid Report")
      .get("#content")
      .should("contain", "VPAT® 2.4 WCAG 2.1 and Revised Section 508 Edition");

    // Switch back to WCAG 2.0 508 catalog.
    cy.visit("/about")
      .get(`input[value="2.4-edition-wcag-2.0-508-en"]`)
      .check();

    cy.get("button").contains("Switch Catalogs").click();

    cy.get("@alerted")
      .should("have.been.calledThrice")
      .and(
        "have.been.calledWith",
        "OpenACR passed validation when switching catalog."
      );

    cy.get("button")
      .contains("View Report")
      .click()
      .get(".usa-alert")
      .should("contain", "Valid Report")
      .get("#content")
      .should("contain", "VPAT® 2.4 Revised Section 508 Edition");
  });

  it(`should reject invalid example`, () => {
    const fileType = "application/x-yaml";
    const yamlExample = {
      filename: "invalid-basic.yaml",
    };
    cy.fixture(yamlExample.filename).as("yamlFixture");

    cy.visit("/");

    cy.on("window:alert", cy.stub().as("alerted"));

    cy.get("input[type='file']").then(function ($input) {
      const blob = Cypress.Blob.binaryStringToBlob(this.yamlFixture, fileType);
      const file = new File([blob], yamlExample.filename, { type: fileType });
      const list = new DataTransfer();

      list.items.add(file);
      const myFileList = list.files;

      $input[0].files = myFileList;
      $input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWith",
        "No data found or invalid import. Message: Cannot read properties of undefined (reading 'success_criteria_level_a')"
      );
  });

  it(`should reject non YAML file upload`, () => {
    const fileType = "plain/text";
    const textExample = {
      filename: "invalid.txt",
    };
    cy.fixture(textExample.filename).as("txtFixture");

    cy.visit("/");

    cy.on("window:alert", cy.stub().as("alerted"));

    cy.get("input[type='file']").then(function ($input) {
      const blob = Cypress.Blob.binaryStringToBlob(this.txtFixture, fileType);
      const file = new File([blob], textExample.filename, { type: fileType });
      const list = new DataTransfer();

      list.items.add(file);
      const myFileList = list.files;

      $input[0].files = myFileList;
      $input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    cy.get("@alerted")
      .should("have.been.calledOnce")
      .and(
        "have.been.calledWith",
        `The uploaded file ${textExample.filename} has type ${fileType} which is invalid. Please use one of these types: 'application/x-yaml', 'application/yaml', 'text/yaml'.`
      );
  });
});
