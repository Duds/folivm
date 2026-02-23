---
title: US-093 — Define and wire native menu structure
project: Folivm
status: done
version: 0.2
created: 2026-02-23
updated: 2026-02-23
epic: EP-109
---

# US-093 — Define and wire native menu structure

**As an** author,  
**I want** the native application menu bar (Folivm, File, Edit, View, Window, Help) to exist and be wired to the app  
**so that** platform conventions are met and menu items can be added.

## Acceptance Criteria

- [x] Native menu structure is defined in Tauri (Rust) with menus: Folivm (app), File, Edit, View, Window, Help
- [x] Menu items invoke Tauri commands or emit events to the frontend
- [x] Empty/placeholder items acceptable; full items in US-094, US-095, US-096

**Implementation.** `src/setupNativeMenu.ts` defines the structure; `src/hooks/useMenuActions.ts` listens for `menu:action` and dispatches to handlers. macOS uses `setAsAppMenu()`; Windows/Linux use `setAsWindowMenu()`.

## Epic

[EP-109 Native application menu](../epics/EP-109-native-application-menu.md)

---

*Previous: [US-092](US-092-compare-versions.md) · Next: [US-094](US-094-file-menu-items.md)*
