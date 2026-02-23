---
title: EP-001 — Rich Markdown Editor
project: Folivm
status: in progress
version: 0.1
created: 2026-02-20
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/architectural/adrs/ADR-0004-tiptap-editor-framework.md
---

# EP-001 — Author can create and edit rich Markdown documents with Pandoc extended syntax

## Outcome

The author edits documents in a GUI that supports Pandoc extended Markdown. Output is valid Pandoc Markdown; round-trip editing preserves structure. The editor produces what Pandoc can convert to PDF and DOCX.

## Scope

- TipTap editor with custom node types for Pandoc fenced divs (callout, executive-summary, recommendation)
- Support for: headings (H1–H6), lists (ordered, unordered, nested), tables, blockquotes, footnotes
- YAML frontmatter for document metadata
- Character formatting: bold, italic (minimum viable set)
- Documents persist as Pandoc Markdown files with YAML frontmatter

## Non-scope (Phase 0)

- Citations/bibliography (Phase 2)
- Clause library
- Collaboration

## Success Criteria

- Author can create a document with headings, lists, tables, fenced divs, and frontmatter
- Saved file is valid Pandoc Markdown; Pandoc can process it
- Round-trip: edit → save → reload preserves structure

## Stories

| ID | Title | Status |
|----|-------|--------|
| [US-001](../stories/US-001-create-save-document.md) | As an author, I want to create and save a new document so that I can start from scratch | Done |
| [US-002](../stories/US-002-headings-lists-tables.md) | As an author, I want to add headings, lists, and tables so that I can structure my content | Done |
| [US-003](../stories/US-003-fenced-div-blocks.md) | As an author, I want to add fenced div blocks (callout, executive-summary) so that I can use semantic structure | Done |
| [US-004](../stories/US-004-edit-frontmatter.md) | As an author, I want to edit YAML frontmatter so that I can set document metadata | Not started |

## Related

- [ADR-0004](../../architectural/adrs/ADR-0004-tiptap-editor-framework.md) — TipTap
- [PRD Lean](../../conceptual/prd-lean.md) — FR-2, Authoring

---

*Previous: [Backlog](../backlog.md) · Next: [EP-002](EP-002-element-based-styling-preview.md)*
