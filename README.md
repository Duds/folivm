# Folivm

> **Single brand: Folivm** — company, product, and document format.

An AI-native, ASCII-native document suite. One medium — Folivm — with three rendering modes: document, deck, and sheet. Every file is plain text, human-readable, diff-able, version-control friendly, and directly consumable by LLMs, with no conversion step. Export to DOCX, PPTX, PDF, and CSV is a compatibility rendering concern, not a format change.

## Project Status

🟡 **Phase 0 (PoC)** — Tauri desktop app scaffold; TipTap editor; project folder context; PDF/DOCX export. Format documentation drafted.

## Quick Navigation

| Area | Path | Status |
|------|------|--------|
| Problem Statement | [docs/strategic/problem-statement.md](docs/strategic/problem-statement.md) | 🔴 Draft |
| Solution Concept | [docs/strategic/solution-concept.md](docs/strategic/solution-concept.md) | 🔴 Draft |
| Options Analysis | [docs/strategic/options-analysis.md](docs/strategic/options-analysis.md) | ⚪ Stub |
| Business Case | [docs/strategic/business-case.md](docs/strategic/business-case.md) | ⚪ Stub |
| Benefits Map | [docs/strategic/benefits-map.md](docs/strategic/benefits-map.md) | ⚪ Stub |
| ConOps | [docs/conceptual/conops.md](docs/conceptual/conops.md) | 🔴 Draft |
| PRD (Lean) | [docs/conceptual/prd-lean.md](docs/conceptual/prd-lean.md) | 🔴 Draft |
| Principles | [docs/architectural/principles.md](docs/architectural/principles.md) | ⚪ Stub |
| HLA | [docs/architectural/hla.md](docs/architectural/hla.md) | ⚪ Stub |
| FRS | [docs/architectural/frs.md](docs/architectural/frs.md) | 🔴 Draft |
| NFRs | [docs/architectural/nfrs.md](docs/architectural/nfrs.md) | 🔴 Draft |
| Security & Data | [docs/architectural/security-data.md](docs/architectural/security-data.md) | 🔴 Draft |
| ADRs | [docs/architectural/adrs/](docs/architectural/adrs/) | 🔴 Draft |
| Operating Model | [docs/planning/operating-model.md](docs/planning/operating-model.md) | ⚪ Stub |
| Roadmap | [docs/planning/roadmap.md](docs/planning/roadmap.md) | ⚪ Stub |
| Release Plan | [docs/planning/release-plan.md](docs/planning/release-plan.md) | ⚪ Stub |
| Backlog | [docs/execution/backlog.md](docs/execution/backlog.md) | 🔴 Draft |
| Format Spec | [docs/format/README.md](docs/format/README.md) | 🔴 Draft |
| RAIDD | [docs/governance/raid.md](docs/governance/raid.md) | 🔴 Draft |
| OR Plan | [docs/operations/or-plan.md](docs/operations/or-plan.md) | ⚪ Stub |
| Service Acceptance | [docs/operations/service-acceptance.md](docs/operations/service-acceptance.md) | ⚪ Stub |

**Status legend:** 🔴 Draft in progress · 🟡 Under review · 🟢 Approved · ⚪ Stub/not started

## Concept Summary

Folivm addresses a gap that did not exist five years ago: the absence of a document suite built for workflows where LLMs are first-class participants. Every existing office suite optimises for human consumption and treats machine consumption as an afterthought. Folivm optimises for both simultaneously by making the canonical format — Folivm — serve both.

**One medium, three rendering modes.** A Folivm file is a sequence of typed cells: prose, data, formula, visual, frame, and media. The same file renders as a paginated document, a slide deck, or a structured sheet depending on the mode. There is no format conversion; the rendering contract changes, not the file.

**ASCII throughout.** Folivm is Pandoc's extended Markdown plus YAML frontmatter plus a typed cell vocabulary. Plain text, always. An LLM can generate it, read it, and transform it without conversion. A human can edit it with any text editor. Pandoc exports it to professional formats.

**The author-client distinction.** The Phase 0 user (the technical consultant) builds for clients who need familiar, professional output. The Folivm format is invisible to clients; they receive DOCX or PDF. The suite surface must eventually feel as familiar as Word — not because Word is right, but because familiarity is the adoption mechanism.

**Why Word was never ASCII.** In 1983, the only consumer of a document was a human or a printer. Binary formats were faster and smaller; no program needed to read document structure. Machine consumption did not exist as a design pressure. Folivm is built for the moment when machine consumption matters as much as human consumption.

## Quick Start

- **Run the app:** `npm install && npm run tauri dev` (requires [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) and [Pandoc](https://pandoc.org/))
- **[TODO](TODO.md)** — Immediate tasks and Phase 0 checklist
- **[Backlog](docs/execution/backlog.md)** — Epics and stories
- **[Format Spec](docs/format/README.md)** — Document format, frontmatter, project conventions

## Related Projects

- [BidWriter](../bid_writer/) — adjacent project, AI-assisted bid writing (potential overlap/synergy)
- [md_converter](../md_converter/) — Markdown conversion tooling (potential utility dependency)

---

*Project initiated: February 2026. Conversation context: Claude.ai exploration session.*
