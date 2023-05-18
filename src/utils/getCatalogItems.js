import sanitizeHtml from "sanitize-html";
import { getCatalog } from "../utils/getCatalogs.js";

export function getCatalogChapter(catalogName, chapterId) {
  let catalog = getCatalog(catalogName);
  for (const chapter of catalog.chapters) {
    if (chapter.id === chapterId) {
      return chapter;
    }
  }
}

export function standardsIncluded(
  catalogName,
  standardChapters,
  evaluationChapters
) {
  const result = [];
  for (const standardChapter of standardChapters) {
    const catalogChapter = getCatalogChapter(catalogName, standardChapter);
    if (
      !evaluationChapters[standardChapter].disabled ||
      evaluationChapters[standardChapter].notes
    ) {
      result.push(`<li>${catalogChapter.label}</li>`);
    }
  }
  return sanitizeHtml(`<ul>${result.join("")}</ul>`);
}

export function catalogChapterCriteria(catalogName, chapterId, criteriaNum) {
  const catalogChapter = getCatalogChapter(catalogName, chapterId);
  for (const catalogChapterCriteria of catalogChapter.criteria) {
    if (catalogChapterCriteria.id === criteriaNum) {
      return catalogChapterCriteria;
    }
  }
}

export function catalogComponentLabel(catalogName, componentId, templateType) {
  let catalog = getCatalog(catalogName);
  if (catalog.components) {
    for (const component of catalog.components) {
      if (component.id === componentId) {
        if (component.label != "") {
          if (templateType === "html") {
            return sanitizeHtml(`<strong>${component.label}</strong>: `);
          } else {
            return `**${component.label}**: `;
          }
        }
      }
    }
  }
  return "";
}

export function levelLabel(catalogName, level) {
  let catalog = getCatalog(catalogName);
  if (catalog.terms) {
    for (const terms of catalog.terms) {
      if (terms.id === level) {
        return terms.label;
      }
    }
  }
  // If a level is provided but has no matching terms, provide a default.
  return "Not Applicable";
}
