<script>
  import { evaluation } from "../../stores/evaluation.js";

  export let field;
  export let editing;
</script>

<style>
  .no-result {
    font-weight: normal;
    font-style: italic;
  }
</style>

{#if editing}
  <select
    name={`evaluation-meta-${field}`}
    id={`evaluation-meta-${field}`}
    bind:value={$evaluation['meta'][field]['value']}
    on:blur={() => {
      evaluation.updateCache($evaluation);
    }}>
    <slot />
  </select>
{:else}
  {#if $evaluation['meta'][field] && $evaluation['meta'][field]['value']}
    {$evaluation['meta'][field]['value']}
  {:else}
    <span class="no-result">(Not provided)</span>
  {/if}
{/if}
