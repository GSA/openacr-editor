<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { validateOpenACR } from "@openacr/openacr/src/validateOpenACR.ts";
  import marked from "marked";

  const valid = validateOpenACR($evaluation, "openacr-0.1.0.json");

</script>

<style>
  h2 {
    display: flex;
  }
  div:focus {
    outline: none;
  }
</style>

<div>
  <h2>Validation</h2>

  <p>{@html marked(valid.message)}</p>
</div>
