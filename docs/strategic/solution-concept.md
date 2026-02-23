---
title: Solution Concept
project: Folivm
status: draft
version: 0.5
created: 2026-02-19
updated: 2026-02-20
author: Dale Rogers
depends_on:
  - docs/strategic/problem-statement.md
  - NOTES.md
---

# Solution Concept

## Core Insight — One Medium, Three Modes

Existing office suites are three separate products that share a file ecosystem. Folivm is one medium with three rendering modes. A Folivm file is a sequence of typed cells; the same file renders as a document, a deck, or a sheet depending on the mode selected. There is no format conversion. The rendering contract changes; the file does not.

The semantic structure that renders a polished PDF is the same structure an LLM can traverse and manipulate. Storage format, AI exchange format, and rendered output are one artefact. No conversion between what the AI knows, what the system stores, and what the user sees.

**The author-client distinction.** The Phase 0 user is a technical consultant producing deliverables for clients. The clients need familiar, professional output — DOCX, PDF, eventually PPTX. The Folivm format is invisible to them. The suite surface must eventually feel as familiar as Word, not because Word is right, but because familiarity is the adoption mechanism. The consultant is the translator between the ASCII-native authoring layer and the Office-native distribution layer.

**Why this is only possible now.** Word was never ASCII because in 1983, the only consumer of a document was a human or a printer. Machine consumption did not exist as a design pressure. LLMs have changed that. Machine consumption is now as important as human consumption, and they have opposite format preferences. Folivm optimises for both simultaneously by making the canonical format serve both.

---

## The Suite Vision — Cell Types and Rendering Modes

A Folivm file is a sequence of typed cells. Cell type determines how content is authored, how it behaves in the editor, and how it renders in each mode.

| Cell type | Purpose | Document mode | Deck mode | Sheet mode |
|-----------|---------|---------------|-----------|------------|
| **Prose** | Narrative text, Pandoc Markdown | Primary | Slide body, speaker notes | Annotation |
| **Data** | Tabular content with schema | Rendered as table | Rendered as table or chart | Primary |
| **Formula** | Computation referencing data cells | Evaluated at render | Evaluated at render | Primary |
| **Visual** | Declarative chart or diagram (Vega-Lite, Mermaid) | Embedded figure | Slide visual | Embedded |
| **Frame** | Slide boundary and layout hints | Invisible | Slide separator | Invisible |
| **Media** | Image or asset reference (path-based) | Embedded | Embedded | Embedded |

**Document mode** — portrait, paginated, prose-first. Frame cells are invisible; all content flows as a continuous document.

**Deck mode** — landscape, presentation-optimised. Frame cells become slide boundaries. The layout engine fits content between them. Content does not change; the rendering contract does.

**Sheet mode** — tabular-first. Data and formula cells are primary. Prose cells become documentation annotations alongside computed content — the Jupyter notebook model applied to structured data rather than code.

This architecture means a consultant's deliverable package — written report, supporting data analysis, client presentation — can share a single source of truth. Numbers on slide 14 are the same data cells as the table in section 4 of the report.

---

## The Format Decision — Folivm (Pandoc Markdown Extended)

The backing format is **Pandoc's extended Markdown** — named Folivm in this project — not a custom document object model. Pandoc already provides:

- **Fenced divs** for semantic blocks (callouts, executive summaries, sidebars)
- **YAML frontmatter** for document metadata
- **Footnotes, citations** (citeproc), **cross-references** (pandoc-crossref)
- **Multi-level lists, captions, tables**

No format invention is required. Documents are plain text, human-readable, diff-able, version-control friendly, and directly consumable by LLMs. Export to PDF and DOCX is a rendering step — Pandoc performs it — not a lossy conversion. See [NOTES.md](../../NOTES.md) — REFACTOR-PLAN session (2026-02-20) for the rationale that superseded the custom DOM approach.

**Styling.** Style is applied via Pandoc's element vocabulary (`h1`–`h6`, `p`, `ul`/`ol`, `blockquote`, `table`, etc.) plus custom semantic divs (`.callout`, `.executive-summary`) where meaning exceeds structure. Multi-level heading numbering uses CSS counters. Phase 0: single print stylesheet; Phase 2: full brand manifest.

---

## Export Fidelity Gradient

Export to Office formats is compatibility translation, not mode switching. The fidelity varies by format and is honest about its limits.

