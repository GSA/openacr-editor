import { inConformanceTarget } from "./inConformanceTarget.js";

export const principles = [
  "A.1",
  "A.2",
  "A.3",
  "A.4",
  "B.1",
  "B.2",
  "B.3",
  "B.4",
];

export function getProgressPerPrinciple(evaluation) {
  let progressPerPrinciple = {};

  function getEvaluatedForPrinciple(principleNum) {
    return (
      Object.values(evaluation.evaluationData).filter(
        (item) =>
          item.num.startsWith(principleNum) &&
          item.result !== "Not checked" &&
          inConformanceTarget(item, evaluation)
      ).length || 0
    );
  }

  function getTotalForPrinciple(principleNum) {
    return (
      Object.values(evaluation.evaluationData).filter(
        (item) =>
          item.num.startsWith(principleNum) &&
          inConformanceTarget(item, evaluation)
      ).length || 0
    );
  }

  principles.forEach((principle) => {
    const total = getTotalForPrinciple(principle);
    const evaluated = getEvaluatedForPrinciple(principle);

    progressPerPrinciple[principle] = {
      evaluated: evaluated,
      total: total,
    };
  });

  return progressPerPrinciple;
}
