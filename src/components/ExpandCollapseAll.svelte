<script>
  import { onMount } from "svelte";

  let someCollapsed, someExpanded;

  let expandAll = function() {
    Array.from(document.querySelectorAll("details")).forEach(excol => {
      excol.setAttribute("open", "");
    });
    setButtonStatus();
  };

  let collapseAll = function() {
    Array.from(document.querySelectorAll("details")).forEach(excol => {
      excol.removeAttribute("open", "");
    });
    setButtonStatus();
  };

  let setButtonStatus = function() {
    someCollapsed = document.querySelectorAll("details:not([open])").length > 0;
    someExpanded = document.querySelectorAll("details[open]").length > 0;
  };

  let initButtonStatus = function() {
    let details = document.querySelectorAll("details");

    for (var i = 0, length = details.length; i < length; i++) {
      details[i].addEventListener("toggle", function() {
        setTimeout(setButtonStatus, 100);
      });
    }
  };

  onMount(() => {
    initButtonStatus();
    setButtonStatus();
  });
</script>

<style>
	.usa-button--outline{
	box-shadow: inset 0 0 0 2px #162e51;
	color: #162e51;
	}
</style>

<div class="excol-all">
  <button
    class="usa-button usa-button--outline border-0 bg-white margin-top-1 font-sans-3xs"
    disabled={!someCollapsed}
    on:click={expandAll}>
    + Expand All Sections
  </button>
  <button
    class="usa-button usa-button--outline border-0 bg-white margin-top-1 font-sans-3xs"
    disabled={!someExpanded}
    on:click={collapseAll}>
    − Collapse All Sections
  </button>
</div>
