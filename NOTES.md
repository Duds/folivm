# Folivm — Project Notes

Scratch pad for working notes, open questions, and decisions not yet ready for formal documentation.

---

## Open Questions

- Branding / product name (TBD — deliberate placeholder, branding conversation deferred)
- ~~GUI framework decision~~ — resolved: Tauri for desktop (ADR-0003)
- LLM provider strategy (API-first vs pluggable vs local-model support) — see decision below; pluggable is the answer, ADR needed
- Relationship to BidWriter project — overlap assessment needed; potential synergy or consolidation
- Monetisation model — SaaS vs perpetual licence vs open core
- ~~Export fidelity ceiling~~ — resolved: client deliverable quality (particularly PDF); relatively true to GUI representation, similar to Word or Google Docs (see [PRD NFRs](docs/conceptual/prd-lean.md#non-functional-requirements))
- Round-trip editing — if a user edits an exported DOCX, can changes flow back? Likely out of scope initially but worth flagging
- ~~Open source format strategy~~ — resolved: format documentation required; user-defined and templated conventions are product capabilities (see Key Decisions: Format documentation and project conventions)
- Phase 1 server vs sync — roadmap lists "possibly: server-hosted or sync option"; NOTES records server-hosted as primary for target market. Resolve at Phase 0 exit.

---

## Key Decisions Made

### 2026-02-19 — Concept exploration (Claude.ai)

- **Project name:** Folivm (working title, deliberate placeholder)
- **Project location:** `~/Projects/applications/Folivm` (not dev-tools — this is a product, not a tool)
- **Documentation structure:** Established full artefact hierarchy across Strategic / Conceptual / Architectural / Planning / Execution / Governance / Operations
- **Starting point for documentation:** Problem Statement first, then Solution Concept — everything else is derived from these two
- **Context management approach:** New chat per document; files on disk are the continuity mechanism, not chat history

### 2026-02-19 — ConOps review (Claude.ai)

**Collaboration model UX — branch/merge stays hidden**

The branch/merge model is the right internal architecture; it does not surface to users as such. The product language is "Send for Review" / "Incorporate Comments" / "Compare Versions." Power users get access to a version timeline view (who changed what, when) but not to branch semantics directly. This is sufficient for 95%+ of professional services and government workflows. Branch-level access is not a planned feature at any tier — if it becomes a requirement, it needs a separate design process. The consequence for architecture: the branching model can be implemented in whatever way is internally cleanest without any obligation to expose it.

**Offline / local-first — server-hosted primary; local is not a launch target**

The primary target market (professional services firms, government agencies) does not want documents on individual laptops. They want documents on firm or agency infrastructure. Local-first would create friction for collaboration, clause library synchronisation, DMS integration, and AI API calls — all of which are central to the value proposition. Decision: server-hosted primary at launch. The storage format (plain-text YAML/JSON) is inherently portable, so a self-hosted enterprise deployment tier is architecturally possible without redesign. Do not optimise for local-first; revisit for an enterprise self-hosted tier if the market demands it. This partially resolves the GUI framework question: a web application (server-hosted) is the right deployment model. Electron is only warranted if desktop-native features become critical — unlikely given the target market.

**Data sovereignty for AI calls — pluggable LLM providers; Australian-region API at launch**

When document content is sent to an LLM API for generation or analysis, it leaves the platform. For Australian government users this may be prohibited under agency policy. Three options were considered:

1. *Australian-region API endpoints* — AWS Sydney and Azure Australia East both offer frontier model APIs (Anthropic, OpenAI) under enterprise agreements that include ISM-relevant compliance certifications. This covers most government use cases and is available today.
2. *Local/private model deployment* — Technically feasible (Ollama, self-hosted Llama/Mistral), but current open-weight model quality for professional document generation is meaningfully below frontier API quality. Valid future option.
3. *Content redaction before API calls* — Too complex, failure-prone, and introduces a new attack surface. Rejected.

Decision: architect for pluggable LLM providers from day one (provider, region, and model are configuration, not hardcoded). For government engagements at launch, the practical path is Azure Australia East under an enterprise agreement. Self-hosted model support is a roadmap item. This is the architectural decision that resolves the existing "Data sovereignty" open question and extends the existing "LLM provider strategy" open question into a concrete answer. **An ADR is required before any government pilot engagement.**

**DMS integration priority — iManage first, then NetDocuments, then Content Manager**

Integration with Document Management Systems is Tier 2 (not launch). Priority order when it is built:

1. *iManage* — dominant in large Australian law firms, best-documented API, highest addressable market for the legal segment
2. *NetDocuments* — overlapping legal market, similar integration pattern, meaningful secondary share
3. *HP TRIM / OpenText Content Manager* — dominant in Australian federal and state government agencies; different integration model, separate effort, unlocks the government segment fully

Architecture must support a DMS integration layer from day one (check-in/check-out semantics, metadata passthrough, storage format preservation alongside DOCX export) even if no specific DMS is integrated at launch. Designing around this later is expensive.

**Minimum viable document type library — three with full clause support, three to five skeleton-only**

The assembly engine and clause library deliver the most value for document types with high structural regularity and compliance exposure. At launch:

*Full clause library and assembly support (three types):*
- Engagement letter (legal/advisory) — mandatory for legal market credibility; highest clause-density document type
- Board paper — ubiquitous in professional services and government; high structural regularity
- Cabinet/ministerial submission — government market entry; high compliance and formatting requirements

*Skeleton-only (AI scaffolding, no clause library — three to five types):*
- Strategic review / consulting report
- Proposal / tender response
- Briefing note

This scope is achievable, proves the full model end-to-end, and is sufficient for the first reference customers. Additional document types with full clause library support are additive after launch. Skeleton-only types cost little to add and broaden the addressable use cases.

**Clause library onboarding — professional services engagement at launch; self-service import as Tier 2 product feature**

Self-service clause library administration is too optimistic for the initial target market. Law firms and government agencies have existing approved clause libraries in Word documents, SharePoint, or their DMS. These need to be imported, reviewed for currency and completeness, and restructured into the Folivm format. This is a structured onboarding engagement — delivered by Folivm or a certified partner — not a sign-up-and-configure workflow.

Once the library is established, self-service management (adding new clauses, updating versions, managing approval workflows) is appropriate and must be designed into the library management UX from the start.

Longer term: a self-service import tool — upload a DOCX or PDF clause library; AI structures it and presents it for human review and approval — reduces onboarding cost materially and is a Tier 2 product feature. Design the import pipeline as part of the initial library management architecture so it can be exposed later without rework.

### 2026-02-20 — Format documentation and project conventions (Cursor)

**Format documentation — required, Phase 0 deliverable.** Folivm-specific format documentation (frontmatter schema, project folder conventions) is required for portability and tool interop. This is not a roadmap feature; it is a Phase 0 readiness deliverable. Pandoc Markdown is already documented; Folivm adds conventions that must be specified.

**User-defined project conventions — product capability.** Users should be able to create their own project folder structures and naming conventions. Phase 0: single default convention (`inputs/`, `working/`, `context/`, `deliverables/`), optionally overridable via config (e.g. `Folivm.yaml`). Phase 1: full UX for choosing and defining conventions when creating or configuring a project. Phase 2: enterprise-level conventions (per-brand, per-organisation).

**Templated conventions — Phase 1 roadmap feature.** Pre-built project conventions for different workflows (consulting report, legal matter, government submission) are a Phase 1 feature. When creating a project, users select a template that sets up the folder structure and optional default context. This leverages user-defined conventions and validates that the problem is shared across workflows. Documented in [principles.md](docs/architectural/principles.md#format-documentation-and-project-conventions).

---

## Core Thesis (Capture-Grade Summary)

Folivm is an AI-native business document creation platform. The foundational insight is:

> The document is the data. The semantic structure that renders a beautiful PDF is the same structure an LLM can traverse and manipulate. There is no lossy conversion between what the AI knows, what the system stores, and what the user sees.

This is the inversion that makes Folivm architecturally defensible against Microsoft: they are adding AI to Word; Folivm is built from first principles for AI, with a Word-like interface as the accessibility layer. Microsoft cannot get there from Word without breaking thirty years of backwards compatibility.

---

## Problem Space

### Word's Original Sin
Word conflates *appearance* with *meaning*. Bolding a heading instead of applying a Heading style produces something that looks correct but carries no semantic information. The document cannot be transformed, summarised, navigated, or consumed by AI in any structured way.

This is not a user behaviour problem — it is an interface design problem. Word makes ad hoc formatting faster than semantic styling and provides no feedback that the user is doing something architecturally harmful. The interface rewards the wrong behaviour.

### The Compounding Effects
- Transformation fails (report → deck requires manual reformatting; no semantic map exists)
- Brand compliance is fragile (character-level formatting is invisible to brand governance)
- AI integration is shallow (LLMs must infer structure from visual heuristics; hallucination risk)
- Content reuse is impossible (no clause library, no component system, no separation of reusable vs document-specific content)
- Collaboration degrades quality (Track Changes operates on surface, not structure)

### Market Gap
Two poles exist, neither serving professional business document users well:
- **Consumer/productivity tools** (Word, Google Docs) — familiar, broad adoption, structurally shallow, AI bolted on
- **Technical document systems** (LaTeX, Sphinx, AsciiDoc) — semantically rich, hostile to non-technical users, incompatible with Office ecosystem

Partial solutions: Quarto (good for data science, not general business), Notion/Confluence (locked ecosystems, weak document fidelity), Marp/Slidev (Markdown-to-slides but HTML/PDF output, not editable PPTX), Pandoc (pipeline tool, not a document system).

**LaTeX specifically:** Solves the problem for academic/technical publishing — precise typesetting, rich semantic structure — but produces primarily PDF (not editable DOCX/PPTX) and the learning curve is prohibitive for business users. A solved problem for a different audience.

### Why Now
LLMs change the authoring equation. Previously, semantic document systems failed because requiring humans to write structured source is high-friction. If an LLM generates the content, the output format is fully controllable. The semantic richness impractical to demand of human authors is trivial to demand of a model. The right moment is now.

---

## Solution Architecture

### Four Layers

**Storage layer** — A rich document object model: structured YAML/JSON with Markdown-like body text. Human-readable, diff-able, version-control friendly, directly LLM-consumable. Not Markdown — a purpose-built business document schema. The user never sees this layer.

**Semantic style layer** — A brand manifest (JSON/CSS) mapping semantic roles (Primary Heading, Callout, Executive Summary Body, Data Table) to visual properties. Maintained separately from document content. Swappable without touching documents. Multiple brand manifests can coexist.

**AI layer** — LLMs operate directly on the storage format. Generation, transformation, summarisation, structural review, and audience adaptation are all tractable because semantic structure is explicit. The AI knows which document zones are fixed (clause library) and which are variable (analytical content).

**Rendering layer** — The GUI presents a rich document editor with a Word-like feel. Export pipelines produce DOCX, PPTX, and PDF. The rendering layer consumes storage + brand manifest; it does not modify either.

### Storage Format Rationale
- LLM-native storage: source files are already what you'd feed to a model
- Version control friendly: plain text diffs meaningfully
- Portability: export to DOCX/PPTX/PDF is a rendering concern, not a storage concern
- Brand theming as first-class object: JSON/CSS brand manifest consumed by renderer, swappable

### Technology Candidates (Pending ADRs)
- GUI: web application (server-hosted) is now the preferred model — see offline/local-first decision above; Electron remains an option only if desktop-native features become critical
- Export: python-pptx + python-docx vs Pandoc + Lua filters vs purpose-built
- PDF: headless browser for high-quality rendering
- LLM: pluggable provider layer required from day one; Azure Australia East at launch for government compliance
- Base to extend: Quarto considered as starting point — most mature Markdown-to-business-output pipeline

---

## Interface Philosophy

### The Core Inversion
Semantic style controls are primary. Character-level formatting controls are secondary.

The toolbar exposes a style palette (document-type-appropriate semantic styles) rather than font size pickers and bold buttons. Character formatting (bold, italic, underline, strikethrough, highlight) is available but reached through a secondary path, with gentle interface friction: "this formatting won't be portable across brand themes."

### Style-Lock Mode
Direct formatting is discouraged through inverted friction — not disabled (avoid paternalism), but:
- Applying a semantic style: one click
- Applying a manual font size: requires "advanced" panel that asks "are you sure? this won't be portable across themes"
- Choice architecture, not prohibition

### The Adoption Mechanism
**Structured templates with real teeth.** Starting a "Board Paper" gives a pre-scaffolded skeleton (cover, executive summary, background, recommendation, appendix) with semantic styles pre-applied. AI generates this skeleton from a brief in seconds. User fills content into a correctly structured document — they never had occasion for ad hoc formatting because the document was already shaped.

### Style Exploration at the Theme Level
A user wanting something to "stand out more" reaches for a semantic style (Callout, Emphasis, Pull Quote) not manual formatting. If no style fits, the interface asks: "Add a new style to your theme, or adjust an existing one?" Documents stay clean; user agency is preserved.

The style editing interface must be *genuinely satisfying* — better than Word's styles panel (notoriously bad). Think Figma's variable system rather than Word's Modify Style dialogue.

### The Time-Pressure Problem
The hardest design challenge: under deadline pressure, users reach for whatever is fastest. Folivm must make semantic styling genuinely faster than ad hoc formatting for common tasks — not just better in the abstract. Templates-first UX is the primary strategy.

---

## Full Feature Set

Established across three tiers (see also solution-concept.md):

### Tier 1 — Launch (must ship)
Heading hierarchy, semantic paragraph styles, character formatting (bold, italic, underline, strikethrough, highlight), paragraph alignment, paragraph spacing (before/after), tables, page margins and orientation, page and section breaks, captions and labels for figures/tables/appendices, style sets linked to brand themes.

### Tier 2 — Professional/Government (required for target market)
Headers and footers with metadata (page numbers, dates, document metadata), independent section layouts, multi-column layouts, citations and bibliography, accessibility features (alt text, reading order, structured navigation, PDF/UA compliance for export), DMS integrations (iManage → NetDocuments → Content Manager), self-service clause library import tool.

### Tier 3 — Roadmap (defer, but design for)
Text boxes and shapes, multi-column newsletter layouts, track-changes-compatible DOCX export (generated on export for interoperability, not used internally), version diff UI with AI-generated change summaries, self-hosted/private model deployment for data sovereignty.

### Track Changes — Reframe
Git branch/merge paradigm is architecturally superior. Surfaced as a non-technical "Review mode" showing visual diff between document versions with AI-generated change summaries. However: collaborators outside the ecosystem expect Track Changes in DOCX exports, so compatible markup must be generated on export even if unused internally.

### Accessibility Note
Government procurement will make accessibility (WCAG 2.1 AA for editor UI, PDF/UA for exports) non-negotiable. Must be Tier 2, not deferred.

---

## Automation Model

### Three Components

**Clause and component library** — Versioned, locked content blocks. Exact legally-approved text. Tagged with metadata about applicability. Deterministic insertion based on document type, jurisdiction, client category. The model recommends which clauses apply; a human confirms; exact text is inserted. No model ever modifies clause content.

**Assembly engine** — Rule-based document scaffolding. Given document type + parameters, constructs the correct skeleton: which sections appear, in what order, which clause blocks are mandatory vs conditional. Essentially a decision tree or rules engine. Deterministic and auditable.

**AI content layer** — Operates within the scaffold, generating variable analytical and narrative content. The model knows which zones are fixed and which are variable. Fixed zones are locked; it fills the variable zones.

### The Key Principle
AI judgement with deterministic execution. The model recommends; the rule engine executes. This is the right risk profile for professional and government documents.

### Why Not Macros
Traditional macros (VBA-style) are largely superseded — the LLM replaces ~80% of what macros were used for (document assembly, inserting standard sections, reformatting, generating repetitive structured content). The remaining ~20% (deterministic document assembly workflows pulling from CRM, applying fee schedules, stamping with matter numbers) needs reliable, testable, auditable pipelines expressed as business rules — not macros, not LLM calls.

---

## Competitive Positioning

### The InDesign Model
Folivm does not replace Word. It occupies the authoring position in a workflow where Office formats remain the distribution standard. Users create and edit in Folivm; they export DOCX/PPTX for distribution. This is how InDesign works in publishing. The export fidelity and the AI generation quality are the two critical proof points.

### Why Microsoft Can't Follow
Adding AI to Word is not the same as building AI-native from the start. Microsoft cannot get to Folivm's architecture without breaking backwards compatibility with thirty years of .doc/.docx files. The storage format being right from the start is a durable architectural advantage.

### Most Interesting Acquisition Targets
- **Adobe** — has Acrobat and PDF workflow but nothing coherent for business document creation
- **Atlassian** — Confluence is their weak underbelly; genuinely poor for structured document production
- **Anthropic / OpenAI** — would value Folivm as a showcase that their models are the best authoring engine, plus a user base as proof
- **Microsoft** — would likely acquire team and rebuild; product itself is secondary

### Build-to-Own vs Build-to-Acquire
Architecture is the same either way — build the best possible product regardless of exit. Differences:
- **Own niche:** optimise for defensibility — deep vertical integration, compliance certifications (ISM, IRAP for Australian government, ISO 27001), on-premise/private cloud, community/ecosystem around clause libraries and theme marketplace
- **Acquisition:** optimise for strategic fit legibility — clean architecture, well-documented, clear engagement metrics, no dependencies that complicate integration

Practical advice: build for the niche, instrument for acquisition.

### The WordPerfect Warning
WordPerfect had a technically superior document model ("reveal codes" was more honest about document structure than Word) and lost catastrophically. Not because Word was better, but because Word came bundled with Windows, understood the mouse-driven GUI paradigm faster, and Microsoft had distribution advantages that technical superiority couldn't overcome.

The lesson: be right about the product *and* be strategic about distribution. Don't wait for the better mousetrap to sell itself.

Application to Folivm: target niches (professional services, government) are also the most locked into Microsoft 365 through enterprise agreements, IT policy, and file format expectations. The go-to-market must not be "replace Word" — it must be "the authoring environment for documents that get exported to Word/PowerPoint."

---

## The LLM-Native Compounding Benefit

Every document in the system is simultaneously:
- A rendered business document
- A structured AI knowledge asset
- A retrievable, queryable knowledge item
- A valid input to downstream AI workflows

Without any extra tagging, export, or transformation step. This is not a feature — it is a consequence of the architecture being right. An organisation using Folivm has, as a side effect, a perfectly structured, semantically tagged institutional knowledge corpus that is immediately queryable by AI. This compounds in value over time in a way that Word documents never could.

---

## Session Notes

### 2026-02-19 — Concept exploration (Claude.ai)
Full inception conversation. Covered problem space, solution architecture, interface philosophy, feature set, automation model, competitive positioning, acquisition strategy, and project setup. Resulting artefacts:
- `docs/strategic/problem-statement.md` — drafted with full content
- `docs/strategic/solution-concept.md` — drafted with full content
- All other docs — stubs with scaffolding
- `README.md` — navigation index with status table
- This file — comprehensive concept capture

**Context management note:** From this point, use new Claude.ai chat per document. Paste the relevant stub + any upstream documents as context. Files on disk are the continuity mechanism; do not rely on chat history.

### 2026-02-19 — ConOps drafted (Claude.ai)
- `docs/conceptual/conops.md` — drafted with full content; status updated from stub to draft
- Six open questions from the ConOps resolved as decisions and recorded above
- "Data sovereignty" removed from open questions (resolved)
- "LLM provider strategy" open question annotated with resolution direction (pluggable; ADR needed)
- GUI framework open question implicitly narrowed toward web application; Electron deprioritised
- Tier 2 and Tier 3 feature lists updated to reflect DMS integration priority order and self-service clause library import as a planned feature
- **ADR required:** LLM provider pluggability and government-compliant deployment (Azure Australia East); block on any government pilot until resolved

### 2026-02-20 — Concept evolution: Pandoc format, Phase 0 scope (Cursor/REFACTOR-PLAN)

**Pandoc format decision and rationale.** The backing format is Pandoc's extended Markdown, not a custom YAML/JSON document object model. Pandoc already provides: fenced divs for semantic blocks, rich YAML frontmatter, footnotes, citations (citeproc), multi-level lists, captions (pandoc-crossref), and cross-references. No format invention is required. The custom DOM approach was over-engineered for Phase 0 and solved a problem Pandoc already solves.

**Phase 0 scope clarification (personal tool first).** Phase 0 is a personal GUI editor that produces professional PDF from rich Markdown — weeks of scope, not months or years. The author solves their own problem first. The primary user for Phase 0 is the author himself (code consultant, Markdown-native, LLM-native). Server-hosted, clause library, brand manifest, and enterprise features are Phase 1+.

**Why no Pandoc GUI editor exists.** Technical users who could build a Pandoc GUI didn't need one — they use VS Code + terminal pandoc. Non-technical users who needed professional Markdown output couldn't build it. LLM-assisted consulting workflows have created a new user class: technical enough to want Markdown, but needing client-grade output and a proper editing experience. This market gap is real and recent.

**Project-as-container insight.** Documents are not authored in isolation. They are produced within a project context: interviews, meeting transcripts, research, ideation. The project is the unit of work; the document is the output. Even in Phase 0, the editor is project-aware. A project folder schema: inputs/ (transcripts, research), working/ (rough notes), context/ (brief, constraints), deliverables/ (final documents). The LLM has access to all layers. Full RAG is Phase 1; the folder schema is Phase 0.

**Revised commercial framing.** The better commercial story is not "enterprise platform replacing Word" but "the tool for the new LLM-assisted consulting workflow user class." These users need exactly: Markdown-native authoring, professional PDF output, project-context awareness, and control over the print stylesheet. No existing tool serves them. The enterprise platform vision remains valid but is Phase 2.

### 2026-02-20 — Tauri ADR, TipTap research (Cursor)

**Tauri decision.** ADR-0003 created and accepted: Tauri for desktop framework. Rationale: 2–10 MB installer vs Electron 80–150 MB; 30–50 MB idle memory vs 150–300 MB; secure-by-default capability model; Rust backend suitable for Pandoc invocation and file operations. See `docs/architectural/adrs/ADR-0003-tauri-desktop-framework.md`. Solution concept and ADR log updated. GUI framework open question resolved for desktop.

**TipTap vs alternatives (research summary).** Alternatives considered: ProseMirror (low-level, TipTap is built on it), Lexical (Meta, 22KB core, immutable tree), Slate (React-based, flexible, no enforced schema), native contenteditable. **Why TipTap over native contenteditable:** Native contenteditable alone is insufficient for production rich text. It lacks schema enforcement, state management, undo/redo, semantic structure, and cross-browser consistency. ProseMirror (which TipTap wraps) is a thin abstraction over contenteditable that provides schema enforcement, transaction model, and collaborative editing support. Building equivalent capability from raw contenteditable would take months. **Why TipTap over raw ProseMirror:** TipTap provides a developer-friendly API, pre-built extensions (headings, lists, blockquotes, code blocks), headless/flexible UI, and Vue/React bindings. Raw ProseMirror requires deeper expertise and more custom code. **Why TipTap over Lexical/Slate:** TipTap has strong ProseMirror foundation (mature, collaboration-ready), modular extensions, and fits custom design systems. Lexical is lighter (22KB) but younger; Slate is React-tied and has no enforced schema. For Pandoc Markdown authoring with custom semantic blocks (callouts, executive summary), TipTap's extension model and ProseMirror schema fit well. **Conclusion:** TipTap remains the recommended choice; no change to solution concept. ADR-0004 created and accepted.

### 2026-02-20 — Styling system design (Cursor)

**Element-based styling, not section-type styling.** The "minimum viable semantic block set" framing was wrong. Styling by section type (callout, executive-summary, recommendation only) cannot cover edge cases: multilevel lists, blockquotes, captions, tables, nested structures. Documents have many structural elements; a hand-picked list of "section types" is insufficient.

**Correct model: Pandoc element vocabulary + custom semantic wrappers.**
- **Standard elements:** Style all Pandoc/HTML elements — `h1`–`h6`, `p`, `ul`/`ol`/`li`, `blockquote`, `table`, `thead`, `tbody`, `figure`, `figcaption`, `pre`, `code`, `hr`, etc. These are the structural vocabulary. CSS targets them directly.
- **Custom semantic blocks:** Fenced divs with classes (callout, executive-summary, recommendation) only where we need meaning beyond structure. These are wrappers; their contents are still standard elements (lists, tables, paragraphs).
- **Composition:** A callout can contain lists; an executive summary can contain a table. Styling for `ul`, `table` applies inside those wrappers. The wrapper adds role, not replacement.

**Multi-level heading numbering.** Use CSS counters. `counter(h1)`, `counters(h2, ".")`, `counters(h3, ".")` produce 1, 1.1, 2.2.1 from the DOM hierarchy. No section-type logic; the heading elements and their nesting define numbering automatically.

**Word-style styling system.** We can build a Word-like styling system that fits our principles:
- Named styles map to elements/classes (Heading 1 = h1, Callout = .callout)
- Style definitions = CSS (or Phase 2 brand manifest)
- Users apply styles via editor; TipTap enforces schema
- Style is theme concern — separate CSS file, swappable without touching documents
- Semantic over cosmetic; document is data. Fits principles. Phase 0: single print CSS; Phase 2: full brand manifest.

### 2026-02-20 — Roadmap drafted (Cursor)

- `docs/planning/roadmap.md` extended via Folivm-drafter. Added: horizon framing (no dates until operating model defined); format documentation as Phase 0 deliverable; Phase 2 DMS priority order and clause library onboarding model from existing decisions; Open Questions section. Version 0.4.

---

### 2026-02-22 — Suite vision, brand, export architecture (Claude.ai)

**Product name: Folivm. Format name: Folivm.** Settled after exploring Fount, Folivm, Folivm, and Folivm. Two names serve two audiences: Folivm is the product surface (craft, quality, familiar); Folivm is the format for technical users and documentation (Markdown lineage, legible). See DEC-009.

**One medium, three rendering modes.** The product is not three tools. It is one Folivm medium with three rendering modes: document (Phase 0), deck (Phase 1), sheet (Phase 2). Modes are rendering contracts on the same file; the file does not change. See DEC-010.

**Why this sequencing.** Mode introduction maps to export fidelity: DOCX (high) → PPTX (medium) → XLSX (low/compatibility). Each mode is validated before the next harder one is introduced. Sheet mode requires the most novel work — formula language design, execution model, XLSX translation — and should not be designed until real usage informs it. See DEC-011.

**Cell type vocabulary.** A Folivm file is a sequence of typed cells. Six types: prose (narrative Markdown), data (tabular with schema), formula (computation referencing data cells), visual (declarative chart/diagram — Vega-Lite, Mermaid), frame (slide boundary and layout hints; invisible in document mode), media (image or asset, path-based). Cell type determines authoring behaviour and rendering per mode.

**The Jupyter insight.** Sheet mode is not Excel. It is a literate sheet where data and formula cells are primary and prose cells are documentation annotations alongside computed content. The Jupyter notebook model applied to structured data rather than code. The distinction between “a notebook” and “a spreadsheet” dissolves when the underlying medium is the same.

**The consultant’s single-source problem.** A consultant delivering a project produces a written report, a data model, and a client presentation — all containing the same content, manually kept in sync across Word, Excel, and PowerPoint. One Folivm source with three rendering modes eliminates this. Numbers on slide 14 are the same data cells as the table in section 4 of the report.

**The author-client distinction.** The Phase 0 user (technical consultant) builds for clients who need familiar, professional output. Clients receive DOCX or PDF; they never see Folivm. The product surface must eventually feel as familiar as Word — not because Word is right, but because familiarity is the adoption mechanism. The LaTeX lesson: technical users who can use a plain-text format don’t need a GUI; non-technical users who need GUI can’t use the plain-text format. Folivm resolves this by hiding Folivm behind a Word-like surface. See DEC-013.

**Export fidelity gradient.** PDF and DOCX: high fidelity, must be professionally acceptable without post-processing. PPTX: structural fidelity (right content, right slides); layout best-effort via reference template; not Figma-quality. XLSX: compatibility artefact; prose context lost; do not design until sheet mode is validated. CSV: clean, no loss, first-class export for tabular data. The Office file is never the source of truth. See DEC-012.

**Why Word was never ASCII.** In 1983, machine consumption of documents did not exist as a design pressure. Binary formats were faster and smaller; the only consumers were humans and printers. The web did not exist; interoperability was not a design requirement. LLMs have changed the calculus: machine consumption is now as important as human consumption, and they have opposite format preferences (plain text vs rich formatting). Folivm is built for this moment. This is the founding insight.

**Figma/Canva and visual production.** Deck mode provides structural fidelity, not pixel-perfect design. Clients have come to expect Figma-level production quality for polished presentations. The pragmatic position: Folivm covers document and data deliverables (80% of consultant output) professionally; high-production visual artefacts remain a separate design step. A strong reference PPTX template raises the quality floor. Declarative visual cells (Vega-Lite charts, Mermaid diagrams) rendered as SVG can achieve professional data visualisation without Figma. R-009 records this as an open risk.

**All docs updated 2026-02-22 (first pass):** README, solution-concept, roadmap, backlog, RAIDD decisions (DEC-009 to DEC-016), RAIDD risks (R-007 to R-010, cleaned duplicates from prior session), skills/docforge-drafter/SKILL.md. Run `scripts/generate_raidd.py` locally to rebuild compiled RAID document.

---

### 2026-02-22 — Figma styling model, enshittification, monetisation (Claude.ai, second pass)

**Figma Variables + Modes as brand manifest architecture.** Three Figma concepts map to Folivm: (1) Variables + Modes → brand manifest; a named variable `brand.primary` resolves to different values depending on the active mode (client brand, light/dark, print/screen). Documents never change; the mode switches the resolution. This is more principled than swapping a CSS file. (2) Variants → semantic block vocabulary; callout types (info/warning/recommendation) are variants — author picks meaning, manifest picks appearance. (3) Component Properties → authoring interface for cells; expose only meaningful parameters, hide brand/layout complexity. Phase 0 implementation: CSS custom properties (`--color-brand-primary`) are a primitive but forward-compatible version of the variable model. Use custom properties throughout Phase 0 so Phase 2 can layer a manifest resolver on top without rewriting stylesheets. See Principle 10.

**Enshittification fatigue and local-first positioning.** The pushback against cloud subscription tools is real, growing, and commercially significant. Adobe Creative Suite (subscription-only), Evernote (degraded through ownership changes, data loss), Notion (format lock-in, cloud-only, no deliverable export) are the canonical cases. Counter-movement: Obsidian (~1M users, local-first, profitable), iA Writer (one-time purchase, decade of profitability), Affinity (challenged Adobe on one-time purchase model). The market for "pay once, own it, files are yours" professional tools is underserved by VC-backed SaaS and actively sought by a growing segment of professional users. Local-first is Folivm's deliberate positioning, not a Phase 0 compromise. See Principle 11, A-009.

**The AI friction problem and its resolution.** Two models are in tension: (a) local-first tool, user provides LLM API key (BYOK) — preserves ownership but bricks non-technical users; (b) cloud SaaS with bundled AI — frictionless but reintroduces enshittification risk. Resolution: three-tier unbundled model. Core tool is one-time purchase, local, BYOK available. Folivm AI is a separate optional subscription — a managed LLM proxy, analogous to Obsidian Sync — that removes BYOK friction without making the core tool a subscription. Folivm Sync is a third optional subscription for multi-device convenience. Each tier has honest recurring justification; none holds the others hostage. See DEC-017, I-007, operating-model.md.

**The commitment covenant.** The three-tier model only works as a trust proposition if the commitment is explicit and public: core tool features are never gated behind Tier 2 or Tier 3 subscriptions. This must appear in licence terms and product positioning, not just be intended internally. The moment it is violated, the positioning collapses. See Principle 11, DEC-017.

**Notion comparison documented.** Notion proves the one-medium-multiple-modes concept is learnable and usable. But Notion fails on: no deliverable export (PDF is a screen capture, not a designed document), cloud-forever assumption (no offline, no portable format, shutting down = losing your work), no brand layer (every workspace looks like Notion). Folivm's differentiation: exported artefact is first-class, Folivm is portable and open, local-first by default.

**All docs updated 2026-02-22 (second pass):** assumptions.yaml (A-001 rewritten, A-009 and A-010 added), issues.yaml (I-007 updated to in-progress with resolution direction), principles.md (Principles 10 and 11 added), operating-model.md (drafted from stub — full three-tier commercial model), decisions.yaml (DEC-017 added). Run `scripts/generate_raidd.py` locally.

---

### 2026-02-22 — Pandoc scope and pre-processing pipeline (Claude.ai, third pass)

**Pandoc suits Phase 0 fully; strains beyond it.** For document mode — prose-heavy consulting deliverables, PDF and DOCX export — Pandoc is excellent and essentially solved technology. For data cells, formula cells, visual cells, and frame cells, Pandoc is a text container only: it carries the syntax (fenced divs, raw blocks) but contributes no semantic processing. Pandoc does not evaluate formulas, render Vega-Lite specs, or understand typed column schemas. This is not a problem if the architecture is designed honestly around it.

**Do not fork Pandoc.** Considered and rejected. Pandoc is Haskell — specialist language, small developer pool, steep learning curve, diverges from the TypeScript/Rust stack. Forking means owning the entire codebase, merging every upstream release permanently, and adding a computation engine (formula evaluation) to a tool architecturally designed as a document converter. The value Pandoc provides — its export writers — is preserved whether you fork or not. See DEC-018.

**The pre-processing pipeline architecture.** Before invoking Pandoc for export, Folivm's own pipeline (TypeScript/Rust) processes the Folivm file: evaluates formula cells, renders visual cells to SVG via Vega-Lite/Mermaid, resolves data cells to typed Markdown tables, maps frame cells to Pandoc slide boundary syntax. The output is standard Pandoc Markdown. Pandoc converts it. Lua filters handle any remaining export-time transformation. Pandoc remains a freely updatable dependency; Folivm's semantic layer is testable independently of Pandoc.

**Pandoc's role restated precisely.** Prose substrate and storage syntax for prose cells (full semantic processor). Export engine for document mode (PDF, DOCX) and deck mode (PPTX at structural fidelity). Text container for data/formula/visual/frame cells — carries them without interpreting them. Not the execution engine; not the rendering pipeline for extended cell types.

**Folivm is a superset of Pandoc Markdown.** Every Folivm file is valid Pandoc Markdown. Pandoc can process the prose. It ignores the extended cell semantics. Users who open a Folivm file with vanilla Pandoc get the prose content; they lose the data and formula semantics. This is acceptable and should be documented honestly in the format specification.

**Djot noted as future watch item.** Djot is a newer markup language by Pandoc's author (John MacFarlane) with a cleaner extension model and unambiguous grammar. Too immature and LLM-unfamiliar for current use. Worth revisiting if Pandoc Markdown's ambiguities or extension limits become a practical problem. See DEC-018 note.

**Docs updated 2026-02-22 (third pass):** decisions.yaml (DEC-018 added), NOTES.md (this entry). Run `scripts/generate_raidd.py` locally.

---

### 2026-02-22 — Structural (outline) mode as core workflow (Claude.ai, fourth pass)

**Structural mode added as a fourth rendering mode.** Word's Outline mode is one of its most valuable and underappreciated features — it surfaces the heading hierarchy, collapses body text, and lets the author work at the structural level before writing prose. This is how professional consultants and policy writers actually work: structure first, prose second. Folivm should make this a first-class mode, not an afterthought.

**Nothing new needs to be stored.** Folivm's heading hierarchy is already the structural spine of every document. Structural mode is a different rendering contract on existing data — it reads H1–H4 headings, presents them as a collapsible reorderable tree, and hides body text. Reordering in structural mode rewrites heading sequence in the Folivm source. The mode itself has no export path.

**Four rendering modes, not three.** Document (Phase 0), Structural (Phase 1), Deck (Phase 1), Sheet (Phase 2). The HLA rendering modes table now captures all four with phase, primary surface, cell types, and export. Structural is the only mode with no export — it is an authoring surface only.

**LLM integration point.** "Given my brief, suggest a document structure" is a natural structural mode interaction. The LLM generates a heading hierarchy; the author reviews and reorders it in structural mode; prose follows. This is cleaner than generating prose directly from a brief and more aligned with how skilled writers work.

**Deck mode connection.** An outline in structural mode and a slide list in deck mode are the same structure rendered differently. EP-108 and EP-103 should be designed together in Phase 1 — the outline-to-deck authoring path (structure in outline mode, switch to deck mode, headings become slides) is high-value for consultants.

**Principle 12 added:** Structure first, prose second — structural mode is a core workflow surface, not a convenience feature.

**Docs updated 2026-02-22 (fourth pass):** backlog.md (EP-105–108 added to Phase 1 table; EP-108 full epic description added), hla.md (Rendering Modes table added, structural mode in Future Layers), principles.md (Principle 12 added, Open Questions updated), conops.md (Phase 1 workflow added, workflow comparison table extended to Phase 1+, persona table updated, scope boundary updated), NOTES.md (this entry). Run `scripts/generate_raidd.py` locally.
