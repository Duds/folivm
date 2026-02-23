---
title: EP-103 — Deck Mode and PPTX Export
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
depends_on:
  - docs/planning/roadmap.md
  - docs/architectural/hla.md
  - docs/architectural/adrs/ADR-0002-docx-export-library-selection.md
---

# EP-103 — Author can switch to deck mode and export PPTX

## Outcome

The author can switch to deck mode, where the document is rendered as a slide deck (landscape, slide-boundary-aware). Headings define slide boundaries — the same structural spine as document and outline mode. The author can export to PPTX for client delivery. Structural fidelity (right content, right slides) is the goal; pixel-perfect design may require separate production steps.

## Rationale

Deck mode introduces the second rendering mode (document mode is Phase 0). An outline in document mode and a slide list in deck mode are the same structure viewed differently. The Phase 1 workflow: build the argument structure in outline mode (EP-108), switch to deck mode, headings become slides, fill in content, export PPTX.

**EP-108 linkage.** EP-108 (structural mode) and EP-103 (deck mode) share the heading hierarchy as the structural spine. Design decisions for outline mode (reorder, promote, demote) inform deck mode's slide-boundary model. Sequence EP-108 first; keep EP-103 spec aligned during design. See [EP-108](EP-108-structural-outline-mode.md).

## Scope

- Deck mode as a distinct rendering mode (toolbar, mode switcher)
- Headings H1–H4 map to slide boundaries (H1 = new slide by default; configurable)
- Landscape, slide-optimised layout
- Prose, visual, and frame cell types for slide content
- Export to PPTX via Pandoc (ADR-0002: Pandoc PPTX as default)
- Optional reference PPTX template for styling
- Export to PDF (slide deck layout) as alternative

## Non-scope (Phase 1)

- Animations, transitions (future enhancement)
- Master layouts, complex graphics (validate Pandoc PPTX first; python-pptx fallback if needed)
- Sheet mode (Phase 2)

## Success Criteria

- Author can switch to deck mode from the mode switcher
- Deck mode displays the document as slides; headings define slide boundaries
- Author can edit slide content in deck mode
- Author can export to PPTX; output opens in PowerPoint/Keynote
- Structural fidelity: content appears on the correct slides; no content loss
- Optional reference PPTX template controls slide styling

## Stories

| ID | Title | Status |
|----|-------|--------|
| US-090 | As an author, I want to switch to deck mode so that I can work on a slide deck | Backlog |
| US-091 | As an author, I want headings to define slide boundaries so that my structure becomes the deck | Backlog |
| US-092 | As an author, I want to edit slide content in deck mode so that I can fill in the deck | Backlog |
| US-093 | As an author, I want to export to PPTX so that I can deliver the deck to my client | Backlog |
| US-094 | As an author, I want to specify a reference PPTX template so that export matches my branding | Backlog |
| US-095 | As an author, I want to export the deck to PDF so that I have a slide PDF alternative | Backlog |

*Story files to be created when EP-103 is prioritised.*

## Related

- [EP-108 Structural (Outline) Mode](EP-108-structural-outline-mode.md) — Same structure, different view; design together
- [ADR-0002 DOCX/PPTX Export](../../architectural/adrs/ADR-0002-docx-export-library-selection.md) — Pandoc PPTX as Phase 1 default
- [ADR-0006 Deck Mode and PPTX](../../architectural/adrs/ADR-0006-deck-mode-pptx-approach.md) — Slide-boundary mapping from headings
- [HLA Rendering Modes](../../architectural/hla.md) — Deck mode: landscape, slide-boundary-aware

---

*Previous: [EP-108](EP-108-structural-outline-mode.md) · Next: [EP-102](EP-102-rag-project-folder.md)*
