---
title: US-095 — Edit and View menu items
project: Folivm
status: done
version: 0.2
created: 2026-02-23
updated: 2026-02-23
epic: EP-109
---

# US-095 — Edit and View menu items

**As an** author,  
**I want** Edit and View menu items for common actions  
**so that** I can use the menu for Find, Replace, sidebar toggles, view mode, zoom.

## Acceptance Criteria

- [x] Edit menu: Undo, Redo, Cut, Copy, Paste, Select All, Find (⌘⇧F)
- [ ] Edit menu: Replace — **not in menu**; replace lives in search panel (US-091)
- [x] View menu: Toggle left sidebar, Toggle right sidebar
- [x] View menu: Document / Preview / Outline mode
- [x] View menu: Zoom in (⌘=), Zoom out (⌘-), Reset zoom
- [x] Items invoke same handlers as toolbar

**Implementation.** Edit uses PredefinedMenuItem for clipboard and undo/redo; Find opens search panel. Replace remains in the search panel UX rather than a separate menu item.

## Epic

[EP-109 Native application menu](../epics/EP-109-native-application-menu.md)

---

*Previous: [US-094](US-094-file-menu-items.md) · Next: [US-096](US-096-help-menu-shortcuts.md)*
