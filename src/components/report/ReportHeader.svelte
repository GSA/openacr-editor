<script>
  import { Link, navigate } from "svelte-navigator";
  import ReportHeaderKey from "./ReportHeaderKey.svelte";
  import ReportHeaderMultiValue from "./ReportHeaderMultiValue.svelte";
  import ReportHeaderValue from "./ReportHeaderValue.svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";

  const title = "Accessibility Conformance Report";
  $: nameProvided =
    $evaluation["product"] &&
    $evaluation["product"]["name"];
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
  {#if nameProvided}{$evaluation['product']['name']} {/if}
  {title}
</h1>

Based on {catalog.title}
<h2 id="name-of-product-version">
  <a href="#name-of-product-version" aria-hidden="true" class="header-anchor">#</a>
  Name of Product/Version
</h2>
{$evaluation["product"]['name']} {#if $evaluation['product']['version']} {$evaluation['product']['version']}{/if}
