import { chapters } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

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

  chapters.forEach((chapter) => {
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
    const components = [];
    chapters.forEach((chapter) => {
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
    });
    return components;
  } else {
    return [];
  }
}

export function getChapterCriteriaComponents(evaluation) {
  const components = [];
  chapters.forEach((chapter) => {
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
