---
title: Architectural Principles
project: Folivm
status: draft
version: 0.4
created: 2026-02-19
updated: 2026-02-20
depends_on:
  - docs/strategic/solution-concept.md
---

# Architectural Principles

These principles guide design decisions for Folivm. Each states the principle, the rationale, and the implication for the system. They are derived from the [Solution Concept](../strategic/solution-concept.md).

---

## 1. Document is data

**Principle.** The storage format is the AI exchange format and the source of truth for rendering. There is no translation layer between storage, AI consumption, and what the user sees.

**Rationale.** Word conflates appearance with meaning; the result is not reliably transformable or AI-consumable. Folivm inverts this: the same semantic structure is stored, rendered, and exposed to LLMs. That single representation is the durable advantage.

**Implications.** The storage format is Pandoc Markdown plus YAML frontmatter — human-readable, diff-able, version-control friendly, and directly consumable by LLMs. It is not a custom YAML/JSON schema. Export to DOCX/PDF is a rendering concern; the storage format is never lossily converted. Version control, diffs, and AI prompts operate on the same artefact.

---

## 2. Semantic over cosmetic

**Principle.** Structure and meaning are stored; appearance is derived. Style is a theme concern, not a document concern.

**Rationale.** When formatting is stored directly, brand compliance is fragile and transformation fails. When semantic roles (callout, executive summary, data table) are stored and mapped to visual properties, documents survive theme changes and remain machine-interpretable.

**Implications.** Styling targets the Pandoc element vocabulary (`h1`–`h6`, `p`, `ul`/`ol`, `blockquote`, `table`, `figure`, etc.) plus custom semantic divs (`:::callout`, `:::executive-summary`) where meaning exceeds structure. The editor exposes a semantic style palette; character-level formatting is secondary. In Phase 0, style is applied via a print CSS stylesheet and optional reference DOCX template. A full brand manifest is Phase 2.

---

## 3. Deterministic where correctness matters

**Principle.** Clause library content is never LLM-generated at insertion time. Assembly is rule-based and auditable.

**Rationale.** Legal and regulated content must be exact. A model may recommend which clause applies; the actual text inserted is the approved, version-controlled clause. AI supports judgement; the system enforces correctness.

**Implications.** This principle applies from Phase 1 when clause library features are introduced. Phase 0 has no clause library; deterministic assembly is deferred. When built, the clause library holds locked content with metadata; insertion is a lookup plus paste of exact text. No LLM call alters clause content at assembly time.

---

## 4. Brand as a first-class object

**Principle.** Brand governs appearance; documents reference semantic roles. The separation between content and style is preserved.

**Rationale.** Professional users have brand requirements. If style is embedded in documents, rebranding requires touching every file. Separating style from content allows centralised control and document portability.

**Implications.** In Phase 0, brand = a print stylesheet (CSS) plus an optional Pandoc reference DOCX template. The author controls these files; documents remain structure-only. The full brand manifest concept (versioned, multi-brand, theme-level editing) is Phase 2. Phase 0 establishes the separation; Phase 2 expands it.

---

## 5. Export fidelity is a product requirement

**Principle.** PDF and DOCX export must be acceptable to the target user without manual correction.

**Rationale.** Folivm occupies the authoring position; Office formats remain the distribution standard (the InDesign model). If export is visibly degraded, adoption fails regardless of internal architecture.

**Implications.** Export is not best-effort. With Pandoc as the conversion engine, professional output is more achievable than with a custom renderer — Pandoc's DOCX and PDF output are mature and widely used. The print stylesheet and reference DOCX template must be tuned for professional quality. Measurable targets belong in NFRs.

---

## 6. Portable format; deployment model evolves with phase

**Principle.** The storage format is human-readable and portable at all phases. The deployment model (local vs server-hosted) varies by phase.

**Rationale.** Phase 0 is a personal tool — local-first. The author runs the editor on their own machine; documents live in a project folder. Server-hosted deployment, collaboration, and DMS integration are Phase 1+. Portability of the format is non-negotiable; lock-in is minimised by using plain-text Pandoc Markdown.

