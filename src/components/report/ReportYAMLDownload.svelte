<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";

  $evaluation.title = $evaluation['product']['name'] + " " + $evaluation.title;

  var reportFilename = "report";
  if ($evaluation['product']['name']) {
    reportFilename = $evaluation['product']['name'].toLowerCase();
  }
  if ($evaluation['product']['version']) {
    reportFilename += "-" + $evaluation['product']['version'];
  }

  $: yamlDownload = `data:application/yaml;charset=utf-8,${encodeURIComponent(
    yaml.dump($evaluation)
  )}`;
</script>

<a href={yamlDownload} download="{reportFilename}.yaml" class="button">
  Download Report (YAML)
</a>
