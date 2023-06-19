<script>
  import { onMount } from "svelte";
  import { useLocation } from "svelte-navigator";
  import Header from "../components/Header.svelte";
  import HeaderWithAnchor from "../components/HeaderWithAnchor.svelte";
  import { currentPage } from "../stores/currentPage.js";
  import { honourFragmentIdLinks } from "../utils/honourFragmentIdLinks.js";

  const location = useLocation();

  onMount(() => {
    currentPage.update(currentPage => "Acknowledgements");

    honourFragmentIdLinks($location);
  });
</script>

<svelte:head>
  <title>Acknowledgements| OpenACR Editor | GSA</title>
</svelte:head>

<Header>Acknowledgements</Header>

<p>
  The OpenACR Editor was developed by <a href="https://civicactions.com/" target="_blank">CivicActions<span class="visuallyhidden"> (opens in a new window or tab)</span></a> and <a href="https://www.gsa.gov/" target="_blank">U.S. General Services Administration (GSA)<span class="visuallyhidden"> (opens in a new window or tab)</span></a>
</p>

<HeaderWithAnchor id="project-team" level=2>Project Team</HeaderWithAnchor>
<ul>
  <li><strong>GSA</strong>: Syed Azeem, Karl Hebenstreit, Andrew Neilson, Joseph Novak, Charles Popelka, Richard Speidel, Sean Zerges.</li>
  <li><strong>CivicActions</strong>: Owen Barton, Melinda Burgess, Danita Delce, Mike Gifford, Marlena Medford, Daniel Mundra, Jacqueline Quintanilla, Farooq Zakhilwal.</li>
</ul>
