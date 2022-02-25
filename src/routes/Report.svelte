<script>
  import { onMount } from "svelte";
  import { useLocation } from "svelte-navigator";
  import HeaderWithAnchor from "../components/HeaderWithAnchor.svelte";
  import ReportHeader from "../components/report/ReportHeader.svelte";
  import ReportSummary from "../components/report/ReportSummary.svelte";
  import ReportLicense from "../components/report/ReportLicense.svelte";
  import ReportValid from "../components/report/ReportValid.svelte";
  import ReportChapters from "../components/report/ReportChapters.svelte";
  import ReportZipDownload from "../components/report/ReportZipDownload.svelte";
  import ReportYAMLDownload from "../components/report/ReportYAMLDownload.svelte";
  import { evaluation } from "../stores/evaluation.js";
  import { currentPage } from "../stores/currentPage.js";
  import { honourFragmentIdLinks } from "../utils/honourFragmentIdLinks.js";
  import { getCatalog } from "../utils/getCatalogs.js";

  const location = useLocation();
  let catalog = getCatalog($evaluation.catalog);

  onMount(() => {
    currentPage.update(currentPage => "Report");

    honourFragmentIdLinks($location);
  });
</script>

<svelte:head>
  <title>Report | OpenACR Editor | GSA</title>
</svelte:head>

<ReportValid />

<HeaderWithAnchor id="download" level=2>Download</HeaderWithAnchor>

<p>
  <ReportZipDownload />
  <ReportYAMLDownload />
</p>

<details>
  <summary>
    <HeaderWithAnchor id="download-help" level=3>Have trouble downloading .zip files?</HeaderWithAnchor>
  </summary>

  <p>Some agencies and corporations have a policy prohibiting the the download .of zip files. <strong>If you cannot download the .zip file</strong> you can download the YAML file by clicking the link above and save the HTML file convenient viewing by:</p>

  <ol>
    <li>Right click anywhere on this page and select Save As.</li>
    <li>Choose a location where you want to save your HTML file.</li>
    <li>Share the HTML file or folder and the YAML file you previously downloaded with your collaborators.</li>
    <li>Let your collaborators know that they can view the HTML version of the file and can make edits by going to the OpenACR editor and uploading the YAML file. When they have completed their edits, they must to send you the YAML file. The HTML file is optional.</li>
  </ol>
</details>

<ReportHeader />
{#each catalog.standards as standard}
  <ReportChapters {standard} />
{/each}
<ReportSummary />
{#if $evaluation.license }
  <HeaderWithAnchor id="license" level=2>License</HeaderWithAnchor>
  <ReportLicense />
{/if}
