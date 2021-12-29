/// <reference types="Cypress" />

import chapterNavs from "../../src/data/chapterNavs";

describe("Chapters", () => {
  Object.keys(chapterNavs).forEach((chapter) => {
    it(`chapter ${chapter} has a notes field`, () => {
      cy.visit(`/chapter/${chapter}`);
      cy.get("#evaluation-chapter-notes").should("exist");
    });

    it(`chapter ${chapter} has load without an error`, () => {
      cy.visit(`/chapter/${chapter}`, {
        onBeforeLoad(win) {
          cy.stub(win.console, "error").as("consoleError");
        },
      });
      cy.get("@consoleError").should("not.be.called");
    });
  });
});
