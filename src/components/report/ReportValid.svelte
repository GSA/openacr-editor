<script>
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";
  import { sanitizeMarkdown } from "../../utils/sanitizeMarkdown.js";

  const valid = validate($evaluation);
</script>

<style>
  div:focus {
    outline: none;
  }
</style>

<div class="validation">
  <HeaderWithAnchor id="validation" level=2>Validation</HeaderWithAnchor>

  {@html sanitizeMarkdown(valid.message)}
</div>
