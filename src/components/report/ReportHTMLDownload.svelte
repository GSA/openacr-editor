<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";

  import ReportHeader from "./ReportHeader.svelte";
  import { cleanUp } from "../../utils/cleanUpReportHTML.js";
  import { createHTMLDownload } from "../../utils/createHTMLDownload.js";
  import { reportFilename } from "../../utils/reportFilename.js";

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  let htmlDownload, htmlDownloadTemplate;

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title);
  });
</script>

<a href={htmlDownload} download="{filename}.html" class="button">
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
