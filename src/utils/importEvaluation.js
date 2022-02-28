import { evaluation } from "../stores/evaluation.js";
import { validate } from "../utils/validate.js";
import yaml from "js-yaml";
import { getDefaultCatalogName } from "./getCatalogs.js";
import { initializeMissingChapters } from "./updateEvaluation.js";

export function importEvaluation(event) {
  var files = event.target.files;
  const datestamp = new Date().toLocaleDateString();
  const defaultCatalogName = getDefaultCatalogName();

  for (var i = 0, file; (file = files[i]); i++) {
    let fileType = file.type;
    if (
      !(
        fileType.match("application/x-yaml") ||
        fileType.match("application/yaml") ||
        fileType.match("text/yaml") ||
        (fileType.match("") && file.name.split(".").pop() === "yaml")
      )
    ) {
      if (fileType === "") {
        fileType = "empty";
      }
      alert(
        `The uploaded file ${file.name} has type ${fileType} which is invalid. Please use one of these types: 'application/x-yaml', 'application/yaml', 'text/yaml'.`
      );
      return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {
      try {
        var converted = yaml.load(event.target.result);
        if (!converted.vendor) {
          converted["vendor"] = {
            name: "",
            company_name: "",
            address: "",
            email: "",
            phone: "",
            website: "",
          };
        }
        if (!converted.report_date) {
          converted["report_date"] = datestamp;
        }
        if (!converted.last_modified_date) {
          converted["last_modified_date"] = datestamp;
        }
        if (!converted.version) {
          converted["version"] = 1;
        } else {
          converted["version"] = converted["version"] + 1;
        }
        if (!converted.license) {
          converted["license"] = "CC-BY-4.0";
        }
        if (!converted.related_openacrs) {
          converted["related_openacrs"] = [];
        }
        if (!converted.catalog) {
          converted["catalog"] = defaultCatalogName;
        }

        // Initialize any missing chapters, components, and criteria.
        converted = initializeMissingChapters(converted.catalog, converted);
        const valid = validate(converted);

        if (valid.result) {
          evaluation.update((evaluation) => converted);
          evaluation.updateCache(converted, true);
          location.reload();

          if (converted.product.name) {
            alert(`OpenACR "${converted.product.name}" loaded`);
          } else {
            alert("OpenACR loaded");
          }
        } else {
          alert("Import OpenACR is invalid. Message: " + valid.message);
        }
      } catch (e) {
        alert("No data found or invalid import. Message: " + e.message);
      }
    };

    reader.readAsText(file);
  }
}
