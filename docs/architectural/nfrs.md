---
title: Non-Functional Requirements
project: Folivm
status: draft
version: 0.2
created: 2026-02-19
updated: 2026-02-20
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/architectural/principles.md
  - docs/architectural/hla.md
---

# Non-Functional Requirements

This document defines measurable non-functional requirements for Folivm. Phase 0 is the primary scope; Phase 1+ requirements are noted where they extend or replace Phase 0.

---

## 1. Performance

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-1.1 | Editor interactions (typing, style application, node insertion) shall respond without perceptible lag | P95 response time &lt; 500 ms | 0 |
| NFR-1.2 | Document load from disk shall complete quickly | Load time &lt; 2 s for documents up to 100 pages | 0 |
| NFR-1.3 | PDF export shall complete within an acceptable time | Export &lt; 30 s for documents up to 50 pages | 0 |
| NFR-1.4 | DOCX export shall complete within an acceptable time | Export &lt; 20 s for documents up to 50 pages | 0 |
| NFR-1.5 | LLM response (first token) shall be perceived as responsive | Time to first token &lt; 5 s under typical network conditions | 0 |
| NFR-1.6 | Application startup shall be fast | Cold start &lt; 5 s on typical hardware | 0 |

*Rationale.* Phase 0 is a personal desktop tool. The author must not wait on the editor or export pipeline. Targets are derived from the [PRD](prd-lean.md#non-functional-requirements) and tuned for typical consulting document lengths (20–50 pages).

---

## 2. Scalability and Capacity

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-2.1 | The system shall support documents up to a practical maximum | Documents up to 200 pages without degradation; graceful degradation beyond | 0 |
| NFR-2.2 | The system shall support project folders with many files | Projects with 500+ files in inputs/ and context/ without UI or export degradation | 0 |
| NFR-2.3 | Concurrent users | N/A — Phase 0 is single-user local | 0 |
| NFR-2.4 | Concurrent documents | Support 1 primary document open; design allows multiple documents in Phase 1 | 0 |

*Rationale.* Phase 0 targets consulting reports and board papers (typically 10–80 pages). Limits are set to avoid edge-case failures rather than optimise for extreme scale.

---

## 3. Reliability and Availability

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-3.1 | Unsaved changes shall not be lost on normal shutdown | User is prompted to save before exit; no silent loss | 0 |
| NFR-3.2 | The application shall recover from Pandoc export failures | Export errors are surfaced to the user; no application crash | 0 |
| NFR-3.3 | The application shall recover from LLM API failures | API timeouts and errors are surfaced; document state unchanged | 0 |
| NFR-3.4 | Availability | N/A — local desktop; no SLA | 0 |

*Rationale.* Phase 0 is local-first. The primary reliability concern is data integrity (no silent loss) and graceful handling of external dependencies (Pandoc, LLM API).

---

## 4. Security

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-4.1 | Document content at rest shall be protected by the host OS | No additional encryption; relies on user/OS file permissions | 0 |
| NFR-4.2 | LLM API credentials shall be stored securely | API keys stored in OS credential store (e.g. macOS Keychain, Windows Credential Manager); never in plain text in config | 0 |
| NFR-4.3 | Data in transit to LLM providers shall use TLS | All API calls over HTTPS | 0 |
| NFR-4.4 | No telemetry or analytics without explicit opt-in | No data sent to Folivm or third parties except LLM provider (user-configured); no crash reporting without consent | 0 |

*Rationale.* Phase 0 stores documents as plain-text files. Security focuses on credential handling and minimising data exfiltration. Full security and data sovereignty treatment is in [Security & Data](security-data.md).

---

## 5. Privacy

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-5.1 | Document content sent to LLM providers is under user control | User configures provider, region, and model; content is only sent when user initiates a request | 0 |
| NFR-5.2 | User shall be informed when content is sent to an external API | UI makes it clear that LLM assistance involves sending content; no surprise calls | 0 |
| NFR-5.3 | Provider data policies shall be discoverable | Documentation links to provider privacy/retention policies; Australian-region endpoints documented for data sovereignty | 0 |

*Rationale.* LLM calls send document content to third parties. Transparency and user control are required. Government users may require Australian-region endpoints (see [ADR-0001](adrs/ADR-0001-llm-provider-pluggability.md)).

---

## 6. Accessibility

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-6.1 | Editor UI shall support keyboard navigation for core flows | All primary actions (create project, open document, save, export, LLM request) reachable via keyboard | 0 |
| NFR-6.2 | WCAG 2.1 AA for editor UI | Full WCAG 2.1 AA compliance for the editor; alt text, focus indicators, screen reader support | 1+ |
| NFR-6.3 | PDF/UA for exports | Exported PDF conformant to PDF/UA for accessibility | 1+ |

*Rationale.* Government procurement will require accessibility (see [NOTES](../../NOTES.md) Tier 2 features). Phase 0 establishes baseline keyboard support; WCAG 2.1 AA and PDF/UA are Phase 1+.

---

## 7. Internationalisation and Localisation

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-7.1 | Australian English as default | UI, documentation, and date/time formats follow Australian conventions | 0 |
| NFR-7.2 | Document content language | No restriction; documents may contain any language | 0 |
| NFR-7.3 | Full UI localisation | Multi-language UI; Phase 2 if required by target market | 2 |

*Rationale.* Phase 0 targets the author and Australian market. Australian English and date/time formats (DD/MM/YYYY, 24-hour) are applied per project standards.

---

## 8. Compliance

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-8.1 | Australian Privacy Act | No personal data collected by Folivm; document content remains under user control; LLM provider policies apply to content sent to APIs | 0 |
| NFR-8.2 | Australian government (ISM, IRAP) | Not applicable to Phase 0 (local desktop). Phase 2 for government deployment; ADR-0001 outlines pluggable providers and Australian-region endpoints | 2 |

*Rationale.* Phase 0 is a personal tool with no backend. Compliance focus is minimal data handling and clear documentation of LLM data flow.

---

## 9. Portability

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-9.1 | Storage format shall be editable with any text editor | Documents are plain-text Pandoc Markdown; no proprietary binary | 0 |
| NFR-9.2 | Storage format shall be processable with Pandoc directly | Documents can be exported to PDF/DOCX using standard Pandoc CLI without Folivm | 0 |
| NFR-9.3 | No lock-in | No proprietary schema; format documentation is a Phase 0 deliverable | 0 |

*Rationale.* Derived from [principle 7](principles.md#7-open-format-closed-renderer). Portability builds trust; the format is the escape hatch.

---

## 10. Export Fidelity

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-10.1 | PDF export shall be client deliverable quality | Output suitable for direct client delivery; no manual post-processing required for the author's use case | 0 |
| NFR-10.2 | PDF export shall reflect GUI representation | Export is relatively true to what the user sees in the editor, similar to Word or Google Docs | 0 |
| NFR-10.3 | DOCX export shall be editable in Word | Output opens correctly in Microsoft Word; structure preserved; styling from reference DOCX applied | 0 |

*Rationale.* Derived from [principle 5](principles.md#5-export-fidelity-is-a-product-requirement). The InDesign model depends on export quality; adoption fails if output is visibly degraded.

---

## 11. Usability

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-11.1 | Time to first export | A Markdown-native user shall create a project, author a document with semantic blocks, and export to PDF in under 15 minutes without external documentation | 0 |
| NFR-11.2 | Learning curve | A user familiar with Markdown and Pandoc concepts shall be productive within 30 minutes | 0 |
| NFR-11.3 | Error messages | Export and LLM errors shall include actionable guidance where possible | 0 |

*Rationale.* Phase 0 success metric is the author using Folivm for their next real deliverable. Onboarding friction must be low.

---

## 12. Maintainability and Extensibility

| ID | Requirement | Measure | Phase |
|----|-------------|---------|-------|
| NFR-12.1 | Component boundaries | GUI, storage, export, and LLM layers are separated; changes in one layer minimise impact on others | 0 |
| NFR-12.2 | LLM provider pluggability | Provider, region, and model are configuration; adding a new provider does not require code changes to core editor | 0 |
| NFR-12.3 | Format evolution | Folivm-specific conventions (frontmatter, project schema) are documented; format changes are additive where possible | 0 |

*Rationale.* Derived from [HLA](hla.md) and [principles](principles.md). Phase 0 establishes architecture that Phase 1+ extends without redesign.

---

## Traceability

| NFR Category | PRD Reference | Principles |
|--------------|---------------|------------|
| Performance | [PRD § NFRs](prd-lean.md#non-functional-requirements) | — |
| Portability | [PRD § NFRs](prd-lean.md#non-functional-requirements) | [Principle 7](principles.md#7-open-format-closed-renderer) |
| Export fidelity | [PRD § NFRs](prd-lean.md#non-functional-requirements) | [Principle 5](principles.md#5-export-fidelity-is-a-product-requirement) |
| Usability | [PRD § NFRs](prd-lean.md#non-functional-requirements) | — |
| Security, Privacy | — | [Principle 6](principles.md#6-portable-format-deployment-model-evolves-with-phase) |

---

## Open Questions

1. **Document size ceiling.** Is 200 pages a reasonable Phase 0 maximum? Consultancy reports rarely exceed 80 pages; board papers are shorter. Should we test with 100-page documents and document observed behaviour?
2. **LLM timeout thresholds.** NFR-1.5 specifies "typical network conditions" but does not define timeout values. Should we specify explicit timeout and retry behaviour?
3. **Accessibility baseline.** NFR-6.1 requires keyboard navigation. Should Phase 0 also include minimal screen reader testing (e.g. NVDA/VoiceOver on one platform), or defer all accessibility verification to Phase 1?

---

*Previous: [PRD (Lean)](../conceptual/prd-lean.md) · Next: [Security & Data](security-data.md) · See also: [FRS](frs.md), [HLA](hla.md), [Principles](principles.md)*
