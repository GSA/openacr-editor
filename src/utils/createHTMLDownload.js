export function createHTMLDownload(template, title, lang) {
  const htmlDocument = document.implementation.createHTMLDocument(title);
  let blob, metaViewport, metaCharSet, metaEdge;

  htmlDocument.documentElement.setAttribute("lang", lang);
  htmlDocument.body.innerHTML = template.innerHTML;
  htmlDocument.body.setAttribute("id", "openACR");
  metaViewport = document.createElement("meta");
  metaViewport.setAttribute("name", "viewport");
  metaViewport.setAttribute("content", "width=device-width, initial-scale=1");
  htmlDocument.head.appendChild(metaViewport);
  metaCharSet = document.createElement("meta");
  metaCharSet.setAttribute("charset", "utf-8");
  htmlDocument.head.appendChild(metaCharSet);
  metaEdge = document.createElement("meta");
  metaEdge.setAttribute("http-equiv", "X-UA-Compatible");
  metaEdge.setAttribute("content", "IE=edge");
  htmlDocument.head.appendChild(metaEdge);

  blob = new Blob(
    [`<!doctype HTML>${htmlDocument.documentElement.outerHTML}`],
    {
      type: "text/html",
    }
  );

  return blob;
}
