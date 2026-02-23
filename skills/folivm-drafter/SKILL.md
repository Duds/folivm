---
name: Folivm-drafter
description: >
  Draft Folivm project documents. Use when working on any document in the
  Folivm artefact hierarchy — strategic, conceptual, architectural, planning,
  execution, governance, or operations. Loads project context from NOTES.md
  and upstream documents, then drafts or extends the target document.

---

# Folivm Document Drafter

You are helping develop **Folivm** — an AI-native, ASCII-native document suite.
Single brand: **Folivm** for company, product, and format (Pandoc extended
Markdown plus typed cell vocabulary). Use this name consistently. Your job is to draft or extend a specific project document, grounded
in the established concept and consistent with upstream artefacts.

---

## Step 1 — Load Project Context

Before writing anything, read the following files in order:

1. `~/Projects/applications/richmark/NOTES.md` — comprehensive concept capture,
   key decisions, open questions, and session history. This is your primary
   context source.
2. `~/Projects/applications/richmark/README.md` — document index and project
   status overview.
3. Any upstream documents the target document depends on (see Dependency Map
   below). Read these before drafting.

If any required upstream dependency is unavailable, explicitly list:
- Missing file
- Impact on draft confidence
- Assumptions made


---

## Step 2 — Identify the Target Document

The user will specify which document they want to draft or extend. Match it to
the artefact hierarchy:

| Layer | Documents |
|-------|-----------|
| Strategic | problem-statement, solution-concept, options-analysis, business-case, benefits-map |
| Conceptual | conops, prd-lean |
| Architectural | principles, hla, adrs/ADR-NNNN, frs, nfrs, security-data |
| Planning | operating-model, roadmap, release-plan |
| Execution | backlog, epics/EP-NNN, stories/US-NNN |
| Governance | raid, gate-packs, change-control, benefits-tracking |
| Operations | or-plan, runbooks, service-acceptance |

### Dependency Map

Read upstream documents before drafting the target. Folivm uses a Phase 0 → Phase 1 → Phase 2 sequencing; problem-statement and solution-concept establish this.

- **options-analysis** → needs: problem-statement, solution-concept
- **business-case** → needs: problem-statement, solution-concept, options-analysis
- **benefits-map** → needs: business-case
- **conops** → needs: solution-concept
- **prd-lean** → needs: solution-concept, conops (Phase 0 PRD scoped to personal tool)
- **principles** → needs: solution-concept
- **hla** → needs: principles, solution-concept
- **frs** → needs: prd-lean, conops
- **nfrs** → needs: prd-lean
- **security-data** → needs: nfrs
- **adrs** → needs: hla, principles
- **operating-model** → needs: options-analysis
- **roadmap** → needs: prd-lean, operating-model
- **release-plan** → needs: roadmap
- **backlog** → needs: prd-lean, roadmap, frs (for FR traceability)
- **epics** → needs: backlog
- **stories** → needs: relevant epic
- **raid** → needs: all available upstream docs
- **or-plan** → needs: hla, nfrs
- **service-acceptance** → needs: or-plan, nfrs

---

## Step 3 — Draft the Document

### Output Format

All documents use this YAML frontmatter followed by Markdown content:

```yaml
---
title: [Document Title]
project: Folivm
status: draft
version: 0.1
created: [YYYY-MM-DD]
author: [if known]
depends_on: [list upstream documents read]
---
```

### Tone and Style

- **Precise and direct.** No filler. Every sentence earns its place.
- **Australian English** throughout.
- **Present tense** for descriptions of the system; future tense for planned
  work.
- **Active voice** preferred.
- Avoid corporate cliché ("leverage", "synergy", "holistic").
- Write for a technically literate reader who is also a business stakeholder —
  assume intelligence, not domain expertise.

### Content Standards by Document Type

**Strategic documents** (problem-statement, solution-concept, options-analysis,
business-case, benefits-map):
- Lead with the insight or decision, not the background
- Make the "so what" explicit in every section
- Quantify where possible; flag where you can't
- Surface tensions and trade-offs honestly — don't paper over them

**Conceptual documents** (conops, prd-lean):
- ConOps: ground every workflow in a real user persona doing a real task
- PRD: distinguish goals (outcomes) from features (means); be explicit about
  non-goals
- Both: flag assumptions that need validation

**Architectural documents** (principles, hla, adrs, frs, nfrs, security-data):
- Principles: state the principle, the rationale, and the implication for
  design decisions
- HLA: describe each layer's responsibilities and boundaries; include what
  each layer does NOT do
- ADRs: follow the template at `docs/architectural/adrs/ADR-0000-template.md`
- FRS: formalise functional requirements from PRD; maintain FR-ID traceability;
  include priority and verification method
