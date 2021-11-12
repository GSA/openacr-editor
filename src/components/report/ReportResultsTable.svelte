<script>
  import ReportResultsTableResult from "./ReportResultsTableResult.svelte";

  import { evaluation } from "../../stores/evaluation.js";

  const results = Object.values($evaluation.evaluationData);
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

<h3>All Results</h3>

<table aria-labelledby="results">
  <thead>
    <tr>
      <th>Success Criterion</th>
      <th>Result</th>
      <th>Observations</th>
      <th class="result-row__edit" />
    </tr>
  </thead>
  <tbody>
    {#each results as result}
      <ReportResultsTableResult {result} />
    {/each}
  </tbody>
</table>

{#if $evaluation['meta']['createdWith'] && $evaluation['meta']['createdWith']['value']}
  <p>
    <small>
      Created with ATAG Report Tool version {$evaluation['meta']['createdWith']['value']}
    </small>
  </p>
{/if}
