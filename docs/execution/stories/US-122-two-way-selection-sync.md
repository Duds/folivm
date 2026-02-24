---
title: US-122 — Two-way selection sync (editor ↔ structure tree ↔ properties panel)
project: Folivm
status: backlog
version: 0.1
created: 2026-02-24
updated: 2026-02-24
epic: EP-122
---

# US-122 — Two-way selection sync (editor ↔ structure tree ↔ properties panel)

**As an** author,  
**I want** the structure tree and properties panel to stay in sync with my editor selection  
**so that** selecting text or a block in the editor populates the right panel, and selecting a node in the structure tree focuses the editor.

## Acceptance Criteria

- [ ] Selecting a heading, paragraph, or block in the editor updates the structure tree selection and properties panel
- [ ] Selecting a node in the structure tree focuses the editor and moves the cursor to that node
- [ ] Shared selection state (or context) keeps TipTap selection and structure tree selection in sync

## Epic

[EP-122 Right panel style picker](../epics/EP-122-right-panel-style-picker.md)
