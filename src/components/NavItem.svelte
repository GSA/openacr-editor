<script>
  import { Link } from "svelte-navigator";
  import vars from "../../config/__buildEnv__.json";

  export let to = "";

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    let relativeHref = href.replace(vars.pathPrefix, '');
    let isActive;

    if (relativeHref === "") {
      relativeHref = "/";
    }

    isActive = relativeHref === location.pathname;

    if (isActive) {
      return { class: "active" };
    }
    return {};
  }
</script>

<li class="nav__item">
  <Link {to} {getProps}>
    <slot />
  </Link>
</li>
