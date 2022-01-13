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
  import yaml from "js-yaml";
  import JSZip from "jszip";

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  const valid = validate($evaluation);
  let zipDownload, htmlDownload, htmlDownloadTemplate;

  let download = true;
  let zip = new JSZip();

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title, "en");
    zip.file('README.txt', '');
    zip.file(`${filename}.html`, htmlDownload);
    zip.file(`${filename}.yaml`, yaml.dump($evaluation));
    zip.generateAsync({type:"base64"}).then(function (base64) {
      zipDownload = `data:application/zip;base64,${base64}`;
    });
  });
</script>

{#if valid.result }
  <a href={zipDownload} download="{filename}.zip" class="button">
    Download Report (YAML & HTML)
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
