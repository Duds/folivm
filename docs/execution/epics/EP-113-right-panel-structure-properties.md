---
title: EP-113 — Right panel: document structure tree and Figma-style properties
project: Folivm
status: done
version: 0.1
created: 2026-02-24
updated: 2026-02-24
depends_on:
  - docs/execution/epics/EP-008-ui-scaffold.md
  - docs/execution/epics/EP-001-rich-markdown-editor.md
---

# EP-113 — Right panel: document structure tree and Figma-style properties

## Outcome

The right panel provides a Figma-style interface: a document structure tree (collapsible hierarchy) and context-sensitive properties panel for the selected element. YAML frontmatter is hidden from the canvas; document metadata is edited via the Document node in the structure panel.

## Rationale

Figma's Design/Inspect panel shows properties for the selected object. Folivm mirrors this: selecting a document node in the tree or in the editor populates the properties panel with styling and metadata options bound to Folivm variables.

## Acceptance Criteria

- Document structure tree: collapsible hierarchy of document → sections (headings) → paragraphs, lists, blocks
- Selecting a tree node focuses the editor and populates the properties panel
- Document node: title, created, updated, author (frontmatter); page margins; default font
- Section/heading: level, numbering, spacing, font size/weight
- Paragraph: alignment, indent, line height
- List: bullet style, number format, multi-level numbering
- Semantic blocks (callout, executive-summary): block type, colours
- YAML frontmatter hidden from the main editing surface

## Stories

- US-113: Document metadata in properties; YAML hidden
- US-118: Document structure tree (collapsible, selectable)
- US-119: Context-sensitive properties for headings, paragraphs, lists, blocks
- US-120: List properties (bullet style, number format)
- US-121: Folivm variable picker in properties panel

## Related

- [EP-008](EP-008-ui-scaffold.md) — UI scaffold
- [EP-001](EP-001-rich-markdown-editor.md) — Rich Markdown editor
- [EP-122](EP-122-right-panel-style-picker.md) — Right panel style picker (extends this epic with paragraph/character style picker as primary)
