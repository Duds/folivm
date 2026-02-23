---
title: US-083 — Reorder sections by dragging
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
epic: EP-108
---

# US-083 — Reorder sections by dragging

**As an** author,  
**I want to** reorder sections by dragging headings  
**so that** the underlying document updates accordingly.

## Acceptance Criteria

- [ ] I can drag a heading to a new position in the hierarchy
- [ ] Dragging a heading moves it and its descendants as a unit
- [ ] When I drop, the underlying Folivm Markdown source is updated
- [ ] Reordering preserves heading levels (no automatic promote/demote unless intended)
- [ ] I can reorder across collapsed branches (implementation may expand on drag-over)
- [ ] Undo restores the previous order

## Epic

[EP-108 Structural (Outline) Mode](../epics/EP-108-structural-outline-mode.md)

---

*Previous: [US-082](US-082-collapse-expand-branches.md) · Next: [US-084](US-084-promote-demote-headings.md)*
