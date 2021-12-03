<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  const filename = reportFilename($evaluation);
  const valid = validate($evaluation);

  $: jsonDownload = `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify($evaluation)
  )}`;
</script>

{#if valid.result }
  <a href={jsonDownload} download="{filename}.json" class="button">
    Download Report (JSON)
  </a>
{/if}
