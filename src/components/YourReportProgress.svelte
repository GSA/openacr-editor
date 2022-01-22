<script>
  import ProgressBar from "./ProgressBar.svelte";
  import vars from "../../config/__buildEnv__.json";

  export let chapter;
  export let done;
  export let total;

  $: percentage = 100 / (total / done);
</script>

<style>
  .progress {
    margin-bottom: 1em;
    list-style: none;
  }
  .principle__name {
    color: var(--off-black);
    font-weight: bold;
    text-decoration: none;
  }
  .principle__name:hover span {
    text-decoration: underline;
  }
  .progress__principle {
    display: flex;
    align-items: center;
    margin-bottom: 0.125em;
  }
  .progress__part {
    font-size: 0.65em;
    margin-left: auto;
  }
</style>

<li class="progress">
  <div class="progress__principle">
    <a href={`${vars.pathPrefix}/chapter/${chapter.id}`} class="principle__name">
      <span>{chapter.short_label}</span>
    </a>
    <span class="progress__part">{done} of {total}</span>
  </div>
  <ProgressBar {percentage} />
</li>
