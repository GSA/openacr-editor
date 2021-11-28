export function cleanUp(node) {
  const removeEls = Array.from(
    node.querySelectorAll("button, input, .results-label-mobile")
  );
  const tables = Array.from(node.querySelectorAll("table"));
  const emptyValues = Array.from(node.querySelectorAll("span.no-result"));
  const removeAttributeEls = Array.from(
    node.querySelectorAll("[class], [id], [aria-labelledby]")
  );

  removeEls.forEach((el) => {
    el.parentNode.removeChild(el);
  });

  tables.forEach((el) => {
    const editColumnItems = Array.from(
      el.querySelectorAll(".result-row__edit")
    );
    const notInScopeNoObservations = Array.from(
      el.querySelectorAll(".not-in-scope-no-observations")
    );

    el.setAttribute("border", "1");
    el.setAttribute("style", "border-collapse: collapse");

    notInScopeNoObservations.forEach((el) => {
      const row = el.parentNode;
      row.parentNode.removeChild(row);
    });

    editColumnItems.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  });

  emptyValues.forEach((el) => {
    const dd = el.parentNode;
    const dt = dd.previousElementSibling;

    dt.parentNode.removeChild(dt);
    dd.parentNode.removeChild(dd);
  });

  removeAttributeEls.forEach((el) => {
    // el.removeAttribute("id");
    // el.removeAttribute("class");
    el.removeAttribute("aria-labelledby");
  });
}
