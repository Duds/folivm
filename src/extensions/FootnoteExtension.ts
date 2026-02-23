import { Node, mergeAttributes } from "@tiptap/core";

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function unescapeHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent ?? "";
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    footnote: {
      insertFootnote: (attrs?: { content?: string }) => ReturnType;
    };
  }
}

/** Pandoc inline footnote: ^[content] */
export const FootnoteExtension = Node.create({
  name: "footnote",

  addOptions() {
    return {
      HTMLAttributes: { class: "footnote-inline" },
    };
  },

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      content: {
        default: "",
        parseHTML: (el) => {
          const raw = (el as HTMLElement).getAttribute("data-footnote") ?? "";
          return unescapeHtml(raw);
        },
        renderHTML: (attrs) => (attrs.content ? { "data-footnote": escapeHtml(attrs.content) } : {}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'sup[class*="footnote-inline"]',
        getAttrs: (dom) => {
          const el = dom as HTMLElement;
          const raw = el.getAttribute("data-footnote") ?? "";
          return { content: unescapeHtml(raw) };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const content = node.attrs.content as string;
    const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      "data-footnote": escapeHtml(content),
      title: content || "Footnote",
    });
    const label = content ? "¹" : "⁽⁾";
    return ["sup", attrs, label];
  },

  addCommands() {
    return {
      insertFootnote:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { content: attrs?.content ?? "" },
          });
        },
    };
  },
});
