import { marked } from "marked";

/** Escapes HTML entities for use in attributes. */
function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Converts Pandoc inline footnotes ^[content] to HTML before marked. */
function convertFootnotes(md: string): string {
  return md.replace(/\^\[([^\]]*)\]/g, (_, content) => {
    const escaped = escapeAttr(content);
    return `<sup class="footnote-inline" data-footnote="${escaped}">¹</sup>`;
  });
}

export function markdownToHtml(md: string): string {
  if (!md.trim()) return "<p></p>";
  const withFootnotes = convertFootnotes(md);
  const withDivs = withFootnotes.replace(
    /:::(\s*\S+)\s*\n([\s\S]*?):::/g,
    (_, className, content) => {
      const cls = className.trim().replace(/\s+/g, "-");
      const inner = marked.parse(content.trim(), { async: false }) as string;
      return `\n<div class="${cls}">\n${inner}\n</div>\n`;
    }
  );
  return marked.parse(withDivs, { async: false }) as string;
}
