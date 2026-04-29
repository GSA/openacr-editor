<script>
  import { onMount } from "svelte";
  import Overview from "./routes/Overview.svelte";
  import About from "./routes/About.svelte";
  import YourReport from "./components/YourReport.svelte";
  import Report from "./routes/Report.svelte";
  import Acknowledgements from "./routes/Acknowledgements.svelte";
  import Glossary from "./routes/Glossary.svelte";
  import Chapter from "./components/Chapter.svelte";
  import Nav from "./components/Nav.svelte";
  import NavItem from "./components/NavItem.svelte";
  import { currentPage } from "./stores/currentPage.js";
  import { showYourReport } from "./stores/showYourReport.js";
  import { evaluation } from "./stores/evaluation.js";
  import { getCatalog } from "./utils/getCatalogs.js";
  import { location } from "./lib/router.js";

  const pagesWithYourReport = ["Overview", "About", "Evaluation"];

  function needsYourReport(pageName) {
    return pagesWithYourReport.indexOf(pageName) > -1;
  }

  onMount(() => {
    window.addEventListener("input", setInteracted);
  });

  function setInteracted(e) {
    if (e.target.type != "file") {
      window.removeEventListener("input", setInteracted);
      //window.onbeforeunload = closeEditorWarning;
    }
  }

  function closeEditorWarning() {
    return "Are you sure?";
  }

  function matchChapter(pathname) {
    const match = pathname.match(/^\/chapter\/([^/]+)$/);

    if (!match) {
      return null;
    }

    return {
      chapterId: decodeURIComponent(match[1]),
    };
  }

  $: catalog = getCatalog($evaluation.catalog);
  $: chapterMatch = matchChapter($location.pathname);
</script>

<Nav>
  <NavItem to="/">Overview</NavItem>
  <NavItem to="/about">About</NavItem>
  {#each catalog.chapters as chapter}
    <NavItem to={`/chapter/${chapter.id}`}>
      {chapter.short_label}
      <span class="visuallyhidden">: {chapter.label}</span>
    </NavItem>
  {/each}
  <NavItem to="/report">Report</NavItem>
  <NavItem to="/glossary">Glossary</NavItem>
  <NavItem to="/acknowledgements">Acknowledgements</NavItem>
</Nav>
<section
  id="content"
  class="app-content"
  class:app-content--wide={!needsYourReport($currentPage) || !$showYourReport}
  aria-label="Main content"
>
  {#if $location.pathname === "/"}
    <Overview />
  {:else if $location.pathname === "/about"}
    <About />
  {:else if chapterMatch}
    <Chapter chapterId={chapterMatch.chapterId} />
  {:else if $location.pathname === "/report"}
    <Report />
  {:else if $location.pathname === "/acknowledgements"}
    <Acknowledgements />
  {:else if $location.pathname === "/glossary"}
    <Glossary />
  {:else}
    <Overview />
  {/if}
</section>
{#if needsYourReport($currentPage)}
  <YourReport />
{/if}

<style>
  .app-content {
    -ms-grid-column: 2;
    -ms-grid-column-span: 6;
    grid-column: 2 / span 6;
    -ms-grid-row: 2;
    -ms-grid-row-span: 2;
    grid-row-start: 2;
  }
  .app-content--wide {
    -ms-grid-column-span: 8;
    grid-column: 2 / span 8;
  }
</style>
