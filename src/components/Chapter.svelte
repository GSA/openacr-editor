<script>
  import { onMount } from "svelte";
  import { useLocation } from "svelte-navigator";
  import Header from "./Header.svelte";
  import Pager from "./Pager.svelte";
  import PagerLink from "./PagerLink.svelte";
  import { currentPage } from "../stores/currentPage.js";
  import { honourFragmentIdLinks } from "../utils/honourFragmentIdLinks.js";
  import { chapters } from '@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml';
  import chapterNavs from "../data/chapterNavs";

  export let chapterId = null;
  export let className = undefined;

  const location = useLocation();
  $: currentChapter = chapters.find( ({ id }) => id === chapterId);
  $: currentChapterKey = chapters.findIndex( ({ id }) => id === chapterId)

  onMount(() => {
    currentPage.update(currentPage => "Evaluation");

    honourFragmentIdLinks($location);
  });
</script>

<svelte:head>
  <title>{currentChapter.label} | OpenACR Editor | GSA</title>
</svelte:head>

<div class={className}>
  <Header>{currentChapter.label}</Header>

  <Pager label="Previous/Next Chapter">
    {#if chapterId === "success_criteria_level_a"}
      <PagerLink to={'/about'} direction="previous">About</PagerLink>
    {/if}
    {#if currentChapterKey > 0}
      <PagerLink to={`/chapter/${chapters[currentChapterKey - 1].id}`} direction="previous">
        {chapterNavs[chapters[currentChapterKey - 1].id]}
      </PagerLink>
    {/if}
    {#if currentChapterKey + 1 < chapters.length}
      <PagerLink to={`/chapter/${chapters[currentChapterKey + 1].id}`} direction="next">
        {chapterNavs[chapters[currentChapterKey + 1].id]}
      </PagerLink>
    {/if}
    {#if currentChapterKey + 1 === chapters.length}
      <PagerLink to={'/report'} direction="next">View report</PagerLink>
    {/if}
  </Pager>
</div>
