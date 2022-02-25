import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
import { validateOpenACRCatalogValues } from "@openacr/openacr/src/validateOpenACRCatalogValues.ts";
import { getCatalog } from "./getCatalogs.js";

export function validate(evaluation) {
  let valid = validateOpenACR(evaluation, "openacr-0.1.0.json");
  let catalog = getCatalog(evaluation.catalog);
  if (valid.result) {
    valid = validateOpenACRCatalogValues(evaluation, catalog);
  }
  return valid;
}
