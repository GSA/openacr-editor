<script>
  import SuccessCriterion from "./SuccessCriterion.svelte";
  import LinkToGuidance from "./LinkToGuidance.svelte";
  export let chapter_link;
  export let id;
  export let alt_id;
  export let handle;
  export let components = [];

  $: linkToImplementing = `${chapter_link}#${alt_id}`;
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
</div>
