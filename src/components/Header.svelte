<style>
  h1:focus {
    outline: none; /* Rationale: this element gets focused on route to improve navigation for screen reader users; assuming a focus outline could confuse some users, and that this element is not a "keyboard operable user interface" (as in https://www.w3.org/WAI/WCAG21/quickref/#focus-visible), it requires no visible focus  */
  }
</style>

<h1>
  <slot />
</h1>
