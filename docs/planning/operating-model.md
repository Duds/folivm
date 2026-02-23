---
title: Operating Model
project: Folivm
status: draft
version: 0.2
created: 2026-02-19
updated: 2026-02-22
depends_on:
  - docs/strategic/solution-concept.md
  - docs/architectural/principles.md
  - docs/planning/roadmap.md
---

# Operating Model

This document describes how Folivm is built, distributed, and sustained commercially. It covers the commercial model, the product tier architecture, the development approach, and the support model. It is a living document — Phase 0 sections are concrete; Phase 1+ sections are directional.

---

## Commercial Model — Three Tiers

Folivm's commercial model separates three distinct concerns that most SaaS tools bundle into a single subscription. Unbundling them allows each to be priced honestly and independently, and preserves the local-first ownership commitment that is central to the product's positioning.

### Tier 1 — Folivm Core (one-time purchase)

The editor, the Folivm format, the export pipeline (PDF, DOCX), and the project folder schema. This is the product. It runs entirely locally. No account required. No internet connection required for authoring or export.

**What is included:** Full document mode authoring, Pandoc export to PDF and DOCX, project folder management, print stylesheet and reference DOCX template system, LLM assistance via bring-your-own-key (BYOK) configuration for users who prefer it.

**What is not included:** The managed AI service, cloud sync, or any feature requiring server infrastructure.

**Pricing model:** One-time purchase. The exact price is to be validated, but the model follows iA Writer and Obsidian (personal) — a single payment that provides the tool permanently, including future updates within a major version. No subscription. No account. No phone-home.

**The commitment covenant:** Core tool features are never gated behind Tier 2 or Tier 3 subscriptions. This is a public, stated commitment — not an internal intention. If this commitment is ever broken, the local-first positioning is destroyed and user trust is lost. The commitment must appear on the product's marketing and in the licence terms.

---

### Tier 2 — Folivm AI (optional subscription)

A managed LLM proxy service. The user subscribes; Folivm handles the API keys, the provider relationships, the Australian-region routing, and the billing. AI features work immediately with no configuration.

**What it solves:** The BYOK friction problem. Non-technical users — the clients who will use Folivm in Phase 1+ — cannot be expected to find a commercial LLM provider, create an account, generate an API key, understand token pricing, and configure it in the application. That friction is a brick wall. Folivm AI removes it: subscribe, and AI features work.

**What is included:** Managed access to frontier LLMs (provider abstracted); Australian-region routing by default for data sovereignty; usage metering and billing at a predictable per-seat or usage-based rate; model updates without user action.

**What is not included:** Access to the core tool (Tier 1 is separate). BYOK users are not affected — they configure their own provider and Tier 2 is irrelevant to them.

**BYOK escape hatch:** BYOK configuration remains available for all users, including those who prefer it for data sovereignty, cost control, or government compliance reasons. Government agencies in particular may require that LLM requests transit their own Azure Australia East tenancy rather than Folivm's infrastructure. BYOK accommodates this. The default UX guides users toward Folivm AI; BYOK is accessible but not prominent.

**Pricing model:** Subscription — monthly or annual per seat, or usage-based. To be validated. The honest recurring revenue source: it funds real ongoing infrastructure costs (API fees, routing, billing layer). Unlike a core tool subscription, this is genuinely a service being continuously provided.

---

### Tier 3 — Folivm Sync (optional subscription)

Thin cloud sync for multi-device access. A user who works on a desktop at the office and a laptop at home can keep their Folivm project folders in sync without manually using SharePoint, Dropbox, or a USB drive.

**What it solves:** The multi-device convenience problem without requiring a full cloud platform. Users who want to work across devices get a frictionless sync option. Users who are happy with their existing file sync (SharePoint, iCloud, Dropbox, git) do not need it and are not penalised for not using it.

**What is included:** Encrypted sync of project folders across devices; conflict resolution; version history (rolling window); no format conversion — Folivm files sync as files.

**What is not included:** Real-time collaboration (Phase 1+ separate feature), document hosting or sharing (separate feature), server-side rendering or export.

**Pricing model:** Subscription — low monthly or annual fee, analogous to Obsidian Sync (~$10/month). Storage-capped or unlimited to be decided. This is infrastructure cost recovery plus margin; it is not a strategic revenue line.

---

## Why This Model, Not Full SaaS

