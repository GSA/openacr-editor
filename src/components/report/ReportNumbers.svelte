<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { getEvaluatedChapterCriteriaComponents, getChapterCriteriaComponents } from "../../utils/getEvaluatedItems.js";

  export let className = "";

  $: items = getEvaluatedChapterCriteriaComponents($evaluation);
  $: totalCriteria = getChapterCriteriaComponents($evaluation);
</script>

<p class={className}  style="border-top:1px solid #ddd">
  Reported on
  <strong>{items.length}</strong>
  of
  <strong>{totalCriteria.length}</strong>
  Total Criteria.
</p>
