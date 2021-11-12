<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import Pager from "../components/Pager.svelte";
  import PagerLink from "../components/PagerLink.svelte";
  import { evaluation } from "../stores/evaluation.js";
  import { currentPage } from "../stores/currentPage.js";

  onMount(() => {
    currentPage.update(currentPage => "About");
  });
</script>

<svelte:head>
  <title>About | ATAG Report Tool | W3C WAI</title>
</svelte:head>

<Header>About</Header>

<h2>Authoring Tool</h2>

<div class="field">
  <label for="evaluation-meta-name">Name of tool</label>
  <input
    type="text"
    bind:value={$evaluation['meta']['name']['value']}
    id="evaluation-meta-name"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-meta-website">Website (URL)</label>
  <input
    type="url"
    bind:value={$evaluation['meta']['website']['value']}
    id="evaluation-meta-website"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<h2>Report</h2>

<div class="field">
  <label for="evaluation-meta-conformance-target">Conformance Target</label>
  <select
    name="evaluation-meta-conformance-target"
    id="evaluation-meta-conformance-target"
    bind:value={$evaluation['meta']['conformanceTarget']['value']}
    on:blur={() => {
      evaluation.updateCache($evaluation);
    }}>
    <option value="A">Level A</option>
    <option value="AA">Level AA</option>
    <option value="AAA">Level AAA</option>
  </select>
</div>

<div class="field">
  <label for="evaluation-meta-eval-id">
    Report Identifier (date, internal version number, or other)
  </label>
  <input
    type="text"
    bind:value={$evaluation['meta']['evaluationId']['value']}
    id="evaluation-meta-eval-id"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-meta-executive-summary">Executive Summary</label>
  <textarea
    bind:value={$evaluation['meta']['executiveSummary']['value']}
    id="evaluation-meta-executive-summary"
    on:change={() => evaluation.updateCache($evaluation)} />
</div>

<h2>Evaluator</h2>

<div class="field">
  <label for="evaluation-meta-your-name">Name of Evaluator</label>
  <input
    type="text"
    bind:value={$evaluation['meta']['evaluatorName']['value']}
    id="evaluation-meta-your-name"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<div class="field">
  <label for="evaluation-meta-org-name">Organization of Evaluator</label>
  <input
    type="text"
    bind:value={$evaluation['meta']['evaluatorOrg']['value']}
    id="evaluation-meta-org-name"
    on:blur={() => evaluation.updateCache($evaluation)} />
</div>

<Pager label="Previous/Next Principle">
  <PagerLink to="/" direction="previous">Overview</PagerLink>
  <PagerLink to="/principle/1" direction="next">A.1</PagerLink>
</Pager>
