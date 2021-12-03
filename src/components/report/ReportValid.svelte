<script>
  import { evaluation } from "../../stores/evaluation.js";
  import { validate } from "../../utils/validate.js";
  import marked from "marked";

  const valid = validate($evaluation);
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
