<script>
  import { evaluation } from "../../stores/evaluation.js";
  import yaml from "js-yaml";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
  import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";

  $evaluation.title = $evaluation['product']['name'] + " Accessibility Conformance Report";

  var reportFilename = "report";
  if ($evaluation['product']['name']) {
    reportFilename = $evaluation['product']['name'].toLowerCase();
  }
  if ($evaluation['product']['version']) {
    reportFilename += "-" + $evaluation['product']['version'];
  }

  const valid = validateOpenACR($evaluation, "openacr-0.1.0.json");

  // const markdown = createOutput({}, {}, 'markdown', '# {{title}}');
  // console.log(markdown);
  console.log(catalog);

  $: mdDownload = `data:text/markdown;charset=utf-8,${encodeURIComponent(
    yaml.dump($evaluation)
  )}`;
</script>

{#if valid.result }
  <a href={mdDownload} download="{reportFilename}.markdown" class="button">
    Download Report (Markdown)
  </a>
{/if}
