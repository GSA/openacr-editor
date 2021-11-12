import { inConformanceTarget } from "./inConformanceTarget.js";

export const resultCategories = [
  "Passed",
  "Failed",
  "Cannot tell",
  "Not applicable",
];

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
