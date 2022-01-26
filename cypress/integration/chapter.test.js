/// <reference types="Cypress" />

const chapters = [
  "success_criteria_level_a",
  "success_criteria_level_aa",
  "success_criteria_level_aaa",
  "functional_performance_criteria",
  "hardware",
  "software",
  "support_documentation_and_services",
];

describe("All chapters", () => {
  chapters.forEach((chapter) => {
    it(`chapter ${chapter} has a notes field`, () => {
      cy.visit(`/chapter/${chapter}`);
      cy.get("#evaluation-chapter-notes").should("exist");
    });

    it(`chapter ${chapter} has a disabled checkbox field`, () => {
      cy.visit(`/chapter/${chapter}`);
      cy.get("input[id*='evaluation-disabled-chapter-']").should("exist");
    });

    it(`chapter ${chapter} has introductory help text`, () => {
      cy.visit(`/chapter/${chapter}`);
      cy.get(".chapter-help-text").should("exist");
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

  it("type notes and should see a message after adding 1 character, then a different message after more than 50 characters, and no message for 0 characters", () => {
    const nonTextContentWebComponentNotesField =
      "textarea[id='evaluation-1.1.1-web-notes']";
    const notesMessageSpan = ".notes-message";

    cy.get(nonTextContentWebComponentNotesField).type(
      "Drupal 8 requires alt text for images by default."
    );

    cy.get(notesMessageSpan).should(
      "contain",
      "Longer description may be helpful"
    );

    cy.get(nonTextContentWebComponentNotesField).type(
      " And requires captions for videos."
    );

    cy.get(notesMessageSpan).should("contain", "Good");

    cy.get(nonTextContentWebComponentNotesField).clear();

    cy.get(notesMessageSpan).should("be.empty");
  });
});

describe("Disabled chapter", () => {
  before(() => {
    cy.visit("/about");

    cy.get("#evaluation-disabled-chapter-hardware").check();

    cy.visit("/chapter/hardware");
    cy.get("button").contains("+ Expand All Sections").click();
  });

  it("diabled is checked and fields are disabled", () => {
    cy.get("#evaluation-disabled-chapter-hardware").should("be.checked");

    cy.get("select[name='evaluation-402.2.1-none-level']").should(
      "be.disabled"
    );

    cy.get("textarea[id='evaluation-402.2.1-none-notes']").should(
      "be.disabled"
    );
  });

  it("uncheck diabled and fields are reenabled", () => {
    cy.get("#evaluation-disabled-chapter-hardware").uncheck();

    cy.get("select[name='evaluation-402.2.1-none-level']").should(
      "not.be.disabled"
    );

    cy.get("textarea[id='evaluation-402.2.1-none-notes']").should(
      "not.be.disabled"
    );
  });
});
