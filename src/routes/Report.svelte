<script>
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";

  import Header from "../components/Header.svelte";
  import ReportHeader from "../components/report/ReportHeader.svelte";
  import ReportSummary from "../components/report/ReportSummary.svelte";
  import ReportValid from "../components/report/ReportValid.svelte";
  import ReportChapters from "../components/report/ReportChapters.svelte";
  import ReportHTMLDownload from "../components/report/ReportHTMLDownload.svelte";
  import ReportYAMLDownload from "../components/report/ReportYAMLDownload.svelte";
  import { standards } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

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
