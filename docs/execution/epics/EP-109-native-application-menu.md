---
title: EP-109 — Native application menu
project: Folivm
status: in progress
version: 0.2
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/execution/epics/EP-006-tauri-desktop-shell.md
  - docs/architectural/hla.md
---

# EP-109 — Author uses native application menu for common actions

## Outcome

The author uses the native application menu bar (on macOS: the menu next to the Apple icon; on Windows: the top menu bar) with meaningful menu items in Folivm, File, Edit, View, Window, and Help. All primary actions are discoverable and keyboard-accessible.

## Rationale

Tauri applications inherit a default native menu. Populating it with proper items improves discoverability, accessibility (screen readers, keyboard navigation), and platform conventions. Professional desktop apps expose core workflow actions in the menu bar.

## Acceptance Criteria

- **Folivm** (app menu): About Folivm, Preferences (if applicable), Quit
- **File**: New project, Open project, New document, Close tab, Save, Save as (future), Export PDF, Export DOCX, Quit
- **Edit**: Undo, Redo, Cut, Copy, Paste, Find (search panel), Replace
- **View**: Toggle left sidebar, Toggle right sidebar, Document / Preview / Outline mode, Zoom in / out / reset
- **Window**: Minimise, Zoom (native), Bring all to front
- **Help**: Keyboard shortcuts (reference), Documentation (link), Support (link)

Menu items that correspond to actions must invoke the same handlers as toolbar/sidebar buttons. Keyboard shortcuts shown in menus must match actual bindings.

---

## Native Menu Implementation Status

Implementation is in `src/setupNativeMenu.ts` and `src/hooks/useMenuActions.ts`. Menu actions emit events; App listens and calls handlers.

### Implemented (full)

| Menu | Item | Status | Notes |
|------|------|--------|-------|
| Folivm | Quit | Done | PredefinedMenuItem |
| File | New Project | Done | Opens folder picker, creates project |
| File | Open Project… | Done | Opens folder picker |
| File | New Document | Done | Opens modal when project exists |
| File | New Window | Done | ⌘⇧N; creates new WebviewWindow |
| File | Save | Done | ⌘S |
| File | Export PDF… | Done | |
| File | Export DOCX… | Done | |
| File | Quit | Done | PredefinedMenuItem |
| Edit | Undo | Done | PredefinedMenuItem (TipTap) |
| Edit | Redo | Done | PredefinedMenuItem |
| Edit | Cut, Copy, Paste | Done | PredefinedMenuItem |
| Edit | Select All | Done | PredefinedMenuItem |
| Edit | Find… | Done | ⌘⇧F; opens search panel |
| View | Toggle Left/Right Sidebar | Done | |
| View | Document / Preview / Outline | Done | |
| View | Zoom In / Out / Reset | Done | ⌘= / ⌘- |
| Window | Minimise | Done | PredefinedMenuItem |
| Window | Close Window | Done | PredefinedMenuItem |

### Dummy or placeholder

| Menu | Item | Status | Notes |
|------|------|--------|-------|
| Help | Keyboard Shortcuts | Dummy | Shows `alert()` with partial list; needs proper reference panel/modal (US-096) |

### Not implemented (blocked or deferred)

| Menu | Item | Status | Notes |
|------|------|--------|-------|
| Folivm | About Folivm | Not implemented | EP-109 spec; low priority |
| Folivm | Preferences | Not implemented | Future |
| File | Close Tab | Blocked | Requires EP-111 (document tabs) |
| File | Save As | Deferred | Future |
| Edit | Replace | Not in menu | Replace is in search panel; no dedicated Replace menu item |
| Help | Documentation | Not implemented | External link (US-096) |
| Help | Support | Not implemented | External link (US-096) |
| Window | Zoom (native) | Not in menu | View has zoom; native zoom not added |
| Window | Bring all to front | Not in menu | Future |

### Focus for completion

1. **US-096** — Help menu: replace Keyboard Shortcuts alert with proper reference panel; add Documentation and Support links
2. **EP-111** — Add Close Tab to File menu when tabs exist
3. (Optional) About Folivm submenu with app info

---

## Technical Notes

- Implementation uses `@tauri-apps/api/menu`; menu structure in `setupNativeMenu.ts`; platform-specific: macOS `setAsAppMenu()`, Windows/Linux `setAsWindowMenu()`
- Menu item actions emit `menu:action` event; `useMenuActions` in App listens and dispatches to handlers
- Platform conventions: Cmd (macOS), Ctrl (Windows/Linux)

## Stories

- US-093: Define and wire native menu structure — **Done**
- US-094: File menu items (project, document, export) — **Done** (Close tab blocked on EP-111)
- US-095: Edit and View menu items — **Done** (Replace not in menu; in search panel)
- US-096: Help menu and keyboard shortcut reference — **In progress** (Keyboard Shortcuts is dummy; Documentation, Support missing)

## Related

- [EP-006](EP-006-tauri-desktop-shell.md) — Tauri desktop shell
- [EP-111](EP-111-document-tabs.md) — Document tabs (Close tab in File menu)
- [US-091](../stories/US-091-search-project-documents.md) — Find in Edit menu

---

*Previous: [EP-008](EP-008-ui-scaffold.md) · Next: [EP-110](EP-110-empty-editor-canvas.md)*
