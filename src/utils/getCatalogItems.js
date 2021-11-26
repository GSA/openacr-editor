import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

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
    const catalogChapters = getCatalogChapter(standardChapter);
    result.push(`<li>${catalogChapters.label}</li>`);
  }
  return `<ul>${result.join("")}</ul>`;
}
