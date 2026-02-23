---
title: Functional Requirements Specification
project: Folivm
status: draft
version: 0.1
created: 2026-02-20
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/conceptual/conops.md
---

# Functional Requirements Specification

This document formalises the functional requirements for Folivm Phase 0 and Phase 1. Requirements are derived from the [PRD (Lean)](../conceptual/prd-lean.md) and maintain traceability via the FR-ID scheme.

---

## Scope

**Phase 0.** The personal tool. The author produces client-ready PDF (and optionally DOCX) from Pandoc Markdown without manual post-processing.

**Phase 1.** The shareable tool. Structural mode, deck mode, RAG over project folder, templated conventions. See [Roadmap Phase 1](../planning/roadmap.md).

---

## 1. Project and Document Management

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-1.1 | The system shall support creating a new project with the standard folder schema (inputs/, working/, context/, deliverables/). | Must | Create project; verify folder structure exists |
| FR-1.2 | The system shall allow opening a document from a project and saving changes to the same file. | Must | Open, edit, save; verify file content persists |
| FR-1.3 | The system shall persist documents as Pandoc Markdown with YAML frontmatter. | Must | Inspect saved file; validate syntax |

*Source.* [PRD § Project and Document Management](../conceptual/prd-lean.md#project-and-document-management)

---

## 2. Authoring

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-2.1 | The editor shall support Pandoc fenced divs for at least callout and executive summary (or equivalent semantic blocks). | Must | Insert blocks; round-trip to Markdown; re-open preserves structure |
| FR-2.2 | The editor shall support headings (H1–H4), lists, tables, and footnotes as per Pandoc extended Markdown. | Must | Insert each element; export to PDF/DOCX; verify output |
| FR-2.3 | The editor shall provide a print preview that approximates the final PDF appearance. | Must | Compare preview to exported PDF; structural match |

*Source.* [PRD § Authoring](../conceptual/prd-lean.md#authoring)

---

## 3. Export

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-3.1 | The system shall export the current document to PDF using Pandoc and the author-configured print stylesheet. | Must | Export; verify PDF renders; stylesheet applied |
| FR-3.2 | The system shall export the current document to DOCX using Pandoc and an optional reference DOCX template. | Must | Export with and without template; verify DOCX opens in Word |
| FR-3.3 | Export shall complete without manual post-processing; the output shall be deliverable as-is for the author's use case. | Must | End-to-end: author document → export → deliver; no manual correction |

*Source.* [PRD § Export](../conceptual/prd-lean.md#export)

---

## 4. LLM Integration

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-4.1 | The system shall support on-demand LLM assistance. The user initiates each request. | Must | Invoke assistance; verify no automatic calls |
| FR-4.2 | Each LLM request shall include the current document content and selected project context (brief, files from inputs/ or context/). | Must | Inspect request payload; verify context inclusion |
| FR-4.3 | AI-generated content shall be presented as a suggestion; the user must explicitly accept before it enters the document. | Must | Generate content; verify document unchanged until user accepts |

*Source.* [PRD § LLM Integration](../conceptual/prd-lean.md#llm-integration)

---

## 5. Deployment

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-5.1 | The application shall run as a desktop application (Electron or Tauri). No server or cloud dependency for core operation. | Must | Run offline; create, edit, save, export without network |
| FR-5.2 | Documents shall be stored as plain-text files in the project folder. No database or proprietary storage. | Must | Inspect project folder; files are .md with readable content |

*Source.* [PRD § Deployment](../conceptual/prd-lean.md#deployment)

---

## 6. Structural (Outline) Mode — Phase 1

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-6.1 | The system shall provide a structural (outline) mode that displays H1–H4 headings as a collapsible, indented hierarchy with body text hidden. | Must | Switch to structural mode; verify hierarchy display |
| FR-6.2 | The author shall be able to reorder, promote, and demote headings in structural mode; changes shall update the underlying Folivm source. | Must | Reorder, promote, demote; verify Markdown updated |
| FR-6.3 | The author shall be able to switch between document and structural mode; all structural changes shall be preserved. | Must | Make structural changes; switch modes; verify preservation |
| FR-6.4 | LLM assistance shall be available in structural mode (suggest outline, restructure, add missing sections). | Must | Invoke LLM in structural mode; verify suggestions |

*Source.* [PRD § Phase 1 — Structural Mode](../conceptual/prd-lean.md#structural-outline-mode--fr-6x). *Epic.* [EP-108](../execution/epics/EP-108-structural-outline-mode.md).

---

## 7. Deck Mode and PPTX Export — Phase 1

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-7.1 | The system shall provide a deck mode that renders the document as a slide deck; headings shall define slide boundaries. | Must | Switch to deck mode; verify slide boundaries |
| FR-7.2 | The system shall export the current document to PPTX using Pandoc (or fallback per ADR). | Must | Export to PPTX; verify output opens in PowerPoint/Keynote |
| FR-7.3 | The author may specify an optional reference PPTX template for styling. | Should | Export with template; verify styling applied |

*Source.* [PRD § Phase 1 — Deck Mode](../conceptual/prd-lean.md#deck-mode-and-pptx-export--fr-7x). *Epic.* [EP-103](../execution/epics/EP-103-deck-mode-pptx-export.md).

---

## 8. RAG over Project Folder — Phase 1

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-8.1 | The system shall index project folder contents (inputs/, working/, context/) for retrieval. | Must | Add files to project; verify index updates |
| FR-8.2 | Each LLM request shall automatically include relevant retrieved chunks from the project folder. | Must | LLM request; inspect payload; verify retrieved context |
| FR-8.3 | The author shall be able to configure exclusions (folders or files) from RAG indexing. | Should | Exclude folder; verify not in index/retrieval |

*Source.* [PRD § Phase 1 — RAG](../conceptual/prd-lean.md#rag-over-project-folder--fr-8x). *Epic.* [EP-102](../execution/epics/EP-102-rag-project-folder.md).

---

## 9. Templated Project Conventions — Phase 1

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-9.1 | The system shall provide workflow templates (e.g. consulting report, legal matter, government submission) when creating a project. | Must | Create project; verify template selection available |
| FR-9.2 | A template shall apply the correct folder structure and optional default context files. | Must | Create from template; verify structure and files |

*Source.* [PRD § Phase 1 — Templated Conventions](../conceptual/prd-lean.md#templated-project-conventions--fr-9x). *Epic.* [EP-107](../execution/epics/EP-107-templated-project-conventions.md).

---

## Traceability to Backlog

| FR | Epic(s) |
|----|---------|
| FR-1.x | EP-003 Project folder context, EP-006 Tauri desktop shell |
| FR-2.x | EP-001 Rich Markdown editor, EP-002 Element-based styling & preview |
| FR-3.x | EP-004 Export PDF and DOCX |
| FR-4.x | EP-005 LLM assistance |
| FR-5.x | EP-006 Tauri desktop shell |
| FR-6.x | EP-108 Structural (outline) mode |
| FR-7.x | EP-103 Deck mode + PPTX export |
| FR-8.x | EP-102 RAG over project folder |
| FR-9.x | EP-107 Templated project conventions |

---

## Open Questions

1. **Minimum semantic block set.** FR-2.1 specifies callout and executive summary. Are additional fenced div types required for Phase 0? See [PRD Open Questions](../conceptual/prd-lean.md#open-questions).
2. **Reference DOCX format.** FR-3.2 allows optional reference DOCX. What schema or conventions must the reference template follow?

---

*Previous: [PRD (Lean)](../conceptual/prd-lean.md) · Next: [Backlog](../execution/backlog.md) · See also: [NFRs](nfrs.md) · [HLA](hla.md)*
