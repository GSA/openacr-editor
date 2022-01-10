<script>
  import { evaluation } from "../stores/evaluation.js";
  import { components, terms } from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import HelpText from "../components/HelpText.svelte";
  import HeaderWithAnchor from "./HeaderWithAnchor.svelte";

  export let chapterId;
  export let criteria;
  export let component;

  $: currentComponent = components.find( ({ id }) => id === component);
  $: currentEvaluationCriteria = ($evaluation['chapters'] && $evaluation['chapters'][chapterId]['criteria']) ? $evaluation['chapters'][chapterId]['criteria'].find( ({ num }) => num === criteria) : null;
  $: currentEvaluationComponent = (currentEvaluationCriteria) ? currentEvaluationCriteria.components.find( ({ name }) => name === component) : null;
  $: currentEvaluationCriteriaIndex = ($evaluation['chapters'] && $evaluation['chapters'][chapterId]['criteria']) ? $evaluation['chapters'][chapterId]['criteria'].findIndex( ({ num }) => num === criteria) : null;
  $: currentEvaluationComponentIndex = (currentEvaluationCriteria) ? currentEvaluationCriteria.components.findIndex( ({ name }) => name === component) : null;
  $: notesCharCount = ($evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['notes']) ? $evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['notes'].length : 0;
</script>

<style>
  select {
    display: block;
  }
  .notes-count {
    font-style: italic;
  }
  .notes-count.notes-good {
    color: green;
  }
  .notes-count.notes-good::after {
    content: '\2713';
    display: inline-block;
    padding: 0 6px 0 0;
  }
  /* Color .text-accent-warm-darker from USWDS */
  .notes-count.notes-need-more {
    color: #775540;
  }
  .notes-count.notes-need-more::after {
    content: '\2192';
    display: inline-block;
    padding: 0 6px 0 0;
  }
</style>

{#if currentComponent.label }
  <HeaderWithAnchor id="{criteria}-{component}" level=3>{currentComponent.label}</HeaderWithAnchor>
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
        bind:value={$evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['level']}
        on:blur={() => {
          evaluation.updateCache($evaluation);
        }}>
        <option name="option-evaluation-{criteria}-{component}-level-none" value="">- Select -</option>
        {#each terms as term}
          <option name="option-evaluation-{criteria}-{component}-level-{term.id}" value={term.id}>{term.label}</option>
        {/each}
      </select>
      <HelpText type="components" field="level" />
    </div>

    <div class="field">
      <label for="evaluation-{criteria}-{component}-notes">Remarks and Explanations</label>
      {#if notesCharCount > 50}
        <span class="notes-count notes-good" aria-live="polite">Good&nbsp;</span>
      {:else if notesCharCount > 0}
        <span class="notes-count notes-need-more" aria-live="polite">Longer description may be helpful&nbsp;</span>
      {/if}
      <textarea
        bind:value={$evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['notes']}
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
