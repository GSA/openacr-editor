<script>
  import { evaluation } from "../../stores/evaluation.js";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

  $evaluation.title = $evaluation['product']['name'] + " Accessibility Conformance Report";

  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

<h1>
  {$evaluation.title}
</h1>

Based on {catalog.title}
<h2 id="name-of-product-version{extraId}">
  <a href="#name-of-product-version{extraId}" aria-hidden="true" class="header-anchor">#</a>
  Name of Product/Version
</h2>
{$evaluation["product"]['name']} {#if $evaluation['product']['version']} {$evaluation['product']['version']}{/if}
