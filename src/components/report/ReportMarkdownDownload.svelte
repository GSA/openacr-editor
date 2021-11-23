<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";
  import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
  import { outputOpenACR } from "@openacr/openacr/src/outputOpenACR.ts";

  $evaluation.title = $evaluation['product']['name'] + " Accessibility Conformance Report";

  var reportFilename = "report";
  if ($evaluation['product']['name']) {
    reportFilename = $evaluation['product']['name'].toLowerCase();
  }
  if ($evaluation['product']['version']) {
    reportFilename += "-" + $evaluation['product']['version'];
  }

  const valid = validateOpenACR($evaluation, "openacr-0.1.0.json");

  const markdown = outputOpenACR($evaluation, '@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml', reportFilename + '.markdown');
  console.log(markdown);

  $: mdDownload = `data:text/markdown;charset=utf-8,${encodeURIComponent(
    yaml.dump($evaluation)
  )}`;
</script>

{#if valid.result }
  <a href={mdDownload} download="{reportFilename}.markdown" class="button">
    Download Report (Markdown)
  </a>
{/if}
