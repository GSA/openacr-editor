<script>
  import { evaluation } from "../stores/evaluation.js";
  import { normaliseCriterionId } from "../utils/normaliseCriterionId";

  export let id;
  export let num;

  $: results = [
    { id: "A", text: "Level A" },
    { id: "AA", text: "Level AA" },
    { id: "AAA", text: "Level AAA" },
  ];

  $: normalisedCriterionId = normaliseCriterionId(num);
</script>

<label for={`result-level-${normalisedCriterionId}`}>
  Evaluate
  <span class="visuallyhidden">{num}</span>
  as
</label>
<select
  id={`result-level-${normalisedCriterionId}`}
  name={`result-${id}`}
  bind:value={$evaluation['evaluationData'][id]['evaluatedLevel']}
  on:blur={() => {
    evaluation.updateCache($evaluation);
  }}>
  {#each results as result}
    <option name={`option-${id}-${result.id}`}>{result.text}</option>
  {/each}
</select>
