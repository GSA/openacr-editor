<script>
  import HeaderWithAnchor from "./HeaderWithAnchor.svelte";
  import Component from "./Component.svelte";
  import LinkToGuidance from "./LinkToGuidance.svelte";
  import { href, link } from "../lib/router.js";
  export let chapterId;
  export let chapterLink;
  export let id;
  export let alt_id;
  export let handle;
  export let components = [];
  import { evaluation } from "../stores/evaluation.js";

  $: linkToImplementing = `${chapterLink}#${alt_id}`;
  $: disabled = $evaluation["chapters"][chapterId]["disabled"]
    ? "disabled"
    : "";
</script>

<div {id} class="criteria">
  <details>
    <summary>
      <HeaderWithAnchor {id} level="2" showAnchor={false}
        >{id}: {handle}</HeaderWithAnchor
      >
    </summary>
    {#if !disabled}
      <span class="observation__meta">
        <a href={href(`/report#${alt_id}-editor`)} use:link> View in Report </a>
      </span>
    {/if}
    <LinkToGuidance href={linkToImplementing}
      >Implementing {id}: {handle}</LinkToGuidance
    >
    {#if components}
      {#each components as c}
        <Component {chapterId} criteria={id} component={c} />
      {/each}
    {/if}
  </details>
</div>

<style>
  .criteria {
    margin-bottom: 2em;
  }
  .observation__meta {
    margin-left: auto;
    font-size: smaller;
    align-self: baseline;
    float: right;
  }
</style>
