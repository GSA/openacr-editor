<script>
    import chapterHelpText from "../data/chapterHelpText.yaml";
    export let chapterId;
</script>

{#if chapterHelpText[chapterId]}
    <p class="chapter-help-text">{@html chapterHelpText[chapterId]}</p>
{/if}
