---
title: RAIDD Log
project: Folivm
status: draft
version: 0.2
created: 2026-02-19
updated: 2026-02-23
depends_on:
  - docs/strategic/solution-concept.md
  - docs/conceptual/conops.md
  - docs/conceptual/prd-lean.md
  - docs/execution/ui-scaffold-prompt.md
  - NOTES.md
---

# RAIDD Log

**Risks, Assumptions, Issues, Dependencies, and Decisions**

This document is generated from `docs/governance/raidd/*.yaml` (RAIDD as code). Edit the YAML source and run `python scripts/generate_raidd.py` to regenerate. Be honest about likelihood and impact; avoid defaulting everything to "medium". Flag which assumptions are validated vs unvalidated.

---

## Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status | Date Added |
| ---- | ----- | ------------ | ------ | ----------- | ----- | ------ | ----------- |
| R-001 | DOCX/PPTX export fidelity insufficient for professional use (manual correction required) | High | Critical | Technical spike against a real client document type (e.g. advisory report or board paper) before any external commitment on quality; validate print stylesheet and reference template thoroughly | TBD | Open | 2026-02-19 |
| R-002 | LLM hallucination in clause-adjacent or variable content | Medium | High | Deterministic clause insertion only; human confirmation for all AI-generated content; AI scoped to variable zones only | TBD | Open | 2026-02-19 |
| R-003 | Behaviour change resistance — users revert to ad hoc formatting | Low | Low | Phase 1+ risk; primary user is also designer in Phase 0, so resistance is minimal. For Phase 1+: template-first UX; style picker primary; character formatting behind friction notice | TBD | Open | 2026-02-19 |
| R-004 | Microsoft adds competing AI-native document mode to Word | Medium | High | Accelerate time to market; deepen vertical integration and compliance story; InDesign positioning (authoring vs distribution) | TBD | Open | 2026-02-19 |
| R-005 | Government procurement delayed by security certification (ISM, IRAP) | High | Medium | Phase 2 risk; not relevant to Phase 0 or Phase 1. Complete ADR for LLM provider and data sovereignty before government engagement; plan certification into roadmap | TBD | Open | 2026-02-19 |
| R-006 | Clause library onboarding friction slows initial sales | Medium | Medium | Validate with 1–2 target accounts; define pricing and partner model before go-to-market | TBD | Open | 2026-02-19 |
| R-007 | Pandoc + CSS print stylesheet does not produce professional-quality PDF without significant investment | Medium | High | Technical spike against a real client document type before claiming export quality; budget time for stylesheet iteration; evaluate Lua filters and pandoc-crossref early | TBD | Open | 2026-02-22 |
| R-008 | TipTap WYSIWYG rendering of Pandoc fenced divs (:::callout, :::executive-summary) is non-trivial; custom ProseMirror nodes may be brittle or incomplete | Medium | High | Build a focused PoC for the two or three most important semantic block types before committing to TipTap; assess Slate and Lexical as alternatives if PoC reveals blocking limitations | TBD | Open | 2026-02-22 |
| R-009 | Deck mode (Phase 1) visual quality insufficient for client deliverables; clients expect Figma/Canva production quality | High | Medium | Set honest expectations: deck mode provides structural fidelity (right content, right slides); pixel-perfect design remains a separate step for high-production artefacts. Validate this framing with target users before building. Invest in a strong reference PPTX template to raise the quality floor. | TBD | Open | 2026-02-22 |
| R-010 | Sheet mode formula language design is high-risk; choosing wrong execution model creates technical debt that is expensive to reverse | Medium | Critical | Do not design the formula language until sheet mode is prioritised (Phase 2). Use real user data from sheet mode usage to inform the design. Consider whether a subset of Excel formula syntax is sufficient rather than inventing a new language. | TBD | Open | 2026-02-22 |

---

## Assumptions

