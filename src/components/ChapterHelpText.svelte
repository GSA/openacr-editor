<script>
    import chapterHelpText from "../data/chapterHelpText.yaml";
    export let chapterId;
</script>

{#if chapterHelpText[chapterId]}
    <p>{chapterHelpText[chapterId]}</p>
{/if}
