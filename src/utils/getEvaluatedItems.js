import { getCatalog } from "../utils/getCatalogs.js";

export function getProgressPerChapter(evaluation) {
  let progressPerChapter = {};

  function getEvaluatedForChapter(chapter) {
    const components_with_terms = {};
    terms.forEach((term) => {
      components_with_terms[term.id] = 0;
    });
    if (evaluation.chapters[chapter.id].criteria) {
      evaluation.chapters[chapter.id].criteria.forEach((item) => {
        item.components.forEach((component) => {
          if (
            component["adherence"] &&
            component["adherence"]["level"] &&
            component["adherence"]["level"] != ""
          ) {
            components_with_terms[component["adherence"]["level"]]++;
          }
        });
      });
    }
    return components_with_terms;
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
  const terms = catalog.terms;
  catalog.chapters.forEach((chapter) => {
    const total = getTotalForChapter(chapter);
    const evaluated_by_term = getEvaluatedForChapter(chapter);
    let evaluated = 0;
    terms.forEach((term) => {
      evaluated += evaluated_by_term[term.id];
    });

    progressPerChapter[chapter.id] = {
      evaluated_by_term: evaluated_by_term,
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
