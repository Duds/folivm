---
title: Scaffold Adoption Implementation Plan
project: Folivm
status: implemented
version: 0.1
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/planning/roadmap.md
  - docs/execution/ui-scaffold-prompt.md
  - docs/execution/backlog.md
---

# Scaffold Adoption Implementation Plan

Adopt Product Engineer–recommended patterns and Vellum aesthetics into the Folivm codebase using **Vite**, **Tauri**, and **tokens.css** only. No Tailwind. No Next.js.

---

## Principles

- **Single styling system:** tokens.css is the source of truth. No dual frameworks.
- **Cherry-pick, don't wholesale:** Adopt Radix primitives as needed; do not import the full shadcn stack.
- **Vellum aesthetics:** Achieve the look via token values and CSS; translate scaffold visual language, not its Tailwind classes.
- **Phase 0 scope:** Principle 8 — adopt only what serves the author's workflow.

---

## Phases

| Phase | Goal | Est. effort |
|-------|------|-------------|
| 1 | Foundation — path aliases, cn(), lucide-react | 1–2 hours |
| 2 | Radix Dialog and DropdownMenu — replace custom modals and popovers | 2–3 hours |
| 3 | Component structure — extract shell components, improve composition | 2–3 hours |
| 4 | Vellum aesthetics — token refinements, component polish | 2–4 hours |
| 5 | (Optional) Design panel adaptation — wire EP-002 concepts to TipTap | Deferred |

---

## Phase 1 — Foundation

### 1.1 Path aliases

**Files:** `tsconfig.json`, `vite.config.ts`

**Actions:**
- Add `baseUrl: "."` and `paths: { "@/*": ["src/*"] }` to `tsconfig.json` compilerOptions.
- Add `resolve.alias: { "@": path.resolve(__dirname, "./src") }` to `vite.config.ts` (with `import path from "path"`).

**Verification:** Import `@/lib/utils` and confirm build succeeds.

---

### 1.2 cn() utility

**Files:** `src/lib/utils.ts` (new), `package.json`

**Actions:**
- Add `clsx` and `tailwind-merge` to dependencies.
- Create `src/lib/utils.ts`:
  ```ts
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```
- Use `cn()` in one or two components as a pilot (e.g. button classes).

**Note:** `tailwind-merge` works with plain CSS classes; no Tailwind required.

---

### 1.3 lucide-react icons

**Files:** `package.json`, `src/App.tsx` (and any other files with inline SVGs)

**Actions:**
- Add `lucide-react` to dependencies.
- Replace `ChevronIcon`, `SettingsIcon`, `SendIcon` with Lucide equivalents: `ChevronLeft`, `ChevronRight`, `ChevronDown`, `Settings`, `Send`.
- Remove inline SVG components from App.tsx.

**Verification:** UI renders correctly; icons match previous appearance (size/colour via CSS).

---

## Phase 2 — Radix Dialog and DropdownMenu

### 2.1 Radix Dialog for modals

**Dependencies:** `@radix-ui/react-dialog`

**Target modals:**
- New document modal
- Reference DOCX template modal

**Actions:**
- Install `@radix-ui/react-dialog`.
- Replace `.modal-overlay` + `.modal` with Radix Dialog primitives.
- Style using tokens: `--color-surface-overlay`, `--color-surface-raised`, `--shadow-popover`, `--radius-card`.
- Preserve keyboard (Escape) and focus management.
- Ensure backdrop click closes modal where appropriate.

**Reference:** `.temp-scaffold/components/ui/dialog.tsx` for structure; reimplement styling in CSS using tokens.

---

### 2.2 Radix DropdownMenu for popovers

**Dependencies:** `@radix-ui/react-dropdown-menu`

**Target popovers:**
- Export menu (Export as PDF, Export as DOCX)
- Settings menu (Theme toggles, Reference DOCX)

**Actions:**
- Install `@radix-ui/react-dropdown-menu`.
- Replace custom `.popover-anchor` + `.popover` + `.popover-backdrop` with Radix DropdownMenu.
- Style using tokens for background, border, shadow, radius.
- Preserve keyboard navigation and focus.
- Use `DropdownMenu.Trigger`, `DropdownMenu.Content`, `DropdownMenu.Item`.

**Reference:** `.temp-scaffold/components/ui/dropdown-menu.tsx` for structure; restyle with tokens.

---

## Phase 3 — Component structure

### 3.1 Extract shell components

**New files (suggested):**
- `src/components/shell/AppShell.tsx` — composed layout wrapper (ThemeProvider → layout)
- `src/components/shell/TopBar.tsx`
- `src/components/shell/LeftSidebar.tsx`
- `src/components/shell/EditorCanvas.tsx`
- `src/components/shell/RightPanel.tsx` (Assistant panel)

**Actions:**
- Extract TopBar, LeftSidebar, EditorCanvas, RightPanel from `App.tsx`.
- Each receives props for state and callbacks; App.tsx orchestrates.
- Wrap in `AppShell` with ThemeProvider at root.
- Preserve all Tauri invokes and Editor logic; only structural refactor.

**Goal:** Reduce App.tsx from ~750 lines to ~200–300; improve testability and readability.

---

### 3.2 Composition pattern

**Structure:**
```
App
└── ThemeProvider
    └── AppShell (flex layout)
        ├── TopBar
        ├── main (flex row)
        │   ├── LeftSidebar
        │   ├── EditorCanvas
        │   └── RightPanel
        └── Footer (error/status)
```

