<script>
  import helpText from "../data/helpText.yaml";

  export let type;
  export let field;
</script>

{#if helpText[type] && helpText[type][field]}
  <div class="help-text">
    {helpText[type][field]}
  </div>
{/if}

<style>
  .help-text {
    color: #868686;
    font-style: italic;
    font-size: 0.85em;
  }
</style>
