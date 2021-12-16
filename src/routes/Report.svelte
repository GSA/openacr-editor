<script>
  import { onMount } from "svelte";
  import { useLocation } from "svelte-navigator";

  import Header from "../components/Header.svelte";
  import FocusHeader from "../components/FocusHeader.svelte";
  import ReportHeader from "../components/report/ReportHeader.svelte";
  import ReportSummary from "../components/report/ReportSummary.svelte";
  import ReportLicense from "../components/report/ReportLicense.svelte";
  import ReportValid from "../components/report/ReportValid.svelte";
  import ReportChapters from "../components/report/ReportChapters.svelte";
  import ReportHTMLDownload from "../components/report/ReportHTMLDownload.svelte";
  import ReportYAMLDownload from "../components/report/ReportYAMLDownload.svelte";
  import { standards } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import { evaluation } from "../stores/evaluation.js";

  import { currentPage } from "../stores/currentPage.js";

  import { honourFragmentIdLinks } from "../utils/honourFragmentIdLinks.js";

  const location = useLocation();

  onMount(() => {
    let fragment;
    currentPage.update(currentPage => "Report");

    honourFragmentIdLinks($location);
  });
</script>

<svelte:head>
  <title>Report | OpenACR Editor | GSA</title>
</svelte:head>

<Header>Report</Header>

<p>
  <ReportYAMLDownload />
  <ReportHTMLDownload />
</p>

<ReportValid />
<ReportHeader />
{#each standards as standard}
  <ReportChapters {standard} />
{/each}
<ReportSummary />
{#if $evaluation.license }
  <FocusHeader id="license" level=2>License</FocusHeader>
  <ReportLicense />
{/if}
