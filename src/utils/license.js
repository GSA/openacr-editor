import spdxLicenseList from "spdx-license-list";
import sanitizeHtml from "sanitize-html";

export function license(evaluation, templateType) {
  if (evaluation.license) {
    if (templateType === "html") {
      return sanitizeHtml(
        `<a href="${spdxLicenseList[evaluation.license].url}" target="_blank">${
          spdxLicenseList[evaluation.license].name
        }<span class="visuallyhidden"> (opens in a new window or tab)</span></a>`,
        {
          allowedClasses: {
            span: ["visuallyhidden"],
          },
        }
      );
    } else {
      return `[${spdxLicenseList[evaluation.license].name}](${
        spdxLicenseList[evaluation.license].url
      })`;
    }
  }
}
