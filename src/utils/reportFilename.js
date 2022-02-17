export function reportFilename(evaluation, reportVersion = true) {
  var reportFilename = "report";
  if (evaluation["product"]["name"]) {
    reportFilename = evaluation["product"]["name"].toLowerCase();
  }
  if (evaluation["product"]["version"]) {
    reportFilename += "-" + evaluation["product"]["version"];
  }

  if (reportVersion && evaluation["version"]) {
    reportFilename += "-" + evaluation["version"];
  }

  return reportFilename;
}
