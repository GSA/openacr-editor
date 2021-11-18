<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";

  $evaluation.title = $evaluation['product']['name'] + " " + $evaluation.title;

  $: yamlDownload = `data:application/yaml;charset=utf-8,${encodeURIComponent(
    yaml.dump($evaluation)
  )}`;
</script>

<a href={yamlDownload} download="{$evaluation['product']['name'].toLowerCase()}-{$evaluation['product']['version']}.yaml" class="button">
  Download Report (YAML)
</a>