- NFRs: make requirements measurable (e.g., "export completes in under 10
  seconds for documents up to 100 pages")
- Security: apply Australian government security framework context where
  relevant (ISM, IRAP, Privacy Act)

**Planning documents** (operating-model, roadmap, release-plan):
- Be honest about uncertainty; use horizon/phase framing rather than false
  date precision
- Roadmap: tie each horizon to capability outcomes, not feature lists
- Operating model: surface the hardest organisational questions, not just
  the easy ones

**Execution documents** (backlog, epics, stories):
- Epics: outcome-oriented titles ("Users can create brand-compliant documents
  from templates"), not feature-oriented ("Template system")
- Stories: follow format — As a [persona], I want [capability] so that
  [outcome]. Acceptance criteria are testable.
- Backlog: maintain priority order with rationale

**Governance documents** (raid):
- Risks: be honest about likelihood and impact; avoid "medium/medium" for
  everything
- Assumptions: flag which are validated vs unvalidated
- Dependencies: note owner and due date where known

---

## Step 4 — Handle Stubs

If the target document already exists as a stub (status: stub), read it first
to understand what sections were planned. Honour the planned structure unless
you have good reason to deviate — and if you deviate, note why.

Upgrade the frontmatter from `status: stub` to `status: draft` when producing
real content.

---

## Step 5 — Navigation Links

End every document with navigation links to upstream and downstream documents,
following the established pattern:

```markdown
---
*Previous: [Upstream Doc](../path/upstream.md) · Next: [Downstream Doc](../path/downstream.md)*
```

---

## Step 6 — Flag Open Questions

At the end of the draft, add a `## Open Questions` section listing anything
that needs decision or validation before this document can be considered
complete. Cross-reference NOTES.md open questions where relevant.

After drafting, propose any new open questions that should be added to
`NOTES.md`.

---

## Key Concepts to Stay Grounded In

These are non-negotiable architectural and strategic commitments. Do not contradict them:

- **Single brand: Folivm.** Company, product, and format share one name. Folivm format is Pandoc's extended Markdown plus typed cell vocabulary. DEC-020.
- **One medium, three rendering modes.** Folivm is not three products. It is one format with document mode (Phase 0), deck mode (Phase 1), and sheet mode (Phase 2). DEC-010, DEC-011.
- **Backing format is Pandoc Markdown.** Not a custom DOM. Pandoc extended syntax (fenced divs, YAML frontmatter, pandoc-crossref, citeproc) handles semantic richness. DEC-014.
- **Cell type vocabulary.** Prose, data, formula, visual, frame, media. These are the typed building blocks of a Folivm file. Cell type determines authoring behaviour and rendering in each mode.
- **Phase 0 is a personal tool.** Local-first GUI editor; document mode only; primary user is the author. Solve your own problem first. Server-hosted, deck mode, sheet mode, clause library, brand manifest are Phase 1+. DEC-015.
- **The author-client distinction.** The Phase 0 user (technical consultant) builds for clients who need familiar, professional output. The Folivm format is invisible to clients; they receive DOCX or PDF. The product surface must eventually feel as familiar as Word. DEC-013.
- **Document is data.** Storage format = AI exchange format = rendered document. No lossy conversion. In Phase 0, storage = Pandoc Markdown + YAML frontmatter.
- **Semantic over cosmetic.** Structure and meaning are stored; appearance is derived. In Phase 0, style = print CSS + reference DOCX template. Full brand manifest is Phase 2.
- **Export fidelity gradient.** PDF and DOCX: high fidelity, must be professionally acceptable without post-processing. PPTX: structural fidelity, layout best-effort. XLSX: compatibility artefact, prose context lost. CSV: clean, first-class. DEC-012.
- **Not replacing Word.** Folivm owns the authoring position; Office owns final-mile distribution. The InDesign model.
- **The WordPerfect warning.** Technical superiority is necessary but not sufficient. Distribution and adoption strategy matter.
- **Why Word was never ASCII.** In 1983, machine consumption did not exist as a design pressure. Folivm is built for the moment when machine consumption matters as much as human consumption. This is the founding insight.
- **Target market (Phase 2).** Professional services firms, government agencies. Phase 0 targets the technical consultant; enterprise is Phase 2. Australian government context relevant for Phase 2 (ISM, IRAP, Privacy Act).

---

## Usage Pattern

Start a new Claude.ai chat for each document. Open with:

> "Use the Folivm-drafter skill. I want to draft [document name].
> The file is at `docs/[layer]/[filename].md`."

Claude will read NOTES.md, README.md, and upstream dependencies, then draft
the document. Review the draft, give feedback, and iterate in the same chat.
When satisfied, write the final version to disk.
