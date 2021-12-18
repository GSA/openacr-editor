<script>
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";
  import { evaluation } from "../../stores/evaluation.js";

  export let download = false;
</script>

{#if $evaluation["legal_disclaimer"]}
  <HeaderWithAnchor id="legal-disclaimer" level=2 {download}>
    Legal Disclaimer {#if $evaluation["vendor"]["company_name"]}({$evaluation["vendor"]["company_name"]}){/if}
  </HeaderWithAnchor>
  {$evaluation["legal_disclaimer"]}
{/if}
{#if $evaluation["repository"]}
  <HeaderWithAnchor id="repository" level=2 {download}>Repository</HeaderWithAnchor>
  <a href="{$evaluation["repository"]}">{$evaluation["repository"]}</a>
{/if}
{#if $evaluation["feedback"]}
  <HeaderWithAnchor id="feedback" level=2 {download}>Feedback</HeaderWithAnchor>
  <a href="{$evaluation["feedback"]}">{$evaluation["feedback"]}</a>
{/if}
{#if $evaluation["related_openacrs"] && $evaluation["related_openacrs"].length > 0}
  <HeaderWithAnchor id="related-openacrs" level=2 {download}>Related OpenACRs</HeaderWithAnchor>
  <ul>
    {#each $evaluation["related_openacrs"] as related}
      {#if related.url}
        <li><a href="{related.url}">{related.url} ({related.type})</a></li>
      {/if}
    {/each}
  </ul>
{/if}
