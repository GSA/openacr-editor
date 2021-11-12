<script>
  import { evaluation } from "../stores/evaluation.js";
  import EvaluationResultSelector from "./EvaluationResultSelector.svelte";
  import EvaluationLevelSelector from "./EvaluationLevelSelector.svelte";
  import EvaluationObservation from "./EvaluationObservation.svelte";
  import SuccessCriterionDetails from "./SuccessCriterionDetails.svelte";
  import SuccessCriterionHeader from "./SuccessCriterionHeader.svelte";
  import { normaliseCriterionId } from "../utils/normaliseCriterionId";

  export let id;
  export let num;
  export let handle;
  export let text;
  export let level = null;
  export let details = null;

  let notes = null;
  let list = null;

  $: normalisedCriterionId = normaliseCriterionId(num);
  $: notes = details ? details.filter(detail => detail.type === "note") : null;
  $: list = details
    ? details.filter(
        detail => detail.type === "olist" || detail.type === "ulist"
      )
    : null;
  $: inConformanceTarget =
    $evaluation.meta.conformanceTarget &&
    $evaluation.meta.conformanceTarget.value.length >= level.length;
</script>

<style>
  .criterion {
    margin-bottom: 4em;
    background-color: var(--pure-white);
    border: 1px solid var(--line-grey);
    box-shadow: 1px 1px 4px -4px #000;
    padding: 1em;
  }
  .criterion__answers {
    display: flex;
    align-items: start;
    justify-content: stretch;
    flex-direction: column;
  }
  /* use :global for children as they are in different components */
  :global(.criterion__answers label) {
    font-size: 90%;
    display: block;
    color: var(--off-black);
    font-weight: normal;
    margin-bottom: 0.125em;
  }
  :global(.criterion__answers label::after) {
    content: ":";
  }
  :global(.criterion__answers select) {
    margin-right: 1em;
  }
  :global(.criterion__answers > div:first-child) {
    flex: 1;
  }
  :global(.criterion__answers > div:last-child) {
    flex: 3;
  }
  :global(.criterion__answers textarea) {
    width: 100%;
    font-family: "Noto Sans Mono", monospace;
  }
  @media (min-width: 35em) {
    .criterion__answers {
      flex-direction: row;
    }
  }
</style>

<div id={normalisedCriterionId} class="criterion">
  {#if inConformanceTarget || level === 'A, AA, AAA'}
    <SuccessCriterionHeader {num} {handle} {level} />
    <p>{text}</p>
    {#if list}
      <SuccessCriterionDetails type="list" details={list} />
    {/if}
    {#if notes && notes.length > 0}
      <SuccessCriterionDetails type="notes" details={notes} />
    {/if}
    <div class="criterion__answers">
      <div>
        <EvaluationResultSelector {id} {num} />
        {#if level === 'A, AA, AAA'}
          <EvaluationLevelSelector {id} {num} />
        {/if}
      </div>
      <EvaluationObservation {id} {num} />
    </div>
  {:else}
    <details>
      <summary>
        <SuccessCriterionHeader {num} {handle} {level} />
      </summary>
      <p>{text}</p>
      {#if list}
        <SuccessCriterionDetails type="list" details={list} />
      {/if}
      {#if notes && notes.length > 0}
        <SuccessCriterionDetails type="notes" details={notes} />
      {/if}
      <div class="criterion__answers">
        <div>
          <EvaluationResultSelector {id} {num} />
        </div>
        <EvaluationObservation {id} {num} />
      </div>
    </details>
  {/if}
</div>
