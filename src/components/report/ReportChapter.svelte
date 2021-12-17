<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { getCatalogChapter } from "../../utils/getCatalogItems.js";
  import ReportChapterTableResult from "./ReportChapterTableResult.svelte";
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";

  export let standard;
  export let chapterId;
  export let download = false;

  $: chapter = getCatalogChapter(chapterId);
</script>

<style>
  table {
    width: 100%;
  }
  tr:target {
    outline: 2px solid var(--gold);
  }
  thead {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  thead th {
    position: absolute;
    left: -9999em;
    top: -9999em;
  }
  @media (min-width: 60em) {
    thead th {
      position: static;
    }
  }
</style>

<HeaderWithAnchor id={chapterId} level=3 {download}>{chapter.label}</HeaderWithAnchor>

{#if $evaluation['chapters'][chapterId]['notes']}
  Notes: {$evaluation['chapters'][chapterId]['notes']}
{/if}

{#if $evaluation['chapters'][chapterId]['criteria']}
  <table class="usa-table">
    <thead>
    <tr>
      <th>Criteria</th>
      <th>Conformance Level</th>
      <th>Remarks and Explanations</th>
    </tr>
    </thead>
    <tbody>
      {#each $evaluation['chapters'][chapterId]['criteria'] as criteria}
        <ReportChapterTableResult {standard} {chapterId} {criteria} {download} />
      {/each}
    </tbody>
  </table>
{/if}