**Actions:**
- Ensure ThemeProvider remains at root; AppShell receives `mode`, `brand`, `setMode`, `setBrand` or uses `useTheme()`.
- Use flex layout: `display: flex; flex-direction: column; height: 100vh; overflow: hidden` on shell; `flex: 1; overflow: hidden` on main content row.

---

## Phase 4 — Vellum aesthetics (superseded by EP-115)

Radix Themes adoption ([EP-115](../execution/epics/EP-115-radix-themes-adoption.md)) supersedes Phase 4. Application chrome now uses Radix Themes components and tokens.

### 4.1 Token audit and additions

**File:** `src/tokens.css`

**Actions:**
- Compare with `.temp-scaffold/app/tokens.css` for any missing semantic tokens.
- Add if needed:
  - `--radius-popover` (for dropdowns/dialogs)
  - Any interactive state refinements (focus-visible rings)
- Ensure Focus mode and Client Brand A tokens match scaffold behaviour.
- No raw values in component CSS; all via tokens.

---

### 4.2 Button polish

**Files:** `src/tokens.css`, `src/App.css` (or component CSS)

**Actions:**
- Add focus-visible ring: `outline: 2px solid var(--color-brand-primary); outline-offset: 2px` for accessibility.
- Add transition for background/hover: `transition: background var(--transition-fast)`.
- Add `.btn-icon` sizing if not present: `width/height` using `--layout-topbar-height` or similar.
- Ensure ghost and default variants are visually distinct.

---

### 4.3 Sidebar and panel polish

**Actions:**
- Sidebar: border-right/left using `--color-border-subtle`; padding from `--space-panel-x`, `--space-panel-y`.
- Canvas area: background `--color-surface-canvas`; shadow `--shadow-canvas` if desired for depth.
- Rail (collapsed sidebar): width `--layout-rail-width`; icon-only buttons.
- Ensure folder headers and document list items use `--color-interactive-hover`, `--color-interactive-selected` for active state.

---

### 4.4 Top bar and mode switcher

**Actions:**
- Top bar: `--layout-topbar-height`; `--color-surface-raised`; border-bottom `--color-border-subtle`.
- Mode switcher: pill-style with `--radius-toolbar`; active segment uses `--color-surface-raised` or `--color-interactive-selected`; inactive segments use `--color-text-secondary`.
- Wordmark: `--font-ui`, `--color-text-primary`, semibold.

---

### 4.5 Assistant panel

**Actions:**
- Header: `--color-text-primary`, `--text-ui-base`; context chip with `--color-text-secondary`.
- Input: border `--color-border-default`; focus ring; `--radius-input`.
- Suggestion card: `--color-surface-raised`, `--shadow-popover`, `--radius-card`.
- LLM config form: use token-based form group styling (label, input, spacing).

---

## Phase 5 — Design panel adaptation (deferred)

**Scope:** EP-002 element-based styling; EP-122 right panel style picker. Wire scaffold's `DocumentStyleProvider` and `useDocumentStyles` to TipTap.

**Actions (when prioritised):**
- Map TipTap node types to scaffold block types (heading-1, body, callout, etc.).
- Integrate block selection from TipTap with `useDocumentStyles` context.
- Right panel: add style picker; show paragraph-level and character-level controls when a block or text range is selected.
- Token option registry: align with existing `tokens.css`; use for font, size, weight, colour pickers.
- See [EP-122](../execution/epics/EP-122-right-panel-style-picker.md) and [Nomenclature](../format/nomenclature.md) for style picker vs variable picker terminology.

**Deferral rationale:** Phase 0 success criteria focus on workflow validation; design panel is enhancement. Implement after Phases 1–4 and author validation.

---

## Dependency summary

| Package | Phase | Purpose |
|---------|-------|---------|
| clsx | 1 | Conditional classes for cn() |
| tailwind-merge | 1 | Class merging in cn() |
| lucide-react | 1 | Icons |
| @radix-ui/react-dialog | 2 | Modals |
| @radix-ui/react-dropdown-menu | 2 | Export and Settings menus |

**Do not add:** Tailwind, next-themes, CVA, cmdk, vaul, recharts, embla-carousel, @vercel/analytics.

---

## Verification checklist

After each phase:

- [ ] `npm run tauri dev` runs without errors
- [ ] Create project → open document → edit → save works
- [ ] Export PDF and DOCX works
- [ ] Theme modes (Focus, Client Brand A) apply correctly
- [ ] No regression in keyboard navigation or focus behaviour
- [ ] No Tailwind or Next.js dependencies introduced

---

## File manifest (expected new/changed)

| File | Action |
|------|--------|
| `tsconfig.json` | Add path aliases |
| `vite.config.ts` | Add resolve alias |
| `package.json` | Add clsx, tailwind-merge, lucide-react, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu |
| `src/lib/utils.ts` | Create |
| `src/App.tsx` | Refactor; extract components; use Radix and Lucide |
| `src/App.css` | Update for Radix components; retain token-only styling |
| `src/components/shell/AppShell.tsx` | Create |
| `src/components/shell/TopBar.tsx` | Create |
| `src/components/shell/LeftSidebar.tsx` | Create |
| `src/components/shell/EditorCanvas.tsx` | Create |
| `src/components/shell/RightPanel.tsx` | Create |
| `src/tokens.css` | Minor additions if needed |

---

## Related

- [UI Scaffold Prompt](../execution/ui-scaffold-prompt.md) — Figma-first token spec
- [Roadmap](roadmap.md) — Phase 0 success criteria
- [Backlog](../execution/backlog.md) — EP-008, EP-002
