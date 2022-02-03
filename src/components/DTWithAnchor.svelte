<script>
  import vars from "../../config/__buildEnv__.json";

  export let id;
  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

<style>
  dt {
    position: relative;
  }
  dt a.header-anchor {
    position: absolute;
    left: -2rem;
  }
  dt a.header-anchor:hover svg,
  dt a.header-anchor:focus svg,
  dt a.header-anchor:focus-within svg {
    fill: #0000EE;
    opacity: 1;
  }
  dt a.header-anchor svg {
    width: 24px;
    height: 24px;
    opacity: .3;
  }
  @media all and (max-width: 63.99em) {
    dt a.header-anchor {
      position:relative;
      opacity: 1;
      left: 0;
      vertical-align: top
    }
  }
  a.header-anchor {
    opacity: 0.4;
    font-size: small;
    text-decoration: none;
    position: relative;
    left: 20px;
    -webkit-transition: opacity 1s, font-size 1s;
    -moz-transition: opacity 1s, font-size 1s;
    -o-transition: opacity 1s, font-size 1s;
    transition: opacity 1s, font-size 1s;
  }
  a.header-anchor:focus,a.header-anchor:hover {
    text-decoration: underline;
    font-size: large;
    opacity: 1
  }
</style>

<dt id="{id}{extraId}">
  <slot />
  <a href="#{id}{extraId}" class="header-anchor" aria-labelledby="{id}{extraId}">
    <span class="anchor-icon" aria-hidden="true">
      <svg
        focusable="false"
        aria-hidden="true"
        class="icon-link">
        <use href={`${vars.pathPrefix}/images/icons.svg#link`} />
      </svg>
    </span>
    <span class="visuallyhidden">Anchor link</span>
  </a>
</dt>
