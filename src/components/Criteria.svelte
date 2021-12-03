<script>
  import Component from "./Component.svelte";
  import LinkToGuidance from "./LinkToGuidance.svelte";
  export let chapterId;
  export let chapterLink;
  export let id;
  export let alt_id;
  export let handle;
  export let components = [];

  $: linkToImplementing = `${chapterLink}#${alt_id}`;
</script>

<style>
  .criteria {
    margin-bottom: 2em;
  }
  .criteria h2 {
    font-size: 1.125em;
  }
</style>

<div {id} class="criteria">
  <h2>{id}: {handle}</h2>
  <LinkToGuidance href={linkToImplementing}>Implementing {id}</LinkToGuidance>
  {#if components}
    {#each components as c}
      <Component chapterId={chapterId} criteria={id} component={c} />
    {/each}
  {/if}
</div>
