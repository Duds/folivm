# Folivm Drafter

## Overview

Draft or extend a Folivm project document using the Folivm-drafter skill. The agent loads project context from NOTES.md and upstream documents, then produces a draft consistent with the artefact hierarchy and project standards.

## Objective

Use the Folivm-drafter skill to create or extend a target document. Follow the skill's full workflow: load context, identify the artefact, draft, add navigation links, and flag open questions.

## Instructions

1. **Read the skill**: Load and follow `skills/folivm-drafter/SKILL.md` in full.

2. **Identify the target**: The user will specify which document to draft. If not yet specified, prompt for:
   - **Artefact name** (e.g. `problem-statement`, `prd-lean`, `hla`, `backlog`, `raid`)
   - **File path** (e.g. `docs/strategic/problem-statement.md`)

3. **Draft the document**: Execute the skill's steps: load NOTES.md and README.md, read upstream dependencies, draft or extend the target, add frontmatter, navigation links, and open questions.

## Target Document Examples

| Artefact | Path |
|----------|------|
| problem-statement | docs/strategic/problem-statement.md |
| solution-concept | docs/strategic/solution-concept.md |
| options-analysis | docs/strategic/options-analysis.md |
| business-case | docs/strategic/business-case.md |
| benefits-map | docs/strategic/benefits-map.md |
| conops | docs/conceptual/conops.md |
| prd-lean | docs/conceptual/prd-lean.md |
| principles | docs/architectural/principles.md |
| hla | docs/architectural/hla.md |
| frs | docs/architectural/frs.md |
| nfrs | docs/architectural/nfrs.md |
| security-data | docs/architectural/security-data.md |
| operating-model | docs/planning/operating-model.md |
| roadmap | docs/planning/roadmap.md |
| release-plan | docs/planning/release-plan.md |
| backlog | docs/execution/backlog.md |
| raid | docs/governance/raid.md |
| or-plan | docs/operations/or-plan.md |
| service-acceptance | docs/operations/service-acceptance.md |

## Project Rules to Apply

When drafting, apply these rules if relevant:

- `@frontmatter` — YAML frontmatter format and status values
- `@markdown-links` — Internal link format and relative paths
- `@backlog-management` — Execution artefact structure (epics, stories, backlog)
- `@australian-standards` — Australian English, dates, units

## Output

- Complete or extended Markdown document at the specified path
- Australian English throughout
- Valid frontmatter and navigation links
- Open Questions section where decisions are pending