The full SaaS model (single subscription covering everything) solves the user experience problem but reintroduces the enshittification risk. Once users depend on a subscription for access to their own work, the product has leverage over them. Pricing can be raised. Features can be degraded. The company can be acquired. The format can become inaccessible without the subscription.

The three-tier model rejects this architecture deliberately. The core tool is owned; it cannot be taken away. The optional services are genuinely optional; cancelling them costs the user convenience, not their files. This is not just an ethical position — it is a positioning advantage in a market where enshittification fatigue is real and growing.

The precedents that validate this commercially: Obsidian (local-first, optional Sync and Publish subscriptions, ~1M users, profitable without VC); iA Writer (one-time purchase, sustained profitability for over a decade); Affinity (one-time purchase, grew to challenge Adobe before Canva acquisition).

---

## Development Approach (Phase 0)

**Solo or very small team.** Phase 0 is a personal tool built by the author to solve the author's own problem. The development team is one person or a very small number. No formal process required beyond what keeps the work moving.

**Cursor + Claude.ai for development.** The RAIDD-as-code infrastructure, docforge-drafter skill, and cursor rules are the documentation and consistency layer. New chat per document; NOTES.md and files on disk are the continuity mechanism.

**No release infrastructure yet.** Phase 0 is not distributed. There is no installer, no update mechanism, no crash reporting. The author runs it locally. When Phase 0 exits to Phase 1, distribution infrastructure becomes a requirement.

---

## Development Approach (Phase 1+, Directional)

**Distribution.** Tauri produces a native desktop binary for macOS, Windows, and Linux. The Phase 1 release requires: a signed installer for each platform, an auto-update mechanism (Tauri's built-in updater or equivalent), a basic product website with download and licence purchase.

**Licence management.** One-time purchase requires a licence key system. Options: Paddle (handles VAT/GST globally, good for indie developers), Gumroad, or direct Stripe with a custom key system. Paddle is preferred for Australian GST compliance.

**AI proxy infrastructure.** Folivm AI requires a lightweight server-side component: an API proxy that accepts requests from authenticated Folivm AI subscribers, routes them to the configured LLM provider (initially Anthropic or OpenAI), and returns responses. Authentication is a Folivm AI subscription token, not a user account for the core tool. This is the only server infrastructure required for Phase 1.

**Sync infrastructure.** Folivm Sync (if Phase 1) requires encrypted object storage and a sync protocol. This can be deferred to Phase 2 if users are comfortable using their existing file sync tools (SharePoint, iCloud, Dropbox) in the interim.

---

## Support Model

**Phase 0:** No formal support. The author is the user.

**Phase 1:** Documentation-first self-serve support. A well-documented product with good error messages and a public knowledge base handles the majority of support needs for a technical user base. A simple support email or GitHub issues for bugs.

**Phase 2:** Tiered support. Self-serve for individual licences. Assisted support for teams and enterprise. SLA-backed support for government and professional services accounts with enterprise agreements.

---

## Open Questions

1. **Core tool pricing.** What price point supports one-time purchase sustainability? Validate against iA Writer (~$50 AUD), Obsidian (~free personal / $50 commercial), Affinity (~$80 AUD). Consider: personal licence vs commercial licence distinction.
2. **Folivm AI pricing.** Per-seat subscription vs usage-based. Usage-based is more honest (cost tracks actual API usage) but harder to predict for users. Per-seat is simpler. A hybrid (included usage + pay-as-you-go overage) may be the right answer.
3. **Open-source format strategy.** Should the Folivm format specification be published as an open standard? This builds trust, enables ecosystem tooling, and aligns with the local-first philosophy. The risk is enabling direct competitors to build on the format without contributing. Options: open spec with CC licence; open spec with CLA for contributions; keep spec private but document conventions.
4. **Government enterprise agreements.** Phase 2 government customers will want volume licensing, SLAs, and possibly on-premise deployment options. The three-tier model accommodates this (BYOK for AI, optional Sync, core tool via enterprise agreement) but the commercial terms need designing.
5. **The commitment covenant mechanism.** How is the local-first / no-feature-gating commitment made legally enforceable or at minimum publicly visible? Options: stated in licence terms; published product charter; open-source core tool (strongest form of commitment).

---

*Previous: [Options Analysis](../strategic/options-analysis.md) · Next: [Roadmap](roadmap.md)*