**Implications.** Phase 0: design for local-first. Documents are files on disk. No authentication, multi-tenancy, or server infrastructure. Phase 1+: introduce server-hosted options as needed. The format supports both; no redesign required.

---

## 7. Open format, closed renderer

**Principle.** The storage format is documented and portable; the rendering and AI layer is the product moat.

**Rationale.** Pandoc Markdown is already an open format — specified, tooled, and widely adopted. Portability builds trust. The value that cannot be easily replicated is the editor, the export pipeline integration, and the LLM workflow — not the file format.

**Implications.** Documents can be edited with any text editor and processed with Pandoc directly. The Folivm GUI, project-aware context loading, and integrated export pipeline are the differentiators. No proprietary schema; no lock-in at the format level.

---

## 8. Solve your own problem first

**Principle.** The primary design authority for Phase 0 is the author's own consulting workflow. Features that do not serve that workflow are Phase 1+ regardless of how compelling they seem.

**Rationale.** Phase 0 succeeds if the author uses it for their next real client deliverable. Enterprise features, clause libraries, and brand governance are valuable but not Phase 0. Scope discipline prevents over-engineering and keeps the first release tractable.

**Implications.** Every Phase 0 feature must answer: does this help the author produce a professional PDF from Markdown without post-export touch? If not, it waits. The roadmap exists; Phase 1 and Phase 2 have their place. Phase 0 stays focused.

---

## 9. Adoption and distribution matter

**Principle.** Technical superiority is necessary but not sufficient. Architecture must support the distribution and adoption strategy.

**Rationale.** WordPerfect had a technically superior document model ("reveal codes" exposed structure honestly) and lost to Word. Microsoft's distribution advantages (bundling, mouse-driven GUI adoption, enterprise lock-in) overwhelmed technical merit. The lesson: be right about the product and strategic about how it reaches users.

**Implications.** Folivm occupies the authoring position; Office formats remain the distribution standard (the InDesign model). Export fidelity and Office interoperability are product requirements, not afterthoughts. Go-to-market framing is "the authoring environment for documents exported to Word" — not "replace Word." Design for the niche (professional services, government) and instrument for adoption; do not optimise for technical purity alone.

---

## Format documentation and project conventions

Folivm-specific format documentation (frontmatter schema, project folder conventions) is **required** — not optional. It is a Phase 0 deliverable, not a roadmap feature. Pandoc Markdown is already documented; Folivm adds conventions that must be specified for portability and tool interop.

**User-defined project conventions** — Users should be able to create their own project folder structures and naming conventions. Phase 0: a single default convention (e.g. `inputs/`, `working/`, `context/`, `deliverables/`), optionally overridable via config (e.g. `Folivm.yaml`). Phase 1: full UX for choosing and defining conventions when creating or configuring a project. Phase 2: enterprise-level conventions (e.g. per-brand, per-organisation).

**Templated conventions** — Pre-built project conventions for different workflows (consulting report, legal matter, government submission) are a Phase 1 roadmap feature. When creating a project, users can select a template that sets up the folder structure and optional default context files. This leverages the user-defined conventions capability and validates that the problem is shared across workflows.

---

## 10. Brand manifest uses a Variables + Modes architecture

**Principle.** Brand is expressed as named variables with mode-resolved values, not as hard-coded style values. Documents reference semantic roles; the brand manifest resolves those roles to concrete values depending on the active mode.

**Rationale.** Figma's Variables + Modes system is the clearest existing model for this: a variable `brand.primary` resolves to `#2D6BFF` in default mode, `#E8542A` in client-B mode, and a different value again in dark mode. The document never changes; the mode switches which resolution applies. This is more powerful and more principled than swapping a CSS file.

