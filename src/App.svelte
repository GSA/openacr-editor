<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-navigator";
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
  import vars from "../config/__buildEnv__.json";
  export let url = "";

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
      window.onbeforeunload = closeEditorWarning;
    }
  }

  function closeEditorWarning() {
    return 'Are you sure?';
  }
  $: catalog = getCatalog($evaluation.catalog);
</script>

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

<Router {url} basepath={vars.pathPrefix}>
  <Nav>
    <NavItem to="/">Overview</NavItem>
    <NavItem to="/about">About</NavItem>
    {#each catalog.chapters as chapter}
      <NavItem to="chapter/{chapter.id}">
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
    aria-label="Main content">
    <Route path="/">
      <Overview />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/chapter/:chapterId" let:params>
      <Chapter chapterId={params.chapterId} />
    </Route>
    <Route path="/report">
      <Report />
    </Route>
    <Route path="/acknowledgements">
      <Acknowledgements />
    </Route>
    <Route path="/glossary">
      <Glossary />
    </Route>
  </section>
  {#if needsYourReport($currentPage)}
    <YourReport />
  {/if}
</Router>
