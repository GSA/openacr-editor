<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import FocusHeader from "../components/FocusHeader.svelte";
  import { currentPage } from "../stores/currentPage.js";

  onMount(() => {
    currentPage.update(currentPage => "Acknowledgements");
  });
</script>

<svelte:head>
  <title>Acknowledgements| OpenACR Editor | GSA</title>
</svelte:head>

<Header>Acknowledgements</Header>

<p>
  The OpenACR Editor was developed by <a href="https://civicactions.com/">CivicActions</a> and <a href="https://www.gsa.gov/">U.S. General Services Administration (GSA)</a>
</p>

<FocusHeader id="project-team" level=2>Project Team</FocusHeader>
<ul>
  <li><strong>GSA</strong>: Syed Azeem, Karl Hebenstreit, Joseph Novak, Charles Popelka, Richard Speidel, Sean Zerges.</li>
  <li><strong>CivicActions</strong>: Owen Barton, Danita Delce, Mike Gifford, Marlena Medford, Daniel Mundra, Farooq Zakhilwal.</li>
</ul>

<FocusHeader id="major-contributors" level=2>Major Contributors</FocusHeader>
