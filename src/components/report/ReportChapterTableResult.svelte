<script>
  import { catalogChapterCriteria, catalogComponentLabel, levelLabel } from "../../utils/getCatalogItems.js";

  export let standard;
  export let chapterId;
  export let criteria;
  export let download = false;

  $: catalogCriteria = catalogChapterCriteria(chapterId, criteria.num);
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
  .result-row td:nth-child(2)::before {
    content: "";
    width: 0.5em;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: var(--line-grey);
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

<tr class="result-row" id="{criteria.num}{extraId}">
  <td>
    <a href="{standard.url}#{catalogCriteria.alt_id}">
      {criteria.num} {catalogCriteria.handle}
    </a>
  </td>
  <td>
    {#if criteria.components}
      <ul>
        {#each criteria.components as component}
          {#if component.adherence.level}
            <li>{@html catalogComponentLabel(component.name, "html")}{levelLabel(component.adherence.level)}</li>
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
          <li>{@html catalogComponentLabel(component.name, "html")}{component.adherence.notes}</li>
          {/if}
        {/each}
      </ul>
    {/if}
  </td>
</tr>
