<script>
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";
  import ExpandCollapseAll from "../components/ExpandCollapseAll.svelte";
  import Header from "../components/Header.svelte";
  import Pager from "../components/Pager.svelte";
  import PagerLink from "../components/PagerLink.svelte";
  import { currentPage } from "../stores/currentPage.js";
  import HeaderWithAnchor from "../components/HeaderWithAnchor.svelte";
  import { honourFragmentIdLinks } from "../utils/honourFragmentIdLinks.js";
  import { evaluation } from "../stores/evaluation.js";
  import { getCatalog } from "../utils/getCatalogs.js";

  const location = useLocation();
  let catalog = getCatalog($evaluation.catalog);

  onMount(() => {
    currentPage.update((currentPage) => "Overview");

    honourFragmentIdLinks($location);
  });
</script>

<svelte:head>
  <title>Overview | OpenACR Editor | GSA</title>
</svelte:head>

<Header>Overview</Header>

<p>
  This web editor helps evaluators build Accessibility Conformance Reports in the <a href="https://github.com/gsa/openacr" target="_blank">OpenACR format<span class="visuallyhidden"> (opens in a new window or tab)</span></a>.
  It is designed to help accessibility subject matter experts create machine-readable OpenACR documents. Authors will be guided in creating an
  accessible report for the digital product or service that they are documenting. Conformance for each requirement can be documented as required
  to generate a Section 508 report.
</p>

<p>Tips for using this tool:</p>

<ul>
  <li>
    This editor saves the information you enter locally in your browser (not on our servers). To save or share your OpenACR report, you will
    need to save it to your computer. You will need the YAML file to submit your OpenACR and to edit this report in the future.
  </li>
  <li>
    As you use the editor, the
    <Link to="report">Report</Link>
    page lists the success criteria that you have checked and not checked.
  </li>
  <li>
    You can export your report as YAML (structured data) but also as HTML (web page). Note: You will not be able
    to edit the report the future without the YAML file.
  </li>
  <li>
    You can add limited formatting to your report with <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank">Markdown<span class="visuallyhidden"> (opens in a new window or tab)</span></a>. This allows you to add
    lists, links and code examples.
  </li>
</ul>

<ExpandCollapseAll />

<details>
  <summary>
    <HeaderWithAnchor id="about-openacr" level=2>About OpenACR</HeaderWithAnchor>
  </summary>
  <p>
    OpenACR is a digital native Accessibility Conformance Report (ACR). The initial development is based on Section 508 requirements.
    There are many advantages in moving to a machine-readable format, but one of the biggest is that it allows accessibility claims of
    digital products and services to be compared. Moving to a highligh structured, self-validated document format will make this much simpler.
  </p>
  <p>
    Many organizations face challenges in delivering accessible services to people with disabilities. Software vendors currently submit
    ACRs for their offerings. These ACRs document conformance of these products and services. These claims are generally provided in a PDF
    format which is often inaccessible, not consistently structured, and difficult to search. A modern ACR will be validated to see it
    matches a baseline format.
  </p>
  <p>
    Responsible organizations both review vendor conformance claims and do independent testing. Documenting these findings in a consistent format
    will make it easier to provide feedback to vendors. Comparisons will make it easier to update reports.
  </p>
  <p>
    For more information, see <a href="https://github.com/GSA/openacr" target="_blank">OpenACR<span class="visuallyhidden"> (opens in a new window or tab)</span></a>.
  </p>
</details>

<details>
  <summary>
    <HeaderWithAnchor id="structure-of-this-tool" level=2>Structure of this tool</HeaderWithAnchor>
  </summary>
  <p>
    Following the structure of OpenACR, this tool takes you through 7
    <strong>tables/chapters</strong>. Each table/chapter has a number of
    <strong>criteria</strong>, which are further divided into
    <strong>components</strong>. For each, you can select
    a level and type in a note about conformance.
  </p>
  <p>
    A, AA, AAA are for the <strong>WCAG 2</strong> guidelines.
  </p>
  <p>
    FPC, Hardware, Software, Docs is the <strong>Section 508</strong> standards.
  </p>
  <p>
    Links in this editor will open a new window that lead you to the relevant sections of the guidelines.
  </p>
</details>

<details>
  <summary>
    <HeaderWithAnchor id="terms" level=2>Terms</HeaderWithAnchor>
  </summary>
  <p>
    As you go through and enter conformance for your software, you will select a "term" for
    each component. Here is the legend of what those selections mean:
  </p>
  <dl>
    {#each catalog.terms as term}
      <dt>{term.label}</dt>
      <dd>{term.description}</dd>
    {/each}
  </dl>
</details>

<Pager label="Previous/Next Principle">
  <PagerLink to="/about" direction="next">About</PagerLink>
</Pager>
