---
title: ADR Log
project: Folivm
status: draft
version: 0.1
created: 2026-02-19
depends_on:
  - docs/architectural/hla.md
  - docs/architectural/principles.md
---

# Architecture Decision Record (ADR) Log

This directory contains Architecture Decision Records for Folivm. ADRs capture material architectural and technology decisions with context, rationale, and consequences. Use the template for new ADRs and add entries to this log.

## How to add an ADR

1. Copy `ADR-0000-template.md` to `ADR-NNNN-[short-title].md` (e.g. `ADR-0001-llm-provider-pluggability.md`).
2. Replace the placeholder content; keep Status, Context, Decision, Rationale, Consequences, Related.
3. Add the new ADR to the table below and link from the RAIDD log or related docs if appropriate.

## ADR index

| ADR | Title | Status | Date |
|-----|--------|--------|------|
| [ADR-0000](ADR-0000-template.md) | ADR Template | Template | 2026-02-19 |
| [ADR-0001](ADR-0001-llm-provider-pluggability.md) | LLM provider pluggability and data sovereignty | Proposed | 2026-02-20 |
| [ADR-0002](ADR-0002-docx-export-library-selection.md) | DOCX/PPTX export library selection | Proposed | 2026-02-20 |
| [ADR-0003](ADR-0003-tauri-desktop-framework.md) | Tauri for desktop framework | Accepted | 2026-02-20 |
| [ADR-0004](ADR-0004-tiptap-editor-framework.md) | TipTap for editor framework | Accepted | 2026-02-20 |

## Required before milestones

- **Before any government pilot:** ADR-0001 (LLM provider pluggability and Australian-region deployment) must be accepted. See [RAIDD](../../governance/raid.md) issue I-002 and NOTES.md.
- **Before export pipeline build:** ADR-0002 (export library selection) should be accepted.

## Related

- [RAIDD Log](../../governance/raid.md) — Decisions (DEC-*) and Issues (I-002, I-005) reference ADRs.
- [Principles](../principles.md) — Architectural principles that ADRs should align with.
- [HLA](../hla.md) — High-level architecture; key technology decisions pending ADRs.
- [FRS](../frs.md), [NFRs](../nfrs.md) — Functional and non-functional requirements specifications.

---

*Previous: [HLA](../hla.md) · Next: [NFRs](../nfrs.md)*
