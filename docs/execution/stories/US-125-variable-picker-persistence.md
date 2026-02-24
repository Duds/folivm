---
title: US-125 — VariablePicker persistence for paragraph styles
project: Folivm
status: backlog
version: 0.1
created: 2026-02-24
updated: 2026-02-24
epic: EP-122
---

# US-125 — VariablePicker persistence for paragraph styles

**As an** author,  
**I want** my paragraph-style choices from the VariablePicker to persist when I save the document  
**so that** heading font sizes, block types, and other overrides are preserved.

## Acceptance Criteria

- [ ] VariablePicker `onChange` is wired; selecting a variable (e.g. `--text-doc-h3`) updates the document
- [ ] Per-element style overrides persist to the Folivm Markdown (format TBD: Pandoc div attributes vs frontmatter)
- [ ] Document export (PDF, DOCX) respects persisted variable bindings

## Epic

[EP-122 Right panel style picker](../epics/EP-122-right-panel-style-picker.md)