**Implications.** Phase 0: brand = CSS custom properties (`--color-brand-primary`) plus reference DOCX template. This is a primitive but compatible implementation of the variable model — custom properties are named variables; changing the stylesheet swaps the resolved values. Phase 2: full brand manifest with named variable sets, multiple modes (client brand, light/dark, print/screen, document type), and a UI for managing and switching them. The Phase 0 CSS architecture should anticipate this — use custom properties throughout, not hard-coded values, so Phase 2 can layer a manifest resolver on top without rewriting the stylesheet. Mode in this context can mean both a rendering mode (document/deck/sheet) and a styling mode (brand A / brand B / dark) — they compose independently.

**Figma analogy reference.** Three Figma concepts map to Folivm:
- **Variables + Modes** → brand manifest with mode resolution (the primary model)
- **Variants** → semantic block vocabulary (callout types: info/warning/recommendation; author picks meaning, manifest picks appearance)
- **Component Properties** → authoring interface for cells (expose only meaningful parameters; hide brand and layout complexity)

---

## 11. Local-first is a product value, not a scope constraint

**Principle.** Local-first is a deliberate product positioning decision, not a concession made because server infrastructure is too hard for Phase 0. It is a selling point that should be stated, maintained, and never quietly eroded.

**Rationale.** A growing segment of professional tool users has experienced enshittification firsthand — Adobe Creative Suite moving to subscription-only, Evernote degrading and losing data across ownership changes, Notion's format lock-in, the general pattern of SaaS tools raising prices, reducing features, or shutting down once users are dependent. These users actively seek tools where they own the files, the tool works offline, and cancelling a subscription does not cost them access to their own work. Obsidian, iA Writer, and Affinity have demonstrated this market is real, large enough to sustain a profitable business, and underserved by VC-backed SaaS.

**Implications.** The core Folivm tool — editor, export pipeline, project folder — is a one-time purchase. No account required. No subscription required. Files are plain Folivm on disk, editable with any text editor and processable with Pandoc directly. The tool works fully offline. Optional services (Folivm AI, Folivm Sync) are additive and independently cancellable; cancelling them never affects access to the core tool or to existing files. This commitment must be public and explicit — stated in the product's positioning, not just intended internally. The moment core features migrate behind a subscription, the positioning is broken and trust is lost. See DEC-017 and operating-model.md for the three-tier commercial model.

---

## 12. Structure first, prose second

**Principle.** Folivm supports the way professional writers actually work: argument architecture is established before body text is written. Structural (outline) mode is a core workflow surface, not a convenience feature.

**Rationale.** Word's Outline mode is one of its most valuable and least appreciated features. It lets authors work at the level of argument structure — reordering sections, promoting and demoting headings, validating the logic of a document — without body text getting in the way. Professional consultants and policy writers work this way instinctively. A tool that forces linear top-to-bottom drafting imposes a worse workflow on skilled authors. Folivm should support the structure-first authoring pattern as a first-class mode.

**Implications.** Structural mode is a fourth rendering mode alongside document, deck, and sheet. It presents the heading hierarchy of any Folivm document as a collapsible, reorderable tree. Body text is hidden. Headings can be promoted, demoted, and reordered; the underlying Folivm source is updated accordingly. Structural mode is an authoring surface only — it has no export path of its own. It is the natural landing surface for LLM-assisted outline generation ("given my brief, suggest a document structure"). It also creates a natural bridge to deck mode: an outline in document mode and a slide list in deck mode are the same structure viewed differently. EP-108, Phase 1. See hla.md Rendering Modes table.

---

## Open Questions

- Cross-reference: [NOTES.md](../../NOTES.md) open questions (open source format strategy, pricing validation).

*Export fidelity ceiling resolved:* Client deliverable quality (particularly PDF); relatively true to GUI representation (Word/Google Docs–like). See [PRD NFRs](../conceptual/prd-lean.md#non-functional-requirements).

*Monetisation model direction set:* Three-tier — core tool (one-time purchase), Folivm AI (optional subscription), Folivm Sync (optional subscription). See DEC-017, I-007, operating-model.md.

*Structural mode established as core workflow:* EP-108, Phase 1, prioritise early. See backlog.md and hla.md.

---

*Previous: [Solution Concept](../strategic/solution-concept.md) · Next: [High-Level Architecture](hla.md)*
