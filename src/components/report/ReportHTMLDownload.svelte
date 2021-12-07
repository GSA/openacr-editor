<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";

  import ReportHeader from "./ReportHeader.svelte";
  import ReportSummary from "./ReportSummary.svelte";
  import ReportChapters from "./ReportChapters.svelte";
  import ReportLicense from "./ReportLicense.svelte";
  import { cleanUp } from "../../utils/cleanUpReportHTML.js";
  import { createHTMLDownload } from "../../utils/createHTMLDownload.js";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { standards } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  const valid = validate($evaluation);
  let htmlDownload, htmlDownloadTemplate;

  let download = true;

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title, "en");
  });
</script>

{#if valid.result }
  <a href={htmlDownload} download="{filename}.html" class="button">
    Download Report (HTML)
  </a>
{/if}

<div hidden use:cleanUp bind:this={htmlDownloadTemplate}>
  <style>
    body#openACR {
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
      <ReportHeader {download} />
      {#each standards as standard}
        <ReportChapters {standard} {download} />
      {/each}
      <ReportSummary {download} />
    </div>
  </main>
  <footer class="usa-footer usa-footer usa-footer--slim">
    <div class="usa-footer__return-to-top">
      <div class="grid-container">
        <a href={"#"}>Return to top</a>
      </div>
    </div>
    <div class="usa-footer__secondary-section">
      <div class="grid-container">
        <div class="grid-row grid-gap">
          <div class="grid-col">
            <a href="https://github.com/GSA/openacr">OpenACR</a> is a format maintained by the <a href="https://gsa.gov/">GSA</a>. The content is the responsibility of the author.
          </div>
          <div class="grid-col">
            <ReportLicense />
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
