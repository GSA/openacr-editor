<script>
  import { evaluation } from "../stores/evaluation.js";
  import HelpText from "../components/HelpText.svelte";
  import HeaderWithAnchor from "./HeaderWithAnchor.svelte";
  import { getCatalog } from "../utils/getCatalogs.js";

  export let chapterId;
  export let criteria;
  export let component;
  let catalog = getCatalog($evaluation.catalog);
  let components = catalog.components;
  let terms = catalog.terms;

  $: currentComponent = components.find( ({ id }) => id === component);
  $: currentEvaluationCriteria = ($evaluation['chapters'] && $evaluation['chapters'][chapterId]['criteria']) ? $evaluation['chapters'][chapterId]['criteria'].find( ({ num }) => num === criteria) : null;
  $: currentEvaluationComponent = (currentEvaluationCriteria) ? currentEvaluationCriteria.components.find( ({ name }) => name === component) : null;
  $: currentEvaluationCriteriaIndex = ($evaluation['chapters'] && $evaluation['chapters'][chapterId]['criteria']) ? $evaluation['chapters'][chapterId]['criteria'].findIndex( ({ num }) => num === criteria) : null;
  $: currentEvaluationComponentIndex = (currentEvaluationCriteria) ? currentEvaluationCriteria.components.findIndex( ({ name }) => name === component) : null;
  $: notesCharCount = ($evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['notes']) ? $evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['notes'].length : 0;
  $: disabled = ($evaluation['chapters'][chapterId]['disabled']) ? 'disabled' : '';

  function showNotesMessage(e) {
    const messageBox = document.getElementById(`evaluation-${criteria}-${component}-notes-message`);
    if (notesCharCount > 50) {
      messageBox.innerHTML = "<span class='notes-good'>Good&nbsp;</span>";
    } else if (notesCharCount > 1) {
      messageBox.innerHTML = "<span class='notes-need-more'>Longer description may be helpful&nbsp;</span>";
    } else {
      messageBox.innerHTML = "";
    }
  }
</script>

<style>
  select {
    display: block;
  }
  .notes-message {
    font-style: italic;
  }
  .notes-message > :global(.notes-good) {
    color: green;
  }
  .notes-message > :global(.notes-good::after) {
    content: '\2713';
    display: inline-block;
    padding: 0 6px 0 0;
  }
  /* Color .text-accent-warm-darker from USWDS */
  .notes-message > :global(.notes-need-more) {
    color: #775540;
  }
  .notes-message > :global(.notes-need-more::after) {
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
        }}
        {disabled}
        >
        <option name="option-evaluation-{criteria}-{component}-level-none" value="">- Select -</option>
        {#each terms as term}
          <option name="option-evaluation-{criteria}-{component}-level-{term.id}" value={term.id}>{term.label}</option>
        {/each}
      </select>
      <HelpText type="components" field="level" />
    </div>

    <div class="field">
      <label for="evaluation-{criteria}-{component}-notes">Remarks and Explanations</label>
      <div id="evaluation-{criteria}-{component}-notes-message" class="notes-message" aria-live="polite"></div>
      <textarea
        bind:value={$evaluation['chapters'][chapterId]['criteria'][currentEvaluationCriteriaIndex]['components'][currentEvaluationComponentIndex]['adherence']['notes']}
        id="evaluation-{criteria}-{component}-notes"
        on:change={() => evaluation.updateCache($evaluation)}
        on:keyup={showNotesMessage}
        aria-describedby="evaluation-{criteria}-{component}-notes-message" {disabled}/>
      <HelpText type="components" field="notes" />
    </div>
  {:else}
    <p>Could not find component '{component}' for criteria '{criteria}' in '{chapterId}'.</p>
  {/if}
{:else}
  <p>Could not find component '{component}' for criteria '{criteria}' in '{chapterId}'.</p>
{/if}
