<script>
  import { Link } from "svelte-navigator";
  import vars from "../../config/__buildEnv__.json";

  export let to = "";
  export let direction = "";
</script>

<style>
  .pager--item-text-direction {
    text-transform: capitalize;
  }
</style>

<li class={`pager--item ${direction}`}>
  <Link {to}>
    {#if direction === 'previous'}
      <svg
        focusable="false"
        aria-hidden="true"
        class="icon-arrow-right pager--item-icon">
        <use href={`${vars.pathPrefix}/images/icons.svg#icon-arrow-left`} />
      </svg>
    {:else if direction === 'next'}
      <svg
        focusable="false"
        aria-hidden="true"
        class="icon-arrow-right pager--item-icon">
        <use href={`${vars.pathPrefix}/images/icons.svg#icon-arrow-right`} />
      </svg>
    {/if}
    <span class="pager--item-text">
      <span class="pager--item-text-direction">
        {`${direction.toLowerCase()}:`}
      </span>
      <span class="pager--item-text-target">
        <slot />
      </span>
    </span>
  </Link>
</li>
