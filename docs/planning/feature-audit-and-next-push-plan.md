---
title: Feature Audit and Next Push Plan
project: Folivm
status: implemented
version: 0.1
created: 2026-02-24
updated: 2026-02-24
depends_on:
  - docs/execution/backlog.md
  - docs/planning/roadmap.md
  - docs/planning/next-session-plan.md
---

# Feature Audit and Next Push Plan

**Purpose.** Audit the Folivm codebase against the backlog and roadmap, reconcile documentation with implementation, and produce a prioritised plan for the next development push.

---

## 1. Feature Audit Summary

### 1.1 Implemented and Complete

| Capability | Epic/Story | Status | Notes |
|------------|------------|--------|-------|
| Tauri desktop shell | EP-006 | Done | Runs as local desktop app |
| Project folder schema | EP-003 | Done | Create, open, load, save; inputs/, working/, context/, deliverables/ |
| Rich Markdown editor | EP-001 | Done | TipTap, H1–H4, lists, tables, callouts, executive-summary |
| **Footnote support** | EP-001 | Done | `FootnoteExtension`, bubble menu insert/edit; serialises to `^[content]` |
| Element-based styling | EP-002 | Done | WYSIWYG, print.css, CSS counters |
| PDF export | EP-004 | Done | Pandoc path fallback (PATH + Homebrew) |
| DOCX export | EP-004 | Done | With optional reference DOCX |
| **Reference DOCX** | US-032 | Done | Config in Folivm.yaml; modal to choose/clear; export passes to Pandoc |
| UI scaffold | EP-008 | Done | Three-panel layout, tokens.css, ThemeProvider, shell components |
| LLM assistance | EP-005 | Done | Provider config, context, suggestion accept/reject/edit |
| Format documentation | EP-007 | Done | |
| Scaffold adoption | Plan | Done | Phases 1–4: aliases, cn(), Radix, shell extraction, Vellum aesthetics |
| Frontmatter panel | US-004 | Done | Title, created, updated, author; validation on save |
| Native menu (partial) | EP-109 | Done | Folivm/File/Edit/View/Window; Help has Keyboard Shortcuts only |
| Search / Find-replace | US-091 | Done | Document and project search |
| Explorer drag-and-drop | US-090 | Done | |
| Reference DOCX modal | — | Done | Opened from Settings in WindowChrome |

### 1.2 Incomplete or Gaps

| Capability | Epic/Story | Gap | Notes |
|------------|------------|-----|-------|
| **Autosave** | EP-003 | Toggle UI exists; debounced save **not wired** | `autosaveEnabled` state and `WindowChrome` toggle present; no `useEffect` watching `docContent` to trigger `saveDocument` when enabled |
| Help menu completion | US-096 | Keyboard Shortcuts = `alert()`; Documentation, Support missing | Needs proper reference panel + external links |
| Empty editor canvas | EP-110 | Placeholder text only | Current: "Select a document or create a new one"; spec: Folivm watermark + keyboard shortcuts list |
| Preview mode / zoom | — | State exists; canvas does not react | `viewMode`, `zoomLevel` in state; `EditorCanvas` does not receive them; no print-style or zoom transform applied |
| Unused dependency | Tech debt | `@tauri-apps/plugin-fs` in package.json | File ops use Tauri commands; plugin not imported |

### 1.3 Backlog (Not Started)

| Epic/Story | Title |
|------------|-------|
| EP-110 | Empty editor canvas — watermark, shortcuts |
| EP-111 | Document tabs |
| EP-112 | AI assistant as extension |

---

## 2. Documentation Corrections

The following docs are out of date relative to implementation:

| Document | Incorrect statement | Correction |
|----------|---------------------|------------|
| [next-session-plan.md](next-session-plan.md) | "Export accepts `reference_docx` but UI always passes `null`" | Reference DOCX is wired: `exportDocx` reads `config.reference_docx`; modal persists via `write_project_config` |
| [next-session-plan.md](next-session-plan.md) | "FR-2.2 lists footnotes; not yet implemented" | Footnotes implemented: `FootnoteExtension`, bubble menu, Turndown `^[content]` |

---

## 3. Recommended Next Push Plan

Prioritised for the next development push, in order.

### 3.1 High priority (do first)

| # | Task | Effort | Rationale |
|---|------|--------|-----------|
| 1 | **Autosave** — implement debounced save when toggle enabled | 1–2 hours | Last remaining EP-003 item; toggle already present; user expects it to work |
| 2 | **Update docs** — correct next-session-plan (reference DOCX, footnotes) | 15 min | Avoids misleading future work |
| 3 | **Help menu (US-096)** — replace Keyboard Shortcuts alert with a reference panel/modal; add Documentation and Support links | 2–3 hours | EP-109 completion; improves discoverability |

**Implementation notes (Autosave):**
- In `useFolivmApp.ts`: add `useEffect` that depends on `[docContent, autosaveEnabled, project, currentDoc]`
- When `autosaveEnabled && project && currentDoc`, debounce (e.g. 1.5s) and call `saveDocument(docContent)`
- Skip on initial mount and when `docContent` matches last-saved (avoid save-on-load)
- Consider `useRef` for last-saved content to avoid redundant saves

### 3.2 Medium priority

| # | Task | Effort | Rationale |
|---|------|--------|-----------|
| 4 | **Empty editor canvas (EP-110)** — Folivm watermark + keyboard shortcuts | 2–3 hours | Improves first-run experience; aligns with EP-109 shortcuts |
| 5 | **Remove `@tauri-apps/plugin-fs`** from package.json | 5 min | Tech debt; reduces bundle size |
| 6 | **Preview mode** — wire `viewMode` and `zoomLevel` to `EditorCanvas` | 2–4 hours | Preview/zoom controls exist but have no effect; expected by users |

### 3.3 Lower priority (defer or batch)

| # | Task | Notes |
|---|------|-------|
| 7 | Document tabs (EP-111) | Larger scope; can batch with empty canvas later |
| 8 | AI assistant as extension (EP-112) | Phase 0 exit doesn't require it |

---

## 4. Suggested Session Flow

1. **Validate workflow** — Run `npm run tauri dev`; create project → author doc → export PDF/DOCX. Fix any friction.
2. **Autosave** — Implement debounced save; test with toggle on/off.
3. **Doc updates** — Correct next-session-plan; optionally tick scaffold Phase 4 as complete in TODO.md.
4. **Help menu** — Replace alert with Radix Dialog listing shortcuts; add Documentation/Support links (URLs TBD).
5. **Optional** — Empty canvas (EP-110) or remove unused plugin; leave Preview/zoom for a later push if time is limited.

---

## 5. Key Files Reference

| Purpose | Path |
|---------|------|
| Autosave state | `src/hooks/useFolivmApp.ts` — `autosaveEnabled`, `saveDocument` |
| Help menu handler | `src/hooks/useMenuActions.ts` — `case "keyboard-shortcuts"` |
| Empty canvas | `src/components/shell/EditorCanvas.tsx` — `currentDoc ? ... : <div className="empty-editor">` |
| Preview / zoom wiring | `EditorCanvas` does not receive `viewMode` or `zoomLevel`; needs props + CSS/transform |
| Unused plugin | `package.json` — `@tauri-apps/plugin-fs` |

---

## Related

- [Backlog](../execution/backlog.md)
- [Roadmap](roadmap.md)
- [Next Session Plan](next-session-plan.md)
- [TODO.md](../../TODO.md)
