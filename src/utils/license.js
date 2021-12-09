import spdxLicenseList from "spdx-license-list";

export function license(evaluation, templateType) {
  if (evaluation.license) {
    if (templateType === "html") {
      return `<a href="${spdxLicenseList[evaluation.license].url}">${
        spdxLicenseList[evaluation.license].name
      }</a>`;
    } else {
      return `[${spdxLicenseList[evaluation.license].name}](${
        spdxLicenseList[evaluation.license].url
      })`;
    }
  }
}
