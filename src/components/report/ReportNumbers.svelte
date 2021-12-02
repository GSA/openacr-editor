<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { getEvaluatedChapterCriteria, getChapterCriteria } from "../../utils/getEvaluatedItems.js";

  export let className = "";

  $: items = getEvaluatedChapterCriteria($evaluation);
  $: totalCriteria = getChapterCriteria();
</script>

<p class={className}>
  Reported on
  <strong>{items.length}</strong>
  of
  <strong>{totalCriteria.length}</strong>
  Total Criteria.
</p>
