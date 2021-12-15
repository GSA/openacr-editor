<script>
  import { createEventDispatcher } from 'svelte';
  import { evaluation } from "../stores/evaluation.js";
  import HelpText from "../components/HelpText.svelte";

  export let id;
  export let count;

  const dispatch = createEventDispatcher();

  function dispatchDelete() {
    dispatch('DELETE', id);
  }
</script>

<style>
  .Related__Control--delete {
    font-size: 1em;;
    float: right;
    margin-left: 1em;
    margin-top: .25em;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: currentColor;
  }
  .Related {
    background: var(--trans-line-grey);
    padding: 1em;
  }
  :global(.Related .Related__Contents .related-input .Field) {
    margin-bottom: .5em;
  }
  :global(.Related legend) {
    font-size: 1em;
    padding: 0;
    margin-bottom: .25em;
  }
  :global(.Related fieldset) {
    margin-bottom: 0;
  }
  @media (min-width: 40em) {
    .related-input {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 1em;
    }
  }
</style>

<div class="Related">
  <div class="Related__Contents">
    <button
    type="button"
    class="Related__Control--delete"
    on:click="{dispatchDelete}"
    >
      <svg
        focusable="false"
        aria-hidden="true"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17" stroke="#ffffff"/>
          <line x1="14" y1="11" x2="14" y2="17" stroke="#ffffff" />
      </svg>
      <span class="visuallyhidden">Delete Related OpenACR</span>
    </button>
    <fieldset>
      <legend>Related OpenACR {count}</legend>
      <div class="related-input">
        <div class="field">
          <label for="evaluation-related-openacrs-{count}-url">URL</label>
          <input
            type="url"
            bind:value={$evaluation['related_openacrs'][id]['url']}
            id="evaluation-related-openacrs-{count}-url"
            on:blur={() => evaluation.updateCache($evaluation)} />
          <HelpText type="related_openacrs" field="url" />
        </div>
        <div class="field">
          <label for="evaluation-related-openacrs-{count}-type">Type</label>
          <select
            id="evaluation-related-openacrs-{count}-type"
            name="evaluation-related-openacrs-{count}-type"
            bind:value={$evaluation['related_openacrs'][id]['type']}
            on:blur={() => {
              evaluation.updateCache($evaluation);
            }}>
              <option name="option-evaluation-related-openacrs-type-primary" value="primary">Primary</option>
              <option name="option-evaluation-related-openacrs-type-secondary" value="secondary">Secondary</option>
          </select>
          <HelpText type="related_openacrs" field="type" />
        </div>
      </div>
    </fieldset>
  </div>
</div>
