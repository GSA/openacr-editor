<script>
    import chapterHelpText from "../data/chapterHelpText.yaml";
    export let chapterId;

    // Target only links <a> inside .chapter-help-text.
    function openAccordion() {
        const nonTextContentHeader = document.getElementById("1.1.1-editor");
        console.log(nonTextContentHeader);
        // if (nonTextContentHeader.parentElement.parentElement.nodeName === "DETAILS") {
        //     nonTextContentHeader.parentElement.parentElement.setAttribute("open", true);
        // }
    }
</script>

{#if chapterId === "success_criteria_level_a"}
    <p class="chapter-help-text">
        Provide information about Level A issues with your website or web application. Currently OpenACR only supports WCAG 2.0. The default is web-based, and there are optional fields for <a href="#1.1.1-electronic-docs-editor" on:click="{openAccordion()}">Documentation</a>, <a href="#1.1.1-authoring-tool-editor">Authoring</a> and <a href="#1.1.1-software-editor">Software</a>. Fill out as appropriate.
    </p>
{:else if chapterHelpText[chapterId]}
    <p class="chapter-help-text">{@html chapterHelpText[chapterId]}</p>
{/if}
