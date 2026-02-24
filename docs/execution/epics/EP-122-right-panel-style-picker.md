---
title: EP-122 — Right panel style picker (paragraph and character)
project: Folivm
status: backlog
version: 0.1
created: 2026-02-24
updated: 2026-02-24
depends_on:
  - docs/execution/epics/EP-113-right-panel-structure-properties.md
  - docs/execution/epics/EP-008-ui-scaffold.md
  - docs/architectural/principles.md
---

# EP-122 — Right panel style picker (paragraph and character)

## Outcome

The author applies paragraph-level and character-level styles primarily via the right panel style picker. Selection in the editor or structure tree drives context-sensitive style controls. The style picker is primary; the context menu is secondary for quick shortcuts.

## Rationale

RAIDD R-003: "style picker primary; character formatting behind friction notice". Figma-style properties panel as primary entry point for styling. User preference: style picker over context menu (per Right Drawer Style Picker Enhancement Plan).

## Acceptance Criteria

- Two-way selection sync: editor selection updates structure tree and properties panel; structure tree selection focuses editor
- Paragraph-level style picker: heading level, body, block type (callout, executive-summary); bound to Folivm variables
- Character-level style picker: emphasis, strong, inline code, link; toggles when text range selected
- Style picker is primary; context menu is secondary for quick shortcuts
- VariablePicker `onChange` wired; selections persist to document

## Stories

- US-122: Two-way selection sync (editor ↔ structure tree ↔ properties panel)
- US-123: Paragraph-level style picker (heading, body, block type)
- US-124: Character-level style picker (emphasis, strong, code, link)
- US-125: VariablePicker persistence for paragraph styles
- US-126: Nomenclature doc and cross-doc alignment

## Related

- [EP-113](EP-113-right-panel-structure-properties.md) — Right panel: structure tree and Figma-style properties (foundation)
- [EP-008](EP-008-ui-scaffold.md) — UI scaffold
- [Nomenclature](../format/nomenclature.md) — Canonical terms for right panel, style picker, variable picker