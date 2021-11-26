<script>
  import { evaluation } from "../../stores/evaluation.js";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import { standardsIncluded } from "../../utils/getCatalogItems.js";

  $evaluation.title = $evaluation["product"]["name"] + " Accessibility Conformance Report";

  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

<h1>
  {$evaluation.title}
</h1>

Based on {catalog.title}
<h2 id="name-of-product-version{extraId}">
  <a href="#name-of-product-version{extraId}" aria-hidden="true" class="header-anchor">#</a>
  Name of Product/Version
</h2>
{$evaluation["product"]["name"]} {#if $evaluation["product"]["version"]} {$evaluation["product"]["version"]}{/if}

<h2 id="report-date{extraId}">
  <a href="#report-date{extraId}" aria-hidden="true" class="header-anchor">#</a>
  Report Date
</h2>
{$evaluation.report_date}

{#if $evaluation["product"]["description"]}
  <h2 id="product-description{extraId}">
    <a href="#product-description{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Product Description
  </h2>
  {$evaluation["product"]["description"]}
{/if}

<h2 id="contact-information{extraId}">
  <a href="#contact-information{extraId}" aria-hidden="true" class="header-anchor">#</a>
  Contact Information
</h2>
{#if $evaluation["author"]}
  <h3 id="author{extraId}">
    <a href="#author{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Author Information
  </h3>
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
  <h3 id="vendor{extraId}">
    <a href="#vendor{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Vendor Information
  </h3>
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
  <h2 id="notes{extraId}">
    <a href="#notes{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Notes
  </h2>
  {$evaluation["notes"]}
{/if}

{#if $evaluation["evaluation_methods_used"]}
  <h2 id="evaluation-methods{extraId}">
    <a href="#evaluation-methods{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Evaluation Methods Used
  </h2>
  {$evaluation["evaluation_methods_used"]}
{/if}

<h2 id="applicable-standards-guidelines{extraId}">
  <a href="#applicable-standards-guidelines{extraId}" aria-hidden="true" class="header-anchor">#</a>
  Applicable Standards/Guidelines
</h2>
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

<h2 id="terms{extraId}">
  <a href="#terms{extraId}" aria-hidden="true" class="header-anchor">#</a>
  Terms
</h2>
The terms used in the Conformance Level information are defined as follows:
<ul>
{#each catalog.terms as term}
  <li><strong>{term.label}</strong>: {term.description}</li>
{/each}
</ul>
