<script>
  import FocusHeader from "../FocusHeader.svelte";
  import ReportChapter from "./ReportChapter.svelte";

  export let standard;
  export let download = false;
</script>

<FocusHeader id={standard.id} level=2 {download}>{standard.report_heading}</FocusHeader>

{#each standard.chapters as standardChapter}
  <ReportChapter {standard} chapterId={standardChapter} {download} />
{/each}
