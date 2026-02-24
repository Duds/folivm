import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

const INVISIBLES_PLUGIN_KEY = new PluginKey("invisibles");

export interface InvisiblesOptions {
  show: boolean;
  space?: string;
  tab?: string;
  hardBreak?: string;
  paragraph?: string;
}

export const InvisiblesExtension = Extension.create<InvisiblesOptions>({
  name: "invisibles",

  addOptions() {
    return {
      show: false,
      space: "·",
      tab: "→",
      hardBreak: "↵",
      paragraph: "¶",
    };
  },

  addProseMirrorPlugins() {
    const opts = this.options;
    return [
      new Plugin({
        key: INVISIBLES_PLUGIN_KEY,
        props: {
          decorations(state) {
            if (!opts.show) return null;
            const decos: Decoration[] = [];
            state.doc.descendants((node, pos) => {
              if (node.isText) {
                const text = node.text ?? "";
                for (let i = 0; i < text.length; i++) {
                  const ch = text[i];
                  const from = pos + i;
                  const to = from + 1;
                  if (ch === " ") {
                    decos.push(
                      Decoration.inline(from, to, {
                        class: "invisible-space",
                        "data-invisible": opts.space ?? "·",
                      })
                    );
                  } else if (ch === "\t") {
                    decos.push(
                      Decoration.inline(from, to, {
                        class: "invisible-tab",
                        "data-invisible": opts.tab ?? "→",
                      })
                    );
                  }
                }
              } else if (node.type.name === "hardBreak") {
                decos.push(
                  Decoration.widget(pos + 1, () => {
                    const span = document.createElement("span");
                    span.className = "invisible-hard-break";
                    span.textContent = opts.hardBreak ?? "↵";
                    span.contentEditable = "false";
                    return span;
                  })
                );
              }
            });
            return DecorationSet.create(state.doc, decos);
          },
        },
      }),
    ];
  },
});
