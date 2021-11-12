<script>
  import LinkToGuidance from "./LinkToGuidance.svelte";
  import { normaliseCriterionId } from "../utils/normaliseCriterionId";

  export let num, handle, level, linkToImplementing;

  $: normalisedCriterionId = normaliseCriterionId(num);
  $: linkToImplementing = `https://www.w3.org/TR/IMPLEMENTING-ATAG20/#sc_${normalisedCriterionId}`;
</script>

<style>
  .criterion-header {
    margin-bottom: 1em;
  }
  .criterion-header h3 {
    font-weight: normal;
    display: inline;
  }
  .criterion-header__level {
    font-size: 0.8125rem;
    font-style: normal;
    margin: 0 1.5em 0 0.5em;
    vertical-align: middle;
    white-space: nowrap;
  }
</style>

<div class="criterion-header">
  <h3>{num}: {handle}</h3>
  <em class="criterion-header__level">Level {level}</em>
  <LinkToGuidance href={linkToImplementing}>Implementing {num}</LinkToGuidance>
</div>
