import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/ui/Popover";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { CalloutExtension, ExecutiveSummaryExtension } from "./extensions/CalloutExtension";
import { FootnoteExtension } from "./extensions/FootnoteExtension";
import { InvisiblesExtension } from "./extensions/InvisiblesExtension";
import TurndownService from "turndown";
import { markdownToHtml } from "./markdown";

function htmlToMarkdown(html: string): string {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  td.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => `~~${content}~~`,
  });
  td.addRule("callout", {
    filter: (node: unknown) =>
      (node as HTMLElement).nodeName === "DIV" &&
      (node as HTMLElement).classList?.contains("callout"),
    replacement: (content: string) => `::: callout\n${content}\n:::\n\n`,
  });
  td.addRule("executiveSummary", {
    filter: (node: unknown) =>
      (node as HTMLElement).nodeName === "DIV" &&
      (node as HTMLElement).classList?.contains("executive-summary"),
    replacement: (content: string) => `::: executive-summary\n${content}\n:::\n\n`,
  });
  td.addRule("footnote", {
    filter: (node: unknown) => {
      const el = node as HTMLElement;
      return el.nodeName === "SUP" && el.classList?.contains("footnote-inline");
    },
    replacement: (_content, node) => {
      const content = (node as HTMLElement).getAttribute("data-footnote") ?? "";
      const escaped = content
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      return `^[${escaped}]`;
    },
  });
  return td.turndown(html || "<p></p>");
}

interface EditorCommandsRef {
  focusAtHeading: (index: number) => void;
  toggleHeading: (level: 1 | 2 | 3 | 4) => void;
  setParagraph: () => void;
  toggleCallout: () => void;
  toggleExecutiveSummary: () => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleCode: () => void;
  toggleLink: (url?: string) => void;
  getActiveMarks: () => { bold: boolean; italic: boolean; code: boolean };
}

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  showNonPrintingChars?: boolean;
  onSelectionChange?: (
    nodeId: string | null,
    hasCharacterRange: boolean
  ) => void;
  editorCommandsRef?: React.RefObject<EditorCommandsRef | null>;
}

// Editor type from TipTap/ProseMirror - use minimal shape for selection mapping
function computeSelectionNodeId(editor: { state: { doc: { descendants: (fn: (node: { type: { name: string }; nodeSize: number }, pos: number) => void) => void }; selection: { $from: { pos: number } } } }): string | null {
  const headings: { pos: number; size: number }[] = [];
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === "heading") {
      headings.push({ pos, size: node.nodeSize });
    }
  });
  const selPos = editor.state.selection.$from.pos;
  for (let i = headings.length - 1; i >= 0; i--) {
    const { pos, size } = headings[i];
    if (pos <= selPos && selPos < pos + size) {
      return `h-${i}`;
    }
  }
  return "document";
}

