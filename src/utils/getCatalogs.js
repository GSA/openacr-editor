import wcag20508catalog from "@openacr/openacr/catalog/2.5-edition-wcag-2.0-508-en.yaml";
import wcag22508catalog from "@openacr/openacr/catalog/2.5-edition-wcag-2.2-508-en.yaml";
import wcag22catalog from "@openacr/openacr/catalog/2.5-edition-wcag-2.2-en.yaml";
import wcag22301catalog from "@openacr/openacr/catalog/2.5-edition-wcag-2.2-508-eu-en.yaml";
export const wcag20508catalogName = "2.5-edition-wcag-2.0-508-en";
const wcag22508catalogName = "2.5-edition-wcag-2.2-508-en";
const wcag22catalogName = "2.5-edition-wcag-2.2-en";
const wcag22301catalogName = "2.5-edition-wcag-2.2-508-eu-en";

export function getCatalog(catalogName) {
  if (catalogName == wcag20508catalogName) {
    return wcag20508catalog;
  } else if (catalogName == wcag22508catalogName) {
    return wcag22508catalog;
  } else if (catalogName == wcag22catalogName) {
    return wcag22catalog;
  } else if (catalogName == wcag22301catalogName) {
    return wcag22301catalog;
  }

  return wcag20508catalog;
}

export function getListOfCatalogs() {
  return [
    // TODO: Fix Schema Validation Errors
    // {
    //   catalog: wcag20508catalogName,
    //   title: "VPAT® 2.5 508: Revised Section 508 Edition (WCAG 2.0)",
    // },
    {
      catalog: wcag22508catalogName,
      title: "VPAT® 2.5 508 + WCAG: Revised Section 508 Edition (WCAG 2.2)",
    },
    {
      catalog: wcag22catalogName,
      title: "VPAT® 2.5 WCAG: WCAG 2.2",
    },
    // TODO: Fix Empty Criteria Error
    // {
    //   catalog: wcag22301catalogName,
    //   title: "VPAT® Rev EU: EN 301 549",
    // }
  ];
}

export function getDefaultCatalogName() {
  return wcag22508catalogName;
}
