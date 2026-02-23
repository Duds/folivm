---
title: EP-111 — Document tabs
project: Folivm
status: draft
version: 0.1
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/execution/epics/EP-008-ui-scaffold.md
  - docs/execution/epics/EP-003-project-folder-context.md
---

# EP-111 — Author can open multiple documents in tabs

## Outcome

The author can open multiple documents from the project in tabs. Each tab shows the document filename (or title); the author can switch between tabs, close individual tabs, and the editor canvas shows the active tab's content.

## Rationale

Professional document workflows often involve cross-referencing or drafting several documents at once. Single-document switching forces context loss. Tabs match user expectations from IDEs and browsers.

## Acceptance Criteria

- Tabs appear in the editor canvas area (above the editor, below or integrated with the top bar)
- Each open document has a tab; tab label shows filename or short path (e.g. `deliverables/report.md`)
- Active tab is visually distinct; clicking a tab switches to that document
- Tab can be closed via close button on tab or shortcut (e.g. ⌘W)
- Opening a document from the explorer adds/activates its tab (no duplicate tabs for same path)
- State: unsaved changes per tab; closing a tab with unsaved changes prompts to save
- Empty state (EP-110) applies when all tabs are closed

## Technical Notes

- State: `openTabs: string[]` (relative paths), `activeTab: string | null`
- Document content cached per tab; switching tabs swaps displayed content without reload
- Consider tab limit (e.g. 10) for memory; least-recently-used eviction or warning

## Stories

- US-099: Tab bar UI and open/close/switch
- US-100: Tab state and unsaved-change handling
- US-101: Explorer click opens/activates tab (no duplicates)

## Related

- [EP-008](EP-008-ui-scaffold.md) — UI scaffold
- [EP-110](EP-110-empty-editor-canvas.md) — Empty state when no tabs
- [EP-109](EP-109-native-application-menu.md) — Close tab in File menu

---

*Previous: [EP-110](EP-110-empty-editor-canvas.md) · Next: [EP-112](EP-112-ai-assistant-extension.md)*
