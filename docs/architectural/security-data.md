---
title: Security & Data Architecture
project: Folivm
status: draft
version: 0.2
created: 2026-02-19
updated: 2026-02-20
depends_on:
  - docs/architectural/nfrs.md
  - docs/architectural/hla.md
  - docs/architectural/adrs/ADR-0001-llm-provider-pluggability.md
---

# Security & Data Architecture

This document defines security and data handling requirements for Folivm across all phases. Phase 0 is a local desktop tool with minimal security surface; Phase 1+ introduces server-hosted deployment, and Phase 2 addresses government market requirements (ISM, IRAP, Australian Privacy Act).

---

## 1. Data Classification Model

Folivm documents are business documents. Classification follows the document owner's responsibility; the platform supports classification metadata and applies handling rules accordingly.

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | No classification enforcement | Documents are files on disk. Classification is the author's responsibility; no platform controls. |
| 1+ | Classification metadata | Frontmatter supports classification fields (e.g. `classification: OFFICIAL`) for organisational policy. |
| 2 | Australian government alignment | OFFICIAL, OFFICIAL:SENSITIVE, PROTECTED, and higher per the [Australian Government Information Security Manual](https://www.cyber.gov.au/acsc/view-all-content/ism) (ISM). Classification determines storage, transmission, and LLM handling rules. |

*Rationale.* Phase 0 targets a single author. Government and enterprise deployments (Phase 2) require classification-aware handling — especially for LLM data flow and storage location.

---

## 2. Data Sovereignty

### 2.1 Document Storage

| Phase | Storage Location | Sovereignty |
|-------|------------------|-------------|
| 0 | Local disk (user's machine) | Data remains on the author's device. No cloud storage. |
| 1+ | Server-hosted (organisation's infrastructure) | Documents stored in organisation-chosen region. Self-hosted and private cloud options. |
| 2 | Government deployment | Australian data centre; IRAP-assessed if required. On-premise and air-gapped options for PROTECTED and above. |

### 2.2 LLM Data Flow

When document content is sent to an LLM API, it leaves the platform. Data sovereignty for AI calls is governed by provider and region configuration.

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | User-configured provider and region | Pluggable LLM providers (see [ADR-0001](adrs/ADR-0001-llm-provider-pluggability.md)). User selects provider, region, and model. Australian-region endpoints (Azure Australia East, AWS Sydney) available for data residency. |
| 2 | Australian-region default for government | For government deployments, Azure Australia East (or equivalent) is the practical path. Enterprise agreements with ISM-relevant certifications. Self-hosted or private models for air-gapped or PROTECTED+ environments. |

*Related.* [ADR-0001](adrs/ADR-0001-llm-provider-pluggability.md); [NFR-5.3](nfrs.md#5-privacy); [NOTES.md](../../NOTES.md) — Data sovereignty decision (2026-02-19 ConOps).

---

## 3. LLM Data Handling Policy

### 3.1 What Is Sent

| Content | Phase 0 | Phase 1+ |
|---------|---------|----------|
| Current document content | Yes — when user initiates LLM request | Same |
| Project context (brief, selected files) | Yes — user selects | Same; RAG may extend scope |
| Clause library content | N/A — no clause library | No — clause content is never sent for generation; assembly is deterministic |

### 3.2 Under What Terms

- **User control.** Content is sent only when the user explicitly initiates a request (generate, expand, revise, summarise). No background or automatic LLM calls.
- **Provider policies apply.** Data retention, training, and usage are governed by the configured provider's terms. Australian-region endpoints typically offer data residency and no-training options under enterprise agreements.
- **Transparency.** UI makes clear that LLM assistance involves sending content to an external API. No surprise calls. See [NFR-5.2](nfrs.md#5-privacy).

### 3.3 Prohibited

- Clause library content is never LLM-generated at insertion time ([principle 3](principles.md#3-deterministic-where-correctness-matters)).
- Content redaction before API calls was considered and rejected: too complex, failure-prone, introduces new attack surface ([ADR-0001](adrs/ADR-0001-llm-provider-pluggability.md)).

---

## 4. On-Premise and Air-Gapped Deployment

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | N/A | Local desktop; no network deployment. |
| 2 | On-premise option | Server-hosted deployment on organisation infrastructure. No mandatory cloud dependency. |
| 2 | Air-gapped option | For PROTECTED+ or policy-restricted environments. LLM assistance requires self-hosted or private model (no external API calls). Deferred to Phase 2 when open-weight model quality for professional document generation is sufficient. |

*Related.* [ADR-0001](adrs/ADR-0001-llm-provider-pluggability.md) — self-hosted as Phase 2+ roadmap.

---

## 5. Authentication and Authorisation

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | None | Single-user local application. No authentication; OS user identity applies to file access. |
| 1+ | Authentication | Server-hosted deployments require authentication. Integration with organisation IdP (e.g. Azure AD, Okta) for Phase 2. |
| 1+ | Authorisation | Role-based access: document owner, reviewer, viewer. Per-project and per-document permissions. |
| 2 | Clause library access control | Clause library has approval workflows and access controls. Only authorised users may add, modify, or approve clauses. Audit trail for clause changes. |
| 2 | Brand manifest governance | Brand manifest changes require approval per organisation policy. Version control and rollback. |

---

## 6. Audit Logging

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | Minimal | No platform audit log. OS and file system provide standard logging. User is accountable for their own actions. |
| 1+ | Document lifecycle | Create, open, edit, export, share events. Who, what, when. Retained per organisation policy. |
| 2 | Clause library | Clause view, insert, approval, and version events. Required for compliance in legal and government contexts. |
| 2 | LLM usage | Log of LLM requests (timestamp, user, document, provider, model). No document content in logs; metadata only. Supports data governance and cost attribution. |

---

## 7. Encryption

### 7.1 At Rest

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | Host OS protection | Documents are plain-text Pandoc Markdown. Protection relies on OS file permissions and optional full-disk encryption (FileVault, BitLocker). See [NFR-4.1](nfrs.md#4-security). |
| 1+ | Server storage | Encryption at rest for stored documents. Use platform-native encryption (e.g. S3 SSE, Azure Storage encryption). Key management per organisation policy. |
| 2 | Government | FIPS 140-2 or equivalent for cryptographic modules where required by IRAP or agency policy. |

### 7.2 In Transit

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | LLM API calls | TLS 1.2+ for all HTTPS API calls. See [NFR-4.3](nfrs.md#4-security). |
| 1+ | Client–server | TLS for all client–server communication. |
| 2 | Government | TLS 1.3 preferred; cipher suite restrictions per ISM where applicable. |

---

## 8. Credential Handling

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | LLM API keys | Stored in OS credential store (macOS Keychain, Windows Credential Manager). Never in plain text in config or project files. See [NFR-4.2](nfrs.md#4-security). |
| 1+ | Server credentials | Secrets in organisation secrets manager. No hardcoded credentials. |

---

## 9. Clause Library Access Control (Phase 2)

The clause library holds legally approved, version-controlled content. Insertion is deterministic; LLMs recommend, humans confirm, exact text is inserted.

| Requirement | Detail |
|-------------|--------|
| Read access | Role-based. Authors may browse and insert approved clauses. |
| Write access | Restricted to clause administrators. Approval workflow for new or modified clauses. |
| Audit | All clause view, insert, and modification events logged. |
| No LLM modification | Clause content is never LLM-generated at insertion time. |

*Related.* [Principle 3](principles.md#3-deterministic-where-correctness-matters); [NFRs](nfrs.md).

---

## 10. Brand Manifest Governance (Phase 2)

The brand manifest maps semantic roles to visual properties. It governs appearance across all documents.

| Requirement | Detail |
|-------------|--------|
| Version control | Brand manifests are versioned. Rollback available. |
| Approval | Changes require approval per organisation policy. |
| Separation | Documents reference semantic roles; they do not embed brand definitions. Style is a first-class, governed object. |
| Audit | Manifest change events logged. |

*Related.* [Principle 4](principles.md#4-brand-as-a-first-class-object).

---

## 11. Privacy and Compliance

### 11.1 Australian Privacy Act

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | Minimal data handling | Folivm does not collect personal data. Document content remains under user control. LLM provider policies apply to content sent to APIs. See [NFR-8.1](nfrs.md#8-compliance). |
| 1+ | Organisation responsibility | Server-hosted deployments; organisation is data controller. Folivm architecture supports privacy by design (no unnecessary collection, user consent for LLM use). |

### 11.2 Australian Government (ISM, IRAP)

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | Not applicable | Local desktop; no certification scope. |
| 2 | IRAP assessment | For government deployment, IRAP assessment may be required. Architecture supports: Australian data residency, pluggable LLM providers, audit logging, encryption, access control. |
| 2 | ISM alignment | Controls aligned to ISM where applicable. Document classification, encryption, and access control map to ISM requirements. |

*Related.* [NFR-8.2](nfrs.md#8-compliance); [ADR-0001](adrs/ADR-0001-llm-provider-pluggability.md).

---

## 12. Telemetry and Analytics

| Phase | Requirement | Detail |
|-------|-------------|--------|
| 0 | Opt-in only | No telemetry or analytics without explicit opt-in. No data sent to Folivm or third parties except the user-configured LLM provider. No crash reporting without consent. See [NFR-4.4](nfrs.md#4-security). |
| 1+ | Organisation control | Server-hosted deployments; analytics and telemetry are organisation decisions. Folivm does not require outbound analytics. |

---

## Traceability

| Security Topic | NFR Reference | Upstream |
|----------------|---------------|----------|
| Encryption at rest | NFR-4.1 | — |
| Credential storage | NFR-4.2 | — |
| TLS in transit | NFR-4.3 | — |
| No telemetry | NFR-4.4 | — |
| LLM privacy | NFR-5.1, 5.2, 5.3 | ADR-0001 |
| Privacy Act | NFR-8.1 | — |
| ISM, IRAP | NFR-8.2 | ADR-0001 |

---

## Open Questions

1. **Classification metadata schema.** When Phase 1+ introduces classification fields, should frontmatter use a standard schema (e.g. `classification`, `caveats`) compatible with government conventions?
2. **Air-gapped LLM quality threshold.** Phase 2 air-gapped deployments require self-hosted models. At what model quality level does Folivm recommend/support air-gapped LLM assistance? Current open-weight models are below frontier APIs.
3. **Audit log retention.** Phase 2 audit requirements need retention policy guidance. Should this document specify minimum retention, or defer to organisation policy?
4. **IRAP scope.** For government pilots, which Folivm components fall under IRAP scope? (e.g. application only vs application + hosting provider)

---

*Previous: [NFRs](nfrs.md) · Next: [ADRs](adrs/) · See also: [FRS](frs.md), [HLA](hla.md), [Principles](principles.md)*
