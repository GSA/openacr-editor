<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import ExpandCollapseAll from "../components/ExpandCollapseAll.svelte";
  import Header from "../components/Header.svelte";
  import Pager from "../components/Pager.svelte";
  import PagerLink from "../components/PagerLink.svelte";
  import { currentPage } from "../stores/currentPage.js";
  import { terms } from '@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml';
  import vars from "../../config/__buildEnv__.json";

  onMount(() => {
    currentPage.update((currentPage) => "Overview");
  });
</script>

<svelte:head>
  <title>Overview | OpenACR Editor | GSA</title>
</svelte:head>

<Header>Overview</Header>

<p>
  This tool helps evaluators build Accessibility Conformance Reports in the OpenACR format.
  It guides you through the OpenACR requirements, lets you record your software's current
  conformance for each requirement, and generates a report.
</p>

<p>Tips for using this tool:</p>

<ul>
  <li>
    As you use the tool, the
    <Link to="report">Report</Link>
    page lists the success criteria that you have checked and not checked.
  </li>
  <li>
    You can export your report as HTML (web page), Markdown and as YAML (structured data).
  </li>
  <li>
    The tool saves information you enter locally in your browser for backup (not
    on our servers).
  </li>
  <li>
    You can format your evaluation with
    <a href="https://en.wikipedia.org/wiki/Markdown">Markdown</a>,
    so that you can use lists, links and code examples.
  </li>
</ul>

<ExpandCollapseAll />

<details>
  <summary>
    <h2>About OpenACR</h2>
  </summary>
  <p>
    To be added..
  </p>
  <p>
    For more information, see
    <a href="https://github.com/GSA/openacr">
      OpenACR
    </a>
  </p>
</details>

<details>
  <summary>
    <h2>Structure of this Tool</h2>
  </summary>
  <p>
    Following the structure of OpenACR, this tool takes you through 7
    <strong>tables/chapters</strong>. Each table/chapter has a number of
    <strong>criteria</strong>, which are further divided into
    <strong>components</strong>. For each, you can select
    a level and type in a note about conformance.
  </p>
  <p>
    A, AA, AAA is the
    <strong>WCAG 2.0</strong> standards.
  </p>
  <p>
    FPC, Hardware, Software, Docs is the
    <strong>Section 508</strong> standards.
  </p>
  <p>
    Links in this tool lead you to the relevant sections of the standards.
  </p>
</details>

<details>
  <summary>
    <h2>Result Choices</h2>
  </summary>
  <p>
    As you go through and enter conformance for your software, you will select a "term" for
    each component. Here is the legend of what those selections mean:
  </p>
  <dl>
    {#each terms as term}
      <dt>{term.label}</dt>
      <dd>{term.description}</dd>
    {/each}
  </dl>
</details>

<Pager label="Previous/Next Principle">
  <PagerLink to="/about" direction="next">About</PagerLink>
</Pager>
