<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
  import { reportFilename } from "../../utils/reportFilename.js";

  const filename = reportFilename($evaluation);
  const valid = validateOpenACR($evaluation, "openacr-0.1.0.json");

  const markdown = `# ${$evaluation.title}`;

  $: mdDownload = `data:text/markdown;charset=utf-8,${encodeURIComponent(
    markdown
  )}`;
</script>

{#if valid.result }
  <a href={mdDownload} download="{filename}.markdown" class="button">
    Download Report (Markdown)
  </a>
{/if}
