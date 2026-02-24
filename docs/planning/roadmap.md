---
title: Roadmap
project: Folivm
status: draft
version: 0.5
created: 2026-02-19
updated: 2026-02-25
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/planning/operating-model.md
---

# Roadmap

Folivm is sequenced into four phases. Each phase has explicit success criteria and exit conditions — what must be true before moving to the next phase.

**Horizon framing.** Durations are indicative. Phase 0 is weeks of scope; Phases 1–3 are months to years. Dates are deliberately omitted until operating model and release cadence are established. The roadmap ties horizons to capability outcomes, not feature checklists.

**Mode sequencing.** Each phase introduces one rendering mode. Phase 0 — document mode. Phase 1 — deck mode. Phase 2 — sheet mode. This sequencing reflects export fidelity achievability (DOCX is highest, PPTX medium, XLSX requires the most novel work) and validates each mode before introducing the next.

---

## Phase 0 — Personal Tool (weeks)

**Scope.** A professional-grade Pandoc Markdown GUI editor that produces high-quality PDF (and optionally DOCX) via Pandoc. Local-first. Single author. Project-aware. The author solves their own problem first.

**Capabilities.**
- Rich Markdown editor (TipTap/ProseMirror) with Pandoc semantic block support
- Project folder schema (inputs/, working/, context/, deliverables/); optional config override (e.g. `Folivm.yaml`) for custom structure
- Print stylesheet (CSS) and optional reference DOCX template
- One-click export to PDF and DOCX
- LLM assistance with project context (direct API calls, no RAG)
- Format documentation (Folivm frontmatter schema, project conventions) for portability and tool interop — Phase 0 readiness deliverable, not deferred

**Success criteria.** The author uses Folivm for their next real client deliverable instead of VS Code + manual pandoc.

**Phase 0 progress (2026-02-25).** Core capabilities implemented: Tauri shell (EP-006), project folder (EP-003), rich editor with WYSIWYG (EP-001, EP-002), PDF/DOCX export with Pandoc path fallback (EP-004), format documentation (EP-007), UI scaffold (EP-008), LLM assistance (EP-005), search/find-replace (US-091) with project results and file links, explorer drag-and-drop (US-090), native application menu (EP-109), empty editor canvas (EP-110), autosave, reference DOCX, preview mode zoom. Architecture: SAD (Software Architecture Document) added at [docs/architecture/sad.md](../architecture/sad.md). **Backlog:** Document tabs (EP-111), AI assistant as extension (EP-112). Ready for author validation workflow.

**Exit conditions (before Phase 1).**
- Author has delivered at least one real client document using Folivm
- Export quality (PDF/DOCX) is acceptable without post-processing for the author's use case
- No blocking bugs or UX failures that force reversion to the old workflow
- Decision made: proceed to Phase 1 or iterate on Phase 0

