<script>
  import { Link, navigate } from "svelte-navigator";
  import ReportHeaderKey from "./ReportHeaderKey.svelte";
  import ReportHeaderMultiValue from "./ReportHeaderMultiValue.svelte";
  import ReportHeaderValue from "./ReportHeaderValue.svelte";
  import { evaluation } from "../../stores/evaluation.js";

  let editing = false;
  let section;

  function toggleEdit() {
    editing = !editing;
    section.focus();
  }
</script>

<style>
  .report-header {
    display: flex;
  }
  div:focus {
    outline: none;
  }
  dt {
    grid-column: 1 / 2;
    margin-top: 0;
    font-weight: normal;
  }
  dt:after {
    content: ":";
  }
  dd {
    font-weight: bold;
    margin-left: 0;
    margin-bottom: 1em;
    grid-column: 2 / 3;
  }
  @media (min-width: 40em) {
    dl {
      display: grid;
      grid-template-columns: auto 2fr;
      gap: 0.5em 1em;
    }
    dd {
      margin-bottom: 0;
    }
  }
</style>

<div tabindex="-1" bind:this={section}>
  <h2 class="report-header">About the Evaluation</h2>
  <dl>
    <dt><ReportHeaderKey {editing} field="name">Tool Name</ReportHeaderKey></dt>
    <dd><ReportHeaderValue {editing} field="name" /></dd>
    <dt><ReportHeaderKey {editing} field="website">Website</ReportHeaderKey></dt>
    <dd><ReportHeaderValue {editing} field="website" /></dd>
    <dt><ReportHeaderKey {editing} field="conformanceTarget">Conformance Target</ReportHeaderKey></dt>
    <dd>
      <ReportHeaderMultiValue {editing} field="conformanceTarget">
        <option value="A">Level A</option>
        <option value="AA">Level AA</option>
        <option value="AAA">Level AAA</option>
      </ReportHeaderMultiValue>
    </dd>
    <dt><ReportHeaderKey {editing} field="evaluationId">Report Identifier</ReportHeaderKey></dt>
    <dd><ReportHeaderValue {editing} field="evaluationId" /></dd>
    <dt><ReportHeaderKey {editing} field="evaluatorName">Evaluator</ReportHeaderKey></dt>
    <dd><ReportHeaderValue {editing} field="evaluatorName" /></dd>
    <dt><ReportHeaderKey {editing} field="evaluatorOrg">Organization</ReportHeaderKey></dt>
    <dd><ReportHeaderValue {editing} field="evaluatorOrg" /></dd>
  </dl>
  {#if editing}
    <button type="button" class="button button-secondary" on:click={toggleEdit}>
      Save
      <span class="visuallyhidden">general info</span>
    </button>
  {:else}
    <button type="button" class="button button-secondary" on:click={toggleEdit}>
      Edit
      <span class="visuallyhidden">general info</span>
    </button>
  {/if}
</div>
