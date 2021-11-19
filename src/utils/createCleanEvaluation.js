import atag from "../data/atag.js";
import packageJson from "../../package.json";
import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";

const datestamp = new Date().toLocaleDateString();

export function createCleanEvaluation() {
  const cleanEvaluation = {
    title: "Accessibility Conformance Report",
    product: {
      name: null,
      version: null,
      description: null,
    },
    author: {
      name: null,
      company_name: null,
      address: null,
      email: null,
      phone: null,
      website: null,
    },
    report_date: datestamp,
    notes: null,
    evaluation_methods_used: null,
    legal_disclaimer: null,
    repository: null,
    feedback: null,
    license: "GPL-2.0-or-later",
    // ATAG will remove after OpenACR stuff has been added.
    evaluationData: {},
    meta: {},
  };

  // To do add validation of JSON against schema.
  const valid = validateOpenACR(cleanEvaluation, "openacr-0.1.0.json");
  console.log(valid);

  // ATAG will remove after OpenACR stuff has been added.
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
