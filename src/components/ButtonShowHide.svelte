<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("toggle");
  }

  export let expanded;
</script>

<style>
  .button-showhide {
    border-width: 1px;
    border-color: var(--line-grey);
    font-weight: normal;
    background-color: transparent;
    color: var(--off-black);
    padding: 0 6px;
    display: flex;
    margin-left: auto;
    margin-bottom: 2px;
    margin-top: 2px;
  }
  .button-showhide:hover {
    border-color: currentColor;
  }
  .button-showhide svg {
    fill: transparent;
  }
  .button-showhide svg:first-child {
    margin: 0 0.25em 0 -0.25em;
  }
  .button-showhide svg:last-child {
    margin: 0 -0.25em 0 0.25em;
  }
</style>

{#if expanded}
  <button
    type="button"
    class="button-secondary button-small button-showhide"
    on:click={handleClick}>
    <span>
      <slot />
    </span>
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
{:else}
  <button
    type="button"
    class="button-secondary button-small button-showhide"
    on:click={handleClick}>
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
    <span>
      <slot />
    </span>
  </button>
{/if}
