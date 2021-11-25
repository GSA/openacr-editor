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

  var title = "Accessibility Conformance Report";
  let htmlDownload, htmlDownloadTemplate, nameProvided;

  var reportFilename = "report";
  if ($evaluation['product']['name']) {
    reportFilename = $evaluation['product']['name'].toLowerCase();
    title = $evaluation['product']['name'] + " Accessibility Conformance Report";
  }
  if ($evaluation['product']['version']) {
    reportFilename += "-" + $evaluation['product']['version'];
  }

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title);
  });
  $: nameProvided =
    $evaluation["product"] &&
    $evaluation["product"]["name"];

  $: items = getEvaluatedItems($evaluation);
  $: missingItems = getMissingItems($evaluation);
</script>

<a href={htmlDownload} download="{reportFilename}.html" class="button">
  Download Report (HTML)
</a>

<div hidden use:cleanUp bind:this={htmlDownloadTemplate}>
  <style>
    body {
      padding-left: 35px;
    }

    .header-anchor {
      margin-left: -1em;
      visibility: hidden;
    }

    :hover > .header-anchor {
      visibility: visible;
    }
  </style>
  <main>
    <div class="grid-container">
      <ReportHeader />
    </div>
  </main>
</div>
