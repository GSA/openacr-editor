import atag from "../data/atag.js";
import packageJson from "../../package.json";
import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
import { chapters } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

const datestamp = new Date().toLocaleDateString();

export function createCleanEvaluation() {
  const cleanEvaluation = {
    title: "",
    product: {
      name: "",
      version: "",
      description: "",
    },
    author: {
      name: "",
      company_name: "",
      address: "",
      email: "",
      phone: "",
      website: "",
    },
    vendor: {
      name: "",
      company_name: "",
      address: "",
      email: "",
      phone: "",
      website: "",
    },
    report_date: datestamp,
    notes: "",
    evaluation_methods_used: "",
    legal_disclaimer: "",
    repository: "",
    feedback: "",
    license: "GPL-2.0-or-later",
    chapters: {},
    // TODO: ATAG will remove after OpenACR stuff has been added.
    evaluationData: {},
    meta: {},
  };

  // To do add validation of JSON against schema.
  const valid = validateOpenACR(cleanEvaluation, "openacr-0.1.0.json");
  console.log(valid);

  for (const chapter of chapters) {
    const criteria = [];
    for (const chapterCriteria of chapter.criteria) {
      const components = [];
      for (const component of chapterCriteria.components) {
        components.push({
          name: component,
          adherence: {
            level: "not-evaluated",
            notes: "",
          },
        });
      }

      criteria.push({
        num: chapterCriteria.id,
        components: components,
      });
    }

    cleanEvaluation["chapters"][chapter.id] = {
      notes: "",
      criteria: criteria,
    };
  }

  // TODO: ATAG will remove after OpenACR stuff has been added.
  for (const principle of atag) {
    for (const guideline of principle.guidelines) {
      for (const successcriterion of guideline.successcriteria) {
        cleanEvaluation["evaluationData"][successcriterion.id] = {
          id: successcriterion.id,
          num: successcriterion.num,
          handle: successcriterion.handle,
          result: "Not checked",
          observations: null,
          level: successcriterion.level,
          evaluatedLevel:
            successcriterion.level === "A, AA, AAA"
              ? "Level AA"
              : `Level ${successcriterion.level}`,
        };
      }
    }
  }

  // ATAG will remove after OpenACR stuff has been added.
  cleanEvaluation.meta = {
    name: {
      id: "name",
      value: null,
    },
    website: {
      id: "website",
      value: null,
    },
    executiveSummary: {
      id: "executiveSummary",
      value: null,
    },
    evaluatorName: {
      id: "evaluatorName",
      value: null,
    },
    evaluatorOrg: {
      id: "evaluatorOrg",
      value: null,
    },
    evaluationId: {
      id: "evaluationId",
      value: datestamp,
    },
    conformanceTarget: {
      id: "conformanceTarget",
      value: "AA",
    },
    createdWith: {
      id: "createdWith",
      value: packageJson.version,
    },
  };

  return cleanEvaluation;
}
