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
	import 'uswds.css'

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
  .div{
	display: block;
    padding: 32px;
    background-image: linear-gradient(#d0e1f1 0, #d0e1f1 48px, #fff 48px);
  }
  .padding{
	padding-left: 8.5rem;
	padding-right:8.5rem;
  }  
  .wide{
  }

</style>



<Router {url} basepath={vars.pathPrefix}>
	<header id="site-header" class="usa-header usa-header--extended" role="banner" style="background-color:#162e51">
		<div class="usa-navbar display-flex" style="display:flex !important;height:50px">
			<div class="grid-col-11 margin-top-05">
				<a href="/"><span class="tool-header-name desktop:margin-left-neg-105">OpenACR Editor</span></a>
			</div>
			<div class="grid-col-1 margin-left-15 margin-top-1">
				<a href="https://www.gsa.gov/">
					<img alt="GSA" src="/images/gsa.png" width="32" height="32"/>
				</a>
			</div>
		</div>
		
	<div class="div">
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
	</div>
	</header>
	<div class="grid-container font-sans-sm line-height-sans-5 padding-left-2">
		<div class="grid-row">
			<div class="desktop:grid-col-9 usa-prose" class:wide={!needsYourReport($currentPage) || !$showYourReport}>
				<section id="content" class="usa-graphic_list usa-section clearfix padding-y-2 padding-right-2" aria-label="Main content">
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
			</div>
			<aside class="desktop:grid-col-fill margin-top-4 padding-right-4">
				{#if needsYourReport($currentPage)}
					<YourReport />
				{/if}
			</aside>
		</div>
	</div>
	
</Router>
