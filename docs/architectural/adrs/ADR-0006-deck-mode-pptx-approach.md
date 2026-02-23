---
title: ADR-0006 — Deck Mode and PPTX Approach
project: Folivm
status: proposed
version: 0.1
created: 2026-02-23
depends_on:
  - docs/architectural/adrs/ADR-0002-docx-export-library-selection.md
  - docs/architectural/adrs/ADR-0005-outline-mode-implementation.md
  - docs/execution/epics/EP-103-deck-mode-pptx-export.md
  - docs/architectural/hla.md
---

# ADR-0006 — Deck Mode and PPTX Approach

## Status
Proposed

## Context

Folivm Phase 1 introduces deck mode per [EP-103](../execution/epics/EP-103-deck-mode-pptx-export.md). The document is rendered as a slide deck; headings define slide boundaries. Export to PPTX is required. [ADR-0002](ADR-0002-docx-export-library-selection.md) recommends Pandoc PPTX as the Phase 1 default.

Decisions needed: (1) how headings map to slides, (2) how deck mode renders in the editor, (3) export pipeline for PPTX.

## Decision

**Slide-boundary mapping:** H1 headings start a new slide by default. Content between H1s (including H2–H4 and body) belongs to the preceding slide. Configurable: optionally H2 = new slide for finer-grained decks. The mapping is consistent with outline mode (EP-108): the heading hierarchy is the structural spine; deck mode interprets it as slides.

**Deck mode rendering:** A dedicated view component (analogous to outline mode per [ADR-0005](ADR-0005-outline-mode-implementation.md)) that renders the document as slides. Each slide is a panel/card; the author edits content in-place. The same ProseMirror document state; different rendering contract.

**PPTX export:** Use Pandoc's native PPTX output. Invoke Pandoc with `-t pptx` (or equivalent). Optional reference PPTX template for styling (analogous to reference DOCX). If Pandoc PPTX proves insufficient for representative use cases, revisit python-pptx as a fallback — but that decision is Phase 1 validation, not upfront.

## Rationale

### Slide-Boundary Mapping

| Option | Pros | Cons |
|--------|------|------|
| **H1 = new slide** | Simple; aligns with "one main topic per slide"; common in consulting decks | Deep documents (many H2s under one H1) yield few slides |
| **H2 = new slide** | Finer granularity; more slides per document | May fragment content; less intuitive for report-style docs |
| **Configurable (H1 or H2)** | Flexibility | Adds UX and config; can be Phase 1+ refinement |
| **Horizontal rule as slide break** | Explicit author control | Diverges from heading-as-structure; not aligned with outline/deck shared spine |

**Recommendation:** H1 = new slide as default. Document structure (H1 = section) maps naturally to slide structure (one slide per section). H2–H4 become sub-headings or bullet content within the slide. If validation shows H2-as-slide is commonly needed, add a document or project-level option.

### Deck Mode View

Same pattern as outline mode: a view component that reads ProseMirror state and renders differently. Deck view iterates over "slide" segments (content between H1s), renders each as a slide-like panel. In-place editing uses the same TipTap/ProseMirror editor, scoped to the visible slide or with the full doc and slide boundaries indicated. Exact UX (single-slide focus vs. full deck scroll) is an implementation detail; the architectural point is one document, multiple views.

### PPTX Export

ADR-0002 already specifies Pandoc PPTX. Pandoc supports `---` (horizontal rule) as slide breaks and heading levels for structure. Markdown → PPTX is a well-trodden path (Marp, Slidev, Reveal.js use similar models). Reference PPTX template controls master layouts, fonts, colours. Validate with real decks before considering python-pptx.

## Consequences

**Positive:**
- Consistent with ADR-0002; single export engine (Pandoc)
- Heading-based slide mapping aligns with outline mode; same structure, different view
- Reference PPTX template gives authors control over styling

**Negative:**
- Pandoc PPTX fidelity ceiling unknown; RAID R-009 (deck mode visual quality) remains until validated
- Complex slide layouts (multi-column, custom graphics) may require manual post-processing

**Neutral:**
- If Pandoc PPTX insufficient, python-pptx fallback is a Phase 1 scope decision

## Related

- [ADR-0002 DOCX/PPTX Export](ADR-0002-docx-export-library-selection.md) — Pandoc PPTX as default
- [ADR-0005 Outline Mode](ADR-0005-outline-mode-implementation.md) — View component pattern
- [EP-103 Deck mode](../execution/epics/EP-103-deck-mode-pptx-export.md) — Epic
- [HLA Rendering Modes](../hla.md) — Deck mode: landscape, slide-boundary-aware

---

*Previous: [ADR-0005](ADR-0005-outline-mode-implementation.md) · Next: [Backlog](../execution/backlog.md)*
