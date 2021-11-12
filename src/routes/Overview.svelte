<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import ExpandCollapseAll from "../components/ExpandCollapseAll.svelte";
  import Header from "../components/Header.svelte";
  import Pager from "../components/Pager.svelte";
  import PagerLink from "../components/PagerLink.svelte";
  import { currentPage } from "../stores/currentPage.js";
  import vars from "../../config/__buildEnv__.json";

  onMount(() => {
    currentPage.update((currentPage) => "Overview");
  });
</script>

<svelte:head>
  <title>Overview | ATAG Report Tool | W3C WAI</title>
</svelte:head>

<Header>Overview</Header>

<p>
  This tool helps evaluators report on the accessibility of authoring tools. It
  guides you through the Authoring Tool Accessibility Guidelines (ATAG)
  requirements, lets you record your evaluation results for each requirement,
  and generates a report of the authoring tool's ATAG conformance.
</p>

<p>Tips for using this tool:</p>

<ul>
  <li>
    As you use the tool, the
    <Link to="report">Report</Link>
    page lists the success criteria that you have checked and not checked.
  </li>
  <li>
    You can export your report as HTML (web page) and as JSON (structured data).
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
    <h2>About Authoring Tools and ATAG</h2>
  </summary>
  <p>
    Authoring tools are software and services used to create web content,
    including content management systems (CMS); what-you-see-is-what-you-get
    (WYSIWYG) HTML editors; websites that let users add content, such as blogs
    and wikis.
  </p>
  <p>
    Authoring Tool Accessibility Guidelines (ATAG) explains how to make the
    authoring tools themselves accessible and how to help authors create more
    accessible web content.
  </p>
  <p>
    For more information, see the
    <a href="https://www.w3.org/WAI/standards-guidelines/atag/">
      Authoring Tool Accessibility Guidelines (ATAG) Overview
    </a>
  </p>
</details>

<details>
  <summary>
    <h2>Structure of this Tool</h2>
  </summary>
  <p>
    Following the structure of ATAG, this tool takes you through eight
    <strong>Principles</strong>. Each principle has a number of
    <strong>Guidelines</strong>, which are further divided into
    <strong>Success Criteria</strong>. For each, you can select
    a result and note down any observations. Results include "Not checked",
    "Passed", "Failed", "Not applicable", and "Cannot tell".
  </p>
  <p>
    Part A (Principles A.1 to A.4) is related to the
    <strong>editing experience</strong> with the authoring tool.
    It helps ensure that content can be created by people with disabilities.
  </p>
  <p>
    Part B (Principles B.1 to B.4) is about the
    <strong>output</strong>
    of the authoring tool. It helps ensure that content editors can create
    accessible content, and are encouraged to do so.
  </p>
  <p>
    More information on each ATAG Success Criterion is in
    <a href="https://www.w3.org/TR/IMPLEMENTING-ATAG20/" target="_blank">
      Implementing ATAG 2.0
    </a>. Links in this tool lead you to the relevant sections of the
    "Implementing" document.
  </p>
</details>

<details>
  <summary>
    <h2>Result Choices</h2>
  </summary>
  <p>
    As you go through and evaluate your tool, you will select a "result" for
    each criterion. Here is the legend of what those selections mean:
  </p>
  <dl>
    <dt>Not checked</dt>
    <dd>You did not check this success criterion.</dd>
    <dt>Pass</dt>
    <dd>This success criterion is met.</dd>
    <dt>Failed</dt>
    <dd>This success criterion is not met.</dd>
    <dt>Not applicable</dt>
    <dd>
      This success criterion relates to a feature the authoring tool does not
      have, it does not apply.
    </dd>
    <dt>Cannot tell</dt>
    <dd>It is unclear whether the success criterion is met.</dd>
  </dl>
</details>

<Pager label="Previous/Next Principle">
  <PagerLink to="/about" direction="next">About</PagerLink>
</Pager>
