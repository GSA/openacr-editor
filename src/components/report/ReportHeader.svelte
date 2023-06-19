<script>
  import Header from "../Header.svelte";
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import { standardsIncluded } from "../../utils/getCatalogItems.js";
  import { sanitizeMarkdown } from "../../utils/sanitizeMarkdown.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { getCatalog } from "../../utils/getCatalogs.js";

  $evaluation.title = $evaluation["product"]["name"];

  export let download = false;
  let catalog = getCatalog($evaluation.catalog);
</script>

<Header><span class="evaluation-title">{$evaluation.title}</span> Accessibility Conformance Report</Header>

<div class="catalog-section">Based on {catalog.title}</div>

<div class="product-section">
  <HeaderWithAnchor id="name-of-product-version" level=2 {download}>Name of Product/Version</HeaderWithAnchor>
  {$evaluation["product"]["name"]} {#if $evaluation["product"]["version"]} {$evaluation["product"]["version"]}{/if}
</div>

<div class="report-dates-ver-section">
  <HeaderWithAnchor id="report-date" level=2 {download}>Report Dates and Version</HeaderWithAnchor>
  <ul>
    <li>Report Date: {$evaluation.report_date}</li>
    <li>Last Modified Date: {$evaluation.last_modified_date}</li>
    <li>Version: {reportFilename($evaluation)}</li>
  </ul>
</div>

{#if $evaluation["product"]["description"]}
  <div class="description-section">
    <HeaderWithAnchor id="product-description" level=2 {download}>Product Description</HeaderWithAnchor>
    {@html sanitizeMarkdown($evaluation["product"]["description"])}
  </div>
{/if}

<div id="contact-section">
  <HeaderWithAnchor id="contact-information" level=2 {download}>Contact Information</HeaderWithAnchor>
  {#if $evaluation["author"]}
    <div class="author-section">
      <HeaderWithAnchor id="author" level=3 {download}>Author Information</HeaderWithAnchor>
      <ul>
        {#if $evaluation["author"]["name"]}<li>Name: {$evaluation["author"]["name"]}</li>{/if}
        {#if $evaluation["author"]["company_name"]}<li>Company: {$evaluation["author"]["company_name"]}</li>{/if}
        {#if $evaluation["author"]["address"]}<li>Address: {$evaluation["author"]["address"]}</li>{/if}
        {#if $evaluation["author"]["email"]}<li>Email: <a href="mailto:{$evaluation['author']['email']}" target="_blank">{$evaluation["author"]["email"]}<span class="visuallyhidden"> (opens in a new window or tab)</span></a></li>{/if}
        {#if $evaluation["author"]["phone"]}<li>Phone: {$evaluation["author"]["phone"]}</li>{/if}
        {#if $evaluation["author"]["website"]}<li>Website: <a href="{$evaluation['author']['website']}" target="_blank">{$evaluation["author"]["website"]}<span class="visuallyhidden"> (opens in a new window or tab)</span></a></li>{/if}
      </ul>
    </div>
  {/if}
  {#if $evaluation["vendor"]}
    <div class="vendor-section">
      <HeaderWithAnchor id="vendor" level=3 {download}>Vendor Information</HeaderWithAnchor>
      <ul>
        {#if $evaluation["vendor"]["name"]}<li>Name: {$evaluation["vendor"]["name"]}</li>{/if}
        {#if $evaluation["vendor"]["company_name"]}<li>Company: {$evaluation["vendor"]["company_name"]}</li>{/if}
        {#if $evaluation["vendor"]["address"]}<li>Address: {$evaluation["vendor"]["address"]}</li>{/if}
        {#if $evaluation["vendor"]["email"]}<li>Email: <a href="mailto:{$evaluation['vendor']['email']}" target="_blank">{$evaluation["vendor"]["email"]}<span class="visuallyhidden"> (opens in a new window or tab)</span></a></li>{/if}
        {#if $evaluation["vendor"]["phone"]}<li>Phone: {$evaluation["vendor"]["phone"]}</li>{/if}
        {#if $evaluation["vendor"]["website"]}<li>Website: <a href="{$evaluation['vendor']['website']}" target="_blank">{$evaluation["vendor"]["website"]}<span class="visuallyhidden"> (opens in a new window or tab)</span></a></li>{/if}
      </ul>
    </div>
  {/if}
</div>

{#if $evaluation["notes"]}
  <div class="notes-section">
    <HeaderWithAnchor id="notes" level=2 {download}>Notes</HeaderWithAnchor>
    {@html sanitizeMarkdown($evaluation["notes"])}
  </div>
{/if}

{#if $evaluation["evaluation_methods_used"]}
  <div class="eval-section">
    <HeaderWithAnchor id="evaluation-methods" level=2 {download}>Evaluation Methods</HeaderWithAnchor>
    {@html sanitizeMarkdown($evaluation["evaluation_methods_used"])}
  </div>
{/if}

<div class="standards-section">
  <HeaderWithAnchor id="applicable-standards-guidelines" level=2 {download}>Applicable Standards/Guidelines</HeaderWithAnchor>

  <table class="usa-table applicable-standards-guidelines-table">
    <caption>This report covers the degree of conformance for the following accessibility standard/guidelines:</caption>
    <thead>
      <tr>
        <th>Standard/Guideline</th>
        <th>Included In Report</th>
      </tr>
    </thead>
    <tbody>
      {#each catalog.standards as standard }
        <tr>
          <td><a href="{standard.url}" target="_blank">{standard.label}<span class="visuallyhidden"> (opens in a new window or tab)</span></a></td>
          <td>{@html standardsIncluded($evaluation.catalog, standard.chapters, $evaluation.chapters)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="terms-section">
  <HeaderWithAnchor id="terms" level=2 {download}>Terms</HeaderWithAnchor>
  The terms used in the Conformance Level information are defined as follows:
  <ul>
  {#each catalog.terms as term}
    <li><strong>{term.label}</strong>: {term.description}</li>
  {/each}
  </ul>
</div>
