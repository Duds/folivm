---
title: ADR-0001 — LLM Provider Pluggability and Data Sovereignty
project: Folivm
status: proposed
version: 0.1
created: 2026-02-20
author: Dale Rogers
depends_on:
  - docs/architectural/hla.md
  - docs/architectural/principles.md
  - docs/strategic/solution-concept.md
---

# ADR-0001 — LLM Provider Pluggability and Data Sovereignty

## Status
Proposed

## Context

When document content is sent to an LLM API for generation or analysis, it leaves the platform. For Australian government users, agency policy may prohibit sending content to overseas API endpoints. Folivm's target market (professional services firms, government agencies) requires data sovereignty options.

The solution concept and HLA specify direct API calls for Phase 0 LLM assistance. A decision is needed on:
1. Whether the LLM integration is provider-agnostic (pluggable) or tied to a single API
2. What data sovereignty options exist at launch
3. What is deferred to Phase 2+ (e.g. self-hosted models)

RAIDD issue I-002 blocks any government pilot until this decision is documented in an accepted ADR.

## Decision

**Architect for pluggable LLM providers from day one.** Provider, region, and model are configuration parameters, not hardcoded. For government engagements at launch, the practical path is **Azure Australia East** under an enterprise agreement. Self-hosted or private model support is a Phase 2+ roadmap item.

## Rationale

### Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| **Pluggable (provider, region, model as config)** | Unlocks government path; allows provider swap without code change; future-proof | Slightly more upfront design; config schema required |
| **API-first single provider** | Simpler; faster to ship | Blocks government pilots; lock-in; redesign if sovereignty required |
| **Local-only (Ollama, self-hosted)** | Maximum sovereignty; no data leaves platform | Current open-weight model quality for professional document generation is below frontier APIs; operational burden; Phase 2+ scope |

### Why Pluggable

1. **Government path.** Australian government agencies often require data residency (ISM, IRAP context). Azure Australia East and AWS Sydney both offer frontier model APIs (Anthropic, OpenAI) under enterprise agreements with ISM-relevant compliance certifications. This covers most government use cases and is available today. A single-provider, single-region design would block that market.

2. **Provider swap without rework.** If a provider raises prices, changes terms, or degrades quality, configuration change (not code change) should suffice. The integration layer abstracts provider details.

3. **Model selection.** Different tasks may suit different models (speed vs quality, long context vs cost). Configuration (model name per use case) is cleaner than hardcoding.

4. **Phase 0 scope.** Phase 0 uses direct API calls. The pluggability is in the config schema and abstraction layer — a small addition. No RAG, no local models. The design cost is low; the future benefit is high.

### Why Azure Australia East for Government

For government engagements at launch, Azure Australia East is the most practical choice:
- Enterprise agreements with ISM-aligned certifications exist
- Supports Anthropic and OpenAI models in Australian region
- Familiar to Australian government IT procurement

This is the *default* for government; the architecture allows other providers (e.g. AWS Sydney) if an agency prefers.

### Why Self-Hosted Is Phase 2+

Self-hosted models (Ollama, Llama, Mistral) offer maximum sovereignty but:
- Open-weight model quality for professional document generation is meaningfully below frontier API quality
- Operational burden (hosting, updates, scaling)
- Adds significant scope to Phase 0

Content redaction before API calls was considered and rejected: too complex, failure-prone, and introduces new attack surface.

## Consequences

**Positive:**
- Government pilot path unblocked once ADR is accepted
- Provider, region, model selectable via config; no code change for swaps
- Architecture supports future self-hosted models without redesign

**Negative:**
- Config schema and provider abstraction must be designed and implemented (modest effort)
- Each supported provider requires integration and testing

**Neutral:**
- Phase 0 remains API-based; no change to "direct API calls" scope
- Local/private models deferred; can be added in Phase 2 when quality and tooling mature

## Related

- [HLA](../hla.md) — LLM Integration section; provider as config
- [Solution Concept](../../strategic/solution-concept.md) — Phase 2 government market; Azure Australia East
- [RAIDD](../../governance/raid.md) — I-002 (blocks government pilot until ADR accepted); DEC-002 (pluggable LLM decision)
- [NOTES.md](../../../NOTES.md) — Data sovereignty decision (2026-02-19 ConOps)

---

*Previous: [ADR Log](README.md) · Next: [ADR-0002](ADR-0002-docx-export-library-selection.md)*
