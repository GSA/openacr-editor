<script>
  import { Router, Route } from "svelte-navigator";
  import Overview from "./routes/Overview.svelte";
  import About from "./routes/About.svelte";
  import YourReport from "./components/YourReport.svelte";
  import Report from "./routes/Report.svelte";
  import Acknowledgements from "./routes/Acknowledgements.svelte";
  import Principle from "./components/Principle.svelte";
  import Nav from "./components/Nav.svelte";
  import NavItem from "./components/NavItem.svelte";
  import { currentPage } from "./stores/currentPage.js";
  import { showYourReport } from "./stores/showYourReport.js";
  import atag from "./data/atag.js";
  import { chapters } from '@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml';
  import chapterNavs from "./data/chapterNavs";
  import vars from "../config/__buildEnv__.json";
  export let url = "";

  const pagesWithYourReport = ["Overview", "About", "Evaluation"];

  function needsYourReport(pageName) {
    return pagesWithYourReport.indexOf(pageName) > -1;
  }
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
    {#each chapters as chapter}
      <NavItem to="principle/{chapter.id}">
        {chapterNavs[chapter.id]}
        <span class="visuallyhidden">: {chapter.label}</span>
      </NavItem>
    {/each}
    <NavItem to="/report">Report</NavItem>
  </Nav>
  <section
    class="app-content"
    class:app-content--wide={!needsYourReport($currentPage) || !$showYourReport}
    aria-label="Main content">
    <Route path="/">
      <Overview />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/principle/:id" let:params>
      <Principle id={params.id - 1} />
    </Route>
    <Route path="/report">
      <Report />
    </Route>
    <Route path="/acknowledgements">
      <Acknowledgements />
    </Route>
  </section>
  {#if needsYourReport($currentPage)}
    <YourReport />
  {/if}
</Router>
