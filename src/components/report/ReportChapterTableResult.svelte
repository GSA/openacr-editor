<script>
  import { catalogChapterCriteria, catalogComponentLabel, levelLabel } from "../../utils/getCatalogItems.js";
  import { sanitizeMarkdown } from "../../utils/sanitizeMarkdown.js";

  export let catalogName;
  export let standard;
  export let chapterId;
  export let criteria;
  export let download = false;

  $: catalogCriteria = catalogChapterCriteria(catalogName, chapterId, criteria.num);
  const extraId = download ? "-download" : "-editor";
</script>

<style>
  .result-row {
    margin-bottom: 1em;
    border-bottom: 1px solid var(--cloudy);
  }
  .result-row:target {
    outline: 2px solid var(--gold);
  }
  .result-row td {
    display: block;
    position: relative;
    border-style: none;
  }
  @media (min-width: 60em) {
    .result-row {
      border-bottom: 0;
    }
    .result-row td {
      display: table-cell;
      border: 1px solid var(--cloudy);
    }
  }
</style>

{#if catalogCriteria }
<tr class="result-row" id="{catalogCriteria.alt_id}{extraId}">
  <td>
    <a href="{standard.url}#{catalogCriteria.alt_id}" target="_blank">
      {criteria.num} {catalogCriteria.handle} <span class="visuallyhidden">(opens in a new window or tab)</span>
    </a>
  </td>
  <td>
    {#if criteria.components}
      <ul>
        {#each criteria.components as component}
          {#if component.adherence.level}
            <li>{@html catalogComponentLabel(catalogName, component.name, "html")}<p>{levelLabel(catalogName, component.adherence.level)}</p></li>
          {/if}
        {/each}
      </ul>
    {/if}
  </td>
  <td>
    {#if criteria.components}
      <ul>
        {#each criteria.components as component}
        {#if component.adherence.notes}
          <li>{@html catalogComponentLabel(catalogName, component.name, "html")}{@html sanitizeMarkdown(component.adherence.notes)}</li>
          {/if}
        {/each}
      </ul>
    {/if}
  </td>
</tr>
{/if}