**Phase 0 backlog (UX polish, sequencing TBD).**
- **EP-109** Native application menu — Done. Help menu: Keyboard Shortcuts modal, Documentation and Support links. Close tab blocked on EP-111.
- **EP-110** Empty editor canvas — Done. Folivm watermark and keyboard shortcut list when no doc open.
- **EP-111** Document tabs — open multiple documents in tabs
- **EP-112** AI assistant as extension — refactor LLM panel to optional extension; addresses thin cloud vs API tokens (users who don't want API keys get lean core)

---

## Phase 1 — Shareable Tool (months)

**Scope.** Polish, project-context awareness (RAG over project folder), deck mode, initial sharing. Validates whether the problem is shared by others.

**Capabilities (proposed).**
- RAG over project folder (retrieval, summarisation of inputs)
- User-defined project conventions (UX for choosing and defining folder structure when creating projects)
- Templated conventions for different workflows (consulting report, legal matter, government submission)
- Sharing with a small team or early adopters
- Possibly: server-hosted or sync option
- **Deck mode** — frame cells as slide boundaries; presentation rendering; PPTX export at structural fidelity
- Refined UX based on Phase 0 usage

**Success criteria.** At least one other user (besides the author) uses Folivm for a real deliverable.

**Exit conditions (before Phase 2).**
- Problem validated as shared; demand for enterprise features is clear
- Architecture supports extension to clause library, brand manifest, server-hosted
- Decision made: proceed to Phase 2 or sustain Phase 1

### Phase 1 Epic Order

| Order | Epic | Rationale |
|-------|------|-----------|
| 1 | EP-108 Structural (outline) mode | Core workflow; validates heading model before deck; LLM "suggest outline" landing surface |
| 2 | EP-103 Deck mode + PPTX export | Same structure as outline (headings = slides); designed with EP-108 |
| 3 | EP-102 RAG over project folder | Enhances LLM context; independent of outline/deck |
| 4 | EP-107 Templated project conventions | Builds on EP-003, EP-007; can run in parallel with EP-102 |
| 5–7 | EP-104, EP-105, EP-106 | Server/sync, Folivm AI, Folivm Sync — infrastructure; defer or parallelise based on success criteria |

Epic details: [Backlog Phase 1+](../execution/backlog.md).

### Phase 1 Readiness Checklist (when Phase 0 exits)

**Documentation**
- [x] Phase 1 PRD extension (scope, success criteria)
- [x] FRS Phase 1 extension (FR-6.x outline, FR-7.x deck, FR-8.x RAG, FR-9.x conventions)
- [x] Epic files for EP-102, EP-103, EP-107, EP-108
- [x] Story decomposition for EP-108 (US-080–086)

**Architecture**
- [x] ADR for outline mode implementation ([ADR-0005](../architectural/adrs/ADR-0005-outline-mode-implementation.md))
- [x] ADR for deck/PPTX approach ([ADR-0006](../architectural/adrs/ADR-0006-deck-mode-pptx-approach.md))
- [x] RAG architecture documented ([rag-architecture.md](../architectural/rag-architecture.md))

**Infrastructure (if Phase 1 targets distribution)**
- [ ] Signed installer, auto-update, product website
- [ ] Licence management (e.g. Paddle)
- [ ] Folivm AI proxy (if Tier 2 in scope)

---

## Phase 2 — Professional (months to years)

**Scope.** Enterprise features: brand governance, clause library, assembly engine, sheet mode. Government and professional services market.

**Capabilities (proposed).**
- **Sheet mode** — data and formula cells as primary; prose cells as documentation annotations; Jupyter-style literate sheet
- XLSX export (compatibility, known fidelity limitations) and CSV export (clean, first-class)
- Brand manifest (versioned, multi-brand)
- Clause library and assembly engine — onboarding via structured engagement (Folivm or certified partner); self-service import as Tier 2 feature
- Server-hosted deployment
- DMS integration in priority order: iManage → NetDocuments → HP TRIM/Content Manager
- Accessibility (PDF/UA, WCAG 2.1 AA for editor)
- Government security (ISM, IRAP)

**Success criteria.** First reference customers (professional services firm or government agency) using Folivm for production documents.

**Exit conditions (before Phase 3).**
- Product-market fit demonstrated in target segment
- Scalable deployment and support model in place

---

## Phase 3 — Platform (years)

**Scope.** Marketplace, API, advanced collaboration, analytics.

**Capabilities (proposed).**
- Theme and clause library marketplace
- API for third-party integration
- Advanced collaboration (real-time or richer branch/merge)
- Analytics and document intelligence

**Success criteria.** Folivm is a platform others build on; revenue and adoption support ongoing investment.

---

## Phase Summary

| Phase | Duration | Primary outcome |
|-------|----------|-----------------|
| Phase 0 | Weeks | Author uses Folivm for real client deliverable |
| Phase 1 | Months | Problem validated as shared; others adopt |
| Phase 2 | Months–years | Enterprise customers; clause library; server-hosted |
| Phase 3 | Years | Platform; marketplace; ecosystem |

---

## Open Questions

1. **Release cadence.** Operating model is still a stub. Once team structure and release cadence are defined, the roadmap can be tied to concrete milestones.
2. **Phase 1 server vs sync.** NOTES records server-hosted as primary for target market; local-first is Phase 0 only. Phase 1 "server-hosted or sync option" needs refinement once Phase 0 validates adoption.
3. **Phase 2 timing.** Clause library onboarding (structured engagement vs self-service) and minimum viable document type set (three full, three to five skeleton) are decided in NOTES; the roadmap should align with those when Phase 2 planning begins.

---

*Previous: [Operating Model](operating-model.md) · Next: [Release Plan](release-plan.md) · See also: [PRD Lean](../conceptual/prd-lean.md), [Backlog](../execution/backlog.md), [UI Scaffold Prompt](../execution/ui-scaffold-prompt.md)*
