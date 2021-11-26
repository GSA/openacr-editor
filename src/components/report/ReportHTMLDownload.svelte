<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";

  import ReportHeader from "./ReportHeader.svelte";
  import { cleanUp } from "../../utils/cleanUpReportHTML.js";
  import { createHTMLDownload } from "../../utils/createHTMLDownload.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { license } from "../../utils/license.js";

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  const licenseOutput = license($evaluation, "html");
  let htmlDownload, htmlDownloadTemplate;
  let download = true;

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title, "en");
  });
</script>

<a href={htmlDownload} download="{filename}.html" class="button">
  Download Report (HTML)
</a>

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
            This content is licensed under a {@html licenseOutput}.
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
