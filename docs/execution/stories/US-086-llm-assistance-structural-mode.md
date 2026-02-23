---
title: US-086 — LLM assistance in structural mode
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
epic: EP-108
depends_on:
  - docs/execution/epics/EP-005-llm-assistance.md
---

# US-086 — LLM assistance in structural mode

**As an** author,  
**I want** LLM assistance in structural mode  
**so that** I can get suggested outlines, restructures, or missing sections.

## Acceptance Criteria

- [ ] LLM assistance panel is available when in structural mode
- [ ] I can request "suggest an outline" given the brief or current context; the LLM returns a heading hierarchy that I can accept or reject
- [ ] I can request "restructure" to reorganise the current outline; suggestions are shown for accept/reject
- [ ] I can request "add missing sections" to fill gaps in the outline
- [ ] Accepted suggestions update the document structure in structural mode
- [ ] The same BYOK/Folivm AI configuration as document mode applies
- [ ] Project context (brief, selected files) is available to the LLM

## Epic

[EP-108 Structural (Outline) Mode](../epics/EP-108-structural-outline-mode.md)

## Related

- [EP-005 LLM assistance](../epics/EP-005-llm-assistance.md) — Base LLM integration; EP-108 extends to structural mode

---

*Previous: [US-085](US-085-switch-back-preserves-changes.md) · Next: [EP-103](../epics/EP-103-deck-mode-pptx-export.md)*
