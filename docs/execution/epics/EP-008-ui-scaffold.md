---
title: EP-008 — UI Scaffold (Interface Shell)
project: Folivm
status: done
version: 0.1
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/architectural/principles.md
  - docs/architectural/hla.md
  - docs/conceptual/conops.md
  - docs/execution/ui-scaffold-prompt.md
---

# EP-008 — Author works in a professional interface shell with design tokens, three-panel layout, and theme modes

## Outcome

The author works in a Figma-first interface shell: design token system (primitives → semantic aliases → component tokens), three-panel layout (sidebar, editor canvas, assistant panel), and theme modes (default, focus, brand variants). Application chrome is token-driven; no raw values in component stylesheets.

## Specification

Implementation is defined by the [UI Scaffold Prompt](../ui-scaffold-prompt.md), a Cursor prompt that specifies:

- Part 1: Design token system (`tokens.css`) — Layer 1 primitives, Layer 2 semantic aliases, Layer 3 component tokens; Figma mapping
- Part 2: Application layout — top bar, left sidebar (collapsible), centre editor canvas, right assistant panel
- Part 3: ThemeProvider and mode switching — ~~`data-mode`, `data-brand`, Focus mode, Client Brand A~~ (superseded by EP-115 Radix Themes adoption)
- Part 4: Constraints — Tailwind layout only; no raw hex; preserve Tauri/editor logic

## Scope

- Refactor of interface shell only — visual layer, not editor logic or Tauri integration
- Application chrome tokens only — document-level brand manifest (EP-201) is Phase 2
- Foundation for ongoing Cursor development

## Non-scope (Phase 0)

- Document-level brand variables (EP-201)
- Structural/deck mode UI (Phase 1)

## Success Criteria

- All styling resolves through token chain (component → semantic → primitive)
- Three-panel layout with collapsible sidebars
- Theme modes (Focus, Client Brand A) — retired; application chrome now uses Radix Themes (EP-115)
- Tauri invoke calls and editor logic preserved

## Related

- [UI Scaffold Prompt](../ui-scaffold-prompt.md) — Full Cursor prompt specification
- [EP-002](EP-002-element-based-styling-preview.md) — Element-based styling and preview
- [EP-006](EP-006-tauri-desktop-shell.md) — Tauri desktop shell
- [Principle 10](../architectural/principles.md#10-brand-manifest-uses-a-variables--modes-architecture) — Brand manifest architecture (Phase 2)

---

*Previous: [EP-007](EP-007-format-documentation.md) · Next: [EP-109](EP-109-native-application-menu.md)*
