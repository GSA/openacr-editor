export function createHTMLDownload(template, title) {
  const htmlDocument = document.implementation.createHTMLDocument(title);
  let blob, download, meta;

  htmlDocument.body.innerHTML = template.innerHTML;
  meta = document.createElement("meta");
  meta.setAttribute("charset", "utf-8");
  htmlDocument.head.appendChild(meta);

  blob = new Blob(
    [`<!doctype HTML>${htmlDocument.documentElement.outerHTML}`],
    {
      type: "text/html",
    }
  );
  download = URL.createObjectURL(blob);

  return download;
}
