---
title: EP-107 — Templated Project Conventions
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
depends_on:
  - docs/execution/epics/EP-003-project-folder-context.md
  - docs/execution/epics/EP-007-format-documentation.md
  - docs/architectural/principles.md
---

# EP-107 — Author can use templated project conventions

## Outcome

When creating a project, the author can select a template that sets up the folder structure and optional default context files. Templates encode conventions for different workflows (consulting report, legal matter, government submission). This builds on the user-defined conventions capability and validates that the problem is shared across workflows.

## Rationale

EP-003 provides the default folder schema (inputs/, working/, context/, deliverables/). EP-007 documents the conventions. Phase 1 adds UX for choosing and defining conventions. Templated conventions let authors start with a workflow-specific structure without configuring from scratch. Principle 10 (format documentation and project conventions) calls for templated conventions as a Phase 1 roadmap feature.

## Scope

- Project creation flow: choose template or custom
- Built-in templates: e.g. Consulting report, Legal matter, Government submission
- Each template: folder structure, optional default files (brief template, README)
- User-defined conventions: author can save current project structure as a template (stretch)
- Template metadata: name, description, folder schema, optional files

## Non-scope (Phase 1)

- Enterprise-level conventions (per-brand, per-organisation) — Phase 2
- Clause library integration with templates — Phase 2

## Success Criteria

- Author can create a project from a template
- Template applies the correct folder structure
- Optional default files (e.g. brief.md) are created when the template specifies them
- At least three workflow templates are available
- Author can create a project with custom structure (no template) — from EP-003

## Stories

| ID | Title | Status |
|----|-------|--------|
| US-075 | As an author, I want to choose a template when creating a project so that I get the right structure for my workflow | Backlog |
| US-076 | As an author, I want template descriptions so that I can pick the right one | Backlog |
| US-077 | As an author, I want default context files (e.g. brief template) from the template so that I have a starting point | Backlog |
| US-078 | As an author, I want to create a project with custom structure so that I am not limited to templates | Backlog |

*Story files to be created when EP-107 is prioritised.*

## Related

- [EP-003 Project folder context](EP-003-project-folder-context.md) — Base folder schema
- [EP-007 Format documentation](EP-007-format-documentation.md) — Documented conventions
- [Principles § Project conventions](../../architectural/principles.md) — User-defined and templated conventions

---

*Previous: [EP-102](EP-102-rag-project-folder.md) · Next: [Backlog](../backlog.md) (Phase 1 infra: EP-104–106)*
