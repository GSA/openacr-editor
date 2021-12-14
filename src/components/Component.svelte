<script>
  import { evaluation } from "../stores/evaluation.js";
  import { components, terms } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import HelpText from "../components/HelpText.svelte";

  export let chapterId;
  export let criteria;
  export let component;

  $: currentComponent = components.find( ({ id }) => id === component);
  $: currentEvaluationCriteria = ($evaluation['chapters'] && $evaluation['chapters'][chapterId]['criteria']) ? $evaluation['chapters'][chapterId]['criteria'].find( ({ num }) => num === criteria) : null;
  $: currentEvaluationComponent = (currentEvaluationCriteria) ? currentEvaluationCriteria.components.find( ({ name }) => name === component) : null;
</script>

<style>
  select {
    display: block;
  }
</style>

{#if currentComponent.label }
  <h3>{currentComponent.label}</h3>
{:else}
  <br/><br/>
{/if}

{#if currentEvaluationCriteria }
  {#if currentEvaluationComponent }
    <div class="field">
      <label for="evaluation-{criteria}-{component}-level">
        Level
        <span class="visuallyhidden">for {criteria} {component}</span>
      </label>
      <select
        id="evaluation-{criteria}-{component}-level"
        name="evaluation-{criteria}-{component}-level"
        bind:value={currentEvaluationComponent['adherence']['level']}
        on:blur={() => {
          evaluation.updateCache($evaluation);
        }}>
        {#each terms as term}
          <option name="option-evaluation-{criteria}-{component}-level-{term.id}" value={term.id}>{term.label}</option>
        {/each}
      </select>
      <HelpText type="components" field="level" />
    </div>

    <div class="field">
      <label for="evaluation-{criteria}-{component}-notes">Notes</label>
      <textarea
        bind:value={currentEvaluationComponent['adherence']['notes']}
        id="evaluation-{criteria}-{component}-notes"
        on:change={() => evaluation.updateCache($evaluation)} />
      <HelpText type="components" field="notes" />
    </div>
  {:else}
    <p>Could not find component '{component}' for critera '{criteria}' in '{chapterId}'.</p>
  {/if}
{:else}
  <p>Could not find component '{component}' for critera '{criteria}' in '{chapterId}'.</p>
{/if}
