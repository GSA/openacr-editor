<script>
  import { link } from "svelte-navigator";
  export let chapterId;

  function openFirstAccordion() {
    const firstAccordion = document.querySelector("details");
    firstAccordion.setAttribute("open", "");
  }
</script>

{#if chapterId}
  <p class="chapter-help-text">
    {#if chapterId === "about"}
      Fill out general information about your product or service. Please provide
      as much detail as possible. By describing your product, the webform will
      update to show only the sections you need to fill out. If you need to
      change this later, change your response product information questions.
    {:else if chapterId === "success_criteria_level_a"}
      Provide information about Level A issues with your website or web
      application. Currently OpenACR only supports WCAG 2.0. The default is
      web-based, and there are optional fields for <a
        href="#1.1.1-electronic-docs-editor"
        on:click={() => openFirstAccordion()}>Documentation</a
      >,
      <a href="#1.1.1-software-editor" on:click={() => openFirstAccordion()}
        >Software</a
      >
      and
      <a
        href="#1.1.1-authoring-tool-editor"
        on:click={() => openFirstAccordion()}>Authoring</a
      >. Fill out as appropriate.
    {:else if chapterId === "success_criteria_level_aa"}
      Provide information about how your website or web application fails to
      meet Level AA requirements. Currently OpenACR only supports WCAG 2.0. The
      default is web-based, and there are optional fields for <a
        href="#1.2.4-electronic-docs-editor"
        on:click={() => openFirstAccordion()}>Documentation</a
      >,
      <a href="#1.2.4-software-editor" on:click={() => openFirstAccordion()}
        >Software</a
      >
      and
      <a
        href="#1.2.4-authoring-tool-editor"
        on:click={() => openFirstAccordion()}>Authoring</a
      >. Fill out as appropriate.
    {:else if chapterId === "success_criteria_level_aaa"}
      This section is optional. Consider providing information about Level AAA
      support in your website or web application. WCAG Level AAA reflect
      accessibility features that exceed the minimum requirements of Section
      508. It is useful to describe how your product or service exceeds Level AA
      requirements. Additionally, some end-users and some projects may need
      specific AAA requirements to be meet.
    {:else if chapterId === "functional_performance_criteria"}
      Describe barriers here if they are not covered in other sections.
      Highlight the impact on different types of disabilities. Optionally, this
      section may be used to summarize accessibility features described in more
      detail elsewhere.
    {:else if chapterId === "hardware"}
      If the Information and Communications Technology (ICT) includes hardware,
      please fill out this section.
    {:else if chapterId === "software"}
      If your software product is a web application or is rendered through a web
      browser, do not fill out this section. Fill out <a
        href="success_criteria_level_a"
        use:link>Tables 1, 2, and 3</a
      >. Fill out this section if your software product is not web-based.
      Desktop applications are a common example of software which is not
      web-based. Software which uses internet communication but is not used via
      a third-party web browser (e.g., Chrome, Edge, Safari), is not web-based
      software.
    {:else if chapterId === "support_documentation_and_services"}
      If the support documentation for your product is not web-based (e.g., MS
      Word, OpenOffice or PDF files), fill out this section.
    {/if}
  </p>
{/if}
