import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
import sanitizeHtml from "sanitize-html";

export function getCatalogChapter(chapterId) {
  for (const chapter of catalog.chapters) {
    if (chapter.id === chapterId) {
      return chapter;
    }
  }
}

export function standardsIncluded(standardChapters) {
  const result = [];
  for (const standardChapter of standardChapters) {
    const catalogChapter = getCatalogChapter(standardChapter);
    result.push(`<li>${catalogChapter.label}</li>`);
  }
  return sanitizeHtml(`<ul>${result.join("")}</ul>`);
}

export function catalogChapterCriteria(chapterId, criteriaNum) {
  const catalogChapter = getCatalogChapter(chapterId);
  for (const catalogChapterCriteria of catalogChapter.criteria) {
    if (catalogChapterCriteria.id === criteriaNum) {
      return catalogChapterCriteria;
    }
  }
}

export function catalogComponentLabel(componentId, templateType) {
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

export function levelLabel(level) {
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
