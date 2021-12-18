<script>
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";
  import ReportChapter from "./ReportChapter.svelte";

  export let standard;
  export let download = false;
</script>

<HeaderWithAnchor id={standard.id} level=2 {download}>{standard.report_heading}</HeaderWithAnchor>

{#each standard.chapters as standardChapter}
  <ReportChapter {standard} chapterId={standardChapter} {download} />
{/each}
