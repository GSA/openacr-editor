<script>

  export let id;
  export let level;
  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

<style>
  .header-anchor {
    margin-left: -1em;
    visibility: hidden;
  }
  :hover > .header-anchor {
    visibility: visible;
  }
</style>

{#if level == 2}
  <h2 id="{id}{extraId}">
    <a href="#{id}{extraId}" aria-hidden="true" class="header-anchor">#</a>
    <slot />
  </h2>
{/if}

{#if level == 3}
  <h3 id="{id}{extraId}">
    <a href="#{id}{extraId}" aria-hidden="true" class="header-anchor">#</a>
    <slot />
  </h3>
{/if}
