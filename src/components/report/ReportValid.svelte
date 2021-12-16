<script>
  import FocusHeader from "../FocusHeader.svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";
  import marked from "marked";

  const valid = validate($evaluation);
</script>

<style>
  div:focus {
    outline: none;
  }
</style>

<div>
  <FocusHeader id="validation" level=2>Validation</FocusHeader>

  <p>{@html marked(valid.message)}</p>
</div>
