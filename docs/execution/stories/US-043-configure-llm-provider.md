---
title: US-043 — Configure LLM provider
project: Folivm
status: done
version: 0.1
created: 2026-02-20
epic: EP-005
---

# US-043 — Configure LLM provider

**As an** author,  
**I want to** configure my LLM provider (API key, model)  
**so that** I can use my preferred service.

## Acceptance Criteria

- [x] I can set API key (or equivalent credentials) for at least one provider
- [x] I can select model (e.g. GPT-4, Claude)
- [x] Provider, region, and model are configurable (pluggable architecture)
- [x] Configuration is stored securely (e.g. local config file, not in documents)
- [x] LLM requests use the configured provider when assistance is requested

## Epic

[EP-005 LLM Assistance with Project Context](../epics/EP-005-llm-assistance.md)

---

*Previous: [US-042](US-042-accept-reject-suggestions.md) · Next: [EP-006](../epics/EP-006-tauri-desktop-shell.md)*
