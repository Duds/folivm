---
title: ADR-0005 — Outline Mode Implementation
project: Folivm
status: proposed
version: 0.1
created: 2026-02-23
depends_on:
  - docs/architectural/adrs/ADR-0004-tiptap-editor-framework.md
  - docs/execution/epics/EP-108-structural-outline-mode.md
  - docs/architectural/hla.md
---

# ADR-0005 — Outline Mode Implementation

## Status
Proposed

## Context

Folivm Phase 1 introduces structural (outline) mode per [EP-108](../execution/epics/EP-108-structural-outline-mode.md). The author views the heading hierarchy (H1–H4) as a collapsible, reorderable tree; body text is hidden. Reordering, promote, and demote update the underlying Folivm source. The mode is an authoring surface only — no export path.

The document is edited in TipTap (ProseMirror-based) per [ADR-0004](ADR-0004-tiptap-editor-framework.md). The choice is how to implement outline mode given the existing TipTap document model.

## Decision

**Implement outline mode as a dedicated view component that reads from and writes to the TipTap document via ProseMirror transactions.** The outline view is not a second TipTap editor instance; it is a React (or equivalent) component that:

1. Parses the current document's heading nodes from the ProseMirror state
2. Renders them as a collapsible, indented tree (e.g. with a tree UI library or custom component)
3. Supports drag-and-drop reordering and promote/demote via toolbar or keyboard
4. Applies changes by dispatching ProseMirror transactions that mutate the underlying document

The mode switcher (Document | Structural | Deck) toggles which view is shown in the editor canvas. Only one view is active at a time; both operate on the same document state.

## Rationale

### Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| **Dedicated view + transactions** | Single source of truth; no sync between views; ProseMirror transactions are the canonical edit path | Requires correct mapping: tree operations → transactions |
| **Second TipTap doc with heading-only schema** | Reuses TipTap for tree editing | Sync between two docs is complex; risk of drift; two schemas to maintain |
| **TipTap extension that hides non-headings** | Stays within single editor | TipTap does not natively support collapsible tree or drag reorder of blocks; would need significant extension work |
| **Sidebar outline that mirrors doc** | Outline as read-only navigation | Does not support reorder/promote/demote; would need separate edit surface |

### Why Dedicated View + Transactions

1. **Single document state.** The Folivm document is the ProseMirror state. Outline mode is a different rendering of that state. Changes in outline mode are transactions on the same state. No sync logic; no dual representation.

2. **ProseMirror transactions.** Reorder = cut nodes, insert at new position. Promote = change heading level attribute. Demote = same. ProseMirror's transaction API supports these operations. The outline component computes the transaction from the user's drag or button click.

3. **Tree UI flexibility.** A collapsible tree with drag-and-drop is a well-solved UI pattern. Libraries (e.g. react-arborist, dnd-kit with tree) or custom implementation can render the heading hierarchy. The component does not need TipTap's WYSIWYG features — it only needs to read headings and dispatch transactions.

4. **Consistency with deck mode.** Deck mode (EP-103) will also be a different view on the same document. The pattern "view component + ProseMirror state" generalises. Document, outline, and deck are three rendering contracts on one document.

### Implementation Notes

- **Heading extraction:** Traverse the ProseMirror doc, collect nodes with type `heading` and `attrs.level` (1–4). Build tree structure from nesting (H1 top-level, H2 under preceding H1, etc.).
- **Reorder transaction:** Use `tr.delete()` and `tr.insert()` or ProseMirror's `replaceWith` to move a heading and its descendants. Descendants are all nodes between the heading and the next heading of equal or higher level.
- **Promote/Demote transaction:** Use `tr.setNodeMarkup(pos, null, { level: newLevel })` to change heading level.
- **Collapse state:** Local UI state only; does not affect the document. Optionally persist in session/localStorage for UX.

## Consequences

**Positive:**
- Single source of truth; no sync bugs
- Reuses existing TipTap/ProseMirror infrastructure
- Pattern scales to deck mode
- Undo/redo works (transactions go through the same history)

**Negative:**
- Custom logic to map tree operations to transactions; must handle edge cases (empty headings, deep nesting)
- Two view implementations to maintain (document + outline); deck adds a third

**Neutral:**
- Outline view is Phase 1; can be refined based on usage

## Related

- [ADR-0004 TipTap](ADR-0004-tiptap-editor-framework.md) — Editor framework
- [EP-108 Structural mode](../execution/epics/EP-108-structural-outline-mode.md) — Epic
- [HLA Rendering Modes](../hla.md) — Structural mode is authoring surface only

---

*Previous: [ADR-0004](ADR-0004-tiptap-editor-framework.md) · Next: [ADR-0006](ADR-0006-deck-mode-pptx-approach.md)*
