<script>
  import { Link } from "svelte-navigator";
  import ResultCard from "./ResultCard.svelte";
  import ReportNumbers from "./ReportNumbers.svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import {
    resultCategories,
    getEvaluatedItems,
    getMissingItems,
    getItemsFromCategory,
  } from "../../utils/getEvaluatedItems.js";
  import { getLinkToSC } from "../../utils/getLinkToSC.js";

  $: items = getEvaluatedItems($evaluation);
  $: missingItems = getMissingItems($evaluation);
</script>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  .result-cards {
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    background-color: var(--off-white);
    border-radius: 0.5em;
  }
  @media (min-width: 60em) {
    .result-missing {
      column-count: 2;
    }
  }
</style>

<h3>Summary</h3>

<ReportNumbers />

<ul class="result-cards">
  {#each resultCategories as category}
    <ResultCard
      label={category}
      items={getItemsFromCategory(items, category)} />
  {/each}
  <ResultCard label="Not checked" items={missingItems} />
</ul>

{#if missingItems.length > 0}
  <details>
    <summary>
      <h3>Not checked ({missingItems.length})</h3>
    </summary>
    <ul class="result-missing">
      {#each missingItems as item}
        <li>
          <Link to={getLinkToSC(item.num)}>{item.num}: {item.handle}</Link>
        </li>
      {/each}
    </ul>
  </details>
{/if}
