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
  	.usa-button--base{
	color:black;
	background-color: transparent;
	border:1px solid #ddd;
	}
</style>

{#if expanded}
  <button
    type="button"
   class="usa-button usa-button--base padding-05 font-sans-3xs margin-left-auto display-flex"
    on:click={handleClick}>
    <span class=" margin-top-2px">
      <slot />
    </span>
	  <img alt="arrow-right" src="/images/angle-right-solid.svg" width="15" height="15"/>
  </button>
{:else}
  <button
    type="button"
    class="usa-button usa-button--base padding-05 font-sans-3xs display-flex"
    on:click={handleClick}>
	  <img alt="arrow-left" src="/images/angle-left-solid.svg" width="15" height="15"/>
	  <span class=" margin-top-2px">
      <slot />
    </span>
  </button>
{/if}
