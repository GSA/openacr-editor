<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { sanitizeEvaluation } from "../../utils/sanitizeEvaluation.js";

  const filename = reportFilename($evaluation);
  const sanitizedEvaluation = sanitizeEvaluation($evaluation);
  const valid = validate(sanitizedEvaluation);

  $: yamlDownload = `data:application/yaml;charset=utf-8,${encodeURIComponent(
    yaml.dump(sanitizedEvaluation)
  )}`;
</script>

{#if valid.result }
  <a id="download-yaml" href={yamlDownload} download="{filename}.yaml" class="button button-secondary" style="text-align: center;">
    Download Report<br/>(YAML) .yaml
  </a>
{/if}
