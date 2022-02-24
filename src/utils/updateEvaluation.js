import { evaluation } from "../stores/evaluation.js";
import { validate } from "../utils/validate.js";
import { getCatalog, wcag20508catalogName } from "./getCatalogs.js";
import compareVersions from "compare-versions";

export function updateEvaluation(catalogName, converted) {
  converted = initializeMissingChapters(catalogName, converted);

  // Remove WCAG 2.1 items when switching to WCAG 2.0 catalog.
  if (catalogName === wcag20508catalogName) {
    // A
    removeCriteria("success_criteria_level_a", "2.1.4", converted);
    removeCriteria("success_criteria_level_a", "2.5.1", converted);
    removeCriteria("success_criteria_level_a", "2.5.2", converted);
    removeCriteria("success_criteria_level_a", "2.5.3", converted);
    removeCriteria("success_criteria_level_a", "2.5.4", converted);
    // AA
    removeCriteria("success_criteria_level_aa", "1.3.4", converted);
    removeCriteria("success_criteria_level_aa", "1.3.5", converted);
    removeCriteria("success_criteria_level_aa", "1.4.10", converted);
    removeCriteria("success_criteria_level_aa", "1.4.11", converted);
    removeCriteria("success_criteria_level_aa", "1.4.12", converted);
    removeCriteria("success_criteria_level_aa", "1.4.13", converted);
    removeCriteria("success_criteria_level_aa", "4.1.3", converted);
    // AAA
    removeCriteria("success_criteria_level_aaa", "1.3.6", converted);
    removeCriteria("success_criteria_level_aaa", "2.2.6", converted);
    removeCriteria("success_criteria_level_aaa", "2.3.3", converted);
    removeCriteria("success_criteria_level_aaa", "2.5.5", converted);
    removeCriteria("success_criteria_level_aaa", "2.5.6", converted);
  }

  const valid = validate(converted);
  if (valid.result) {
    evaluation.update((evaluation) => converted);
    evaluation.updateCache(converted, true);
    alert("OpenACR passed validation when switching catalog.");
  } else {
    alert(
      "OpenACR failed validation when trying to switch catalog. Message: " +
        valid.message
    );
  }
}

export function initializeMissingChapters(catalogName, converted) {
  // Initialize any missing chapters, components, and criteria.
  let catalog = getCatalog(catalogName);
  for (const chapter of catalog.chapters) {
    if (!converted["chapters"][chapter.id]) {
      converted["chapters"][chapter.id] = {
        notes: "",
        disabled: false,
      };
    }

    if (!converted["chapters"][chapter.id]["criteria"]) {
      converted["chapters"][chapter.id]["criteria"] = [];
    }

    for (const chapterCriteria of chapter.criteria) {
      let currentEvaluationCriteria =
        converted["chapters"] && converted["chapters"][chapter.id]["criteria"]
          ? converted["chapters"][chapter.id]["criteria"].find(
              ({ num }) => num === chapterCriteria.id
            )
          : null;
      if (currentEvaluationCriteria) {
        for (const component of chapterCriteria.components) {
          let currentEvaluationComponent = currentEvaluationCriteria[
            "components"
          ].find(({ name }) => name === component);
          if (!currentEvaluationComponent) {
            currentEvaluationCriteria["components"].push({
              name: component,
              adherence: {
                level: "",
                notes: "",
              },
            });
          }
        }
      } else {
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
        converted["chapters"][chapter.id]["criteria"].push({
          num: chapterCriteria.id,
          components: components,
        });
      }
    }
    if (
      chapter.id === "success_criteria_level_a" ||
      chapter.id === "success_criteria_level_aa" ||
      chapter.id === "success_criteria_level_aaa"
    ) {
      converted["chapters"][chapter.id].criteria.sort(sortCriteria);
    }
  }
  return converted;
}

function sortCriteria(firstCriteria, secondCriteria) {
  return compareVersions(firstCriteria.num, secondCriteria.num);
}

function removeCriteria(chapterId, criteria, converted) {
  let criteriaIndex =
    converted["chapters"] && converted["chapters"][chapterId]["criteria"]
      ? converted["chapters"][chapterId]["criteria"].findIndex(
          ({ num }) => num === criteria
        )
      : null;
  if (criteriaIndex) {
    converted["chapters"][chapterId]["criteria"].splice(criteriaIndex, 1);
  }
}
