import { useMemo } from "react";
import { FileText } from "lucide-react";
import { parseDocument, serializeDocument } from "@/frontmatter";
import type { EditableFrontmatter } from "@/frontmatter";
import { VariablePicker, FOLIVM_HEADING_VARS } from "@/components/ui/VariablePicker";
import * as Select from "@radix-ui/themes";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

interface HeadingNode {
  level: number;
  text: string;
  line: number;
}

function parseHeadings(body: string): HeadingNode[] {
  const lines = body.split("\n");
  const headings: HeadingNode[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6})\s+(.+)$/);
    if (m) {
      headings.push({
        level: m[1].length,
        text: m[2].trim(),
        line: i,
      });
    }
  }
  return headings;
}

interface DocumentStructurePanelProps {
  docContent: string;
  onDocContentChange: (content: string) => void;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  selectionHasCharacterRange?: boolean;
  editorCommandsRef?: React.RefObject<{
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
  } | null>;
}

export function DocumentStructurePanel({
  docContent,
  onDocContentChange,
  selectedNodeId,
  onSelectNode,
  selectionHasCharacterRange = false,
  editorCommandsRef,
}: DocumentStructurePanelProps) {
  const { frontmatter, body } = useMemo(
    () => parseDocument(docContent),
    [docContent]
  );

  const headings = useMemo(() => parseHeadings(body), [body]);

  const updateFrontmatter = (fm: EditableFrontmatter) => {
    onDocContentChange(serializeDocument(fm, body));
  };

  const update = (key: keyof EditableFrontmatter, value: string) => {
    updateFrontmatter({ ...frontmatter, [key]: value });
  };

  const updateOptional = (
    key: keyof EditableFrontmatter,
    value: string | undefined
  ) => {
    const next = { ...frontmatter, [key]: value };
    if (value === undefined) delete (next as Record<string, unknown>)[key];
    updateFrontmatter(next);
  };

  const selectedHeadingIndex = selectedNodeId?.startsWith("h-")
    ? parseInt(selectedNodeId.slice(2), 10)
    : -1;
  const selectedHeading =
    selectedHeadingIndex >= 0 ? headings[selectedHeadingIndex] : null;

  return (
    <div className="document-structure-panel">
      <div className="document-structure-tree">
        <div className="structure-panel-header">Document structure</div>
        <button
          type="button"
          className={cn(
            "structure-tree-item structure-tree-item-root",
            selectedNodeId === "document" && "active"
          )}
          onClick={() => onSelectNode(selectedNodeId === "document" ? null : "document")}
          aria-label="Select document"
        >
          <FileText size={14} />
          <span>Document</span>
        </button>
        {headings.map((h, i) => (
          <button
            key={`${h.line}-${i}`}
            type="button"
            className={cn(
              "structure-tree-item",
              `structure-tree-item-h${h.level}`,
              selectedNodeId === `h-${i}` && "active"
            )}
            style={{ paddingLeft: `${12 + (h.level - 1) * 12}px` }}
            onClick={() => {
              const nodeId = `h-${i}`;
              const selecting = selectedNodeId !== nodeId;
              onSelectNode(selecting ? nodeId : null);
              if (selecting) editorCommandsRef?.current?.focusAtHeading(i);
            }}
          >
            <span className="structure-tree-item-text">
              {h.text || `Heading ${h.level}`}
            </span>
          </button>
        ))}
      </div>

      {selectedNodeId === "document" && (
        <div className="document-properties">
          <div className="structure-panel-header">Document details</div>
          <div className="frontmatter-fields">
            <div className="form-group">
              <label htmlFor="doc-fm-title">Title</label>
              <input
                id="doc-fm-title"
                type="text"
                value={frontmatter.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Document title"
              />
            </div>
            <div className="frontmatter-row">
              <div className="form-group">
                <label htmlFor="doc-fm-created">Created</label>
                <input
                  id="doc-fm-created"
                  type="date"
                  value={frontmatter.created}
                  onChange={(e) => update("created", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doc-fm-updated">Updated</label>
                <input
                  id="doc-fm-updated"
                  type="date"
                  value={frontmatter.updated}
                  onChange={(e) => update("updated", e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="doc-fm-author">Author</label>
              <input
                id="doc-fm-author"
                type="text"
                value={frontmatter.author}
                onChange={(e) => update("author", e.target.value)}
                placeholder="Author name"
              />
            </div>
            <div className="frontmatter-row">
            <div className="form-group">
              <Label htmlFor="doc-page-size">Page size</Label>
                <Select.Select.Root
                  value={frontmatter.pageSize ?? "A4"}
                  onValueChange={(v) =>
                    updateOptional("pageSize", v as EditableFrontmatter["pageSize"])
                  }
                >
                  <Select.Select.Trigger
                    id="doc-page-size"
                    placeholder="A4"
                  />
                  <Select.Select.Content>
                    <Select.Select.Item value="A4">A4</Select.Select.Item>
                    <Select.Select.Item value="A3">A3</Select.Select.Item>
                    <Select.Select.Item value="Letter">Letter</Select.Select.Item>
                  </Select.Select.Content>
                </Select.Select.Root>
              </div>
              <div className="form-group">
                <Label htmlFor="doc-orientation">Orientation</Label>
                <Select.Select.Root
                  value={frontmatter.orientation ?? "portrait"}
                  onValueChange={(v) =>
                    updateOptional(
                      "orientation",
                      v as EditableFrontmatter["orientation"]
                    )
                  }
                >
                  <Select.Select.Trigger
                    id="doc-orientation"
                    placeholder="Portrait"
                  />
                  <Select.Select.Content>
                    <Select.Select.Item value="portrait">Portrait</Select.Select.Item>
                    <Select.Select.Item value="landscape">Landscape</Select.Select.Item>
                  </Select.Select.Content>
                </Select.Select.Root>
              </div>
            </div>
            <div className="form-group">
              <Label htmlFor="doc-heading-numbering">Heading numbering</Label>
              <Select.Select.Root
                value={frontmatter.headingNumbering ?? "none"}
                onValueChange={(v) =>
                  updateOptional(
                    "headingNumbering",
                    v as EditableFrontmatter["headingNumbering"]
                  )
                }
              >
                <Select.Select.Trigger
                  id="doc-heading-numbering"
                  placeholder="None"
                />
                <Select.Select.Content>
                  <Select.Select.Item value="none">None</Select.Select.Item>
                  <Select.Select.Item value="1.1.1">1, 1.1, 1.1.1</Select.Select.Item>
                  <Select.Select.Item value="1.2.3">1, 2, 3</Select.Select.Item>
                </Select.Select.Content>
              </Select.Select.Root>
            </div>
          </div>
        </div>
      )}

      {selectionHasCharacterRange && editorCommandsRef && (
        <div className="document-properties">
          <div className="structure-panel-header">Character style</div>
          <div className="frontmatter-fields">
            <div className="form-group">
              <div
                className="style-picker-buttons"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--primitive-space-2)",
                }}
              >
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => editorCommandsRef.current?.toggleBold()}
                >
                  Bold
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => editorCommandsRef.current?.toggleItalic()}
                >
                  Italic
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => editorCommandsRef.current?.toggleCode()}
                >
                  Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedHeading && (
        <div className="document-properties">
          <div className="structure-panel-header">Paragraph style</div>
          <div className="frontmatter-fields">
            <div className="form-group">
              <Label>Style</Label>
              <div
                className="style-picker-buttons"
                style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}
              >
                {([1, 2, 3, 4] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={cn(
                      "btn btn-ghost",
                      selectedHeading.level === level && "active"
                    )}
                    onClick={() => editorCommandsRef?.current?.toggleHeading(level)}
                    aria-pressed={selectedHeading.level === level}
                  >
                    H{level}
                  </button>
                ))}
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => editorCommandsRef?.current?.setParagraph()}
                  aria-pressed={false}
                >
                  Body
                </button>
              </div>
            </div>
          </div>
          <div className="structure-panel-header">Heading properties</div>
          <div className="frontmatter-fields">
            <div className="form-group">
              <Label>Level</Label>
              <p className="text-sm text-[var(--color-text-primary)]">
                Heading {selectedHeading.level}
              </p>
            </div>
            <VariablePicker
              id={`heading-font-size-${selectedHeadingIndex}`}
              label="Font size"
              value={
                frontmatter.headingOverrides?.[String(selectedHeadingIndex)] ??
                (FOLIVM_HEADING_VARS[
                  Math.min(
                    selectedHeading.level - 1,
                    FOLIVM_HEADING_VARS.length - 1
                  )
                ]?.value ?? "var(--text-doc-h1)")
              }
              onChange={(newValue) => {
                const defaultForLevel =
                  FOLIVM_HEADING_VARS[
                    Math.min(
                      selectedHeading.level - 1,
                      FOLIVM_HEADING_VARS.length - 1
                    )
                  ]?.value ?? "var(--text-doc-h1)";
                const key = String(selectedHeadingIndex);
                const nextOverrides = {
                  ...(frontmatter.headingOverrides ?? {}),
                };
                if (newValue === defaultForLevel) {
                  delete nextOverrides[key];
                } else {
                  nextOverrides[key] = newValue;
                }
                updateFrontmatter({
                  ...frontmatter,
                  headingOverrides:
                    Object.keys(nextOverrides).length > 0
                      ? nextOverrides
                      : undefined,
                });
              }}
              options={FOLIVM_HEADING_VARS}
              placeholder="Select variable"
            />
            <div className="form-group">
              <Label htmlFor="heading-font-weight">Font weight</Label>
              <Select.Select.Root value="inherit" onValueChange={() => {}}>
                <Select.Select.Trigger
                  id="heading-font-weight"
                  placeholder="Inherit"
                />
                <Select.Select.Content>
                  <Select.Select.Item value="inherit">Inherit</Select.Select.Item>
                  <Select.Select.Item value="400">Regular (400)</Select.Select.Item>
                  <Select.Select.Item value="500">Medium (500)</Select.Select.Item>
                  <Select.Select.Item value="600">Semibold (600)</Select.Select.Item>
                  <Select.Select.Item value="700">Bold (700)</Select.Select.Item>
                </Select.Select.Content>
              </Select.Select.Root>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
