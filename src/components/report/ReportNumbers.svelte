<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { getEvaluatedChapterCriteriaComponents, getChapterCriteriaComponents } from "../../utils/getEvaluatedItems.js";

  export let className = "";

  $: items = getEvaluatedChapterCriteriaComponents($evaluation);
  $: totalCriteria = getChapterCriteriaComponents($evaluation);
</script>

<p class={className}>
  Reported on
  <strong>{items.length}</strong>
  of
  <strong>{totalCriteria.length}</strong>
  Total Criteria.
</p>
