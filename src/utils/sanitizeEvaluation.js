import sanitizeHtml from "sanitize-html";
import { getCatalog } from "../utils/getCatalogs.js";

export function sanitizeEvaluation(evaluation) {
  let catalog = getCatalog(evaluation.catalog);
  for (const chapter of catalog.chapters) {
    for (
      let chapterCriteriaIndex = 0;
      chapterCriteriaIndex <
      evaluation["chapters"][chapter.id]["criteria"].length;
      chapterCriteriaIndex++
    ) {
      for (
        let componentIndex = 0;
        componentIndex <
        evaluation["chapters"][chapter.id]["criteria"][chapterCriteriaIndex][
          "components"
        ].length;
        componentIndex++
      ) {
        evaluation["chapters"][chapter.id]["criteria"][chapterCriteriaIndex][
          "components"
        ][componentIndex]["adherence"]["notes"] = sanitizeHtml(
          evaluation["chapters"][chapter.id]["criteria"][chapterCriteriaIndex][
            "components"
          ][componentIndex]["adherence"]["notes"]
        );
      }
    }

    evaluation["chapters"][chapter.id]["notes"] = sanitizeHtml(
      evaluation["chapters"][chapter.id]["notes"]
    );
  }
  evaluation["product"]["description"] = sanitizeHtml(
    evaluation["product"]["description"]
  );
  evaluation["notes"] = sanitizeHtml(evaluation["notes"]);
  evaluation["evaluation_methods_used"] = sanitizeHtml(
    evaluation["evaluation_methods_used"]
  );
  evaluation["legal_disclaimer"] = sanitizeHtml(evaluation["legal_disclaimer"]);
  return evaluation;
}
