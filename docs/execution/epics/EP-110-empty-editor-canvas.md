---
title: EP-110 — Empty editor canvas
project: Folivm
status: draft
version: 0.1
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/execution/epics/EP-008-ui-scaffold.md
  - docs/execution/ui-scaffold-prompt.md
---

# EP-110 — Empty editor canvas shows Folivm watermark and shortcuts

## Outcome

When no document is open, the editor canvas is empty (no page chrome or paper metaphor). It displays a Folivm watermark and a list of keyboard shortcuts for quick start. The experience is welcoming and instructive.

## Rationale

The current empty state ("Select a document or create a new one") is minimal. A branded empty state with shortcuts helps new users discover core actions and reinforces the Folivm identity. Removing the page appearance when empty avoids implying that an empty document exists.

## Acceptance Criteria

- When no document is open, the canvas shows:
  - **Folivm watermark** — large, low-opacity branding (wordmark or logo)
  - **Keyboard shortcuts** — clearly listed, e.g.:
    - New document (shortcut)
    - New project / Open project (shortcut)
    - Search (⌘⇧F)
    - (Others as defined in EP-109)
- No page outline, shadow, or paper-style container when empty
- Layout is centred and aesthetically balanced

## Non-scope

- Document tabs (EP-111) — empty state applies when no tabs are open
- Extensions panel — no extension shortcuts in this list unless core

## Stories

- US-097: Empty canvas layout and Folivm watermark
- US-098: Keyboard shortcut list (dynamic from app actions)

## Related

- [EP-008](EP-008-ui-scaffold.md) — UI scaffold
- [EP-109](EP-109-native-application-menu.md) — Menu (shortcuts align)
- [EP-111](EP-111-document-tabs.md) — Tabs (empty when no tabs)

---

*Previous: [EP-109](EP-109-native-application-menu.md) · Next: [EP-111](EP-111-document-tabs.md)*
