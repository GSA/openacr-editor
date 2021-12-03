import { inConformanceTarget } from "./inConformanceTarget.js";
import { chapters } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

export const resultCategories = [
  "Passed",
  "Failed",
  "Cannot tell",
  "Not applicable",
];

export function getEvaluatedChapterCriteriaComponents(evaluation) {
  if (
    evaluation &&
    evaluation.chapters &&
    Object.keys(evaluation.chapters).length > 0
  ) {
    const components = [];
    chapters.forEach((chapter) => {
      if (evaluation.chapters[chapter.id].criteria) {
        evaluation.chapters[chapter.id].criteria.forEach((item) => {
          item.components.forEach((component) => {
            if (
              component["adherence"] &&
              component["adherence"]["level"] &&
              component["adherence"]["level"] != "not-evaluated"
            ) {
              components.push(component);
            }
          });
        });
      }
    });
    return components;
  } else {
    return [];
  }
}

export function getChapterCriteriaComponents() {
  const components = [];
  chapters.forEach((chapter) => {
    chapter.criteria.forEach((item) => {
      item.components.forEach((component) => {
        components.push(component);
      });
    });
  });
  return components;
}

export function getEvaluatedItems(evaluation) {
  if (
    evaluation &&
    evaluation.evaluationData &&
    Object.keys(evaluation.evaluationData).length > 0
  ) {
    return Object.values(evaluation.evaluationData).filter(
      (item) =>
        item.result !== "Not checked" && inConformanceTarget(item, evaluation)
    );
  } else {
    return [];
  }
}

export function getMissingItems(evaluation) {
  if (
    evaluation &&
    evaluation.evaluationData &&
    Object.keys(evaluation.evaluationData).length > 0
  ) {
    return Object.values(evaluation.evaluationData).filter(
      (item) =>
        item.result === "Not checked" && inConformanceTarget(item, evaluation)
    );
  } else {
    return [];
  }
}

export function getItemsFromCategory(items, category) {
  return items.filter((item) => item.result === category);
}
