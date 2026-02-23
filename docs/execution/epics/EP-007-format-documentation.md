---
title: EP-007 — Format Documentation
project: Folivm
status: done
version: 0.1
created: 2026-02-20
depends_on:
  - docs/planning/roadmap.md
  - docs/conceptual/prd-lean.md
  - NOTES.md
---

# EP-007 — Author has documented Folivm format and project conventions

## Outcome

Folivm-specific format documentation exists for portability and tool interop. The frontmatter schema, project folder conventions, and any Folivm extensions to Pandoc Markdown are specified. Users and tools can rely on this documentation without reverse-engineering.

## Scope

- YAML frontmatter schema (required fields, optional fields, semantics)
- Project folder conventions (inputs/, working/, context/, deliverables/; optional Folivm.yaml override)
- Fenced div classes and semantic block conventions (callout, executive-summary, etc.)
- Any Pandoc options or filters Folivm expects
- Document location: docs/ or dedicated format spec

## Non-scope (Phase 0)

- User-defined convention UX (Phase 1)
- Templated conventions for workflows (Phase 1)

## Success Criteria

- A third party can create a valid Folivm document and project structure using only the documentation
- Format spec is versioned and referenced from README
- Pandoc Markdown baseline is acknowledged; Folivm extensions are explicitly listed

## Stories

| ID | Title | Status |
|----|-------|--------|
| [US-070](../stories/US-070-documented-frontmatter-schema.md) | As an author, I want documented frontmatter schema so that I know what metadata is valid | Done |
| [US-071](../stories/US-071-documented-project-conventions.md) | As an author, I want documented project folder conventions so that I can create compatible projects | Done |
| [US-072](../stories/US-072-documented-semantic-blocks.md) | As an author, I want documented semantic block conventions so that I can use fenced divs correctly | Done |

## Related

- [Roadmap](../../planning/roadmap.md) — Format documentation as Phase 0 deliverable
- [NOTES.md](../../../NOTES.md) — Format documentation and project conventions decision
- [Principles](../../architectural/principles.md) — Format documentation and project conventions

---

*Previous: [EP-006](EP-006-tauri-desktop-shell.md) · Next: [Backlog](../backlog.md)*
