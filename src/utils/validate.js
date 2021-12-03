import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
import { validateOpenACRCatalogValues } from "@openacr/openacr/src/validateOpenACRCatalogValues.ts";

export function validate(evaluation) {
  let valid = validateOpenACR(evaluation, "openacr-0.1.0.json");
  if (valid.result) {
    valid = validateOpenACRCatalogValues(evaluation, catalog);
  }
  return valid;
}
