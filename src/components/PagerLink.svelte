<script>
  import { assetPath } from "../lib/base.js";
  import { href, link } from "../lib/router.js";

  export let to = "";
  export let direction = "";
  $: currentHref = href(to);
</script>

<li class={`pager--item ${direction}`}>
  <a href={currentHref} use:link>
    {#if direction === "previous"}
      <svg
        focusable="false"
        aria-hidden="true"
        class="icon-arrow-right pager--item-icon"
      >
        <use href={assetPath("/images/icons.svg#icon-arrow-left")} />
      </svg>
    {:else if direction === "next"}
      <svg
        focusable="false"
        aria-hidden="true"
        class="icon-arrow-right pager--item-icon"
      >
        <use href={assetPath("/images/icons.svg#icon-arrow-right")} />
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
  </a>
</li>

<style>
  .pager--item-text-direction {
    text-transform: capitalize;
  }
</style>
