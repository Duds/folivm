---
title: EP-115 — Adopt Radix Themes for application chrome
project: Folivm
status: done
version: 0.1
created: 2026-02-25
updated: 2026-02-25
depends_on:
  - docs/execution/epics/EP-008-ui-scaffold.md
  - docs/planning/roadmap.md
---

# EP-115 — Adopt Radix Themes for application chrome

## Outcome

Application chrome uses Radix Themes for consistent typography, spacing, radius, shadows, and colour. Document theming (semantic blocks, print) defers to EP-201.

## Scope

- Replace custom token-based app styling with Radix Themes
- Migrate primitive wrappers to Themes components (Dialog, DropdownMenu, Select, Switch, ScrollArea)
- Remove Focus mode and Client Brand A toggles; use standard Radix Theme appearance
- Retain primitives for Collapsible, Popover, ToggleGroup, Tooltip (API compatibility)
- Strip custom Radix primitive CSS for migrated components
- Document tokens (semantic blocks, `--color-block-*`) retained for ProseMirror content

## Non-scope

- Document-level brand manifest (EP-201)
- Document theming in editor content
- Dark mode (can be added later via Theme `appearance` prop)

## Success criteria

- Radix Theme wrapper with `accentColor="blue"`, `radius="medium"`, `scaling="100%"`
- Dialog, DropdownMenu, Select, Switch, ScrollArea use Themes components
- Build succeeds; modals, dropdowns, selects, tooltips, sidebar, canvas render correctly
- Document semantic blocks (callout, exec summary) still render correctly

## Implementation notes

- Theme `hasBackground={false}` prevents white background bleed in rounded corners (frameless Tauri window)
- Chrome settings icon: button wrapper with 14×14 px icon; Radix DropdownMenuTrigger `asChild` was merging onto the SVG, so `.window-chrome-btn--app` forced 28×28. Wrapping in a `<button>` lets the icon size correctly

## Related

- [EP-008](EP-008-ui-scaffold.md) — UI scaffold (superseded for theme modes)
- EP-201 — Brand manifest (document-level, Phase 2)

---

*Previous: [EP-114](EP-114-document-layout-ruler.md) · Next: [EP-112](EP-112-ai-assistant-extension.md)*
