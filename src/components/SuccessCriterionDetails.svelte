<script>
  export let type = null;
  export let details = null;
</script>

<style>
  ol li {
    list-style: lower-alpha;
  }
  details {
    margin-bottom: 2em;
  }
  summary h4 {
    font-size: 100%;
  }
</style>

{#if type === 'list'}
  {#each details as list}
    {#if list.type === 'ulist'}
      <ul>
        {#each list.items as listitem}
          <li>
            <b>{listitem.handle}</b>
            : {listitem.text}
          </li>
        {/each}
      </ul>
    {/if}
    {#if list.type === 'olist'}
      <ol>
        {#each list.items as listitem}
          <li>
            <b>{listitem.handle}</b>
            : {listitem.text}
          </li>
        {/each}
      </ol>
    {/if}
  {/each}
{:else if type === 'notes'}
  <details>
    <summary>
      <h4>Notes</h4>
    </summary>
    {#each details as item}
      {#if item.type === 'note'}
        <p>
          <small>
            <em>{item.handle}</em>
            : {item.text}
          </small>
        </p>
      {/if}
    {/each}
  </details>
{/if}
