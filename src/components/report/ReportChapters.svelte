<script>
  import ReportChapter from "./ReportChapter.svelte";

  export let standard;
  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

<h2 id="{standard.id}{extraId}">
  <a href="#{standard.id}{extraId}" aria-hidden="true" class="header-anchor">#</a>
  {standard.report_heading}
</h2>

{#each standard.chapters as standardChapter}
  <ReportChapter {standard} chapterId={standardChapter} {download} />
{/each}
