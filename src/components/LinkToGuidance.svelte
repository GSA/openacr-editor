<script>
  export let href;
</script>

<style>
  .link-to-guidance {
    border-width: 1px;
    font-weight: normal;
    color: var(--dk-grey);
    border-color: var(--line-grey);
    background-color: var(--pure-white);
    vertical-align: middle;
    margin: 2px 0;
  }
  .link-to-guidance:hover,
  .link-to-guidance:focus {
    color: var(--off-black);
    background-color: var(--off-white);
  }
  .link-to-guidance svg {
    margin-right: 0.25em;
  }
  .link-to-guidance:after {
    margin-top: 0;
  }
</style>

<a
  {href}
  class="link-to-guidance button button-small button-secondary"
  target="_blank"
  rel="noopener noreferrer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 16 16">
    <path
      fill="currentColor"
      d="M7 4.75c0-0.412 0.338-0.75 0.75-0.75h0.5c0.412 0 0.75 0.338 0.75
      0.75v0.5c0 0.412-0.338 0.75-0.75 0.75h-0.5c-0.412
      0-0.75-0.338-0.75-0.75v-0.5z" />
    <path fill="currentColor" d="M10 12h-4v-1h1v-3h-1v-1h3v4h1z" />
    <path
      fill="currentColor"
      d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8
      14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91
      6.5-6.5 6.5z" />
  </svg>
  <span>
    <slot />
  </span><span class="visuallyhidden"> (opens in a new window or tab)</span>
</a>
