<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";

  const filename = reportFilename($evaluation);
  const valid = validate($evaluation);

  $: yamlDownload = `data:application/yaml;charset=utf-8,${encodeURIComponent(
    yaml.dump($evaluation)
  )}`;
</script>

{#if valid.result }
  <a href={yamlDownload} download="{filename}.yaml" class="button button-secondary" style="text-align: center;">
    Download Report<br/>(YAML) .yaml
  </a>
{/if}
