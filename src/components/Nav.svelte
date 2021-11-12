<style>
  .nav {
    -ms-grid-column: 2;
    -ms-grid-column-span: 8;
    grid-column: 2 / span 8;
    -ms-grid-row: 1;
    -ms-grid-row-span: 1;
    grid-row: 1;
    overflow: auto;
    margin: -32px 0 40px;
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
  }
  .nav ul {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
</style>

<nav class="nav" aria-label="Steps">
  <ul>
    <slot />
  </ul>
</nav>