export function Editor({
  content,
  onChange,
  onSave,
  showNonPrintingChars = false,
  onSelectionChange,
  editorCommandsRef,
}: EditorProps) {
  const isInternalUpdate = useRef(false);
  const selectionChangeFromStructureTreeRef = useRef(false);
  const [footnoteOpen, setFootnoteOpen] = useState(false);
  const [footnoteDraft, setFootnoteDraft] = useState("");
  const footnoteIsUpdateRef = useRef(false);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        CalloutExtension,
        ExecutiveSummaryExtension,
        FootnoteExtension,
        InvisiblesExtension.configure({ show: showNonPrintingChars }),
        Placeholder.configure({ placeholder: "Start writing..." }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "Folivm-table" },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: markdownToHtml(content),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px]",
      },
      handleKeyDown: (_view, event) => {
        if (event.key === "s" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          onSave();
        }
      },
    },
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      const md = htmlToMarkdown(editor.getHTML());
      onChange(md);
    },
    onSelectionUpdate: ({ editor }) => {
      if (selectionChangeFromStructureTreeRef.current) {
        selectionChangeFromStructureTreeRef.current = false;
        return;
      }
      const nodeId = computeSelectionNodeId(editor);
      const { from, to } = editor.state.selection;
      const hasCharacterRange = from !== to;
      onSelectionChange?.(nodeId, hasCharacterRange);
    },
  },
  [showNonPrintingChars, onSelectionChange]
);

  useEffect(() => {
    if (!editor || isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    const html = markdownToHtml(content);
    editor.commands.setContent(html);
  }, [content, editor]);

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  useEffect(() => {
    if (!editor || !editorCommandsRef) return;
    const focusAtHeading = (index: number) => {
      const headings: { pos: number }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") headings.push({ pos });
      });
      const h = headings[index];
      if (!h) return;
      selectionChangeFromStructureTreeRef.current = true;
      editor.commands.setTextSelection(h.pos);
      editor.commands.focus();
    };
    (editorCommandsRef as React.MutableRefObject<EditorCommandsRef | null>).current = {
      focusAtHeading,
      toggleHeading: (level) => editor.chain().focus().toggleHeading({ level }).run(),
      setParagraph: () => editor.chain().focus().setParagraph().run(),
      toggleCallout: () => editor.chain().focus().toggleCallout().run(),
      toggleExecutiveSummary: () => editor.chain().focus().toggleExecutiveSummary().run(),
      toggleBold: () => editor.chain().focus().toggleBold().run(),
      toggleItalic: () => editor.chain().focus().toggleItalic().run(),
      toggleCode: () => editor.chain().focus().toggleCode().run(),
      toggleLink: (url) =>
        editor.chain().focus().toggleLink({ href: url ?? "" }).run(),
      getActiveMarks: () => ({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        code: editor.isActive("code"),
      }),
    };
    return () => {
      (editorCommandsRef as React.MutableRefObject<EditorCommandsRef | null>).current = null;
    };
  }, [editor, editorCommandsRef]);

  if (!editor) return <div className="editor-loading">Loading editor...</div>;

  return (
    <div className="editor-wrapper">
      <BubbleMenu editor={editor} className="bubble-menu">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "active" : ""}
            >
              Bold
            </button>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "active" : ""}
            >
              Italic
            </button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
            >
              H1
            </button>
          </TooltipTrigger>
          <TooltipContent>Heading 1</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
            >
              H2
            </button>
          </TooltipTrigger>
          <TooltipContent>Heading 2</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
            >
              H3
            </button>
          </TooltipTrigger>
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={editor.isActive("heading", { level: 4 }) ? "active" : ""}
            >
              H4
            </button>
          </TooltipTrigger>
          <TooltipContent>Heading 4</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "active" : ""}
            >
              List
            </button>
          </TooltipTrigger>
          <TooltipContent>Bullet list</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleCallout().run()}
              className={editor.isActive("callout") ? "active" : ""}
            >
              Callout
            </button>
          </TooltipTrigger>
          <TooltipContent>Callout</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => editor.chain().focus().toggleExecutiveSummary().run()}
              className={editor.isActive("executiveSummary") ? "active" : ""}
            >
              Summary
            </button>
          </TooltipTrigger>
          <TooltipContent>Executive summary</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                if (editor.isActive("callout")) {
                  editor.chain().focus().toggleCallout().run();
                } else if (editor.isActive("executiveSummary")) {
                  editor.chain().focus().toggleExecutiveSummary().run();
                } else if (editor.isActive("blockquote")) {
                  editor.chain().focus().toggleBlockquote().run();
                }
              }}
              disabled={
                !editor.isActive("callout") &&
                !editor.isActive("executiveSummary") &&
                !editor.isActive("blockquote")
              }
              className={
                editor.isActive("callout") ||
                editor.isActive("executiveSummary") ||
                editor.isActive("blockquote")
                  ? "active"
                  : ""
              }
            >
              Remove block
            </button>
          </TooltipTrigger>
          <TooltipContent>Remove block wrapper</TooltipContent>
        </Tooltip>
        <Popover
          open={footnoteOpen}
          onOpenChange={(open) => {
            setFootnoteOpen(open);
            if (open) {
              const sel = editor.state.selection as {
                node?: { type: { name: string }; attrs: { content?: string } };
              };
              footnoteIsUpdateRef.current = sel.node?.type?.name === "footnote";
              setFootnoteDraft(
                footnoteIsUpdateRef.current
                  ? (sel.node?.attrs?.content ?? "")
                  : ""
              );
            }
          }}
        >
          <Tooltip>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <button
                  className={editor.isActive("footnote") ? "active" : ""}
                >
                  Footnote
                </button>
              </TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent>Footnote</TooltipContent>
          </Tooltip>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              editor.commands.focus();
            }}
          >
            <div className="footnote-popover">
              <label htmlFor="footnote-input" className="footnote-popover-label">
                Footnote content
              </label>
              <input
                id="footnote-input"
                type="text"
                value={footnoteDraft}
                onChange={(e) => setFootnoteDraft(e.target.value)}
                placeholder="Enter footnote text..."
                className="footnote-popover-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (footnoteIsUpdateRef.current) {
                      editor.chain().focus().updateAttributes("footnote", { content: footnoteDraft }).run();
                    } else {
                      editor.chain().focus().insertFootnote({ content: footnoteDraft }).run();
                    }
                    setFootnoteOpen(false);
                  } else if (e.key === "Escape") {
                    setFootnoteOpen(false);
                  }
                }}
              />
              <div className="footnote-popover-actions">
                <PopoverClose asChild>
                  <button type="button" className="btn btn-ghost">
                    Cancel
                  </button>
                </PopoverClose>
                <PopoverClose asChild>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      if (footnoteIsUpdateRef.current) {
                        editor.chain().focus().updateAttributes("footnote", { content: footnoteDraft }).run();
                      } else {
                        editor.chain().focus().insertFootnote({ content: footnoteDraft }).run();
                      }
                    }}
                  >
                    Save
                  </button>
                </PopoverClose>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </div>
  );
}
