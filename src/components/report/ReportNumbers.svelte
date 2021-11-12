<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { getEvaluatedItems } from "../../utils/getEvaluatedItems.js";
  import { inConformanceTarget } from "../../utils/inConformanceTarget.js";

  export let className = "";

  $: items = getEvaluatedItems($evaluation);
  $: totalCriteria = Object.values($evaluation.evaluationData).filter(item =>
    inConformanceTarget(item, $evaluation)
  ).length;
</script>

<p class={className}>
  Reported on
  <strong>{items.length}</strong>
  of
  <strong>{totalCriteria}</strong>
  {#if $evaluation.meta.conformanceTarget.value === 'A'}Level&nbsp;A{/if}
  {#if $evaluation.meta.conformanceTarget.value === 'AA'}
    Level&nbsp;A,&nbsp;AA
  {/if}
  Success Criteria.
</p>
