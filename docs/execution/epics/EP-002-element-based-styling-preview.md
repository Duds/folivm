---
title: EP-002 — Element-Based Styling and Print Preview
project: Folivm
status: done
version: 0.1
created: 2026-02-20
depends_on:
  - docs/conceptual/prd-lean.md
  - NOTES.md (styling system design)
---

# EP-002 — Author can apply element-based styling and preview print output

## Outcome

The author sees a print preview that approximates final PDF appearance. Styling follows the element-based model: Pandoc elements (h1–h6, p, ul, ol, blockquote, table, figure, figcaption) plus custom semantic div classes (callout, executive-summary). Multi-level heading numbering via CSS counters.

## Scope

- Print stylesheet (CSS) covering all Pandoc structural elements
- Word-style styling: apply style = apply element/class; style definitions in CSS
- Print preview in editor (WYSIWYG or near-WYSIWYG)
- CSS counters for hierarchical heading numbering (1, 1.1, 2.2.1)
- Author-configurable stylesheet path

## Non-scope (Phase 0)

- Brand manifest (Phase 2)
- In-editor style customisation UI (Phase 0: author edits CSS file directly)

## Success Criteria

- Author loads a stylesheet; editor preview reflects it
- Headings, lists, tables, blockquotes, fenced divs render with correct structure
- Heading numbering (1, 1.1, 2.2.1) works when enabled in CSS

## Stories

| ID | Title | Status |
|----|-------|--------|
| [US-010](../stories/US-010-specify-print-stylesheet.md) | As an author, I want to specify a print stylesheet so that preview and export use my styles | Done |
| [US-011](../stories/US-011-print-preview.md) | As an author, I want to see a print preview that matches my stylesheet so that I know how export will look | Done (WYSIWYG editor) |
| [US-012](../stories/US-012-heading-numbering.md) | As an author, I want hierarchical heading numbering (1, 1.1, 2.2.1) so that my document has numbered sections | Done |

## Related

- [NOTES.md](../../../NOTES.md) — Styling system design (element-based, CSS counters)
- [Solution Concept](../../strategic/solution-concept.md) — Phase 0 styling
- [PRD Lean](../../conceptual/prd-lean.md) — FR-2.3 Print preview

---

*Previous: [EP-001](EP-001-rich-markdown-editor.md) · Next: [EP-003](EP-003-project-folder-context.md)*
