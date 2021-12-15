<script>
  import { evaluation } from "../../stores/evaluation.js";

  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

{#if $evaluation["legal_disclaimer"]}
  <h2 id="legal-disclaimer{extraId}">
    <a href="#legal-disclaimer{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Legal Disclaimer {#if $evaluation["vendor"]["company_name"]}({$evaluation["vendor"]["company_name"]}){/if}
  </h2>
  {$evaluation["legal_disclaimer"]}
{/if}
{#if $evaluation["repository"]}
  <h2 id="repository{extraId}">
    <a href="#repository{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Repository
  </h2>
  <a href="{$evaluation["repository"]}">{$evaluation["repository"]}</a>
{/if}
{#if $evaluation["feedback"]}
  <h2 id="feedback{extraId}">
    <a href="#feedback{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Feedback
  </h2>
  <a href="{$evaluation["feedback"]}">{$evaluation["feedback"]}</a>
{/if}
{#if $evaluation["related_openacrs"]}
  <h2 id="related-openacrs{extraId}">
    <a href="#related-openacrs{extraId}" aria-hidden="true" class="header-anchor">#</a>
    Related OpenACRs
  </h2>
  <ul>
    {#each $evaluation["related_openacrs"] as related}
      <li><a href="{related.url}">{related.url} ({related.type})</a></li>
    {/each}
  </ul>
{/if}
