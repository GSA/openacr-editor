<script>
  import ProgressBar from "./ProgressBar.svelte";
  import { href, link } from "../lib/router.js";

  export let chapter;
  export let done;
  export let total;

  $: percentage = 100 / (total / done);
  $: chapterHref = href(`/chapter/${chapter.id}`);
</script>

<li class="progress">
  <div class="progress__principle">
    <a href={chapterHref} use:link class="principle__name">
      <span>{chapter.short_label}</span>
    </a>
    <span class="progress__part">{done} of {total}</span>
  </div>
  <ProgressBar {percentage} />
</li>

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
