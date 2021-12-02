import { inConformanceTarget } from "./inConformanceTarget.js";
import { chapters } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

export const resultCategories = [
  "Passed",
  "Failed",
  "Cannot tell",
  "Not applicable",
];

export function getEvaluatedChapterCriteria(evaluation) {
  if (evaluation) {
    const criteria = [];
    chapters.forEach((chapter) => {
      if (evaluation.chapters[chapter.id].criteria) {
        evaluation.chapters[chapter.id].criteria.forEach((item) => {
          criteria.push(item);
        });
      }
    });
    return criteria;
  } else {
    return [];
  }
}

export function getChapterCriteria() {
  const criteria = [];
  chapters.forEach((chapter) => {
    chapter.criteria.forEach((item) => {
      criteria.push(item);
    });
  });
  return criteria;
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
