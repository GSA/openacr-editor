export function honourFragmentIdLinks(routerLocation) {
  if (routerLocation.hash) {
    const fragment = document.querySelector(
      `[id='${routerLocation.hash.replace("#", "")}']`
    );

    // if inside a collapsed section, open it.
    if (fragment.parentElement.nodeName === "DETAILS") {
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
}
