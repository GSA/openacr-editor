<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import { currentPage } from "../stores/currentPage.js";

  onMount(() => {
    currentPage.update(currentPage => "Glossary");
  });
</script>

<svelte:head>
  <title>Glossary| OpenACR Editor | GSA</title>
</svelte:head>

<Header>Glossary</Header>

<p>
  A glossary of terms.
</p>
