import atag from "../data/atag.js";
import packageJson from "../../package.json";
import { evaluation } from "../stores/evaluation.js";
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
            email: "",
          };
        }
        if (!converted.report_date) {
          converted["report_date"] = datestamp;
        }
        // TODO: ATAG will remove after OpenACR stuff has been added.
        converted["evaluationData"] = {};
        converted["meta"] = {};

        // TODO: ATAG will remove after OpenACR stuff has been added.
        for (const principle of atag) {
          for (const guideline of principle.guidelines) {
            for (const successcriterion of guideline.successcriteria) {
              converted["evaluationData"][successcriterion.id] = {
                id: successcriterion.id,
                num: successcriterion.num,
                handle: successcriterion.handle,
                result: "Not checked",
                observations: null,
                level: successcriterion.level,
                evaluatedLevel:
                  successcriterion.level === "A, AA, AAA"
                    ? "Level AA"
                    : `Level ${successcriterion.level}`,
              };
            }
          }
        }

        // ATAG will remove after OpenACR stuff has been added.
        converted["meta"] = {
          name: {
            id: "name",
            value: null,
          },
          website: {
            id: "website",
            value: null,
          },
          executiveSummary: {
            id: "executiveSummary",
            value: null,
          },
          evaluatorName: {
            id: "evaluatorName",
            value: null,
          },
          evaluatorOrg: {
            id: "evaluatorOrg",
            value: null,
          },
          evaluationId: {
            id: "evaluationId",
            value: datestamp,
          },
          conformanceTarget: {
            id: "conformanceTarget",
            value: "AA",
          },
          createdWith: {
            id: "createdWith",
            value: packageJson.version,
          },
        };

        evaluation.update((evaluation) => converted);
        evaluation.updateCache(converted);
        location.reload();

        if (converted.product.name) {
          alert(`OpenACR "${converted.product.name}" loaded`);
        } else {
          alert("OpenACR loaded");
        }
      } catch (e) {
        alert("No data found or invalid import. Debug: " + e.message);
      }
    };

    reader.readAsText(file);
  }
}
