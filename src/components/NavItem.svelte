<script>
  import { href, link, location } from "../lib/router.js";

  export let to = "";
  $: currentHref = href(to);
  $: routePath = to.startsWith("/") ? to : `/${to}`;
  $: isActive = routePath === $location.pathname;
</script>

<li class="nav__item">
  <a
    href={currentHref}
    use:link
    class:active={isActive}
    aria-current={isActive ? "page" : undefined}
  >
    <slot />
  </a>
</li>
