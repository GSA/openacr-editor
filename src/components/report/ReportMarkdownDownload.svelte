<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { license } from "../../utils/license.js";
  import { standardsIncluded } from "../../utils/getCatalogItems.js";
  import { getCatalog } from "../../utils/getCatalogs.js";

  const filename = reportFilename($evaluation);
  const valid = validate($evaluation);
  let catalog = getCatalog($evaluation.catalog);
  let mdDownload, mdTemplate, licenseOutput;

  if (valid.result) {
    licenseOutput = license($evaluation, "html");
  }

  mdTemplate = `# ${$evaluation.title}
Based on ${catalog.title}

## Name of Product/Version
${$evaluation["product"]["name"]} ${$evaluation["product"]["version"]}

## Report Date
${$evaluation.report_date}`;

  if ($evaluation["product"]["description"]) {
    mdTemplate += `
## Product Description
${$evaluation["product"]["description"]}`;
  }

  mdTemplate += `
## Contact Information
### Author Information
- Name: ${$evaluation["author"]["name"]}
- Company: ${$evaluation["author"]["company_name"]}
- Address: ${$evaluation["author"]["address"]}
- Email: ${$evaluation["author"]["email"]}
- Phone: ${$evaluation["author"]["phone"]}
- Website: ${$evaluation["author"]["website"]}

### Vendor Information
- Name: ${$evaluation["vendor"]["name"]}
- Company: ${$evaluation["vendor"]["company_name"]}
- Address: ${$evaluation["vendor"]["address"]}
- Email: ${$evaluation["vendor"]["email"]}
- Phone: ${$evaluation["vendor"]["phone"]}
- Website: ${$evaluation["vendor"]["website"]}
  `;

  if ($evaluation["product"]["notes"]) {
    mdTemplate += `
## Notes
${$evaluation["product"]["notes"]}`;
  }

  if ($evaluation["product"]["evaluation_methods_used"]) {
    mdTemplate += `
## Evaluation Methods
${$evaluation["product"]["evaluation_methods_used"]}`;
  }

  mdTemplate += `
## Applicable Standards/Guidelines
This report covers the degree of conformance for the following accessibility standard/guidelines:

| Standard/Guideline | Included In Report |
| --- | --- |`;

  catalog.standards.forEach(standard => {
    mdTemplate += `
| [${standard.label}](${standard.url}) | ${standardsIncluded($evaluation.catalog, standard.chapters)} |`;
  });

  mdTemplate += `

## Terms
The terms used in the Conformance Level information are defined as follows:
  `;

  catalog.terms.forEach(term => {
    mdTemplate += `
- **${term.label}**: ${term.description}`;
  });

  if ($evaluation["legal_disclaimer"]) {
    mdTemplate += `
## Legal Disclaimer (${$evaluation["vendor"]["company_name"]})
${$evaluation["legal_disclaimer"]}`;
  }

  if ($evaluation["repository"]) {
    mdTemplate += `
## Repository
${$evaluation["repository"]}`;
  }

  if ($evaluation["feedback"]) {
    mdTemplate += `
## Feedback
${$evaluation["feedback"]}`;
  }

  mdTemplate += `

## Copyright

[OpenACR](https://github.com/GSA/openacr) is a format maintained by the [GSA](https://gsa.gov/). The content is the responsibility of the author.

This content is licensed under a ${licenseOutput}.`;

  onMount(() => {
    mdDownload = `data:text/markdown;charset=utf-8,${encodeURIComponent(mdTemplate)}`;
  });
</script>

{#if valid.result }
  <a href={mdDownload} download="{filename}.markdown" class="button">
    Download Report (Markdown)
  </a>
{/if}
