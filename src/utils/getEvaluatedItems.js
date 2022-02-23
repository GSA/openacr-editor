import { getCatalog } from "../utils/getCatalogs.js";

export function getProgressPerChapter(evaluation) {
  let progressPerChapter = {};

  function getEvaluatedForChapter(chapter) {
    const components = [];
    if (evaluation.chapters[chapter.id].criteria) {
      evaluation.chapters[chapter.id].criteria.forEach((item) => {
        item.components.forEach((component) => {
          if (
            component["adherence"] &&
            component["adherence"]["level"] &&
            component["adherence"]["level"] != ""
          ) {
            components.push(component);
          }
        });
      });
    }
    return components.length;
  }

  function getTotalForChapter(chapter) {
    const components = [];
    chapter.criteria.forEach((item) => {
      item.components.forEach((component) => {
        components.push(component);
      });
    });
    return components.length;
  }

  let catalog = getCatalog(evaluation.catalog);
  catalog.chapters.forEach((chapter) => {
    const total = getTotalForChapter(chapter);
    const evaluated = getEvaluatedForChapter(chapter);

    progressPerChapter[chapter.id] = {
      evaluated: evaluated,
      total: total,
    };
  });

  return progressPerChapter;
}

export function getEvaluatedChapterCriteriaComponents(evaluation) {
  if (
    evaluation &&
    evaluation.chapters &&
    Object.keys(evaluation.chapters).length > 0
  ) {
    let catalog = getCatalog(evaluation.catalog);
    const components = [];
    catalog.chapters.forEach((chapter) => {
      if (
        evaluation.chapters[chapter.id].criteria &&
        !evaluation.chapters[chapter.id].disabled
      ) {
        evaluation.chapters[chapter.id].criteria.forEach((item) => {
          item.components.forEach((component) => {
            if (
              component["adherence"] &&
              component["adherence"]["level"] &&
              component["adherence"]["level"] != ""
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

export function getChapterCriteriaComponents(evaluation) {
  let catalog = getCatalog(evaluation.catalog);
  const components = [];
  catalog.chapters.forEach((chapter) => {
    if (!evaluation.chapters[chapter.id].disabled) {
      chapter.criteria.forEach((item) => {
        item.components.forEach((component) => {
          components.push(component);
        });
      });
    }
  });
  return components;
}
