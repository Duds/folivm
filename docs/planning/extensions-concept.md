---
title: Extensions Concept
project: Folivm
status: draft
version: 0.2
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/planning/roadmap.md
  - docs/architectural/hla.md
---

# Extensions Concept

This document outlines ideas for how extensions might work in Folivm. **AI assistant as first extension (EP-112)** is brought forward to Phase 0 — see [EP-112](../execution/epics/EP-112-ai-assistant-extension.md). Full extension marketplace and third-party extensions remain Phase 3 (Platform).

---

## Purpose

Extensions would allow third parties (and power users) to add capabilities without modifying core Folivm. Use cases:

- **Theme and clause library marketplace** — community themes, branded templates, clause packs
- **API integrations** — DMS, CRM, citation managers, external tools
- **Custom semantic blocks** — industry-specific document elements (legal clauses, compliance callouts)
- **Export formats** — additional output targets beyond PDF/DOCX/PPTX
- **Workflow automation** — hooks into document lifecycle (on save, on export, validation)

---

## Extension Points (Proposed)

| Extension point | Description | Example |
|-----------------|-------------|---------|
| **Themes** | Brand manifests (CSS + reference DOCX) | Consulting firm theme, government template |
| **Clause packs** | Versioned clause libraries with metadata | Engagement letter clauses, board paper boilerplate |
| **Semantic blocks** | Custom fenced div types with rendering | Legal callout, compliance checklist |
| **Export writers** | Additional export targets | HTML bundle, XML, custom DOCX variants |
| **Sidebar panels** | Additional left-sidebar icon + panel content | **AI assistant (EP-112)** — first extension; outline view, version timeline, custom explorer |
| **Toolbar actions** | Buttons or commands in editor chrome | Insert clause, validate, custom formatting |
| **Document hooks** | Events: onSave, onLoad, onExport | Auto-tag, sync to DMS, validation |
| **LLM tools** | Custom tools exposed to LLM context | Clause lookup, style checker |

---

## Packaging and Discovery

- **Format:** Extension manifest (JSON/YAML) with metadata, entry points, permissions
- **Installation:** Local folder (developer), marketplace install (user), organisation push (enterprise)
- **Sandboxing:** Extensions run in a restricted context; file system, network, and API access are capability-gated
- **Versioning:** Extensions declare compatibility with Folivm version; marketplace enforces compatibility

---

## Security and Trust

- Extensions request capabilities explicitly (read project, write document, network access)
- Signed extensions from marketplace; unsigned require user confirmation
- Organisation-administered extensions for enterprise deployments
- Audit trail for extension actions in professional/government contexts

---

## Implementation Notes

- **EP-112 (Phase 0):** AI assistant as extension — refactors built-in LLM panel into optional extension; solves thin cloud vs API tokens (users who don't want to manage API keys get lean core)
- Phase 3 scope — full extension marketplace, third-party extensions
- Architecture should avoid hard dependencies on extension format; plugin interface can evolve
- TipTap/ProseMirror extension model may inform editor-level extensions
- Tauri/Rust backend would need a plugin or IPC boundary for native extensions

---

## UI Placeholder

The left sidebar "Extensions" icon (Puzzle) shows "Coming soon" and remains disabled until Phase 3. When implemented, it would open an Extensions panel: installed extensions, marketplace browser, settings per extension.

---

*Related: [Roadmap Phase 3](../planning/roadmap.md), [HLA](../architectural/hla.md)*
