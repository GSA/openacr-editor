import { evaluation } from "../stores/evaluation.js";
import { validate } from "../utils/validate.js";
import { chapters } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
import yaml from "js-yaml";

export function importEvaluation(event) {
  var files = event.target.files;
  const datestamp = new Date().toLocaleDateString();

  for (var i = 0, file; (file = files[i]); i++) {
    if (!file.type.match("application/x-yaml")) {
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
        if (!converted.license) {
          converted["license"] = "GPL-2.0-or-later";
        }

        // Initialize any missing chapters, components, and criteria.
        for (const chapter of chapters) {
          if (!converted["chapters"][chapter.id]) {
            converted["chapters"][chapter.id] = {
              notes: "",
            };
          }

          if (!converted["chapters"][chapter.id]["criteria"]) {
            converted["chapters"][chapter.id]["criteria"] = [];
          }

          for (const chapterCriteria of chapter.criteria) {
            let currentEvaluationCriteria =
              converted["chapters"] &&
              converted["chapters"][chapter.id]["criteria"]
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
                      level: "not-evaluated",
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
                    level: "not-evaluated",
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
        }

        const valid = validate(converted);

        if (valid.result) {
          evaluation.update((evaluation) => converted);
          evaluation.updateCache(converted);
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
