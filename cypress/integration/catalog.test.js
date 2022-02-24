/// <reference types="Cypress" />

const catalogs = [
  "2.4-edition-wcag-2.0-508-en",
  "2.4-edition-wcag-2.1-en",
  "2.4-edition-wcag-2.1-508-en",
];
const chapters = [
  "success_criteria_level_a",
  "success_criteria_level_aa",
  "success_criteria_level_aaa",
];

describe("Catalogs", () => {
  catalogs.forEach((catalog) => {
    it(`select catalog ${catalog} and load WCAG chapters and report without errors`, () => {
      cy.visit("/");

      cy.get(`input[value="${catalog}"]`).check();

      chapters.forEach((chapter) => {
        cy.visit(`/chapter/${chapter}`, {
          onBeforeLoad(win) {
            cy.stub(win.console, "error").as("consoleError");
          },
        });
        cy.get("@consoleError").should("not.be.called");
      });

      cy.visit("/report", {
        onBeforeLoad(win) {
          cy.stub(win.console, "error").as("consoleError");
        },
      });
      cy.get("@consoleError").should("not.be.called");
    });
  });

  it(`toggle catalog and confirm a WCAG 2.1 criteria appears and disappears`, () => {
    const wcag21Criteria = "2.1.4";

    cy.visit("/");

    // Switch to WCAG 2.1 catalog.
    cy.get(`input[value="${catalogs[1]}"]`).check();

    cy.visit(`/chapter/${chapters[0]}`);

    cy.get(`div[id="${wcag21Criteria}"]`).should("exist");

    cy.get("button").contains("View Report").click();

    cy.get("#success_criteria_level_a-editor + table tbody tr").should(
      "contain",
      wcag21Criteria
    );

    cy.visit("/");

    // Switch back to WCAG 2.0 508 catalog.
    cy.get(`input[value="${catalogs[0]}"]`).check();

    cy.visit(`/chapter/${chapters[0]}`);

    cy.get(`div[id="${wcag21Criteria}"]`).should("not.exist");

    cy.get("button").contains("View Report").click();

    cy.get("#success_criteria_level_a-editor + table tbody tr").should(
      "not.contain",
      wcag21Criteria
    );
  });
});
