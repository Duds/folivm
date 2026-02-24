---
title: UI Scaffold Prompt — Interface Shell
project: Folivm
status: draft
version: 0.2
created: 2026-02-23
updated: 2026-02-23
depends_on:
  - docs/architectural/principles.md
  - docs/architectural/hla.md
  - docs/conceptual/conops.md
---

# UI Scaffold Prompt — Interface Shell

Cursor prompt for building the Folivm interface scaffold. The implementation model is **Figma-first**: the CSS token system mirrors how a Figma design system is structured — Pages, Styles, Variables, Components — and every styling decision in the codebase flows from that structure.

> **Figma ↔ Code mapping.** This is the analogy to hold in mind throughout:
>
> | Figma | This codebase |
> |---|---|
> | Primitives page (raw colour/type/spacing values) | Layer 1 — `--primitive-*` custom properties |
> | Styles panel (Color styles, Text styles) | Layer 2 — semantic alias `--color-*`, `--font-*`, `--text-*` tokens |
> | Variables + Modes (e.g. Default / Dark / Brand A) | `data-mode` and `data-brand` attribute overrides on `:root` |
> | Component — local variables scoped to a frame | Layer 3 — component-scoped `--btn-*`, `--item-*`, `--block-*` tokens |
> | Component variants (e.g. Button/Primary, Button/Ghost) | CSS classes that override component-scoped tokens |
>
> A Figma designer working from this system should be able to map every token directly to its code equivalent. A developer changing a value should know exactly which Figma layer they are working at.

