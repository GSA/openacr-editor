<script>
  import { Link } from "svelte-navigator";
  import marked from "marked";
  import { evaluation } from "../../stores/evaluation.js";
  import { getLinkToSC } from "../../utils/getLinkToSC.js";
  import { inConformanceTarget } from "../../utils/inConformanceTarget.js";

  export let result;

  const isMultiLevelSC = result.level === "A, AA, AAA";
  const isEvaluated = result.result !== "Not checked";
  const rowId = `criterion-${result.num.replace(/\./g, "").toLowerCase()}`;
</script>

<style>
  .result-row {
    margin-bottom: 1em;
    border-bottom: 1px solid var(--cloudy);
  }
  .result-row:target {
    outline: 2px solid var(--gold);
  }
  .result-row td {
    display: block;
    position: relative;
    border-style: none;
  }
  .result-row td:nth-child(2)::before {
    content: "";
    width: 0.5em;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: var(--line-grey);
  }
  .result-row--passed td:nth-child(2)::before,
  .result-row--notapplicable td:nth-child(2)::before {
    background-color: green;
  }
  .result-row--failed td:nth-child(2)::before {
    background-color: var(--faded-red);
  }
  .result-row--cannottell td:nth-child(2)::before {
    background-color: orange;
  }
  .results-label-sc {
    font-weight: bold;
  }
  @media (min-width: 60em) {
    .results-label-mobile {
      display: none;
    }
    .results-label-sc {
      font-weight: normal;
    }
    .result-row {
      border-bottom: 0;
    }
    .result-row td {
      display: table-cell;
      border: 1px solid var(--cloudy);
    }
  }
</style>

{#if !inConformanceTarget(result, $evaluation) && !isMultiLevelSC && !isEvaluated}
  <tr class="result-row" id={rowId}>
    <td class="results-label-sc">
      {result.num}: {result.handle} (Level {result.level})
    </td>
    {#if result.observations}
      <td>
        <span class="results-label-mobile">Result:</span>
        Not in scope
      </td>
      <td colspan="2">
        {@html marked(result.observations)}
      </td>
    {:else}
      <td colspan="3" class="not-in-scope-no-observations">
        <span class="results-label-mobile">Result:</span>
        Not in scope
      </td>
    {/if}
  </tr>
{:else}
  <tr
    class={`result-row${result.result ? ' result-row--' + result.result
            .toLowerCase()
            .trim()
            .split(' ')
            .join('') : ''}`}
    id={rowId}>
    <td class="results-label-sc">
      {result.num}: {result.handle}
      {#if isMultiLevelSC}
        (evaluated as {result.evaluatedLevel})
      {:else}({result.evaluatedLevel}){/if}
    </td>
    <td>
      <span class="results-label-mobile">Result:</span>
      {result.result}
    </td>
    <td>
      {#if result.observations}
        <span class="results-label-mobile">Observations:</span>
        {@html marked(result.observations)}
      {/if}
    </td>
    <td class="result-row__edit">
      <Link to={getLinkToSC(result.num)}>
        <span class="visuallyhidden">Edit {result.num}</span>
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-edit">
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </Link>
    </td>
  </tr>
{/if}
