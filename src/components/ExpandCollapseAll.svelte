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
    let triggers = document.querySelectorAll("details summary");

    for (var i = 0, length = triggers.length; i < length; i++) {
      triggers[i].addEventListener("click", function() {
        setTimeout(setButtonStatus, 100);
      });
    }
  };

  onMount(() => {
    initButtonStatus();
    setButtonStatus();
  });
</script>

<div class="excol-all">
  <button
    class="expand button button-secondary button-small"
    disabled={!someCollapsed}
    on:click={expandAll}>
    + Expand All Sections
  </button>
  <button
    class="collapse button button-secondary button-small"
    disabled={!someExpanded}
    on:click={collapseAll}>
    − Collapse All Sections
  </button>
</div>
