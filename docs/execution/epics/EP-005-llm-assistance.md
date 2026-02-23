---
title: EP-005 — LLM Assistance with Project Context
project: Folivm
status: done
version: 0.2
created: 2026-02-20
updated: 2026-02-23
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/strategic/solution-concept.md
---

# EP-005 — Author can request LLM assistance with document and project context

## Outcome

The author requests LLM assistance on demand. Each request includes the current document content and selected project context (brief, files from inputs/ or context/). AI-generated content is presented as a suggestion; the author must explicitly accept before it enters the document. Provider, region, and model are configurable (pluggable).

## Scope

- On-demand LLM requests; user initiates each
- Document content + selected project files sent with each request
- AI response presented as suggestion; explicit accept before insertion
- Pluggable provider configuration (API key, endpoint, model)
- No automatic generation; no RAG (Phase 1)

## Non-scope (Phase 0)

- RAG over project folder (Phase 1)
- Australian-region / government compliance (Phase 2; ADR-0001)
- Local/private model deployment

## Success Criteria

- Author can trigger an LLM request with document and context
- Response is shown as a suggestion; author can accept or reject
- Configuration supports at least one provider (e.g. OpenAI, Anthropic)

## Stories

| ID | Title | Status |
|----|-------|--------|
| [US-040](../stories/US-040-request-llm-assistance.md) | As an author, I want to request LLM assistance with my document so that I can draft or refine content | Done |
| [US-041](../stories/US-041-llm-project-context.md) | As an author, I want the LLM to receive my brief and selected context files so that it has project context | Done |
| [US-042](../stories/US-042-accept-reject-suggestions.md) | As an author, I want to accept or reject AI suggestions before they enter the document so that I stay in control | Done |
| [US-043](../stories/US-043-configure-llm-provider.md) | As an author, I want to configure my LLM provider (API key, model) so that I can use my preferred service | Done |

## Related

- [Solution Concept](../../strategic/solution-concept.md) — LLM integration
- [PRD Lean](../../conceptual/prd-lean.md) — FR-4 LLM Integration
- ADR-0001 (planned) — LLM provider pluggability

---

*Previous: [EP-004](EP-004-export-pdf-docx.md) · Next: [EP-006](EP-006-tauri-desktop-shell.md)*
