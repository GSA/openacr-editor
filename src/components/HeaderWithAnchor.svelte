<script>
  export let id;
  export let level;
  export let download = false;

  const extraId = download ? "-download" : "-editor";
</script>

<style>
  h2,
  h3 {
    position: relative;
  }
  h2 a.header-anchor,
  h3 a.header-anchor {
    position: absolute;
    left: -2rem;
  }
  h2 a.header-anchor:hover svg,
  h2 a.header-anchor:focus svg,
  h2 a.header-anchor:focus-within svg,
  h3 a.header-anchor:hover svg,
  h3 a.header-anchor:focus svg,
  h3 a.header-anchor:focus-within svg {
    fill: #0000EE;
    opacity: 1;
  }
  h2 a.header-anchor svg,
  h3 a.header-anchor svg {
    width: 28px;
    height: 28px;
    opacity: .3;
  }
  @media all and (max-width: 63.99em) {
    h2 a.header-anchor,
    h3 a.header-anchor {
      position:relative;
      opacity: 1;
      left: 0;
      vertical-align: top;
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
    opacity: 1;
  }
  summary>h3:first-child:before {
    line-height: 1.2;
  }
</style>

{#if level == 2}
  <h2 id="{id}{extraId}">
    <slot />
    <a href="#{id}{extraId}" class="header-anchor" aria-labelledby="{id}{extraId}">
      <span class="anchor-icon" aria-hidden="true">
        <svg
          focusable="false"
          aria-hidden="true"
          class="icon-link">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      </span>
      <span class="visuallyhidden">Anchor link</span>
    </a>
  </h2>
{/if}

{#if level == 3}
  <h3 id="{id}{extraId}">
    <slot />
    <a href="#{id}{extraId}" class="header-anchor" aria-labelledby="{id}{extraId}">
      <span class="anchor-icon" aria-hidden="true">
        <svg
          focusable="false"
          aria-hidden="true"
          class="icon-link">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      </span>
      <span class="visuallyhidden">Anchor link</span>
    </a>
  </h3>
{/if}
