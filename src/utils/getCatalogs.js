import wcag20508catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
const wcag20508catalogName = "2.4-edition-wcag-2.0-508-en";
const wcag21catalogName = "2.4-edition-wcag-2.1-en";
const wcag21508catalogName = "2.4-edition-wcag-2.1-508-en";

export function getCatalog(catalogName) {
  if (catalogName === wcag20508catalogName) {
    return wcag20508catalog;
  }
  return null;
}

export function getListOfCatalogs() {
  return [
    {
      catalog: wcag20508catalogName,
      title: wcag20508catalog.title,
    },
  ];
}

export function getDefaultCatalogName() {
  return wcag20508catalogName;
}
