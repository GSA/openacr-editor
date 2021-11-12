<script>
  import { evaluation } from "../../stores/evaluation.js";
  import marked from "marked";

  export let editing = false;
  let section;

  function toggleEdit() {
    editing = !editing;
    section.focus();
  }
</script>

<style>
  h2 {
    display: flex;
  }
  div:focus {
    outline: none;
  }
</style>

<div bind:this={section} tabindex="-1">
  <h2>Executive Summary</h2>

  {#if editing}
    <div class="field">
      <label for={`evaluation-meta-edit-executiveSummary`}>
        Executive Summary
      </label>
      <textarea
        bind:value={$evaluation['meta']['executiveSummary']['value']}
        id={`evaluation-meta-edit-executiveSummary`}
        on:blur={() => evaluation.updateCache($evaluation)} />
    </div>
    <button type="button button-secondary" on:click={toggleEdit}>
      Save
      <span class="visuallyhidden">executive summary</span>
    </button>
  {:else}
    {#if $evaluation['meta']['executiveSummary']['value']}
      {@html marked($evaluation['meta']['executiveSummary']['value'])}
    {:else}Not provided{/if}
    <p>
      <button type="button" class="button-secondary" on:click={toggleEdit}>
        Edit
        <span class="visuallyhidden">executive summary</span>
      </button>
    </p>
  {/if}
</div>
