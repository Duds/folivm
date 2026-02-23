---
title: EP-004 — Export to PDF and DOCX
project: Folivm
status: done
version: 0.1
created: 2026-02-20
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/strategic/solution-concept.md
---

# EP-004 — Author can export documents to professional PDF and DOCX without post-processing

## Outcome

The author exports the current document to PDF and DOCX with one click. Output is professional quality for the author's use case; no manual post-processing required. Pandoc performs the conversion; the author's print stylesheet and optional reference DOCX template control appearance.

## Scope

- One-click PDF export via Pandoc CLI
- One-click DOCX export via Pandoc CLI
- Author-configured print stylesheet (CSS) for PDF
- Optional reference DOCX template for DOCX styling
- pandoc-crossref or equivalent for captions and cross-references (if needed for Phase 0)
- Export to deliverables/ or user-chosen path

## Non-scope (Phase 0)

- PPTX export (Phase 1)
- Track-changes-compatible DOCX (Phase 2)

## Success Criteria

- Export completes in under 30 seconds for documents up to 50 pages
- PDF and DOCX output is acceptable for the author's client deliverables without manual fixing
- Stylesheet and reference DOCX are applied correctly

## Stories

| ID | Title | Status |
|----|-------|--------|
| [US-030](../stories/US-030-export-pdf.md) | As an author, I want to export the current document to PDF so that I can deliver it to my client | Done |
| [US-031](../stories/US-031-export-docx.md) | As an author, I want to export the current document to DOCX so that I can deliver it in Word format | Done |
| [US-032](../stories/US-032-reference-docx-template.md) | As an author, I want to specify a reference DOCX template so that DOCX export matches my branding | Done |
| [US-033](../stories/US-033-choose-export-path.md) | As an author, I want to choose the export path (default deliverables/) so that I control where files go | Not started |

## Related

- [Solution Concept](../../strategic/solution-concept.md) — Export pipeline
- [PRD Lean](../../conceptual/prd-lean.md) — FR-3 Export

---

*Previous: [EP-003](EP-003-project-folder-context.md) · Next: [EP-005](EP-005-llm-assistance.md)*
