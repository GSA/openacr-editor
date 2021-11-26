<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { license } from "../../utils/license.js";
  import { standardsIncluded } from "../../utils/getCatalogItems.js";

  const filename = reportFilename($evaluation);
  const valid = validateOpenACR($evaluation, "openacr-0.1.0.json");
  const licenseOutput = license($evaluation, "");
  let mdDownload, mdTemplate;

  onMount(() => {
    mdDownload = `data:text/markdown;charset=utf-8,${encodeURIComponent(mdTemplate.innerHTML)}`;
  });
</script>

{#if valid.result }
  <a href={mdDownload} download="{filename}.markdown" class="button">
    Download Report (Markdown)
  </a>
{/if}

<div hidden bind:this={mdTemplate}>
# {$evaluation.title}
Based on {catalog.title}

## Name of Product/Version
{$evaluation["product"]["name"]} {#if $evaluation["product"]["version"]} {$evaluation["product"]["version"]}{/if}

## Report Date
{$evaluation.report_date}

{#if $evaluation["product"]["description"]}
## Product Description
{$evaluation["product"]["description"]}
{/if}

## Contact Information
{#if $evaluation["author"]}
### Author Information
{#if $evaluation["author"]["name"]}- Name: {$evaluation["author"]["name"]}{/if}
{#if $evaluation["author"]["company_name"]}- Company: {$evaluation["author"]["company_name"]}{/if}
{#if $evaluation["author"]["address"]}- Address: {$evaluation["author"]["address"]}{/if}
{#if $evaluation["author"]["email"]}- Email: {$evaluation["author"]["email"]}{/if}
{#if $evaluation["author"]["phone"]}- Phone: {$evaluation["author"]["phone"]}{/if}
{#if $evaluation["author"]["website"]}- Website: {$evaluation["author"]["website"]}{/if}
{/if}
{#if $evaluation["vendor"]}
### Vendor Information
{#if $evaluation["vendor"]["name"]}- Name: {$evaluation["vendor"]["name"]}{/if}
{#if $evaluation["vendor"]["company_name"]}- Company: {$evaluation["vendor"]["company_name"]}{/if}
{#if $evaluation["vendor"]["address"]}- Address: {$evaluation["vendor"]["address"]}{/if}
{#if $evaluation["vendor"]["email"]}- Email: {$evaluation["vendor"]["email"]}{/if}
{#if $evaluation["vendor"]["phone"]}- Phone: {$evaluation["vendor"]["phone"]}{/if}
{#if $evaluation["vendor"]["website"]}- Website: {$evaluation["vendor"]["website"]}{/if}
{/if}

{#if $evaluation["notes"]}
## Notes
{$evaluation["notes"]}
{/if}

{#if $evaluation["evaluation_methods_used"]}
## Evaluation Methods Used
{$evaluation["evaluation_methods_used"]}
{/if}

## Applicable Standards/Guidelines
This report covers the degree of conformance for the following accessibility standard/guidelines:

| Standard/Guideline | Included In Report |
| --- | --- |
{#each catalog.standards as standard}
| [{standard.label}]({standard.url}) | {@html standardsIncluded(standard.chapters)} |
{/each}

## Terms
The terms used in the Conformance Level information are defined as follows:
{#each catalog.terms as term}
- **{term.label}**: {term.description}
{/each}

{#if $evaluation["legal_disclaimer"]}
## Legal Disclaimer{#if $evaluation["vendor"]["company_name"]} ({$evaluation["vendor"]["company_name"]}){/if}
{$evaluation["legal_disclaimer"]}
{/if}

{#if $evaluation["repository"]}
## Repository
{$evaluation["repository"]}
{/if}

{#if $evaluation["feedback"]}
## Feedback
{$evaluation["feedback"]}
{/if}

## Copyright

[OpenACR](https://github.com/GSA/openacr) is a format maintained by the [GSA](https://gsa.gov/). The content is the responsibility of the author.

This content is licensed under a {licenseOutput}.
</div>
