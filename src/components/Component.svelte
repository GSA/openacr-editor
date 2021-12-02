<script>
  import { evaluation } from "../stores/evaluation.js";
  import { components } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

  export let chapterId;
  export let criteria;
  export let component;

  // console.log(chapterId + ", " + criteria + ", " + component);

  $: currentComponent = components.find( ({ id }) => id === component);
  $: currentEvaluationCriteria = ($evaluation['chapters'][chapterId]['criteria']) ? $evaluation['chapters'][chapterId]['criteria'].find( ({ num }) => num === criteria) : null;
  $: currentEvaluationComponent = (currentEvaluationCriteria) ? currentEvaluationCriteria.components.find( ({ name }) => name === component) : null;
</script>

{#if currentComponent.label }
  <h3>{currentComponent.label}</h3>
{/if}

{#if currentEvaluationCriteria }
  {#if currentEvaluationComponent }
    <div class="field">
      <label for="evaluation-{criteria}-{component}-level">Level</label>
      <input
        type="text"
        bind:value={currentEvaluationComponent['adherence']['level']}
        id="evaluation-{criteria}-{component}-level"
        on:blur={() => evaluation.updateCache($evaluation)} />
    </div>

    <div class="field">
      <label for="evaluation-{criteria}-{component}-notes">Notes</label>
      <textarea
        bind:value={currentEvaluationComponent['adherence']['notes']}
        id="evaluation--{criteria}-{component}-notes"
        on:change={() => evaluation.updateCache($evaluation)} />
    </div>
  {/if}
{/if}
