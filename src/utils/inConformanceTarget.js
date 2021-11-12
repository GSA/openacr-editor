export function inConformanceTarget(item, evaluation) {
  const conformanceTarget = evaluation.meta.conformanceTarget.value.length;

  // check if this is a Success Criterion that supports multiple levels
  if (item.evaluatedLevel && item.level !== item.evaluatedLevel) {
    return (
      item.evaluatedLevel.replace("Level ", "").length <= conformanceTarget
    );
  } else {
    return item.level.length <= conformanceTarget;
  }
}
