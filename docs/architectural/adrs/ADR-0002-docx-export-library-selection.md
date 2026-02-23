---
title: ADR-0002 — DOCX/PPTX Export Library Selection
project: Folivm
status: proposed
version: 0.1
created: 2026-02-20
author: Dale Rogers
depends_on:
  - docs/architectural/hla.md
  - docs/architectural/principles.md
  - docs/conceptual/prd-lean.md
  - docs/strategic/solution-concept.md
---

# ADR-0002 — DOCX/PPTX Export Library Selection

## Status
Proposed

## Context

Folivm must export documents to DOCX (Phase 0) and PPTX (Phase 1+). Export fidelity is a product requirement: output must be professionally acceptable without manual correction (see [principles](../principles.md) and [PRD NFRs](../../conceptual/prd-lean.md)).

The export pipeline choice affects:
- Quality and fidelity of output
- Implementation complexity
- Ability to meet client deliverable standards
- Risk profile (RAID R-001, R-007: export fidelity)

Phase 0 scope: PDF and DOCX only. PPTX is Phase 1+. The backing format is Pandoc Markdown; the export engine must consume Markdown and produce DOCX (and later PPTX).

RAIDD issue I-005 and dependency D-002 block export pipeline implementation until this decision is made.

## Decision

**Phase 0: Pandoc-only for PDF and DOCX export.** Use the Pandoc CLI with a reference DOCX template and print stylesheet (CSS). Do not add python-docx or python-pptx for Phase 0. If a technical spike or user validation shows Pandoc DOCX output insufficient for professional use, reassess and consider python-docx as a post-processing layer before Phase 0 completion.

**Phase 1+ (PPTX):** Use Pandoc's native PPTX output as the default. Revisit python-pptx only if Pandoc PPTX proves insufficient for representative slide deck use cases.

## Rationale

### Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| **Pandoc-only** | Single tool; mature DOCX/PDF output; reference DOCX template controls styles; no Python dependency in Tauri stack; Markdown→DOCX is Pandoc's core strength | May lack fine-grained control; fidelity ceiling unknown until validated |
| **Pandoc + python-docx post-processing** | Can patch Pandoc output; programmatic control over elements | Adds Python dependency to Tauri app (subprocess or separate service); complexity; two conversion steps |
| **python-docx / python-pptx from scratch** | Full programmatic control | Would require Markdown→DOCX conversion logic; reinvents what Pandoc does; high effort |
| **Lua filters + Pandoc** | Extend Pandoc without new languages | More complex pipeline; Lua learning curve; still Pandoc-centric |

### Why Pandoc-Only for Phase 0

1. **Single conversion path.** Pandoc converts Markdown to DOCX and PDF in one step. A reference DOCX template provides styling (fonts, margins, heading styles). The author tunes the template; output quality is under their control. Adding python-docx would introduce a second conversion stage and a Python runtime in a Tauri (Rust) app — architecturally awkward.

2. **Pandoc DOCX is mature.** Pandoc's DOCX output is widely used (academia, technical writing, Quarto). It supports styles, tables, footnotes, and cross-references. The fidelity ceiling is unknown until validated against Phase 0 document types (consulting report, board paper). Principle: "Solve your own problem first." Validate with Pandoc before adding complexity.

3. **Reference DOCX template.** Pandoc accepts a reference DOCX; it applies that document's styles to the output. This is the standard approach for professional DOCX from Markdown. Investment in a well-crafted reference template may obviate the need for python-docx entirely.

4. **Phase 0 scope discipline.** The PRD requires "deliverable as-is without manual post-processing." If Pandoc + reference DOCX achieves that for the author's use case, Phase 0 succeeds. If not, the technical spike (RAID R-001 mitigation) will surface the gap before commitment. Defer python-docx until evidence demands it.

5. **No Python in Phase 0 Tauri stack.** Tauri is Rust + WebView. Invoking Pandoc (CLI) is straightforward. Adding Python for python-docx would require bundling a Python runtime or calling an external service — both add operational and packaging complexity.

### Why Revisit python-docx if Needed

If validation shows Pandoc DOCX output lacks required fidelity (e.g. complex tables, specific style behaviour, Track Changes markup on export), python-docx could be used as a post-processor: Pandoc produces DOCX; a Python script modifies it. That would be a deliberate Phase 0 extension, not the default.

### Phase 1+ PPTX

Pandoc supports PPTX output. Slide decks from Markdown are a common use case (Marp, Slidev, Reveal.js). For Phase 1, use Pandoc's PPTX engine. If slide-specific requirements (master layouts, complex graphics, animations) are not met, python-pptx is the fallback — but that decision is Phase 1 scope, not Phase 0.

## Consequences

**Positive:**
- Single export path; no Python dependency in Phase 0
- Pandoc is battle-tested; reference DOCX template is the standard approach
- Unblocks export pipeline implementation (resolves I-005, D-002)
- Keeps Phase 0 scope tight; reassess if fidelity is insufficient

**Negative:**
- Pandoc DOCX fidelity ceiling is unvalidated; RAID R-001 and R-007 remain until spike completes
- If Pandoc proves insufficient, adding python-docx later requires design work (subprocess vs service, packaging)

**Neutral:**
- PPTX deferred to Phase 1; no impact on Phase 0
- Principle "Export fidelity is a product requirement" is satisfied by committing to validate and reassess — not by adding complexity pre-emptively

## Related

- [HLA](../hla.md) — Export Pipeline; open question on python-docx/python-pptx
- [Principles](../principles.md) — Export fidelity is a product requirement
- [PRD Lean](../../conceptual/prd-lean.md) — Export requirements; NFRs
- [RAIDD](../../governance/raid.md) — I-005, D-002 (export library); R-001, R-007 (export fidelity risks)

---

*Previous: [ADR-0001](ADR-0001-llm-provider-pluggability.md) · Next: [ADR-0003](ADR-0003-tauri-desktop-framework.md)*
