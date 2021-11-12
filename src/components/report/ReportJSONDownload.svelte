<script>
  import { evaluation } from "../../stores/evaluation.js";

  $: jsonDownload = `data:application/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify($evaluation)
  )}`;
</script>

<a href={jsonDownload} download="report.json" class="button">
  Download Report (JSON)
</a>
