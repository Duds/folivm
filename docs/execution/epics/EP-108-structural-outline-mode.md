---
title: EP-108 — Structural (Outline) Mode
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/planning/roadmap.md
  - docs/architectural/hla.md
  - docs/architectural/principles.md
---

# EP-108 — Author can work in structural (outline) mode

## Outcome

The author can view and reorganise document hierarchy in structural mode without body text. Structural mode surfaces the heading spine of the document as a collapsible, reorderable tree. Reordering, promote, and demote operations update the underlying Folivm source. This is the structure-first authoring surface that validates the document model before deck mode (EP-103).

## Rationale

Word's Outline mode is one of its most valuable and underappreciated features. It surfaces the heading hierarchy of a document, collapses body text, and lets the author work at the structural level — reordering sections, promoting and demoting headings, validating the argument architecture before writing prose. For a consultant drafting a complex report, this is how you think before you write.

Folivm's heading hierarchy is already the structural spine of every document. Outline mode is a different rendering contract on existing data. Nothing new needs to be stored. The mode reads headings H1–H4 from the document and presents them as a collapsible, reorderable tree. Body text is hidden or summarised. Reordering in outline mode reorders the underlying Folivm source.

**Deck mode connection.** An outline in document mode and a slide list in deck mode are the same structure viewed differently. EP-108 and EP-103 should be sequenced and designed together. See [EP-103](EP-103-deck-mode-pptx-export.md).

## Scope

- Structural mode as a distinct authoring mode (toolbar and keyboard shortcut)
- Display H1–H4 headings as collapsible, indented hierarchy; body text hidden
- Collapse and expand heading branches
- Reorder sections by dragging; underlying Markdown updated
- Promote and demote heading levels (H2 → H1, H2 → H3)
- Round-trip: switching to document mode preserves all changes
- LLM assistance in structural mode (suggest outline, restructure, add missing sections)

## Non-scope (Phase 1)

- Export from structural mode (none; authoring surface only)
- Sheet mode (Phase 2)

## Success Criteria

- Author can switch to structural mode from the editor toolbar or keyboard shortcut
- Structural mode displays H1–H4 headings as a collapsible, indented hierarchy; body text is hidden
- Author can collapse and expand heading branches
- Author can reorder sections by dragging headings; underlying Folivm source updates accordingly
- Author can promote or demote a heading level from structural mode
- Switching back to document mode preserves all changes made in structural mode
- LLM assistance is available in structural mode (suggest outline, restructure, add missing sections)

## Stories

| ID | Title | Status |
|----|-------|--------|
| [US-080](../stories/US-080-switch-structural-mode.md) | As an author, I want to switch to structural mode from the toolbar or keyboard so that I can work on the document structure | Backlog |
| [US-081](../stories/US-081-display-heading-hierarchy.md) | As an author, I want structural mode to display H1–H4 as a collapsible, indented hierarchy with body text hidden so that I see the document spine | Backlog |
| [US-082](../stories/US-082-collapse-expand-branches.md) | As an author, I want to collapse and expand heading branches in structural mode so that I can focus on parts of the hierarchy | Backlog |
| [US-083](../stories/US-083-reorder-sections-drag.md) | As an author, I want to reorder sections by dragging headings so that the underlying document updates accordingly | Backlog |
| [US-084](../stories/US-084-promote-demote-headings.md) | As an author, I want to promote or demote heading levels in structural mode so that I can adjust the hierarchy without editing prose | Backlog |
| [US-085](../stories/US-085-switch-back-preserves-changes.md) | As an author, I want switching back to document mode to preserve all structural changes so that my edits are not lost | Backlog |
| [US-086](../stories/US-086-llm-assistance-structural-mode.md) | As an author, I want LLM assistance in structural mode so that I can get suggested outlines, restructures, or missing sections | Backlog |

## Related

- [EP-103 Deck mode + PPTX](EP-103-deck-mode-pptx-export.md) — Same structure, different view; design together
- [HLA Rendering Modes](../../architectural/hla.md) — Structural mode is authoring surface only, no export
- [ADR-0005 Outline mode implementation](../../architectural/adrs/ADR-0005-outline-mode-implementation.md) — TipTap/ProseMirror approach
- [Backlog](../backlog.md) — Phase 1 priority

---

*Previous: [EP-008](EP-008-ui-scaffold.md) · Next: [EP-103](EP-103-deck-mode-pptx-export.md)*
