<script>
  import { evaluation } from "../../stores/evaluation.js";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

  $evaluation.title = $evaluation['product']['name'] + " Accessibility Conformance Report";
</script>

<style>
  .header-anchor {
    margin-left: -1em;
    visibility: hidden;
  }

  :hover > .header-anchor {
    visibility: visible;
  }
</style>


<h1>
  {$evaluation.title}
</h1>

Based on {catalog.title}
<h2 id="name-of-product-version">
  <a href="#name-of-product-version" aria-hidden="true" class="header-anchor">#</a>
  Name of Product/Version
</h2>
{$evaluation["product"]['name']} {#if $evaluation['product']['version']} {$evaluation['product']['version']}{/if}