| Export | Fidelity | Notes |
|--------|----------|-------|
| **PDF** | High | Print stylesheet (CSS) is authoritative; output is deterministic and fully controlled |
| **DOCX** | High | Reference DOCX template maps semantic elements to Word styles; primary compatibility format |
| **PPTX** | Medium | Structural fidelity (right content, right slides); layout is best-effort via reference template |
| **XLSX** | Low | Data and formula cells only; prose context is lost or degraded; compatibility artefact |
| **CSV** | Clean | Data cells only; no loss; first-class export path for tabular data |

The Office file is never the source of truth. Folivm owns the authoring position; Office owns final-mile distribution. Clients consume and annotate the exported artefact; feedback is incorporated back into the Folivm source. This is the InDesign model.

**XLSX caveat.** Excel's formula engine and Folivm's formula layer have different execution models and different formula languages. XLSX export requires a translation layer that is imperfect by design. Do not design XLSX export until sheet mode is validated with real users.

---

## Three-Phase Structure

| Phase | Scope | Mode introduced | Success Criteria |
|-------|-------|-----------------|------------------|
| **Phase 0** | Personal tool (weeks) | Document mode | The author uses Folivm for their next real client deliverable instead of VS Code + manual pandoc |
| **Phase 1** | Shareable tool (months) | Deck mode | Validates whether the problem is shared; adds what small teams need |
| **Phase 2** | Product (years) | Sheet mode | Enterprise features: brand governance, clause library, government market, server-hosted deployment |

Phase 0 is weeks of scope, not months or years. Build it; use it; then decide what to extend. Server-hosted deployment, clause library, and brand manifest are Phase 1+.

---

## Phase 0 Architecture

### Project Folder Schema

Documents live in projects. A project folder:

| Folder | Purpose |
|--------|---------|
| `inputs/` | Transcripts, research, source material |
| `working/` | Rough notes, drafts in progress |
| `context/` | Brief, constraints, project parameters |
| `deliverables/` | Final documents ready for export |

The LLM has access to all layers. Full RAG is Phase 1; the folder schema and context loading are Phase 0.

### GUI Layer

- **Editor:** TipTap (ProseMirror-based) with custom node types for Pandoc semantic blocks (`:::callout`, `:::executive-summary`, etc.). See [ADR-0004](../architectural/adrs/ADR-0004-tiptap-editor-framework.md).
- **Desktop:** Tauri. See [ADR-0003](../architectural/adrs/ADR-0003-tauri-desktop-framework.md).
- **Behaviour:** Produces valid Pandoc Markdown; round-trip editing preserves structure.

### Export Pipeline

Pandoc CLI for PDF and DOCX. A print stylesheet (CSS) the author controls. Optional reference DOCX template. Filters such as pandoc-crossref. Export is deterministic and reproducible.

### LLM Integration

Direct API calls with project context (brief, selected files from `inputs/` and `context/`). No RAG yet. The LLM receives document content plus chosen project files on each request.

---

## Phase 2 Vision (Deferred, Not Abandoned)

- **Brand manifest** — Semantic roles mapped to visual properties; swappable without touching documents.
- **Clause library** — Deterministic insertion of approved content; assembly engine; fixed vs variable zones.
- **Server-hosted deployment** — Collaboration, DMS integration (iManage → NetDocuments → Content Manager), multi-tenancy.
- **Government market** — IRAP, ISM, procurement; pluggable LLM provider with Azure Australia East for data sovereignty.

The architecture extends into Phase 1 and Phase 2 without fundamental rework. Pandoc Markdown is the stable foundation.

---

## Competitive Position

Folivm does not replace Word. It occupies the authoring position; Office formats remain the distribution standard. Create and edit in Folivm; export to DOCX/PDF for delivery. This is the InDesign model.

**Phase 0 advantage:** A Pandoc GUI editor that does not exist elsewhere, built for the new LLM-assisted consulting workflow user class.

**Phase 2 advantage:** Every document is a structured AI knowledge asset; the platform compounds in value at organisational scale. An organisation using Folivm has, as a side effect, a semantically tagged institutional knowledge corpus that is immediately queryable by AI.

**Strategic caveat:** Technical superiority is necessary but not sufficient. Distribution and adoption matter (see the WordPerfect lesson in [NOTES.md](../../NOTES.md)). The go-to-market must be "the authoring environment for documents that get exported to Word" — not "replace Word."

---

## Open Questions

- Cross-reference: [NOTES.md](../../NOTES.md) open questions (branding, monetisation, open source format strategy).

**Resolved — Export fidelity target:** Client deliverable quality (particularly PDF); relatively true to the GUI representation, similar to Word or Google Docs. See [PRD NFRs](../conceptual/prd-lean.md#non-functional-requirements).

---

*Previous: [Problem Statement](problem-statement.md) · Next: [Options Analysis](options-analysis.md)*
