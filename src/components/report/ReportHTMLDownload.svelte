<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";

  import ReportHeader from "./ReportHeader.svelte";
  import ReportNumbers from "./ReportNumbers.svelte";
  import ReportSummary from "./ReportSummary.svelte";
  import ReportResultsTable from "./ReportResultsTable.svelte";

  import {
    resultCategories,
    getEvaluatedItems,
    getMissingItems,
    getItemsFromCategory,
  } from "../../utils/getEvaluatedItems.js";
  import { cleanUp } from "../../utils/cleanUpReportHTML.js";
  import { createHTMLDownload } from "../../utils/createHTMLDownload.js";

  const title = "Accessibility Conformance Report";
  let htmlDownload, htmlDownloadTemplate, nameProvided;

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title);
  });
  $: nameProvided =
    $evaluation["product"] &&
    $evaluation["product"]["name"];

  $: items = getEvaluatedItems($evaluation);
  $: missingItems = getMissingItems($evaluation);
</script>

<a href={htmlDownload} download="report.html" class="button">
  Download Report (HTML)
</a>

<div hidden use:cleanUp bind:this={htmlDownloadTemplate}>
  <style>
    table,
    td,
    th {
      border-color: #3b3b3b;
    }
    td:not(:last-child),
    th {
      padding: 1em;
      vertical-align: top;
      text-align: left;
    }
    td:not([class]):last-child {
      padding: 0 1em;
    }
  </style>
  <h1>
    {#if nameProvided}{$evaluation['product']['name']} {/if}
    {title}
  </h1>
  <ReportHeader />
  <ReportSummary editing={false} />
  <h2>Results</h2>
  <h3>Summary</h3>
  <ReportNumbers />
  <ul>
    {#each resultCategories as category}
      <li>{getItemsFromCategory(items, category).length} {category}</li>
    {/each}
    <li>{missingItems.length} Not Checked</li>
  </ul>
  <ReportResultsTable />
</div>