> **Scope note.** The token system here controls the *application chrome only* — sidebar, topbar, panels, buttons, and the document editor surface within the app shell. It is entirely separate from the document-level brand variable system described in [Principle 10](../architectural/principles.md#10-brand-manifest-uses-a-variables--modes-architecture), which governs the print stylesheet and export appearance and is a Phase 2 concern (EP-201). Think of it this way: these tokens style the Figma frame; the Phase 2 brand manifest styles the document that lives inside the frame.
>
> **Update (EP-115):** Application chrome styling has been migrated to Radix Themes. This prompt describes the prior token architecture; document tokens (e.g. `--color-block-*`) remain.

---

## Prompt

Build the Folivm UI scaffold in Cursor. Folivm is a local-first, Markdown-native desktop document authoring application built with Tauri + React. The existing codebase has a working `App.tsx`, `App.css`, `Editor.tsx`, and Tauri backend commands. This task refactors the interface shell — it does not replace the editor logic or Tauri integration.

The work has four parts. Complete them in order. Do not write component CSS before the token system is complete.

---

### Part 1 — Design token system (`tokens.css`)

**The Figma analogy is the implementation model.** Structure `tokens.css` exactly as a Figma design system is structured: primitives first, then semantic styles, then component-scoped tokens. Nothing in Part 2 or Part 3 touches a raw value — everything resolves through the chain.

Create `src/tokens.css`. Import it at the top of `src/main.tsx` before any other styles.

#### Layer 1 — Primitives

*Figma equivalent: the Primitives page — raw swatches and type specimens that are never used directly in components, only referenced by styles.*

These are the raw values. No component or semantic token ever uses a primitive directly — they only alias it. If a value appears in a component stylesheet that isn't a `var(--semantic-*)` reference, it is a mistake.

```css
:root {
  /* — Colour primitives — */
  --primitive-neutral-0:   #FFFFFF;
  --primitive-neutral-50:  #F9F7F5;
  --primitive-neutral-100: #F2EFEB;
  --primitive-neutral-200: #E8E4DF;
  --primitive-neutral-300: #D4CFC9;
  --primitive-neutral-400: #A09890;
  --primitive-neutral-500: #6B6560;
  --primitive-neutral-600: #4A4540;
  --primitive-neutral-700: #2E2A27;
  --primitive-neutral-800: #1A1714;
  --primitive-neutral-900: #0D0B09;

  --primitive-blue-50:  #EEF4FF;
  --primitive-blue-100: #DDEAFF;
  --primitive-blue-300: #91B8FF;
  --primitive-blue-500: #2D6BFF;
  --primitive-blue-700: #1A4FCC;
  --primitive-blue-900: #0A2166;

  --primitive-teal-50:  #EDFAF8;
  --primitive-teal-100: #CCEFEB;
  --primitive-teal-300: #5FCCBF;
  --primitive-teal-500: #0D9488;
  --primitive-teal-700: #0A7069;

  --primitive-amber-50:  #FFFBEB;
  --primitive-amber-300: #FCD34D;
  --primitive-amber-500: #D97706;

  --primitive-red-50:  #FEF2F2;
  --primitive-red-500: #DC2626;

  /* — Typography primitives — */
  /* UI: macOS → -apple-system/SF Pro; Windows → Segoe UI; cross-platform → system-ui */
  --primitive-font-ui:   -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Helvetica, Arial, sans-serif;
  --primitive-font-body: Georgia, 'Times New Roman', serif;
  --primitive-font-mono: ui-monospace, 'Cascadia Mono', 'SF Mono', Consolas, Monaco, monospace;

  --primitive-size-xs:   11px;
  --primitive-size-sm:   13px;
  --primitive-size-base: 15px;
  --primitive-size-md:   17px;
  --primitive-size-lg:   20px;
  --primitive-size-xl:   24px;
  --primitive-size-2xl:  30px;
  --primitive-size-3xl:  36px;

  --primitive-weight-regular:  400;
  --primitive-weight-medium:   500;
  --primitive-weight-semibold: 600;
  --primitive-weight-bold:     700;

  --primitive-leading-tight:  1.3;
  --primitive-leading-normal: 1.6;
  --primitive-leading-loose:  1.75;

  /* — Spacing primitives — */
  --primitive-space-1:  4px;
  --primitive-space-2:  8px;
  --primitive-space-3:  12px;
  --primitive-space-4:  16px;
  --primitive-space-5:  20px;
  --primitive-space-6:  24px;
  --primitive-space-8:  32px;
  --primitive-space-10: 40px;
  --primitive-space-12: 48px;
  --primitive-space-16: 64px;

  /* — Radius primitives — */
  --primitive-radius-sm:   4px;
  --primitive-radius-md:   6px;
  --primitive-radius-lg:   8px;
  --primitive-radius-xl:   12px;
  --primitive-radius-pill: 9999px;

  /* — Shadow primitives — */
  --primitive-shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --primitive-shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --primitive-shadow-lg: 0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06);
}
```

#### Layer 2 — Semantic aliases

*Figma equivalent: the Styles panel — Color styles and Text styles that give meaning to raw primitives. This is what appears in the right-hand panel when inspecting a component: not `#2D6BFF` but `brand/primary`. Modes (Default, Focus, Client Brand A) map directly to Figma's Variable Modes — switching a mode re-resolves every alias without touching a single component.*

These are the only tokens component CSS is permitted to reference. They answer "what is this for?" not "what value is this?". Changing a mode swaps the resolution of every alias simultaneously — no component changes.

```css
/* === Default mode: Folivm Light === */
:root {
  /* Surfaces — analogous to Figma fill styles on frame layers */
  --color-surface-app:     var(--primitive-neutral-100); /* outer shell */
  --color-surface-sidebar: var(--primitive-neutral-200); /* left + right panels */
  --color-surface-canvas:  var(--primitive-neutral-0);   /* document page */
  --color-surface-overlay: var(--primitive-neutral-0);   /* modals, popovers */
  --color-surface-sunken:  var(--primitive-neutral-50);  /* recessed areas */
  --color-surface-raised:  var(--primitive-neutral-0);   /* cards, elevated items */

  /* Text — analogous to Figma text colour styles */
  --color-text-primary:     var(--primitive-neutral-800);
  --color-text-secondary:   var(--primitive-neutral-500);
  --color-text-tertiary:    var(--primitive-neutral-400);
  --color-text-placeholder: var(--primitive-neutral-300);
  --color-text-inverse:     var(--primitive-neutral-0);
  --color-text-link:        var(--primitive-blue-500);

  /* Borders */
  --color-border-subtle:  var(--primitive-neutral-200);
  --color-border-default: var(--primitive-neutral-300);
  --color-border-strong:  var(--primitive-neutral-400);

  /* Brand */
  --color-brand-primary:          var(--primitive-blue-500);
  --color-brand-primary-hover:    var(--primitive-blue-700);
  --color-brand-primary-subtle:   var(--primitive-blue-50);
  --color-brand-secondary:        var(--primitive-teal-500);
  --color-brand-secondary-subtle: var(--primitive-teal-50);

  /* Semantic block tokens — editor surface only */
  --color-block-callout-border:     var(--primitive-blue-500);
  --color-block-callout-fill:       var(--primitive-blue-50);
  --color-block-callout-text:       var(--primitive-blue-900);
  --color-block-execsummary-border: var(--primitive-teal-500);
  --color-block-execsummary-fill:   var(--primitive-teal-50);
  --color-block-execsummary-text:   var(--primitive-teal-700);
  --color-block-warning-border:     var(--primitive-amber-500);
  --color-block-warning-fill:       var(--primitive-amber-50);

  /* Interactive states */
  --color-interactive-hover:         rgba(0,0,0,0.04);
  --color-interactive-active:        rgba(0,0,0,0.08);
  --color-interactive-selected:      var(--primitive-blue-50);
  --color-interactive-selected-text: var(--primitive-blue-700);

  /* Status */
  --color-status-error:       var(--primitive-red-500);
  --color-status-error-fill:  var(--primitive-red-50);
  --color-status-warning:     var(--primitive-amber-500);
  --color-status-success:     var(--primitive-teal-500);

  /* Typography — analogous to Figma Text styles */
  --font-ui:   var(--primitive-font-ui);
  --font-body: var(--primitive-font-body);
  --font-mono: var(--primitive-font-mono);

  --text-ui-sm:   var(--primitive-size-sm);
  --text-ui-base: var(--primitive-size-base);
  --text-ui-lg:   var(--primitive-size-lg);

  --text-doc-body:    15px;
  --text-doc-h1:      var(--primitive-size-3xl);
  --text-doc-h2:      var(--primitive-size-xl);
  --text-doc-h3:      var(--primitive-size-lg);
  --text-doc-h4:      var(--primitive-size-base);
  --text-doc-small:   var(--primitive-size-sm);
  --text-doc-leading: var(--primitive-leading-loose);

  /* Spacing */
  --space-panel-x:   var(--primitive-space-4);
  --space-panel-y:   var(--primitive-space-4);
  --space-canvas-x:  var(--primitive-space-16);
  --space-canvas-y:  var(--primitive-space-12);
  --space-block-gap: var(--primitive-space-6);

  /* Layout */
  --layout-sidebar-width:    240px;
  --layout-assistant-width:  320px;
  --layout-topbar-height:    40px;
  --layout-canvas-max-width: 720px;
  --layout-rail-width:       40px;

  /* Shadows */
  --shadow-canvas:  var(--primitive-shadow-md);
  --shadow-popover: var(--primitive-shadow-lg);
  --shadow-toolbar: var(--primitive-shadow-sm);

  /* Radius */
  --radius-block:   var(--primitive-radius-md);
  --radius-button:  var(--primitive-radius-md);
  --radius-toolbar: var(--primitive-radius-pill);
  --radius-input:   var(--primitive-radius-md);
  --radius-card:    var(--primitive-radius-lg);

  /* Transitions */
  --transition-fast:   120ms ease;
  --transition-normal: 200ms ease;
  --transition-slow:   300ms ease;
}

/* === Mode: Focus ===
   Figma equivalent: a Variable Mode on the colour collection.
   Switching to this mode re-resolves --color-surface-sidebar and border
   tokens across every component simultaneously — no component CSS changes.
   Applied via data-mode="focus" on :root. */
[data-mode="focus"] {
  --color-surface-sidebar: var(--primitive-neutral-100);
  --color-border-subtle:   transparent;
  --color-border-default:  transparent;
}

/* === Mode: Client Brand A ===
   Figma equivalent: a Brand Mode in a Variables collection — the same
   pattern as switching from "Default" to "Client B" in a Figma brand system.
   Every --color-brand-* and --color-block-* token re-resolves; zero
   component CSS changes. This is the Phase 0 proof-of-concept for the
   Phase 2 brand manifest (EP-201).
   Applied via data-brand="client-a" on :root. */
[data-brand="client-a"] {
  --color-brand-primary:        #E8542A;
  --color-brand-primary-hover:  #C43E18;
  --color-brand-primary-subtle: #FEF0EC;
  --color-block-callout-border: #E8542A;
  --color-block-callout-fill:   #FEF0EC;
  --color-block-callout-text:   #7A1F08;
}
```

#### Layer 3 — Component tokens

*Figma equivalent: local variables scoped to a component frame, exposed as component properties. A Button component in Figma has `fill`, `text-colour`, `corner-radius` properties — these are the CSS equivalent. Component variants (Button/Primary vs Button/Ghost) override these local variables, exactly as Figma variant properties override component defaults.*

Component CSS classes set local token defaults and use them. Variant classes override only the tokens that differ — no duplication of structural CSS.

```css
/* Button — base component tokens */
.btn {
  --btn-bg:        var(--color-brand-primary);
  --btn-bg-hover:  var(--color-brand-primary-hover);
  --btn-text:      var(--color-text-inverse);
  --btn-radius:    var(--radius-button);
  --btn-font-size: var(--text-ui-base);
  --btn-padding-x: var(--primitive-space-4);
  --btn-padding-y: var(--primitive-space-2);

  background: var(--btn-bg);
  color: var(--btn-text);
  border-radius: var(--btn-radius);
  font-size: var(--btn-font-size);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  transition: background var(--transition-fast);
}
.btn:hover { background: var(--btn-bg-hover); }

/* Button/Ghost — variant overrides tokens only */
.btn-ghost {
  --btn-bg:       transparent;
  --btn-bg-hover: var(--color-interactive-hover);
  --btn-text:     var(--color-text-secondary);
}

/* Sidebar item */
.sidebar-item {
  --item-bg-hover:    var(--color-interactive-hover);
  --item-bg-active:   var(--color-interactive-selected);
  --item-text-active: var(--color-interactive-selected-text);
  --item-radius:      var(--primitive-radius-sm);
}

/* Semantic blocks — editor surface */
.block-callout {
  --block-border-color: var(--color-block-callout-border);
  --block-bg:           var(--color-block-callout-fill);
  --block-text:         var(--color-block-callout-text);
}

.block-executive-summary {
  --block-border-color: var(--color-block-execsummary-border);
  --block-bg:           var(--color-block-execsummary-fill);
  --block-text:         var(--color-block-execsummary-text);
}
```

**Hard rule:** If any component stylesheet contains a raw hex value, a raw pixel value not referencing a primitive, or a Tailwind colour class, the token system is broken. Every value must trace back through the chain: component token → semantic alias → primitive.

---

### Part 2 — Application layout

Refactor `App.tsx` and `App.css` to use the token system and implement the three-panel shell. Preserve all existing Tauri `invoke` calls and state logic — this is a visual refactor, not a logic rewrite.

#### Top bar

Height `var(--layout-topbar-height)`. Background `var(--color-surface-raised)`. Border-bottom `1px solid var(--color-border-subtle)`.

Three zones — left, centre, right:

- **Left:** Wordmark "Folivm" — `var(--font-ui)`, weight `var(--primitive-weight-semibold)`, `var(--color-text-primary)`.
- **Centre:** Document title — editable inline on click, `var(--font-ui)`, `var(--color-text-primary)`.
- **Right:** Icon buttons — Export (popover with "Export as PDF" and "Export as DOCX"); Mode switcher (segmented control: Document active, Structural and Deck disabled, each labelled "Phase 1" on hover); Settings (gear icon, popover with theme toggles from Part 3).

#### Left sidebar

Width `var(--layout-sidebar-width)`, collapsible to `var(--layout-rail-width)`. Background `var(--color-surface-sidebar)`. Border-right `1px solid var(--color-border-subtle)`.

- Project name — editable inline on double-click. `var(--text-ui-base)`, `var(--font-ui)`.
- Four collapsible folder sections with chevron toggles: `inputs/`, `working/`, `context/`, `deliverables/`. File items use `.sidebar-item` tokens. Active file: `--item-bg-active`, `--item-text-active`.
- Bottom strip: word count in `var(--color-text-tertiary)`, `var(--text-ui-sm)`.
- Collapse toggle: slides sidebar off-screen; `var(--layout-rail-width)` icon rail remains when collapsed.

#### Centre — Editor canvas

Background `var(--color-surface-app)`. Page canvas: centred, max-width `var(--layout-canvas-max-width)`, background `var(--color-surface-canvas)`, box-shadow `var(--shadow-canvas)`, padding `var(--space-canvas-y)` `var(--space-canvas-x)`.

Static representative content (TipTap mounts here in the real app — this is the shell only):

- **H1** "Strategic Review: Digital Infrastructure Uplift" — `var(--font-body)`, `var(--text-doc-h1)`, `var(--primitive-weight-bold)`.
- **Executive Summary block** (`.block-executive-summary`): 4px left border `var(--block-border-color)`, background `var(--block-bg)`, label "Executive Summary" in small-caps `var(--text-doc-small)` above body text.
- **Two H2 sections** with Lorem Ipsum paragraphs.
- **Callout block** (`.block-callout`): 3px left border, background `var(--block-bg)`, ℹ icon top-left.
- **Table**: 3 columns, header row — borders `var(--color-border-subtle)`, header background `var(--color-surface-sunken)`.
- **Footnote**: superscript ¹ inline; footnote line at canvas bottom in `var(--text-doc-small)`, `var(--color-text-secondary)`.
- **Floating bubble toolbar** (shown persistently as example state): pill-shaped, background `var(--primitive-neutral-800)`, shadow `var(--shadow-toolbar)`, border-radius `var(--radius-toolbar)`. Buttons: Bold, Italic, Code, Link, divider, ¶ block picker.

#### Right panel — Assistant

Width `var(--layout-assistant-width)`, collapsible to `var(--layout-rail-width)`. Background `var(--color-surface-sidebar)`. Border-left `1px solid var(--color-border-subtle)`.

- **Header:** "Assistant" in small-caps, `var(--text-ui-sm)`, `var(--color-text-secondary)`. Context chip "context/brief.md · this document" — pill, background `var(--color-surface-sunken)`, border `var(--color-border-subtle)`, radius `var(--radius-pill)`, edit icon.
- **Suggestion card:** background `var(--color-surface-raised)`, border `1px solid var(--color-border-subtle)`, radius `var(--radius-card)`, shadow `var(--shadow-canvas)`, padding `var(--primitive-space-4)`. Placeholder suggestion text. Accept (`.btn`) and Discard (`.btn-ghost`) buttons bottom-right.
- **Input:** text field, border `1px solid var(--color-border-default)`, radius `var(--radius-input)`, background `var(--color-surface-canvas)`, send icon.
- Collapse toggle matching left sidebar.

---

### Part 3 — ThemeProvider and mode switching

*Figma equivalent: the mode switcher in the Variables panel — clicking Default → Dark → Brand A re-resolves the entire variable collection. This component does exactly that at the CSS level.*

Create `src/ThemeProvider.tsx`. It sets `data-mode` and `data-brand` on `document.documentElement` and exposes a `useTheme` hook.

```tsx
type Mode = 'default' | 'focus'
type Brand = 'default' | 'client-a'

interface ThemeState {
  mode: Mode
  brand: Brand
  setMode: (m: Mode) => void
  setBrand: (b: Brand) => void
}
```

Expose two toggles in the Settings popover:

- **Focus mode** — sets `data-mode="focus"`, dissolving panel borders and reducing sidebar contrast.
- **Client Brand A** — sets `data-brand="client-a"`, swapping all brand and block accent colours.

**Validation:** if toggling Client Brand A does not visually change the callout block border and fill colours, the token chain is broken somewhere between Layer 2 and the component. Fix the chain before proceeding.

---

### Part 4 — Constraints

- Tailwind for layout utilities only (`flex`, `grid`, `w-full`, positional classes). All colour, type size, spacing, shadow, and radius must resolve through `tokens.css` — no Tailwind colour or spacing classes anywhere.
- No raw hex values in any component stylesheet.
- Preserve all existing Tauri `invoke` calls, state, and editor logic in `App.tsx` — visual refactor only.
- Clean component boundaries. The output is the foundation for ongoing Cursor development, not a throwaway prototype.

---

## Related

- [Architectural Principles](../architectural/principles.md) — Principle 10 (brand manifest, Variables + Modes architecture)
- [High-Level Architecture](../architectural/hla.md) — GUI layer, rendering modes
- [Backlog](backlog.md) — EP-001 (rich Markdown editor), EP-002 (element-based styling and preview)
- [EP-201](epics/) — Brand manifest, Phase 2 — the document-level variable system that this chrome-level system deliberately anticipates but does not implement
