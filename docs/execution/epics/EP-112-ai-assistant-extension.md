---
title: EP-112 — AI assistant as extension
project: Folivm
status: draft
version: 0.1
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/planning/extensions-concept.md
  - docs/execution/epics/EP-005-llm-assistance.md
---

# EP-112 — AI assistant as optional extension

## Outcome

The AI/LLM assistant (request assistance, project context, accept/reject suggestions) is delivered as an optional extension rather than built into core Folivm. Authors who want LLM help install the extension and configure their API key. Authors who prefer local-only or do not want to manage tokens can omit it.

## Rationale

**Thin cloud vs API tokens.** Building LLM assistance into core forces every user to confront API configuration, even if they never use it. Extensions allow opt-in: users who want AI install the extension; others get a leaner app. This also enables future variants (e.g. Folivm-managed proxy extension, or third-party LLM extensions) without changing core.

## Acceptance Criteria

- Core Folivm (without extension) has no LLM panel, no LLM config, no AI-related UI
- "AI Assistant" or "LLM Assistant" extension can be installed (Phase 1: bundled, installable; Phase 3: marketplace)
- When installed, extension registers a right-panel view (or equivalent) with the same UX as current assistant panel
- Extension handles: provider config, API key storage (Folivm.yaml or extension-specific), request/response, accept/reject
- Uninstalling or disabling extension removes all AI UI and config surface

## Migration

- EP-005 (LLM assistance) is implemented as built-in. This epic refactors it into extension form.
- Migration path: extract assistant UI and logic into extension package; core app detects extension and renders panel slot when present.

## Non-scope (this epic)

- Extension marketplace or discovery (Phase 3)
- Folivm-managed proxy (EP-105) — that would be a separate extension
- RAG (EP-102) — RAG could be built into the AI extension or a companion extension

## Stories

- US-102: Define extension contract for sidebar/panel registration
- US-103: Extract assistant panel into AI extension package
- US-104: Core app: extension slot, no built-in AI when extension absent

## Related

- [Extensions Concept](../planning/extensions-concept.md) — Extension architecture
- [EP-005](EP-005-llm-assistance.md) — Current built-in LLM (to be extracted)
- [EP-102](EP-102-rag-project-folder.md) — RAG (potential extension enhancement)
- EP-105 (Folivm AI proxy) — Folivm AI proxy (alternative extension)

---

*Previous: [EP-111](EP-111-document-tabs.md) · Next: [EP-102](EP-102-rag-project-folder.md) (Phase 1)*
