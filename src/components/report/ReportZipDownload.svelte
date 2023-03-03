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
  import yaml from "js-yaml";
  import JSZip from "jszip";
  import { sanitizeEvaluation } from "../../utils/sanitizeEvaluation.js";
  import { getCatalog } from "../../utils/getCatalogs.js";

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  const sanitizedEvaluation = sanitizeEvaluation($evaluation);
  const valid = validate($evaluation);
  let catalog = getCatalog($evaluation.catalog);
  let zipDownload, htmlDownload, htmlDownloadTemplate;

  let download = true;
  let zip = new JSZip();

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title, "en");
    zip.file('README.txt', 'If you need to gather feedback from other people in your organization, please send the zipped file (HTML and YAML) to your collaborators. Collaborators can view the report by opening the HTML file with any web browser. If they would like to make changes to the report, they should go to OpenACR Editor and upload the YAML file to make edits to the content of the report. Do not edit the HTML file directly, it is just for viewing the report.\n\nIf your report is final and you\'re ready to submit the report to an agency in response to a Request for Proposal (RFP), please attach the YAML file to your proposal.');
    zip.file(`${filename}.html`, htmlDownload);
    zip.file(`${filename}.yaml`, yaml.dump(sanitizedEvaluation));
    zip.generateAsync({type:"base64"}).then(function (base64) {
      zipDownload = `data:application/zip;base64,${base64}`;
    });
  });
</script>

{#if valid.result }
  <a id="download-zip" href={zipDownload} download="{filename}.zip" class="button" style="text-align: center;">
    Download Report<br/>(YAML & HTML) .zip
  </a>
{/if}

<div hidden use:cleanUp bind:this={htmlDownloadTemplate}>
  <style>
    body#openACR {
      padding-left: 35px;
    }
    h2,
    h3 {
      position: relative;
    }
    h2 a.header-anchor,
    h3 a.header-anchor {
      position: absolute;
      left: -2rem;
    }
    h2 a.header-anchor:hover svg,
    h2 a.header-anchor:focus svg,
    h2 a.header-anchor:focus-within svg,
    h3 a.header-anchor:hover svg,
    h3 a.header-anchor:focus svg,
    h3 a.header-anchor:focus-within svg {
      fill: #0000EE;
      opacity: 1;
    }
    h2 a.header-anchor svg,
    h3 a.header-anchor svg {
      width: 28px;
      height: 28px;
      opacity: .3;
    }
    @media all and (max-width: 63.99em) {
      h2 a.header-anchor,
      h3 a.header-anchor {
        position:relative;
        opacity: 1;
        left: 0;
        vertical-align: top
      }
    }
    a.header-anchor {
      opacity: 0.4;
      font-size: small;
      text-decoration: none;
      position: relative;
      /* left: 20px; */
      -webkit-transition: opacity 1s, font-size 1s;
      -moz-transition: opacity 1s, font-size 1s;
      -o-transition: opacity 1s, font-size 1s;
      transition: opacity 1s, font-size 1s;
    }
    a.header-anchor:focus,a.header-anchor:hover {
      text-decoration: underline;
      font-size: large;
      opacity: 1
    }
    .visuallyhidden {
      border: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      white-space: nowrap;
      &.focusable {
          &:active,
          &:focus {
              clip: auto;
              clip-path: none;
              height: auto;
              margin: 0;
              overflow: visible;
              position: static;
              width: auto;
              white-space: inherit;
          }
      }
    }
    .applicable-standards-guidelines-table th:nth-child(1) {
      width: 40%;
    }
    .applicable-standards-guidelines-table th:nth-child(2) {
      width: 60%;
    }
    /* If only one level then hide the label. */
    .component-level-count-1 .component-level-label {
      display: none;
    }
  </style>
  <main>
    <div class="grid-container">
      <ReportHeader {download} />
      {#each catalog.standards as standard}
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
            <a href="https://github.com/GSA/openacr" target="_blank">OpenACR <span class="visuallyhidden">(opens in a new window or tab)</span></a> is a format maintained by the <a href="https://gsa.gov/" target="_blank">GSA <span class="visuallyhidden">(opens in a new window or tab)</span></a>. The content is the responsibility of the author.
          </div>
          <div class="grid-col">
            <ReportLicense />
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
