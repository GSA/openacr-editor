<script>
  import Header from "../Header.svelte";
  import FocusHeader from "../FocusHeader.svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import { standardsIncluded } from "../../utils/getCatalogItems.js";

  $evaluation.title = $evaluation["product"]["name"] + " Accessibility Conformance Report";

  export let download = false;
</script>

<Header>{$evaluation.title}</Header>

Based on {catalog.title}
<FocusHeader id="name-of-product-version" level=2 {download}>Name of Product/Version</FocusHeader>
{$evaluation["product"]["name"]} {#if $evaluation["product"]["version"]} {$evaluation["product"]["version"]}{/if}

<FocusHeader id="report-date" level=2 {download}>Report Date</FocusHeader>
{$evaluation.report_date}

{#if $evaluation["product"]["description"]}
  <FocusHeader id="product-description" level=2 {download}>Product Description</FocusHeader>
  {$evaluation["product"]["description"]}
{/if}

<FocusHeader id="contact-information" level=2 {download}>Contact Information</FocusHeader>
{#if $evaluation["author"]}
  <FocusHeader id="author" level=3 {download}>Author Information</FocusHeader>
  <ul>
    {#if $evaluation["author"]["name"]}<li>Name: {$evaluation["author"]["name"]}</li>{/if}
    {#if $evaluation["author"]["company_name"]}<li>Company: {$evaluation["author"]["company_name"]}</li>{/if}
    {#if $evaluation["author"]["address"]}<li>Address: {$evaluation["author"]["address"]}</li>{/if}
    {#if $evaluation["author"]["email"]}<li>Email: <a href="mailto:{$evaluation['author']['email']}">{$evaluation["author"]["email"]}</a></li>{/if}
    {#if $evaluation["author"]["phone"]}<li>Phone: {$evaluation["author"]["phone"]}</li>{/if}
    {#if $evaluation["author"]["website"]}<li>Website: <a href="{$evaluation['author']['website']}">{$evaluation["author"]["website"]}</a></li>{/if}
  </ul>
{/if}
{#if $evaluation["vendor"]}
  <FocusHeader id="vendor" level=3 {download}>Vendor Information</FocusHeader>
  <ul>
    {#if $evaluation["vendor"]["name"]}<li>Name: {$evaluation["vendor"]["name"]}</li>{/if}
    {#if $evaluation["vendor"]["company_name"]}<li>Company: {$evaluation["vendor"]["company_name"]}</li>{/if}
    {#if $evaluation["vendor"]["address"]}<li>Address: {$evaluation["vendor"]["address"]}</li>{/if}
    {#if $evaluation["vendor"]["email"]}<li>Email: <a href="mailto:{$evaluation['vendor']['email']}">{$evaluation["vendor"]["email"]}</a></li>{/if}
    {#if $evaluation["vendor"]["phone"]}<li>Phone: {$evaluation["vendor"]["phone"]}</li>{/if}
    {#if $evaluation["vendor"]["website"]}<li>Website: <a href="{$evaluation['vendor']['website']}">{$evaluation["vendor"]["website"]}</a></li>{/if}
  </ul>
{/if}

{#if $evaluation["notes"]}
  <FocusHeader id="notes" level=2 {download}>Notes</FocusHeader>
  {$evaluation["notes"]}
{/if}

{#if $evaluation["evaluation_methods_used"]}
  <FocusHeader id="evaluation-methods" level=2 {download}>Evaluation Methods Used</FocusHeader>
  {$evaluation["evaluation_methods_used"]}
{/if}

<FocusHeader id="applicable-standards-guidelines" level=2 {download}>Applicable Standards/Guidelines</FocusHeader>
This report covers the degree of conformance for the following accessibility standard/guidelines:

<table class="usa-table">
  <thead>
    <tr>
      <th>Standard/Guideline</th>
      <th>Included In Report</th>
    </tr>
  </thead>
  <tbody>
    {#each catalog.standards as standard }
      <tr>
        <td><a href="{standard.url}">{standard.label}</a></td>
        <td>{@html standardsIncluded(standard.chapters)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<FocusHeader id="terms" level=2 {download}>Terms</FocusHeader>
The terms used in the Conformance Level information are defined as follows:
<ul>
{#each catalog.terms as term}
  <li><strong>{term.label}</strong>: {term.description}</li>
{/each}
</ul>
