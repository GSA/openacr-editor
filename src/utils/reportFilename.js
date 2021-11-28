export function reportFilename(evaluation) {
  var reportFilename = "report";
  if (evaluation["product"]["name"]) {
    reportFilename = evaluation["product"]["name"].toLowerCase();
  }
  if (evaluation["product"]["version"]) {
    reportFilename += "-" + evaluation["product"]["version"];
  }

  return reportFilename;
}
