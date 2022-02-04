<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";
  import { license } from "../../utils/license.js";
  import sanitizeHtml from "sanitize-html";

  let licenseOutput;
  const valid = validate($evaluation);

  if (valid.result) {
    licenseOutput = license($evaluation, "html");
  }
</script>

{#if licenseOutput}
This content is licensed under a {@html sanitizeHtml(licenseOutput)}.
{/if}