| ID | Assumption | Validated? | Impact if False | Owner | Status | Date Added |
| ---- | ---------- | ---------- | ---------------- | ----- | ------ | ----------- |
| A-001 | Target market has heterogeneous deployment preferences — a meaningful and growing segment actively prefers local-first tools and file ownership over cloud subscription services, driven by enshittification fatigue (Adobe, Evernote, Notion), data sovereignty concerns, and locked-down client IT environments | Partially — anecdotal and market signals (Obsidian, iA Writer, Affinity growth); not formally validated with target personas | If cloud-first preference dominates, the local-first default is a friction point rather than a differentiator; adjust default to cloud with local as opt-in | TBD | Open | 2026-02-19 |
| A-002 | Target users will accept a new authoring tool if export quality is high | No | Pivot value proposition or distribution | TBD | Open | 2026-02-19 |
| A-003 | DOCX and PPTX remain dominant distribution formats for target market | Reasonable | Minimal; export format can be extended | TBD | Open | 2026-02-19 |
| A-004 | Australian-region frontier LLM APIs (e.g. Azure Australia East) satisfy government data sovereignty for most agencies | Partially (Azure enterprise agreements exist) | May need self-hosted model earlier for some agencies | TBD | Open | 2026-02-19 |
| A-005 | Professional services onboarding engagement (clause library import) is acceptable to initial target accounts | No | Higher friction; slower sales cycles | TBD | Open | 2026-02-19 |
| A-006 | Export fidelity ceiling (professionally acceptable without manual correction) is achievable with current DOCX/PPTX libraries | No — highest technical risk | Bespoke rendering pipeline; significant cost and timeline | TBD | Open | 2026-02-19 |
| A-007 | Branch/merge collaboration, surfaced as Send for Review / Incorporate Comments, is sufficient for 95%+ of target workflows | Supported by ConOps decision | Significant UX rework if wrong | TBD | Open | 2026-02-19 |
| A-008 | LLM APIs will remain affordable for document-scale generation | No | Affects unit economics and pricing | TBD | Open | 2026-02-19 |
| A-009 | The enshittification-resistance trend (preference for owned tools, one-time purchase, local files) is strong enough in the target market to support a perpetual-licence desktop product as the primary revenue model for the core tool | Partially — Obsidian (~1M users), iA Writer (sustained profitable), Affinity (acquired by Canva but prior growth validates model); not validated for professional services/government specifically | Market expects subscription for professional tools; perpetual licence perceived as less trustworthy or unsupported; may need to lead with subscription and offer perpetual as premium option | TBD | Open | 2026-02-22 |
| A-010 | Users will accept an unbundled AI service subscription (Folivm AI) separate from the core tool purchase, rather than requiring an all-in-one subscription or bring-your-own-key configuration | No — novel model; closest precedents are Obsidian Sync (optional sync subscription) and Overcast (optional server-side features) | If users expect bundled AI: must move to full SaaS. If users prefer BYOK: provide BYOK as escape hatch but maintain managed service as default. Either is architecturally accommodated. | TBD | Open | 2026-02-22 |

---

## Issues

| ID | Issue | Severity | Impact | Owner | Status | Date Added | Resolution |
| ---- | ----- | -------- | ------ | ----- | ------ | ----------- | ---------- |
| I-001 | Export fidelity technical feasibility unvalidated | High | Blocks customer commitment on deliverable quality | TBD | Open | 2026-02-19 | — |
| I-002 | ADR for LLM provider pluggability and data sovereignty required before any government pilot | High | Blocks government engagement | TBD | Open | 2026-02-19 | — |
| I-003 | Clause library onboarding model undefined (pricing, resourcing, partner vs in-house) | Medium | Blocks go-to-market planning | TBD | Open | 2026-02-19 | — |
| I-004 | Minimum viable skeleton quality and brief-to-skeleton UX not tested with personas | Medium | Risk of poor fit for skeleton assembly value prop | TBD | Open | 2026-02-19 | — |
| I-005 | DOCX/PPTX export library selection not decided | Medium | Blocks export pipeline implementation | TBD | Open | 2026-02-19 | Pending ADR |
| I-006 | Relationship to BidWriter project not assessed (overlap, synergy, consolidation) | Medium | Affects roadmap and backlog | TBD | Open | 2026-02-19 | — |
| I-007 | Monetisation model — three-tier architecture adopted as direction; requires validation and detailed design | Medium | Affects pricing, go-to-market, infrastructure requirements, and open-source format strategy | TBD | In progress | 2026-02-19 | Direction set (2026-02-22): three-tier model — (1) Folivm core tool: one-time purchase, local-first, no account required; (2) Folivm AI: optional subscription, managed LLM proxy service, removes BYOK friction; (3) Folivm Sync: optional subscription, thin cloud sync for multi-device, analogous to Obsidian Sync. See DEC-017 and operating-model.md. Requires: pricing validation, infrastructure design for AI proxy, BYOK escape hatch for government/enterprise, commitment covenant (core tool features never gated behind subscriptions). |

