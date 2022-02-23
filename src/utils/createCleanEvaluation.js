import { validate } from "../utils/validate.js";
import { getDefaultCatalogName, getCatalog } from "../utils/getCatalogs.js";

const datestamp = new Date().toLocaleDateString();
const defaultCatalogName = getDefaultCatalogName();

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
    last_modified_date: datestamp,
    version: 1,
    notes: "",
    evaluation_methods_used: "",
    legal_disclaimer: "",
    repository: "",
    feedback: "",
    license: "CC-BY-4.0",
    related_openacrs: [],
    catalog: defaultCatalogName,
    chapters: {},
  };

  let catalog = getCatalog(defaultCatalogName);
  for (const chapter of catalog.chapters) {
    const criteria = [];
    for (const chapterCriteria of chapter.criteria) {
      const components = [];
      for (const component of chapterCriteria.components) {
        components.push({
          name: component,
          adherence: {
            level: "",
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
      disabled: false,
      criteria: criteria,
    };
  }

  const valid = validate(cleanEvaluation);
  console.log(
    "New evaluation is valid? Answer: " +
      valid.result +
      ", message: " +
      valid.message
  );

  return cleanEvaluation;
}
