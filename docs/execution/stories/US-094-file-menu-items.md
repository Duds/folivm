---
title: US-094 — File menu items
project: Folivm
status: done
version: 0.2
created: 2026-02-23
updated: 2026-02-23
epic: EP-109
---

# US-094 — File menu items

**As an** author,  
**I want** File menu items for project and document actions  
**so that** I can use the menu for New project, Open project, New document, Save, Export.

## Acceptance Criteria

- [x] File menu: New project, Open project, New document
- [ ] File menu: Close tab (when tabs exist) — **blocked on EP-111** document tabs
- [x] File menu: Save (⌘S), New Window (⌘⇧N)
- [x] File menu: Export PDF, Export DOCX
- [x] File menu: Quit (with shortcut)
- [x] Items invoke same handlers as sidebar/toolbar

**Implementation.** All items wired; Close tab will be added when EP-111 (document tabs) ships.

## Epic

[EP-109 Native application menu](../epics/EP-109-native-application-menu.md)

---

*Previous: [US-093](US-093-native-menu-structure.md) · Next: [US-095](US-095-edit-view-menu-items.md)*