---

## Dependencies

| ID | Dependency | Type | Provider | Impact if Delayed | Owner | Status | Date Added |
| ---- | ----------- | ---- | -------- | ------------------ | ----- | ------ | ----------- |
| D-001 | LLM provider API (Australian-region at launch — Azure Australia East or equivalent) | External | Cloud provider / enterprise agreement | High — blocks AI features and government path | TBD | Not contracted | 2026-02-19 |
| D-002 | DOCX/PPTX export library selection | Internal | Architecture decision | High — blocks export pipeline | TBD | Pending ADR | 2026-02-19 |
| D-003 | Government security certification (ISM, IRAP) for government pilot | External | Assessor / agency | High — blocks government pilot | TBD | Not started | 2026-02-19 |
| D-004 | Enterprise IAM integration (SAML/OIDC) | External | Customer / IdP | High — required for target market | TBD | Not started | 2026-02-19 |
| D-005 | BidWriter overlap assessment | Internal | Product / programme | Medium — affects scope and roadmap | TBD | Open | 2026-02-19 |

---

## Decisions

| ID | Decision | Rationale | Alternatives Considered | Impact | Decision Maker | Date Made | Status |
| -------- | -------- | --------- | ------------------------ | ------ | --------------- | ---------- | ------ |
| DEC-001 | Server-hosted primary; not local-first at launch | Target market wants documents on firm/agency infrastructure; collaboration and DMS integration require server-hosted | Local-first, Electron desktop | High — deployment and collaboration model | ConOps session | 2026-02-19 | Accepted for Phase 1+; superseded for Phase 0 by DEC-010 |
| DEC-002 | Pluggable LLM providers; Australian-region API at launch | Data sovereignty for government; provider, region, model as config | API-first only; local-only | High — architecture and government path | NOTES | 2026-02-19 | Accepted — ADR required before gov pilot |
| DEC-003 | DMS integration order: iManage → NetDocuments → Content Manager | Market coverage (legal then government); API maturity | Single DMS; different order | Medium — Tier 2 roadmap | NOTES | 2026-02-19 | Accepted |
| DEC-004 | Document types: three full-clause, three to five skeleton-only at launch | Full-clause: Engagement Letter, Board Paper, Cabinet Submission. Skeleton-only: Strategic Review, Proposal/Tender, Briefing Note | Fewer types; more types | High — scope and clause library | NOTES | 2026-02-19 | Accepted |
| DEC-005 | Clause library onboarding: professional services engagement at launch; self-service import Tier 2 | Initial accounts need structured import from Word/SharePoint; self-service later | Self-service from day one | High — onboarding and GTM | NOTES | 2026-02-19 | Accepted |
| DEC-006 | Branch/merge surfaced as Send for Review / Incorporate Comments; branch semantics not exposed | Sufficient for 95%+ workflows; simpler UX | Expose branch semantics to power users | Medium — collaboration UX | ConOps session | 2026-02-19 | Accepted |
| DEC-007 | Web application (server-hosted); Electron deprioritised | Aligns with server-hosted; target market does not require desktop-native | Electron, local-first | High — GUI and deployment | NOTES / ConOps | 2026-02-19 | Accepted |
| DEC-008 | DOCX Track Changes markup generated on export for reviewer compatibility only | Interoperability with Word-based reviewers; not used inside Folivm | No Track Changes; full internal Track Changes | Medium — export and collaboration | ConOps / PRD | 2026-02-19 | Accepted |
| DEC-009 | Product name is Vellum; format name is RichMark | Vellum signals craft and quality for the product surface; RichMark (Rich + Markdown) signals the format's lineage. Two names served two audiences. Superseded by DEC-020. | Single name for both; Fount (too abstract); Prism (likely conflicted) | High — all project documentation, branding, and naming | Brand session 2026-02-22 | 2026-02-22 | Superseded |
| DEC-020 | Single brand Folivm for company, product, and format | Brand clarity requires one name across company, product, and document format. RichMark and Vellum are not clear for brand purposes. | Dual naming (DEC-009) | High — all project documentation, branding, and naming | Brand review 2026-02-23 | 2026-02-23 | Accepted |
| DEC-010 | Folivm is a suite with one medium (Folivm) and three rendering modes: document, deck, sheet | A consultant's deliverable package shares one source of truth. The single-source problem (same content in Word, PowerPoint, Excel, manually kept in sync) is the core problem. One medium with mode switching eliminates it. Three separate products would reproduce the same problem at the tool level. | Three separate tools; document editor only with export; Jupyter-style notebook only | High — product scope, roadmap sequencing, architecture | Brand and architecture session 2026-02-22 | 2026-02-22 | Accepted |
| DEC-011 | Mode introduction is phased: document (Phase 0), deck (Phase 1), sheet (Phase 2) | Export fidelity decreases across modes (DOCX high, PPTX medium, XLSX low). Sequencing by fidelity means each mode is validated before the next harder one is introduced. Sheet mode requires the most novel work (formula language, execution model, XLSX translation); deferring it allows real usage to inform the design. | Build all three modes simultaneously; sheet before deck | High — roadmap and backlog | Architecture session 2026-02-22 | 2026-02-22 | Accepted |
| DEC-012 | XLSX export is a compatibility artefact with known fidelity limitations; CSV export is first-class | Excel's formula engine and Folivm's formula layer have different execution models and formula languages. Perfect translation is not achievable. CSV export loses no information from data cells and is a clean, reliable path for data pipeline consumers. Do not design XLSX export until sheet mode is validated. | Full-fidelity XLSX as a product requirement; no XLSX export | Medium — Phase 2 scope and client expectations | Architecture session 2026-02-22 | 2026-02-22 | Accepted |
| DEC-013 | The product surface (Folivm GUI) must feel as familiar as Word to non-technical clients; the format (Folivm) is invisible to them | The primary Phase 0 user (technical consultant) is the translator between ASCII-native authoring and Office-native distribution. Clients receive DOCX/PDF/PPTX; they never see Folivm. For Phase 1+ when clients may use the editor directly, the surface must be familiar enough that they don't need to learn a new paradigm. Familiarity is the adoption mechanism. | Surface the format to all users; require clients to learn Folivm | High — UX philosophy and Phase 1+ design | Brand session 2026-02-22 | 2026-02-22 | Accepted |
| DEC-014 | Backing format is Pandoc Markdown; not custom DOM | Pandoc already supports fenced divs, YAML frontmatter, footnotes, citations, cross-refs. No format invention required. Supersedes implied custom YAML/JSON in original solution concept. | Custom document object model; Quarto format | High — storage and export architecture | REFACTOR-PLAN / concept evolution | 2026-02-20 | Accepted |
| DEC-015 | Phase 0 is local-first personal tool; server-hosted is Phase 1+ | Phase 0 primary user is the author; solve own problem first. Local-first aligns with personal tool scope. Server-hosted required for collaboration, clause library, DMS; deferred to Phase 1+. | Server-hosted from Phase 0 | High — deployment and Phase 0 scope | REFACTOR-PLAN / concept evolution | 2026-02-20 | Accepted |
| DEC-016 | Phase 0 GUI base is TipTap/ProseMirror wrapped in Electron or Tauri | ProseMirror is Pandoc-compatible; TipTap provides extension ecosystem. Electron/Tauri for desktop deployment. ADR required to choose Electron vs Tauri. | Web-only; Slate; Lexical | High — GUI and desktop stack | REFACTOR-PLAN / concept evolution | 2026-02-20 | Proposed — ADR pending |
| DEC-017 | Monetisation model is three-tier: (1) Folivm core tool — one-time purchase, local-first, no account required; (2) Folivm AI — optional subscription, managed LLM proxy service; (3) Folivm Sync — optional subscription, thin cloud sync | Unbundling separates three distinct concerns that most SaaS tools conflate into a single subscription. The core tool ownership commitment (local-first, files are yours, no subscription required to access your own work) is central to positioning in a market with growing enshittification fatigue. Folivm AI solves the BYOK friction problem for non-technical users without making AI a mandatory subscription. Folivm Sync serves multi-device convenience without requiring a full cloud platform. Each tier has honest recurring justification: core tool is a one-time product; AI proxy has real ongoing infrastructure costs; Sync has real ongoing storage costs. Precedents: Obsidian (local + optional Sync/Publish), iA Writer (one-time purchase), Overcast (one-time + optional server-side features). | Full SaaS subscription (reintroduces enshittification risk, undermines local-first positioning); perpetual licence only, no managed AI (BYOK friction blocks non-technical users); open-source core with SaaS services (stronger commitment covenant but revenue model less clear at Phase 0 scale) | High — product positioning, infrastructure requirements, pricing, go-to-market, long-term trust | Commercial model session 2026-02-22 | 2026-02-22 | Accepted |
| DEC-018 | Pandoc is not forked. Folivm uses a pre-processing pipeline to resolve extended cell types before invoking Pandoc for export. Folivm's semantic layer lives in Folivm's own codebase. | Forking Pandoc would require owning a Haskell codebase, permanently diverging from upstream, and merging every future Pandoc release. Pandoc's value to Folivm is its export writers (DOCX, PDF, PPTX) — that value is preserved whether you fork or use a pipeline. The extended cell types (data, formula, visual, frame) are execution and rendering problems, not parsing problems; Pandoc's architecture is not designed for them. A pre-processing pipeline resolves cell types in Folivm's own codebase (TypeScript/Rust) before Pandoc is invoked, producing standard Pandoc Markdown that Pandoc converts without needing to know about Folivm extensions. Lua filters handle any remaining export-time transformation. This keeps Pandoc as a freely updatable dependency and makes Folivm's semantics testable independently. | Fork Pandoc and add DataCell/FormulaCell/VisualCell/FrameCell as first-class AST nodes (rejected: Haskell burden, upstream divergence, fights Pandoc's fundamental design); Lua filters only without pre-processor (insufficient for formula evaluation and visual cell rendering); Replace Pandoc with custom export writers (rejected: abandons 20 years of writer quality) | High — export pipeline architecture, Folivm format specification, testability | Architecture session 2026-02-22 | 2026-02-22 | Accepted |
| DEC-019 | Application chrome uses Figma-first design token system (primitives → semantic aliases → component tokens); document-level brand manifest (EP-201) is separate | Figma mapping (primitives, styles, variables, component variants) aligns design and code; token chain enables mode switching (Focus, Client Brand A) without component CSS changes. Application chrome tokens are distinct from document-level brand variables (Phase 2). | Ad-hoc component styling; Tailwind colour/spacing classes throughout; single shared token layer | Medium — interface implementation, design handoff, Phase 2 brand manifest alignment | UI scaffold prompt 2026-02-23 | 2026-02-23 | Accepted |

---

## Review Schedule

This RAIDD log should be reviewed:

- Weekly during active development
- Monthly during planning
- Before major milestones or releases
- When new risks, issues, or decisions arise

---

## Change Log

| Date | Change | Changed By |
| ------ | ------ | ----------- |
| 2026-02-23 | Added DEC-019 (Figma-first design token system for application chrome); ui-scaffold-prompt to depends_on | EP-008 |
| 2026-02-20 | Concept refactor: DEC-009 (Pandoc format), DEC-010 (Phase 0 local-first), DEC-011 (TipTap/Electron/Tauri); R-007, R-008; R-003/R-005 phase applicability | REFACTOR-PLAN |
| 2026-02-19 | YAML/frontmatter audit: version on ADR template, depends_on on docs per dependency map, meta schema comment | Project |
| 2026-02-19 | RAIDD as code: YAML source, generator script, raidd-management.mdc | Project |
| 2026-02-19 | Expanded to full RAIDD; added Issues, Decisions; aligned with Between best practices | Project |
| 2026-02-19 | Initial RAID log (stub) | Project |

---

*[PRD (Lean)](../conceptual/prd-lean.md) · See also: [ADR Log](../architectural/adrs/README.md)*
