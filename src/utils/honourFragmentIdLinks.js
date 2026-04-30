export function honourFragmentIdLinks(routerLocation) {
  if (routerLocation.hash) {
    const fragmentSelector = `[id='${routerLocation.hash.replace("#", "")}']`;

    function focusFragment(attemptsRemaining = 10) {
      const fragment = document.querySelector(fragmentSelector);

      if (!fragment) {
        if (attemptsRemaining > 0) {
          window.requestAnimationFrame(() => {
            focusFragment(attemptsRemaining - 1);
          });
        }
        return;
      }

      // if inside a collapsed section, open it.
      if (
        fragment.parentElement &&
        fragment.parentElement.nodeName === "DETAILS"
      ) {
        fragment.parentElement.setAttribute("open", "");
      }

      // explicitly move focus
      fragment.tabIndex = "-1";
      fragment.focus();

      // center in viewport
      fragment.scrollIntoView({
        behavior: "auto",
        block: "center",
      });

      // by setting location.hash explicitly, we ensure :target
      // selectors in CSS will work as expected
      window.location.hash = routerLocation.hash;
    }

    focusFragment();
  }
}
