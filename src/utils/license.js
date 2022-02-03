import spdxLicenseList from "spdx-license-list";

export function license(evaluation, templateType) {
  if (evaluation.license) {
    if (templateType === "html") {
      return `<a href="${
        spdxLicenseList[evaluation.license].url
      }" target="_blank">${spdxLicenseList[evaluation.license].name}
      <span class="visuallyhidden">(opens in a new window)</span></a>`;
    } else {
      return `[${spdxLicenseList[evaluation.license].name}](${
        spdxLicenseList[evaluation.license].url
      })`;
    }
  }
}
