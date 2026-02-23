---
title: US-085 — Switch back to document mode preserves changes
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
epic: EP-108
---

# US-085 — Switch back to document mode preserves changes

**As an** author,  
**I want** switching back to document mode to preserve all structural changes  
**so that** my edits are not lost.

## Acceptance Criteria

- [ ] When I switch from structural mode to document mode, all reordering, promote, and demote changes are reflected in the document
- [ ] The document content (prose, lists, tables, etc.) is unchanged except for structural edits
- [ ] The Markdown file on disk reflects the updates when I save
- [ ] No data loss occurs when switching modes
- [ ] If I have unsaved structural changes, switching modes does not discard them; they remain in the editor state until save

## Epic

[EP-108 Structural (Outline) Mode](../epics/EP-108-structural-outline-mode.md)

---

*Previous: [US-084](US-084-promote-demote-headings.md) · Next: [US-086](US-086-llm-assistance-structural-mode.md)*
