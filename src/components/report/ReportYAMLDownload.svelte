<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";
  import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
  import { reportFilename } from "../../utils/reportFilename.js";

  const filename = reportFilename($evaluation);
  const valid = validateOpenACR($evaluation, "openacr-0.1.0.json");

  $: yamlDownload = `data:application/yaml;charset=utf-8,${encodeURIComponent(
    yaml.dump($evaluation)
  )}`;
</script>

{#if valid.result }
  <a href={yamlDownload} download="{filename}.yaml" class="button">
    Download Report (YAML)
  </a>
{/if}
