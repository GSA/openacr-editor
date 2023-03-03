<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { getCatalogChapter } from "../../utils/getCatalogItems.js";
  import ReportChapterTableResult from "./ReportChapterTableResult.svelte";
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";
  import { sanitizeMarkdown } from "../../utils/sanitizeMarkdown.js";
  import { getProgressPerChapter } from "../../utils/getEvaluatedItems.js";
  import { getCatalog } from "../../utils/getCatalogs.js";
  import termLabel from "../../data/termLabel.yaml";

  export let standard;
  export let chapterId;
  export let download = false;
  let catalogName = $evaluation.catalog;
  let catalog = getCatalog($evaluation.catalog);
  let terms = catalog.terms;

  $: chapter = getCatalogChapter(catalogName, chapterId);
  $: progressPerChapter = getProgressPerChapter($evaluation);
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
  <div id="{chapterId}-notes" class="chapter-notes-section">
    Notes: {@html sanitizeMarkdown($evaluation['chapters'][chapterId]['notes'])}
  </div>
{/if}

{#if $evaluation['chapters'][chapterId]['criteria'] && !$evaluation['chapters'][chapterId]['disabled'] }
  <div id="{chapterId}-summary">
    <p>
      Conformance to the {$evaluation['chapters'][chapterId]['criteria'].length} criteria listed below is distributed as follows:
    </p>
    <ul>
      {#each terms as term}
        {#if termLabel[term.id]}
          <li>{progressPerChapter[chapterId]['evaluated_by_term'][term.id]} {termLabel[term.id]}</li>
        {/if}
      {/each}
    </ul>
  </div>

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
        <ReportChapterTableResult {catalogName} {standard} {chapterId} {criteria} {download} />
      {/each}
    </tbody>
  </table>
{/if}
