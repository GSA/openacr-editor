<script>
  import { onMount, beforeUpdate } from "svelte";
  import { evaluation } from "../stores/evaluation.js";
  import { normaliseCriterionId } from "../utils/normaliseCriterionId";

  export let id;
  export let num;

  $: results = [
    { id: "not-checked", text: "Not checked" },
    { id: "passed", text: "Passed" },
    { id: "failed", text: "Failed" },
    { id: "cannot-tell", text: "Cannot tell" },
    { id: "not-applicable", text: "Not applicable" },
  ];

  $: normalisedCriterionId = normaliseCriterionId(num);
</script>

<style>
  select {
    margin-bottom: 1.5em;
  }
</style>

<label for={`result-${normalisedCriterionId}`}>
  Result
  <span class="visuallyhidden">for {num}</span>
</label>
<select
  id={`result-${normalisedCriterionId}`}
  name={`result-${id}`}
  bind:value={$evaluation['evaluationData'][id]['result']}
  on:blur={() => {
    evaluation.updateCache($evaluation);
  }}>
  {#each results as result}
    <option name={`option-${id}-${result.id}`}>{result.text}</option>
  {/each}
</select>
