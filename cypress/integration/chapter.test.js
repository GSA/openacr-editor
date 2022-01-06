/// <reference types="Cypress" />

import chapterNavs from "../../src/data/chapterNavs";

describe("All chapters", () => {
  Object.keys(chapterNavs).forEach((chapter) => {
    it(`chapter ${chapter} has a notes field`, () => {
      cy.visit(`/chapter/${chapter}`);
      cy.get("#evaluation-chapter-notes").should("exist");
    });

    it(`chapter ${chapter} has loaded without errors`, () => {
      cy.visit(`/chapter/${chapter}`, {
        onBeforeLoad(win) {
          cy.stub(win.console, "error").as("consoleError");
        },
      });
      cy.get("@consoleError").should("not.be.called");
    });
  });
});

describe("Chapter", () => {
  before(() => {
    cy.visit("/chapter/success_criteria_level_a");
    cy.get("button").contains("+ Expand All Sections").click();
  });

  it("update level for component and see it update in the sidebar", () => {
    const nonTextContentWebComponentLevelField =
      "select[name='evaluation-1.1.1-web-level']";
    const progressBarA =
      ".progress__principle a[href$='/chapter/success_criteria_level_a'] + .progress__part";

    cy.get(nonTextContentWebComponentLevelField).select("Supports");

    cy.get(progressBarA).should("contain", "1 of 100");

    cy.get(nonTextContentWebComponentLevelField).select("Partially Supports");

    cy.get(progressBarA).should("contain", "1 of 100");

    cy.get(nonTextContentWebComponentLevelField).select("Does Not Support");

    cy.get(progressBarA).should("contain", "1 of 100");

    cy.get(nonTextContentWebComponentLevelField).select("Not Applicable");

    cy.get(progressBarA).should("contain", "1 of 100");

    cy.get(nonTextContentWebComponentLevelField).select("Not Evaluated");

    cy.get(progressBarA).should("contain", "1 of 100");

    cy.get(nonTextContentWebComponentLevelField).select("");

    cy.get(progressBarA).should("contain", "0 of 100");
  });
});
