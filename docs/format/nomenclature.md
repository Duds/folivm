---
title: Folivm Nomenclature
project: Folivm
status: draft
version: 0.1
created: 2026-02-24
updated: 2026-02-24
depends_on:
  - docs/execution/epics/EP-113-right-panel-structure-properties.md
  - docs/execution/epics/EP-122-right-panel-style-picker.md
---

# Folivm Nomenclature

Glossary of consistent UI and feature terms for use across code, documentation, and user-facing text.

---

## Right Panel / Right Drawer

| Term | Definition | Use in |
|------|------------|--------|
| **Right drawer** | The collapsible region to the right of the editor canvas; holds the structure tree and properties panel | Code (e.g. `rightDrawerOpen`), UI affordance |
| **Right panel** | Synonym for right drawer; preferred in user-facing docs and epics | EP-113, backlog, roadmap |

**Resolution.** Use "right panel" in documentation; "right drawer" may persist in React state for parity with left drawer. Both refer to the same UI region.

---

## Structure and Properties

| Term | Definition | Use in |
|------|------------|--------|
| **Structure tree** | Collapsible hierarchy of document → headings → (future: paragraphs, lists, blocks) | EP-113, right panel |
| **Properties panel** | Context-sensitive controls shown when a node is selected (metadata + style controls) | EP-113 |

---

## Style Picker and Variable Picker

| Term | Definition | Use in |
|------|------------|--------|
| **Style picker** | The UI control(s) for applying paragraph-level and character-level styles; primary entry point over context menu | RAIDD R-003, EP-122 |
| **Variable picker** | Component that offers Folivm variable tokens (e.g. `--text-doc-h1`); used *within* the style picker | VariablePicker component |
| **Paragraph-level style** | Style applied to an entire block (heading, body, blockquote, semantic block) | EP-122 |
| **Character-level style** | Style applied to a text range within a paragraph (emphasis, strong, inline code, link) | EP-122 |

**Resolution.** "Style picker" is the user-facing term; "VariablePicker" is the component name. The style picker surfaces paragraph and character options; the variable picker is one control within it for Folivm token selection.

---

## Related

- [EP-113 Right panel structure and properties](../execution/epics/EP-113-right-panel-structure-properties.md)
- [EP-122 Right panel style picker](../execution/epics/EP-122-right-panel-style-picker.md)
- [Backlog Management rule](../../.cursor/rules/backlog-management.mdc) — references this glossary