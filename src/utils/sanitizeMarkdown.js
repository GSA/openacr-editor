import marked from "marked";
import sanitizeHtml from "sanitize-html";

export function sanitizeMarkdown(text) {
  const markdown = marked.parse(text);
  const sanitized = sanitizeHtml(markdown);
  return sanitized;
}
