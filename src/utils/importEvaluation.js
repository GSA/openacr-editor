import { evaluation } from "../stores/evaluation.js";

export function importEvaluation(event) {
  var files = event.target.files;

  for (var i = 0, file; (file = files[i]); i++) {
    if (!file.type.match("application/json")) {
      return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {
      try {
        var converted = JSON.parse(event.target.result);

        if (converted.evaluationData) {
          evaluation.update((evaluation) => converted);

          if (converted.meta.name.value) {
            alert(`Evaluation "${converted.meta.name.value}" loaded`);
          } else {
            alert("Evalution loaded");
          }
          startedNew = true;
        }
      } catch {
        alert("No data found or invalid import");
      }
    };

    reader.readAsText(file);
  }
}
